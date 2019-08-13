import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { FormGroup, FormControl, Validators, FormArray, AbstractControl } from '@angular/forms';
import { FormMode } from 'src/app/shared/form-mode.enum';
import { Subscription } from 'rxjs';

// recipe edit component
@Component({
	selector: 'app-recipe-edit',
	templateUrl: './recipe-edit.component.html',
	styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {

	// recipe index
	id: number;

	// recipe object reference
	recipe: Recipe;

	// edit mode flag
	editMode: boolean = false;

	// recipe form
	recipeForm: FormGroup;

	// submit form button reference
	@ViewChild('submitRecipeButton', { static : true })
	submitRecipeButton: ElementRef;

	// regular expression for a typical image url path
	imagePathRegExp: RegExp = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

	// current image path (for image preview)
	currentImagePath: string = '';

	// route parameter subscription
	private routeParamsSubscription: Subscription;

	// image path control subscrption
	private imagePathSubscription: Subscription;

	// inject recipe service, router and route that loaded this component
	constructor(private recipeService: RecipeService,
				private router: Router,
				private route: ActivatedRoute) {

	}

	// initialization
	ngOnInit() {

		// subscribe to the current route parameters
		this.routeParamsSubscription = this.route.params.subscribe((params: Params) => {

			// fetch recipe index
			this.id = +params['id'];

			// index exists -> user is on /recipes/id/edit -> set 'update' recipe mode
			// index does not exist -> user is on /recipes/new -> set 'add' recipe mode
			if (!isNaN(this.id)) {
				this.setMode(FormMode.Update);
			} else {
				this.setMode(FormMode.Add);
			}

			// load recipe form
			this.loadForm();

		});

		// initialize current image path property to the one in the form input
		this.currentImagePath = this.recipeForm.value.imagePath;

		// image preview logic: subscribe to value changes on the recipe image path
		// and assign its value to the currentImagePath property
		this.imagePathSubscription = this.recipeForm.controls['imagePath'].valueChanges.subscribe((url: string) => {
			this.currentImagePath = url;
		});

	}

	// add new ingredient FormGroup: push to FormArray two FormControls
	// for ingredient name and ingredient amount
	onAddIngredient(): void {
		this.getFormArray('ingredients').push(new FormGroup({
			'name': new FormControl(null, Validators.required),
			'amount': new FormControl(1, [Validators.required, Validators.min(1)])
		}));
	}

	// submission handler
	onSubmit(): void {

		// recipe Firebase id
		let recipeId: string = '';

		// if editing an existing recipe: assign to variable the recipe's current Firebase id
		// (undefined if not persisted yet or a string if already persisted)
		// if adding a new recipe: set recipe id to undefined
		if (this.editMode) {
			recipeId = this.recipe.id;
		} else {
			recipeId = undefined;
		}

		// if recipe id is not undefined, it means the user edited a fetched recipe,
		// so register as a recipe to update on database when saving changes
		if (recipeId !== undefined) {
			this.recipeService.registerUpdatedRecipe(this.recipe.id);
		}

		// use service to add or update recipe on UI with the recipe form value and the calculated if (undefined or a string)
		// note: we can pass a javascript object and not an instance of the Recipe class since the final object resembles
		// the Recipe model
		this.recipeService.addOrUpdateRecipe({ ...this.recipeForm.value, id: recipeId }, this.id);

		// clear the form
		this.recipeForm.reset();

		// route the user to the correct path
		this.routeUser();

	}

	// on cancel, reset the form and redirect user
	onCancel(): void {
		this.recipeForm.reset();
		this.routeUser();
	}

	// delete recipe ingredient FormGroup
	onDeleteRecipeIngredient(index: number) {
		this.getFormArray('ingredients').removeAt(index);
	}

	// delete all ingredient FormGroups
	onDeleteAllIngredients(): void {
		this.getFormArray('ingredients').clear();
	}

	// get AbstractControl array from FormArray to loop through the *ngFor directive
	getControls(path: string): AbstractControl[] {
		return this.getFormArray(path).controls;
	}

	// get the from the recipe form
	private getFormArray(path: string): FormArray {
		return <FormArray> this.recipeForm.get(path);
	}

	// load form
	loadForm(): void {

		// initializing values
		let recipeName: string = '';
		let recipeDescription: string = '';
		let recipeImagePath: string = '';
		let recipeIngredients: FormArray = new FormArray([]);

		// if editing
		if (this.editMode) {

			// fetch the recipe to edit
			this.recipe = this.recipeService.getRecipe(this.id);

			// save its name, description and image path
			recipeName = this.recipe.name;
			recipeDescription = this.recipe.description;
			recipeImagePath = this.recipe.imagePath;

			// if recipe has ingredients
			if (this.recipe['ingredients']) {

				// loop through all of them and push on each iteration a new FormGroup with initialized
				// FormContrls for ingredient name and ingredient amount
				for (let ingredient of this.recipe.ingredients) {
					recipeIngredients.push(new FormGroup({
						'name': new FormControl(ingredient.name, Validators.required),
						'amount': new FormControl(ingredient.amount, [Validators.required, Validators.min(1)])
					}));
				}

			}

		}

		// define the recipe form with their validators
		this.recipeForm = new FormGroup({
			'name': new FormControl(recipeName, Validators.required),
			'description': new FormControl(recipeDescription, Validators.required),
			'imagePath': new FormControl(recipeImagePath, [Validators.required, Validators.pattern(this.imagePathRegExp)]),
			'ingredients': recipeIngredients
		});

	}

	// set form mode: simply toggle the editMode flag and change the submit button text
	private setMode(mode: FormMode) {

		switch (mode) {
		
			case FormMode.Add: 
				this.editMode = false;
				this.submitRecipeButton.nativeElement.textContent = 'Add Recipe';
				break;

			case FormMode.Update: 
				this.editMode = true;
				this.submitRecipeButton.nativeElement.textContent = 'Update Recipe';
				break;

			default: 
				this.editMode = false;
				this.submitRecipeButton.nativeElement.textContent = 'Add Recipe';
				break;

		}

	}

	// route user when adding/updating/canceling a form
	private routeUser(): void {

		// if user added a brand new recipe, go to its recipe details by moving from
		// /recipes/new -> /recipes/id
		// if user edited a recipe, simply go up one level
		// /recipes/id/edit -> /recipes/id
		if (!this.editMode) {
			this.router.navigate(['..', this.recipeService.length - 1], {
				relativeTo: this.route
			});
		} else {
			this.router.navigate(['..'], {
				relativeTo: this.route
			});
		}

	}

	// unsubscriptions
	ngOnDestroy(): void {
		this.routeParamsSubscription.unsubscribe();
		this.imagePathSubscription.unsubscribe();
	}

}

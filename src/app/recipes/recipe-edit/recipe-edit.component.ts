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

	// the recipe id
	id: number;

	// the recipe information
	recipe: Recipe;

	// edit mode
	// true: editing an existing recipe
	// false: creating a new recipe
	editMode: boolean = false;

	// recipe form
	recipeForm: FormGroup;

	// access to the submit recipe button
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

	// inject recipe service and current route and the router to navigate
	constructor(private recipeService: RecipeService,
				private router: Router,
				private route: ActivatedRoute) {

	}

	// when the component is instantiated...
	ngOnInit() {

		// subscribe to the current route parameters and...
		this.routeParamsSubscription = this.route.params.subscribe((params: Params) => {

			// fetch the id each time it changes
			this.id = +params['id'];

			// if id is a number, it means the current route is
			// localhost:4200/recipes/id/edit to edit an existing recipe

			// so set the mode of this form to 'update' mode (set editMode flag to true and change the submit button text
			// to 'Update Recipe'

			// if id is not a number, it means that we are adding a new recipe, so set the form mode
			// to 'add' mode
			if (!isNaN(this.id)) {
				this.setMode(FormMode.Update);
			} else {
				this.setMode(FormMode.Add);
			}

			// load and initialize the recipe form
			this.loadForm();

		});

		// set the current image path to the one in the form input
		this.currentImagePath = this.recipeForm.value.imagePath;

		// image preview logic: subscribe to value changes on the recipe image path
		// and assign its value to the currentImagePath property
		this.imagePathSubscription = this.recipeForm.controls['imagePath'].valueChanges.subscribe((url: string) => {
			this.currentImagePath = url;
		});

	}

	// handler when desiring to add a new ingredient form group
	// push a new form group with two form controls
	// ingredient name: must not be empty
	// ingredient amount: must not be empty and must be a number greater or equal than 1; default value is 1
	onAddIngredient(): void {
		this.getFormArray('ingredients').push(new FormGroup({
			'name': new FormControl(null, Validators.required),
			'amount': new FormControl(1, [Validators.required, Validators.min(1)])
		}));
	}

	// when submitting
	onSubmit(): void {

		// recipe Firebase id
		let recipeId: string = '';

		// if we are on edit mode, this means that the 'recipe' property of this component is already defined
		// so we can assign to the previos variable its id (undefined if unpersised recipe of existing if the user is editing a fetched recipe)

		// if we are not in edit mode, this means the 'recipe' property is undefined, so assign directly the recipeId variable an undefined value
		if (this.editMode) {
			recipeId = this.recipe.id;
		} else {
			recipeId = undefined;
		}

		// if at the end of the if-else clause the recipeId variable remains undefined, it means that we are dealing with a recipe
		// that has not been persisted yet

		// if it is not undefined but has a string value, it means that the user edited a fetched recipe, so register it as a recipe to-update
		if (recipeId !== undefined) {
			this.recipeService.registerUpdatedRecipe(this.recipe.id);
		}

		// the value of the whole recipe form happens to match EXACTLY the structure of the Recipe object
		// while keeping consistency between the Recipe/Ingredient model property names and the form control names
		// example: the 'name' field on the Recipes model matches the 'name' form control where you place the recipe name
		// in this particular scenario, we can DIRECTLY inject the recipe form value instead of extracting the form inputs
		// one by one and creating a recipe instance to inject to this method

		// the second argument determines if we are either adding a new recipe or updating an existing one

		// http update: apart from the recipe form value, append the Firebase id (undefined if brand new or existing if fetched from database)
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

	// handler when deleting a recipe ingredient
	onDeleteRecipeIngredient(index: number) {
		this.getFormArray('ingredients').removeAt(index);
	}

	// handler when deleting all ingredient form groups
	// call clear() on form array
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

	// load a form
	loadForm(): void {

		// set initial values to the recipe name, description and image path on generic variables
		// the recipe ingredients variable will be at the end an array of form groups, so declare a new instance of an empty FormArray
		let recipeName: string = '';
		let recipeDescription: string = '';
		let recipeImagePath: string = '';
		let recipeIngredients: FormArray = new FormArray([]);

		// if we are going to edit an existing recipe...
		if (this.editMode) {

			// fetch it
			this.recipe = this.recipeService.getRecipe(this.id);

			// save its name, description and image path
			recipeName = this.recipe.name;
			recipeDescription = this.recipe.description;
			recipeImagePath = this.recipe.imagePath;

			// if this recipe has any ingredients...
			if (this.recipe['ingredients']) {

				// loop through each one of them
				for (let ingredient of this.recipe.ingredients) {

					// and push the FormArray a new FormGropu with two controls for ingredient name and amount
					// and set them initially to the value of the current ingredient object 
					recipeIngredients.push(new FormGroup({
						'name': new FormControl(ingredient.name, Validators.required),
						'amount': new FormControl(ingredient.amount, [Validators.required, Validators.min(1)])
					}));

				}

			}

		}

		// define the recipe form
		// three form controls: recipe name, recipe description and recipe image path
		// one form array: ingredients
		// each element in this form array will be a form group with two form controls: ingredient name and amount

		// the recipe name must not be empty
		// the recipe description must not be empty
		// the recipe image path must not be empty and be a valid url

		// set this form controls to the variables we declared initially
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

	// route the user when adding/updating/canceling a form
	private routeUser(): void {

		// if we were not on edit mode (adding), it means we are on path localhost:4200/recipes/new
		// we desire to route the user to the recently created recipe, so we extract from the service the length of the recipes array
		// and use it to route the user to such new recipe path

		// before: localhost:4200/recipes/new
		// after: localhost:4200/recipes/id

		// if we were on edit mode (updating), we will route the user one level upwards so exit him from the /edit path
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

	// unsubscription
	ngOnDestroy(): void {
		this.routeParamsSubscription.unsubscribe();
		this.imagePathSubscription.unsubscribe();
	}

}

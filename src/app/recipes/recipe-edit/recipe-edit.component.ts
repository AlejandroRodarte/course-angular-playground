import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { FormGroup, FormControl, Validators, FormArray, AbstractControl } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { FormMode } from 'src/app/shared/form-mode.enum';

// recipe edit component
@Component({
	selector: 'app-recipe-edit',
	templateUrl: './recipe-edit.component.html',
	styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

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

	// inject recipe service and current route and the router to navigate
	constructor(private recipeService: RecipeService,
				private router: Router,
				private route: ActivatedRoute) {

	}

	// when the component is instantiated...
	ngOnInit() {

		// subscribe to the current route parameters and...
		this.route.params.subscribe((params: Params) => {

			// fetch the id each time it changes
			this.id = +params['id'];

			// if id is a number, it means the current route is
			// localhost:4200/recipes/id/edit to edit an existing recipe

			// so set the mode of this form to 'update' mode, fetch the recipe by id
			// and finally load the form with the fetched recipe data

			// if id is not a number, it means that we are adding a new recipe, so set the form mode
			// to 'add' mode
			if (!isNaN(this.id)) {
				this.setMode(FormMode.Update);
			} else {
				this.setMode(FormMode.Add);
			}

			this.loadForm();

		});

		// set the current image path to the one in the form input
		this.currentImagePath = this.recipeForm.value.imagePath;

		// image preview logic: subscribe to value changes on the recipe image path
		// and assign its value to the currentImagePath property
		this.recipeForm.controls['imagePath'].valueChanges.subscribe((url: string) => {
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

		// call the service and send the recipe with the id (a number or NaN)
		// based on the value of the id the method will decide whether to add or update
		this.recipeService.addOrUpdateRecipe(this.recipeForm.value, this.id);
		
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

		let recipeName: string = '';
		let recipeDescription: string = '';
		let recipeImagePath: string = '';
		let recipeIngredients: FormArray = new FormArray([]);

		if (this.editMode) {

			const recipe = this.recipeService.getRecipe(this.id);

			recipeName = recipe.name;
			recipeDescription = recipe.description;
			recipeImagePath = recipe.imagePath;

			if (recipe['ingredients']) {

				for (let ingredient of recipe.ingredients) {

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

}

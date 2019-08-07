import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { FormGroup, FormControl, Validators, FormArray, AbstractControl } from '@angular/forms';
import { IngredientProps, Ingredient } from 'src/app/shared/ingredient.model';
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

		// define the recipe form
		// three form controls: recipe name, recipe description and recipe image path
		// one form array: ingredients
		// each element in this form array will be a form group with two form controls: ingredient name and amount

		// the recipe name must not be empty
		// the recipe description must not be empty
		// the recipe image path must not be empty and be a valid url
		this.recipeForm = new FormGroup({
			'recipeName': new FormControl(null, Validators.required),
			'recipeDescription': new FormControl(null, Validators.required),
			'recipeImagePath': new FormControl(null, [Validators.required, Validators.pattern(this.imagePathRegExp)]),
			'ingredients': new FormArray([])
		});

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
				this.recipe = this.recipeService.getRecipe(this.id);
				this.loadForm();
			} else {
				this.setMode(FormMode.Add);
			}

		});

		// set the current image path to the one in the form input
		this.currentImagePath = this.recipeForm.value.recipeImagePath;

		// image preview logic: subscribe to value changes on the recipe image path
		// and assign its value to the currentImagePath property
		this.recipeForm.controls['recipeImagePath'].valueChanges.subscribe((url: string) => {
			this.currentImagePath = url;
		});

	}

	// handler when desiring to add a new ingredient form group
	// push a new form group with two form controls
	// ingredient name: must not be empty
	// ingredient amount: must not be empty and must be a number greater or equal than 1; default value is 1
	onAddIngredient(): void {
		this.getFormArray('ingredients').push(new FormGroup({
			'ingredientName': new FormControl(null, Validators.required),
			'ingredientAmount': new FormControl(1, [Validators.required, Validators.min(1)])
		}));
	}

	// when submitting
	onSubmit(): void {

		// store the data in these variables
		// note that recipeIngredients is of type IngredientProps[] and not Ingredient[]
		// this is because this.recipeForm.value.ingredients returns an object literal with the ingredient name and ingredient amount
		// so the IngredientProps defines this only fields
		const recipeName: string = this.recipeForm.value.recipeName;
		const recipeDescription: string = this.recipeForm.value.recipeDescription;
		const recipeImagePath: string = this.recipeForm.value.recipeImagePath;
		const recipeIngredients: IngredientProps[] = this.recipeForm.value.ingredients;

		// create a new recipe while keeping the ingredients array empty
		const recipe = new Recipe(recipeName, recipeDescription, recipeImagePath, []);

		// loop through each ingredient object literal and push a new ingredient object with these values to the recipe instance
		recipeIngredients.forEach((ingredient: IngredientProps) => {
			recipe.ingredients.push(new Ingredient(ingredient.ingredientName, ingredient.ingredientAmount));
		});

		// call the service and send the recipe with the id (a number or NaN)
		// based on the value of the id the method will decide whether to add or update
		this.recipeService.addOrUpdateRecipe(recipe, this.id);
		
		// clear the form
		this.recipeForm.reset();

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

		let ingredients: IngredientProps[] = [];

		// loop through all the selected recipe ingredient objects in the array
		// for each ingredient, push an object literal to the IngredientProps[] array
		// with the ingredient name and ingredient amount
		this.recipe.ingredients.forEach((ingredient: Ingredient) => {
			this.onAddIngredient();
			ingredients.push({
				ingredientName: ingredient.name,
				ingredientAmount: ingredient.amount
			});
		});

		// load the values to the form
		// note how the ingredients FormArray does not accept an array of Ingredient[]
		// but an array of object literals with the required ingredient name and amounts, since that
		// is what each form group input will hold
		this.recipeForm.setValue({
			'recipeName': this.recipe.name,
			'recipeDescription': this.recipe.description,
			'recipeImagePath': this.recipe.imagePath,
			'ingredients': ingredients
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

}

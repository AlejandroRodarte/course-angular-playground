import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { FormGroup, FormControl, Validators, FormArray, AbstractControl } from '@angular/forms';
import { FormMode } from 'src/app/shared/form-mode.enum';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as fromRecipes from '../store/recipes.reducer';
import * as RecipeActions from '../store/recipes.actions';
import { tap, map } from 'rxjs/operators';

// recipe edit component
@Component({
	selector: 'app-recipe-edit',
	templateUrl: './recipe-edit.component.html',
	styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {

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

	// recipe reducer state subscription
	private recipeSubscription: Subscription;

	// inject recipe service, route and store
	constructor(private recipeService: RecipeService,
				private route: ActivatedRoute,
				private store: Store<fromApp.AppState>) {

	}

	// initialization
	ngOnInit() {

		this.recipeSubscription = 
		
			// subscribe to the recipe reducer state
			this
				.store
				.select('recipes')
				.pipe(

					// map(): observe only the selected recipe and its index
					map(
						(recipesState: fromRecipes.RecipesReducerState) => {
							return {
								selectedRecipe: recipesState.selectedRecipe,
								selectedRecipeIndex: recipesState.selectedRecipeIndex
							};
						}
					),

					// tap(): test the index to decide whether or now we hace a recipe on store
					// if we have one, set mode to update; if not, set mode to add
					tap(
						(recipeData: {selectedRecipe: Recipe, selectedRecipeIndex: number}) => {

							if (recipeData.selectedRecipeIndex > -1) {
								this.recipe = recipeData.selectedRecipe;
								this.setMode(FormMode.Update);
							} else {
								this.setMode(FormMode.Add);
							}

						}
					)

				)
				.subscribe();
			
		// route params subscription
		this.routeParamsSubscription = 

			this
				.route
				.params
				.pipe(

					// tap(): each time parameters on route change, store newest route on service
					tap(
						() => {
							this.recipeService.currentRoute = this.route;
						}
					)

				)
				.subscribe();

		// load the form
		this.loadForm();

		// initialize current image path property to the one in the form input
		this.currentImagePath = this.recipeForm.value.imagePath;

		// image preview logic: subscribe to value changes on the recipe image path
		// and assign its value to the currentImagePath property
		this.imagePathSubscription = 

			this
				.recipeForm
				.controls['imagePath']
				.valueChanges
				.pipe(

					// tap(): store the changed url in the component property
					tap(
						(url: string) => {
							this.currentImagePath = url;
						}
					)

				)
				.subscribe();

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

		// if we are on add mode -> action dispatch: add the recipe with an undefined Firebase id
		// if we are on update mode -> action dispatch: update the recipe with the recipe's Firebase id
		if (!this.editMode) {
			this.store.dispatch(new RecipeActions.AddRecipe({ ...this.recipeForm.value, id: undefined }));
		} else {
			this.store.dispatch(new RecipeActions.UpdateRecipe({ ...this.recipeForm.value, id: this.recipe.id }));
		}

		// clear the form
		this.recipeForm.reset();

		// set mode to add
		this.setMode(FormMode.Add);

	}

	// on cancel, reset the form
	// action dispatch: cancel recipe (route user back one level)
	onCancel(): void {
		this.recipeForm.reset();
		this.store.dispatch(new RecipeActions.CancelRecipe());
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

	// unsubscriptions
	ngOnDestroy(): void {

		if (this.routeParamsSubscription) {
			this.routeParamsSubscription.unsubscribe();
		}

		if (this.imagePathSubscription) {
			this.imagePathSubscription.unsubscribe();
		}

		if (this.recipeSubscription) {
			this.recipeSubscription.unsubscribe();
		}

	}

}

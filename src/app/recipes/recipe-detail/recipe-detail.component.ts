import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import * as fromApp from '../../store/app.reducer';
import * as fromRecipes from '../store/recipes.reducer';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as RecipeActions from '../store/recipes.actions';
import { Store } from '@ngrx/store';

// recipe detail component
@Component({
	selector: 'app-recipe-detail',
	templateUrl: './recipe-detail.component.html',
	styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {

	// currently selected recipe index
	selectedIndex: number;

	// render flag
	renderFlag: boolean = true;

	// property binding to receive the currently selected recipe from RecipesComponent
	recipe: Recipe;

	// selected recipe subscription
	selectedRecipeSubscription: Subscription;

	// route parameter subscription
	private routeParamsSubscription: Subscription;

	// inject recipe service, router and route that loaded this component
	constructor(private recipeService: RecipeService,
				private router: Router,
				private route: ActivatedRoute,
				private store: Store<fromApp.AppState>) {

	}

	// initialization
	ngOnInit() {

		// subscribe to the selected recipe observable to fetch the recipe index the user selected on the UI
		// call doRender() to render or not the component
		// this.selectedRecipeSubscription = this.recipeService.selectedRecipe.subscribe((index: number) => {
		// 	this.doRender(index);
		// });

		this.store.select('recipes').subscribe((recipesState: fromRecipes.RecipesReducerState) => {
			this.recipe = recipesState.selectedRecipe;
			this.selectedIndex = recipesState.selectedRecipeIndex;
			this.doRender(recipesState.selectedRecipeIndex);
		});


		// subscribe to the params observable
		this.routeParamsSubscription = this.route.params.subscribe((params: Params) => {

			// get :id value
			const id = +params['id'];

			this.recipeService.currentRoute = this.route;
			
			// get recipe through service based on id and save on this property
			// this.recipe = this.recipeService.getRecipe(id);

			// also, save the id on the index property
			// this.selectedIndex = id;

		});

	}

	// add ingredients to shopping list
	// use the service method to delegate task
	addToShoppingList() {
		this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
	}

	// do render?
	doRender(index: number): void {

		// if user clicks on the previously selected recipe, toggle render flag
		// if user clicks on different recipe, render the component and set the index on property
		if (this.selectedIndex === index) {
			this.renderFlag = !this.renderFlag;
		} else {
			this.selectedIndex = index;
			this.renderFlag = true;
		}

	}

	// delete recipe handler
	onDeleteRecipe(): void {

		// call service method to delegate task
		// this.recipeService.deleteRecipe(this.selectedIndex);

		// if recipe has a Firebase id, register as a recipe to delete on database when saving changes
		// if (this.recipe.id !== undefined) {
		// 	this.recipeService.registerDeletedRecipe(this.recipe.id);
		// }

		this.store.dispatch(new RecipeActions.RemoveRecipe());

		// navigate on upper level than the current one, relative to current route
		// example: /recipes/id -> /recipes
		// this.router.navigate(['..'], {
		// 	relativeTo: this.route
		// });

	}

	// unsubscriptions
	ngOnDestroy() {

		if (this.selectedRecipeSubscription) {
			this.selectedRecipeSubscription.unsubscribe();
		}

		if (this.routeParamsSubscription) {
			this.routeParamsSubscription.unsubscribe();
		}

	}

}

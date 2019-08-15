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
import { map, tap } from 'rxjs/operators';

// recipe detail component
@Component({
	selector: 'app-recipe-detail',
	templateUrl: './recipe-detail.component.html',
	styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {

	// property binding to receive the currently selected recipe from RecipesComponent
	recipe: Recipe;

	// recipes reducer state subscription
	private recipesSubscription: Subscription;

	// route parameter subscription
	private routeParamsSubscription: Subscription;

	// inject recipe service, route and store
	constructor(private recipeService: RecipeService,
				private route: ActivatedRoute,
				private store: Store<fromApp.AppState>) {

	}

	// initialization
	ngOnInit() {

		this.recipesSubscription = 

			// subscribe to the 'recipes' reducer state part of the store
			this
				.store
				.select('recipes')
				.pipe(

					// map(): convert the observable of the recipe reducer state
					// into an observable of the selected recipe property of that reducer state
					map(
						(recipesState: fromRecipes.RecipesReducerState) => {
							return recipesState.selectedRecipe;
						}
					),

					// tap(): middle-ware code -> store the current selected recipe on the store in the
					// component property (reference)
					tap(
						(selectedRecipe: Recipe) => {
							this.recipe = selectedRecipe;
						}
					)

				)
				.subscribe();


		// route parameters subscription
		this.routeParamsSubscription = 

			this
				.route
				.params
				.pipe(

					// tap(): each time the route params change, store the currently
					// activated route in the service
					tap(
						() => {
							this.recipeService.currentRoute = this.route;
						}
					)

				)
				.subscribe();

	}

	// dispatch action: add recipe ingredients
	addToShoppingList() {
		this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
	}

	// dispatch action: remove the currently selected recipe
	onDeleteRecipe(): void {
		this.store.dispatch(new RecipeActions.RemoveRecipe());
	}

	// unsubscriptions
	ngOnDestroy() {

		if (this.recipesSubscription) {
			this.recipesSubscription.unsubscribe();
		}

		if (this.routeParamsSubscription) {
			this.routeParamsSubscription.unsubscribe();
		}

	}

}

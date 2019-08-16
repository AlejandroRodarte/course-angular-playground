import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as RecipeActions from './store/recipes.actions';
import * as fromRecipes from './store/recipes.reducer';
import { Actions, ofType } from '@ngrx/effects';
import { take, tap, map } from 'rxjs/operators';
import { Recipe } from './recipe.model';

// recipe resolver service to load recipes before accessing some routes
@Injectable({
    providedIn: 'root'
})
export class RecipeResolverService implements Resolve<Recipe[]> {

    // inject the store and the actions observable
    constructor(private store: Store<fromApp.AppState>,
                private actions$: Actions,
                private router: Router) {

    }
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {

        let recipesExist: boolean = false;
        let recipes: Recipe[] = [];

        // get a snapshot of the recipes state
        this
            .store
            .select('recipes')
            .pipe(

                // tap(): middle-ware code
                tap(

                    (recipesState: fromRecipes.RecipesReducerState) => {

                        // if the store's recipes array is not empty, simply get a copy
                        // and mark the 'recipes exist' flag
                        if (recipesState.recipes.length > 0) {
                            recipes = [...recipesState.recipes];
                            recipesExist = true;
                        }

                    }

                )

            )
            .subscribe()
            .unsubscribe();
        
        // if the store's recipes array is empty (they have not been fetched from the user)
        if (!recipesExist) {

            // action dispatch: get the recipes (http request and dispatct AddRecipes action)
            this.store.dispatch(new RecipeActions.GetRecipes());

            // return the observable of the AddRecipes payload, which is the array of recipes to add
            return this
                    .actions$
                    .pipe(

                        ofType(RecipeActions.ADD_RECIPES),

                        take(1),

                        // map(): extract the payload from the action data
                        map(
                            (recipeData: RecipeActions.AddRecipes) => {
                                return recipeData.payload;
                            }
                        ),

                        // tap(): execute some middle-ware
                        tap(

                            // with the fetched recipes: validate the route the user wrote
                            (recipes: Recipe[]) => {
                                this.handleSelection(recipes, +route.params['id']);
                            }

                        )

                    );

        // if not empty, simply return the current store's recipes and validate the route
        } else {
            this.handleSelection(recipes, +route.params['id']);
            return recipes;
        }

    }

    // route validation
    private handleSelection(recipes: Recipe[], index: number) {

        // if the store recipes list is still empty after fetching, do not load this route's component
        // but redirect to /recipes/new to invite the user to add a new recipe
        if (recipes.length === 0) {
            this.router.navigate(['/recipes/new']);
        } 
        
        // if the user forcefully entered an index that is superior to the recipe's length (invalid index)
        // route the user to the first recipe by default
        else if (index > recipes.length - 1) {
            this.store.dispatch(new RecipeActions.SelectRecipe(0));
            this.router.navigate(['/recipes', 0]);
        }

        // if the index is correct, simply dispatch the select recipe action on the correct index
        else {
            this.store.dispatch(new RecipeActions.SelectRecipe(index));
        }

    }

}
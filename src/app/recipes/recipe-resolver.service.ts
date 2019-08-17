import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as RecipeActions from './store/recipes.actions';
import * as fromRecipes from './store/recipes.reducer';
import { Actions, ofType } from '@ngrx/effects';
import { take, tap, map, switchMap, concatMap } from 'rxjs/operators';
import { Recipe } from './recipe.model';

// recipe resolver service
@Injectable({
    providedIn: 'root'
})
export class RecipeResolverService implements Resolve<number> {

    // inject the store, actions observable and the router
    constructor(private store: Store<fromApp.AppState>,
                private actions$: Actions,
                private router: Router) {

    }
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): number | Observable<number> | Promise<number> {

        // return an observable that, at the end of the big chain, will resolve a number

        // subscribe to the recipes state
        return this
                    .store
                    .select('recipes')
                    .pipe(

                        // we are only interested in the first emission of the observable once we subscribe to it
                        // (subscription managed by the resolver)
                        take(1),

                        // map(): from an observable of the full state to an observable of the recipes
                        map(
                            (recipesState: fromRecipes.RecipesReducerState) => {
                                return recipesState.recipes;
                            }
                        ),

                        // switchMap(): return an inner observable that will become the final, global observable
                        // enables also the automatic subscription to the inner observable
                        switchMap(

                            (recipes: Recipe[]) => {

                                // check if state recipes are empty
                                if (recipes.length === 0) {

                                    // if so, fetch them from the database
                                    this.store.dispatch(new RecipeActions.GetRecipes());

                                    // our inner observable to return in this case
                                    // subscribe to the actions observable
                                    return this
                                                .actions$
                                                .pipe(

                                                    // wait for the AddRecipes action to be triggered and...
                                                    ofType(RecipeActions.ADD_RECIPES),

                                                    // we are only interesed in its first (and only) emission
                                                    take(1),

                                                    // map(): parse from recipes to its length
                                                    map(
                                                        (recipeData: RecipeActions.AddRecipes) => {
                                                            return recipeData.payload.length;
                                                        }
                                                    ),

                                                    // tap(): execute the handle selection code validate the 'id' param
                                                    // the user entered
                                                    tap(
                                                        (length: number) => {
                                                            this.handleSelection(length, +route.params['id']);
                                                        }
                                                    )

                                                );

                                } else {
                                    
                                    // if not empty, simply return the recipes wrapped in an observable and...
                                    return of(recipes)
                                                .pipe(

                                                    // take its first (and only) emission
                                                    take(1),

                                                    // map(): parse from recipes to length
                                                    map(
                                                        (recipes: Recipe[]) => {
                                                            return recipes.length;
                                                        }
                                                    ),

                                                    // tap(): execute the handle selection code validate the 'id' param
                                                    // the user entered
                                                    tap(
                                                        (length: number) => {
                                                            this.handleSelection(length, +route.params['id']);
                                                        }
                                                    )

                                                );

                                }

                            }

                        )

                    );

    }

    // route validation
    private handleSelection(length: number, index: number) {

        // if the store recipes list is still empty after fetching, do not load this route's component
        // but redirect to /recipes/new to invite the user to add a new recipe
        if (length === 0) {
            this.router.navigate(['/recipes/new']);
        } 
        
        // if the user forcefully entered an index that is superior to the recipe's length (invalid index)
        // route the user to the first recipe by default
        else if (index < 0 || index > length - 1) {
            this.store.dispatch(new RecipeActions.SelectRecipe(0));
            this.router.navigate(['/recipes', 0]);
        }

        // if the index is correct, simply dispatch the select recipe action on the correct index
        else {
            this.store.dispatch(new RecipeActions.SelectRecipe(index));
        }

    }

}
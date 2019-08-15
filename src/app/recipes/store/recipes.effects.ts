import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';

import * as RecipeActions from './recipes.actions';
import { switchMap, map, tap, mergeMap, take } from 'rxjs/operators';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { of, from, Subscription } from 'rxjs';
import * as fromApp from './../../store/app.reducer';
import { Store } from '@ngrx/store';

export type FirebaseRecipes = { [key: string]: Recipe };

@Injectable()
export class RecipesEffects {

    @Effect()
    fetchRecipes = this
                    .actions$
                    .pipe(

                        ofType(
                            RecipeActions.GET_RECIPES
                        ),

                        switchMap(

                            () => {

                                return this.http
                                            .get<FirebaseRecipes>(
                                                'https://angular-course-app-eeedb.firebaseio.com/recipes.json'
                                            )
                                            .pipe(

                                                map((firebaseRecipes: FirebaseRecipes) => {

                                                    const recipes: Recipe[] = [];

                                                    for (const key in firebaseRecipes) {

                                                        const recipe: Recipe = firebaseRecipes[key];
                                                        recipe.id = key;

                                                        recipes.push(recipe);

                                                    }

                                                    return new RecipeActions.AddRecipes(recipes);

                                                })

                                            );

                            }

                        )

                    );
    
    @Effect({
        dispatch: false
    })
    postRecipe = this
                    .actions$
                    .pipe(

                        ofType(RecipeActions.POST_RECIPE),

                        tap(

                            (recipeData: RecipeActions.PostRecipe) => {

                                const subscription = this.http
                                            .post<{ name: string }>(
                                                'https://angular-course-app-eeedb.firebaseio.com/recipes.json',
                                                recipeData.payload.recipe
                                            )
                                            .pipe(

                                                tap(

                                                    (firebaseId: {name: string}) => {

                                                        this.store.dispatch(new RecipeActions.AttachId({
                                                            recipeIndex: recipeData.payload.index,
                                                            recipeId: firebaseId.name
                                                        }));

                                                    }
                                                )

                                            )
                                            .subscribe(
                                                () => {
                                                    subscription.unsubscribe();
                                                }
                                            )

                            }

                        )

                    );
        
                   
    @Effect()
    postRecipes = this
        .actions$
        .pipe(

            ofType(RecipeActions.POST_RECIPES),

            switchMap(

                (recipesData: RecipeActions.PostRecipes) => {

                    return from(recipesData.payload);

                }

            ),

            map(
                (recipeData: {recipe: Recipe, index: number}) => {
                    console.log(recipeData);
                    return new RecipeActions.PostRecipe(recipeData);
                }
            )

        );


    @Effect({
        dispatch: false
    })
    updateRecipe = this
                    .actions$
                    .pipe(

                        ofType(RecipeActions.PUT_RECIPE),

                        tap(
                            
                            (recipeData: RecipeActions.PutRecipe) => {

                                const subscription = this.http
                                        .put<Recipe>(
                                            `https://angular-course-app-eeedb.firebaseio.com/recipes/${recipeData.payload.id}.json`,
                                            recipeData.payload.recipe
                                        )
                                        .pipe(

                                            tap(
                                                (recipe: Recipe) => {
                                                    this.store.dispatch(new RecipeActions.ClearUpdate(recipeData.payload.id));
                                                }
                                            )

                                        ).subscribe(

                                            () => {
                                                subscription.unsubscribe();
                                            }

                                        );
                                        
                            }

                        )
                        
                    );
    
    @Effect()
    updateRecipes = this
        .actions$
        .pipe(

            ofType(RecipeActions.PUT_RECIPES),

            switchMap(

                (recipesData: RecipeActions.PutRecipes) => {

                    return from(recipesData.payload);

                }

            ),

            map(
                (recipeData: {recipe: Recipe, id: string}) => {
                    console.log(recipeData);
                    return new RecipeActions.PutRecipe(recipeData);
                }
            )

        );

    @Effect({
        dispatch: false
    })
    deleteRecipe = this
                    .actions$
                    .pipe(

                        ofType(RecipeActions.DELETE_RECIPE),

                        tap(

                            (recipeData: RecipeActions.DeleteRecipe) => {

                                const subscription = this.http
                                    .delete<null>(
                                        `https://angular-course-app-eeedb.firebaseio.com/recipes/${recipeData.payload}.json`
                                    )
                                    .pipe(
                                    
                                        tap(
                                            () => {
                                                this.store.dispatch(new RecipeActions.ClearDelete(recipeData.payload));
                                            }
                                        )
                                        
                                    )
                                    .subscribe(
                                        () => {
                                            subscription.unsubscribe();
                                        }

                                    )

                            }

                        )

                    );
    
    @Effect()
    deleteRecipes = this
        .actions$
        .pipe(

            ofType(RecipeActions.DELETE_RECIPES),

            switchMap(

                (recipesData: RecipeActions.DeleteRecipes) => {
                    return from(recipesData.payload);
                }

            ),

            map(
                (recipeData: string) => {
                    console.log(recipeData);
                    return new RecipeActions.DeleteRecipe(recipeData);
                }
            )

        );

    constructor(private actions$: Actions,
                private http: HttpClient,
                private store: Store<fromApp.AppState>) {

    }

}
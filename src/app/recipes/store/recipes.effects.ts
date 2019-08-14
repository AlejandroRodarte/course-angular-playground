import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';

import * as RecipeActions from './recipes.actions';
import { switchMap, map, tap } from 'rxjs/operators';
import { Recipe } from '../recipe.model';

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

                    )

    constructor(private actions$: Actions,
                private http: HttpClient) {

    }

}
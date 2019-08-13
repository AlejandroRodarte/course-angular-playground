import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { RecipeService } from '../recipes/recipe.service';

// definition for how we get the recipes from Firebase
export type FirebaseRecipes = { [key: string]: Recipe };

// data storage service
@Injectable({
    providedIn: 'root'
})
export class DataStorageService {

    // inject http client and recipe service
    constructor(private http: HttpClient,
                private recipeService: RecipeService) {

    }

    // fetch recipes request
    fetchRecipes(): Observable<Recipe[]> {

        return this.http

                    // get recipes from Firebase with correct URL; expect an object of type FirebaseRecipes
                    .get<FirebaseRecipes>(
                        'https://angular-course-app-eeedb.firebaseio.com/recipes.json'
                    )

                    // pipe(): transform output of response
                    .pipe(
                        
                        // map(): work with these FirebaseRecipes
                        map((firebaseRecipes: FirebaseRecipes) => {
                                    
                            // array of recipe models
                            const recipes: Recipe[] = [];

                            // loop through each key in this object (Firebase id's)
                            for (const key in firebaseRecipes) {

                                // store the recipe javascript object on a Recipe model variable
                                // and store also the id being the current key
                                const recipe: Recipe = firebaseRecipes[key];
                                recipe.id = key;

                                // push the new recipe model
                                recipes.push(recipe);

                            }

                            // return an array of Recipes
                            return recipes;

                        }),

                        // tap() middle-ware to work with the Recipe[] returned value from map():
                        // set the array of recipes to the service
                        tap((recipes: Recipe[]) => {
                            this.recipeService.setRecipes(recipes);
                        })

                    );

    }

    // post a new recipe
    saveRecipe(recipe: Recipe): void {

        this.http

            // post request to url and payload (recipe to upload); expect an object with the Firebase id of the
            // posted recipe
            .post<{ name: string }>(
                'https://angular-course-app-eeedb.firebaseio.com/recipes.json',
                recipe
            )

            // handle response
            .subscribe(

                // success: store the Firebase id on the recipe (the recipe argument is a reference to the one at
                // the recipes array on the recipe service
                (response: { name: string }) => {
                    recipe.id = response.name;
                },

                // error: log
                (error) => {
                    console.log(error);
                }

            )

    }

    // update a recipe
    updateRecipe(updatedRecipe: Recipe): void {

        // to update a recipe, we need to clear out first the Firebase id
        // store it temporarily on a variable and set is as undefined
        const recipeId = updatedRecipe.id;
        updatedRecipe.id = undefined;

        this.http

            // put request with the correct url and payload (updated recipe)
            // expect a response with the updated Recipe data
            .put<Recipe>(
                `https://angular-course-app-eeedb.firebaseio.com/recipes/${recipeId}.json`,
                updatedRecipe
            )

            // handle response
            .subscribe(
                
                // success: store again the recipe's Firebase id on the recipe reference
                () => {
                    updatedRecipe.id = recipeId;
                }, 
            
                // error: log
                (error) => {
                    console.log(error);
                }
            
            );

    }

    // delete a recipe
    deleteRecipe(recipeId: string): void {

        this.http

            // make the delete request on the correct url
            .delete<null>(
                `https://angular-course-app-eeedb.firebaseio.com/recipes/${recipeId}.json`
            )

            // subscribe to just trigger the request
            .subscribe();

    }

}
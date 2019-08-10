import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { RecipeService } from '../recipes/recipe.service';

// type definition for the recipe structure we get from firebase
// we get a set of random unique keys in a string format
// where each key has a Recipe object associated
export type FirebaseRecipes = { [key: string]: Recipe };

// data storage global service
@Injectable({
    providedIn: 'root'
})
export class DataStorageService {

    // our http client dependency
    constructor(private http: HttpClient,
                private recipeService: RecipeService) {

    }

    // fetch all recipes from the database
    // our header component is interesed in the response, since it will call a recipe service method (addOrUpdateRecipe)
    // to add all these recipes into the recipes array
    // the addOrUpdateRecipe emits a subject which informs other components that the array has changed and thus render the response
    // in essence, the header will use the recipe service to make calls to a method that ultimately informs other components to render the data

    // for the header to listen to such response we return the request observable so the component can subscribe to the response
    fetchRecipes(): Observable<Recipe[]> {

        // get() is a generic, and by Firebase standards, we expect to get a structure defined in the FirebaseRecipes type
        // before actually sending the response, we will transform it by instead sending an array of Recipe objects

        // we will loop through all the random unique keys Firebase generates and extract the recipe to push it into a temporary array to return at the end
        // of the loop

        // also, we desire to store this unique random Firebase id on the Recipe model so we can recognize fetched recipes from brand new recipes added by the user
        // and that have not been persisted yet; to do this, we simply assign the 'id' property of the recipe to the current loop value of the key
        return this.http
                    .get<FirebaseRecipes>('https://angular-course-app-eeedb.firebaseio.com/recipes.json')
                    .pipe(

                        map((firebaseRecipes: FirebaseRecipes) => {
                            
                            const recipes: Recipe[] = [];

                            for (const key in firebaseRecipes) {

                                const recipe: Recipe = firebaseRecipes[key];
                                recipe.id = key;

                                recipes.push(recipe);

                            }

                            return recipes;

                        }),

                        tap((recipes: Recipe[]) => {
                            this.recipeService.setRecipes(recipes);
                        })

                    );

    }

    // saving a particular recipe
    saveRecipe(recipe: Recipe): void {

        // regular post() observable with url and payload
        // on success, Firebase returns a simple object with one property 'name' with the value being the random unique id for the 
        // posted recipe

        // our components are not interested in this particular response from Firebase, but we desire to use this random unique id sent
        // by Firebase to 'mark' the posted recipe in our app to identify it has already been persisten

        // to do this, we subscribe directly here to the observable, take the recipe reference and assign the 'name' property value (unique id)
        // to its 'id' property

        // remember that all these 'recipe' parameters that enter these methods are ultimately REFERENCES to the recipe element found in the recipes array
        // on the recipeService

        // in other words, the 'recipe' argument and this method and the one in the recipes array on the recipeService point to the same location in memory, so we
        // can sasign some properties to it from here
        this.http
            .post<{ name: string }>(
                'https://angular-course-app-eeedb.firebaseio.com/recipes.json',
                recipe
            )
            .subscribe(
                (response: { name: string }) => {
                    recipe.id = response.name;
                },
                (error) => {
                    console.log(error);
                }
            )

    }

    // update an existing recipe
    updateRecipe(updatedRecipe: Recipe): void {

        // issue: when we desire to update a recipe, such recipe model has already the Firebase id contained,
        // however, if we persist this recipe with the id included, it will save a recipe with this extra property that just
        // serves as a 'mark' to identify persisted and non-persisted recipes

        // to solve this issue, we store in a temporary variable the id of the recipe to update and then make it's id property undefined
        // temporarily while we update the data
        const recipeId = updatedRecipe.id;
        updatedRecipe.id = undefined;

        // we make the regular PUT request with the payload (recipe with no id),
        // and at the subscription, when we get the response, we set back the recipe's id with the help of the temporary variable

        // this tweak was done in a hurry to make this work with the Firebase structure
        this.http
            .put<Recipe>(
                `https://angular-course-app-eeedb.firebaseio.com/recipes/${recipeId}.json`,
                updatedRecipe
            )
            .subscribe(() => {
                updatedRecipe.id = recipeId;
            }, (error) => {
                console.log(error);
            });

    }

    // delete a recipe: in this particular case, we do not need a payload, just the recipe Firebase id
    deleteRecipe(recipeId: string): void {

        // we make the call, where Firebase returns a null object on success
        // we do not plan to do anything with the response, so place an empty function
        this.http
            .delete<null>(
                `https://angular-course-app-eeedb.firebaseio.com/recipes/${recipeId}.json`
            )
            .subscribe(() => {});

    }

}
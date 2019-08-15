import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromApp from '../store/app.reducer'
import { take, tap } from 'rxjs/operators';
import * as fromRecipes from './store/recipes.reducer';
import { ActivatedRoute } from '@angular/router';

// recipes service
export class RecipeService {

    // array of recipes
    recipesToAdd: {recipe: Recipe, index: number}[] = [];
      
    // tracker for all recipes that need to be updated on save
    recipesToUpdate: {recipe: Recipe, id: string}[] = [];

    // tracker for all recipes that need to be deleted on save
    recipesToDelete: string[] = [];

    // current route that user is in
    currentRoute: ActivatedRoute;

    // inject the store
    constructor(private store: Store<fromApp.AppState>) {

    }

    // store snapshot
    storeSnaphsot() {

        // access the recipes reducer state
        this
            .store
            .select('recipes')
            .pipe(

                // tap(): execute some middleware function
                tap(

                    // with the recipe reducer state
                    (recipesState: fromRecipes.RecipesReducerState) => {

                        // get the recipes we need to add, update and delete when we persist to the database
                        this.recipesToAdd = this.getNewRecipes(recipesState.recipes);
                        this.recipesToUpdate = this.getUpdatedRecipes(recipesState.recipesToUpdate, recipesState.recipes);
                        this.recipesToDelete = [...recipesState.recipesToDelete];

                    }

                )

                // subscribe and unsubscribe since it's a snapshot of what we have in the store

            )
            .subscribe()
            .unsubscribe();

    }


    // get all recipes that have not been persisted
    private getNewRecipes(storeRecipes: Recipe[]): {recipe: Recipe, index: number}[] {

        // initial array
        const recipesToPost: {recipe: Recipe, index: number}[] = [];

        // loop through all recipes inside the store
        storeRecipes.forEach((recipe: Recipe, index: number) => {

            // if the current recipe has an undefined Firebase id
            if (recipe.id === undefined) {

                // push a BRAND NEW recipe (deep copy) and the index (primitive value)
                recipesToPost.push({
                    recipe: new Recipe(
                        recipe.name,
                        recipe.description,
                        recipe.imagePath,
                        recipe.ingredients
                    ),
                    index
                })

            }

        });

        return recipesToPost;

    }

    // get recipe objects we require to update
    private getUpdatedRecipes(recipeIds: string[], storeRecipes: Recipe[]): {recipe: Recipe, id: string}[] {

        // initial array
        const recipesToUpdate: {recipe: Recipe, id: string}[] = [];

        // for each Firebase id
        recipeIds.forEach((id: string) => {

            // loop through all the recipes in the store
            storeRecipes.forEach((recipe: Recipe) => {

                // and search for a recipe that has a Firebase id and that matches the current one we
                // are looking for
                if (recipe.id !== undefined && recipe.id === id) {

                    // on match, push to the array a BRAND NEW recipe with its Firebase id 
                    recipesToUpdate.push({
                        recipe: new Recipe(
                            recipe.name,
                            recipe.description,
                            recipe.imagePath,
                            recipe.ingredients
                        ),
                        id
                    });

                }
                
            });

        });

        return recipesToUpdate;

    }

    // action dispatch: add recipe ingredients
    addToShoppingList(ingredients: Ingredient[]): void {
        this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
    }

}
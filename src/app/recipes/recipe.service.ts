import { Recipe } from './recipe.model';
import { OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromApp from '../store/app.reducer'
import { take, tap } from 'rxjs/operators';
import * as fromRecipes from './store/recipes.reducer';

// recipes service
export class RecipeService implements OnDestroy {

    // array of recipes
    recipesToAdd: {recipe: Recipe, index: number}[] = [];
      
    // tracker for all recipes that need to be updated on save
    recipesToUpdate: {recipe: Recipe, id: string}[] = [];

    // tracker for all recipes that need to be deleted on save
    recipesToDelete: string[] = [];

    readyToUpdate: boolean = false;
    
    // currently selected recipe index
    currentRecipeIndex: number;
    
    // selected recipe subject: emits index of selected recipe by user
    selectedRecipe = new Subject<number>();

    // recipes changed subject: emits to inform whenever the recipes array has changed
    recipesChanged = new Subject<void>();

    // selected recipe subscription
    selectedRecipeSubscription: Subscription;

    constructor(private store: Store<fromApp.AppState>) {

        // subscription to its own emitter
        this.selectedRecipeSubscription = this.selectedRecipe.subscribe((index: number) => {

            // if user selected the same recipe item, make the current recipe index equal to -1 as a flag to not add the .active bootstrap class
            // if user selcted a different recipe, then set the current recipe index property to the new index
            if (this.currentRecipeIndex === index) {
                this.currentRecipeIndex = -1;
            } else {
                this.currentRecipeIndex = index;
            }
            
        });

    }

    storeSnaphsot() {

        this
            .store
            .select('recipes')
            .pipe(

                take(1),

                tap(

                    (recipesState: fromRecipes.RecipesReducerState) => {

                        console.log(recipesState);

                        this.recipesToAdd = this.getNewRecipes(recipesState.recipes);
                        this.recipesToUpdate = this.getUpdatedRecipes(recipesState.recipesToUpdate, recipesState.recipes);
                        this.recipesToDelete = [...recipesState.recipesToDelete];

                    }

                )

            )
            .subscribe()
            .unsubscribe();

    }


    private getNewRecipes(storeRecipes: Recipe[]): {recipe: Recipe, index: number}[] {

        const recipesToPost: {recipe: Recipe, index: number}[] = [];

        storeRecipes.forEach((recipe: Recipe, index: number) => {

            if (recipe.id === undefined) {

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

    private getUpdatedRecipes(recipeIds: string[], storeRecipes: Recipe[]): {recipe: Recipe, id: string}[] {

        const recipesToUpdate: {recipe: Recipe, id: string}[] = [];

        recipeIds.forEach((id: string) => {

            storeRecipes.forEach((recipe: Recipe) => {

                if (recipe.id !== undefined && recipe.id === id) {

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

    addToShoppingList(ingredients: Ingredient[]): void {
        this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
    }

    ngOnDestroy() {
        // this.selectedRecipeSubscription.unsubscribe();
    }

}
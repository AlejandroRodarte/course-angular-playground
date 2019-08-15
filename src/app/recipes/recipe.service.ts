import { Recipe } from './recipe.model';
import { OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromApp from '../store/app.reducer'
import { take, tap } from 'rxjs/operators';
import * as fromRecipes from './store/recipes.reducer';
import { ActivatedRoute } from '@angular/router';

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

    currentRoute: ActivatedRoute;

    constructor(private store: Store<fromApp.AppState>) {

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

                        if (this.currentRecipeIndex === recipesState.selectedRecipeIndex) {
                            this.currentRecipeIndex = -1;
                        } else {
                            this.currentRecipeIndex = recipesState.selectedRecipeIndex;
                        }

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
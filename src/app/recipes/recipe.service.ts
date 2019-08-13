import { Recipe } from './recipe.model';
import { OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';

// recipes service
export class RecipeService implements OnDestroy {

    // array of recipes
    private recipes: Recipe[] = [];
      
    // tracker for all recipes that need to be updated on save
    private recipesToUpdate: string[] = [];

    // tracker for all recipes that need to be deleted on save
    private recipesToDelete: string[] = [];
    
    // currently selected recipe index
    currentRecipeIndex: number;
    
    // selected recipe subject: emits index of selected recipe by user
    selectedRecipe = new Subject<number>();

    // recipes changed subject: emits to inform whenever the recipes array has changed
    recipesChanged = new Subject<void>();

    // selected recipe subscription
    selectedRecipeSubscription: Subscription;

    constructor(private store: Store<fromShoppingList.AppState>) {

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

    // get recipe based on id
    getRecipe(index: number): Recipe {
        return this.recipes[index];
    }

    // get recipes
    getRecipes(): Recipe[] {
        return this.recipes.slice();
    }

    // set recipes and notify
    setRecipes(recipes: Recipe[]): void {
        this.recipes = recipes;
        this.recipesChanged.next();
    }

    // get all brand new recipes by checking if their Firebase id is undefined
    getNewRecipes(): Recipe[] {
        return this.recipes.filter((recipe: Recipe) => {
            if (recipe.id === undefined) {
                return recipe;
            }
        });
    }

    // get recipes based on an array of Firebase id's
    private getRecipesByIds(idArray: string[]): Recipe[] {

        // array of recipes
        const recipes: Recipe[] = [];

        // for each Firebase id, push into the recipes array the first element (recipe) that has such same
        // id as its property (assuming all Firebase id's are unique)
        idArray.forEach((id: string) => {
            recipes.push(this.recipes.find((recipe: Recipe) => {
                return recipe.id === id;
            }));
        });

        return recipes;

    }

    // get array of recipes to update
    getUpdatedRecipes(): Recipe[] {
        return this.getRecipesByIds(this.recipesToUpdate).slice();
    }

    // get array of Firebase id's of recipes to delete
    getDeletedRecipes(): string[] {
        return this.recipesToDelete.slice();
    }

    // clean queues of recipes to delete and update
    flushRegisteredRecipes(): void {
        this.recipesToUpdate = [];
        this.recipesToDelete = [];
    }

    // get the length of the recipes array
    get length(): number {
        return this.recipes.length;
    }

    // add or update a recipe
    addOrUpdateRecipe(recipe: Recipe, id: number): void {

        // id is not a number: new recipe -> push to array
        // id is a number -> update recipe -> replace it on array
        if (isNaN(id)) {
            this.recipes.push(recipe);
        } else {
            this.recipes[id] = recipe;
        }

        // notify all interested subscribers
        this.recipesChanged.next();

    }

    // add recipe ingredients to shopping list: use the AddIngredients action dispatcher
    addToShoppingList(ingredients: Ingredient[]): void {
        this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
    }

    // delete a recipe based on id and notify subscribers
    deleteRecipe(index: number): void {
        this.recipes.splice(index, 1);
        this.recipesChanged.next();
    }

    // register a new recipe into the array that tracks all id's of recipes to update
    registerUpdatedRecipe(recipeId: string): void {
        this.recipesToUpdate.push(recipeId);
    }

    // register a new recipe into the array that tracks all id's of recipes to delete
    registerDeletedRecipe(recipeId: string): void {

        // register
        this.recipesToDelete.push(recipeId);

        // check if such recipe id is on the update tracker array
        const recipeToUpdateIndex = this.recipesToUpdate.indexOf(recipeId);

        // if it is also on the to-update array, delete it since deletion comes first before update
        if (recipeToUpdateIndex !== -1) {
            this.recipesToUpdate.splice(recipeToUpdateIndex, 1);
        }

    }

    // unsubscriptions
    ngOnDestroy() {
        this.selectedRecipeSubscription.unsubscribe();
    }

}
import { Recipe } from './recipe.model';
import { Injectable, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject, Subscription } from 'rxjs';

// this service will receive as a dependency another service: shopping list service
// to make it injectable, use this decorator

// update: this service was destroyed when leaving the /recipes path and instantiated when going back
// to such path; this prevented the deletion of recipes
// to solve this, we make this service a global singleton
@Injectable({
    providedIn: 'root'
})
export class RecipeService implements OnDestroy {

    // an array of Recipe models
    private recipes: Recipe[] = [];
      
    // array tracker which registers all Firebase id's of the fetched recipes that require to be updated
    private recipesToUpdate: string[] = [];

    // array tracker which registers all Firebase id's of the fetched recipes that require to be deleted
    private recipesToDelete: string[] = [];
    
    // current recipe index
    currentRecipeIndex: number;
    
    // selected recipe subject: emitters will send the position index where a particular recipe
    // item is found
    selectedRecipe = new Subject<number>();

    // recipes changed subject: informs subscribers wheneber the array of recipes has suffered changes
    recipesChanged = new Subject<void>();

    // selected recipe subscription
    selectedRecipeSubscription: Subscription;
    
    // inject the shopping list global service
    constructor(private shoppingListService: ShoppingListService) {

        // make this service subscribe to its own emitter
        this.selectedRecipeSubscription = this.selectedRecipe.subscribe((index: number) => {

            // if the user selected the same recipe item
            // make the current recipe index equal to -1 as a flag to not add the .active bootstrap class

            // if the user however, selected a different recipe than the previous one, assing the new index
            // as the current recipe index
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
    // this.recipes simply would return a reference to this same array
    // so we apply an empty slice() method call to return a copy of this array
    getRecipes(): Recipe[] {
        return this.recipes.slice();
    }

    // set the recipes and notify components
    setRecipes(recipes: Recipe[]): void {
        this.recipes = recipes;
        this.recipesChanged.next();
    }

    // get all recipes that were added by the user and have not been persisted yet
    // from the recipes array, filter out only the ones where its id (Firebase id) is undefined
    getNewRecipes(): Recipe[] {
        return this.recipes.filter((recipe: Recipe) => {
            if (recipe.id === undefined) {
                return recipe;
            }
        });
    }

    // method that receives an array of Firebase id's and returns an array of recipes with such id's
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

    // get array of recipes to update (copy, but a copy of references)
    getUpdatedRecipes(): Recipe[] {
        return this.getRecipesByIds(this.recipesToUpdate).slice();
    }

    // get array of Firebase id's of recipes to delete
    getDeletedRecipes(): string[] {
        return this.recipesToDelete.slice();
    }

    // clean array trackers that register id's of recipes to update and delete
    flushRegisteredRecipes(): void {
        this.recipesToUpdate = [];
        this.recipesToDelete = [];
    }

    // get the length of the recipes array; this method is implement to route the user
    // to the new recipe he created once submitted
    get length(): number {
        return this.recipes.length;
    }

    // add or update a recipe
    addOrUpdateRecipe(recipe: Recipe, id: number): void {

        // if the id is not a number, it means that we are attempting to add a new recipe, so push it to
        // the recipes arrau
        // if there is an id, simply replace the recipe element with the incoming one
        if (isNaN(id)) {
            this.recipes.push(recipe);
        } else {
            this.recipes[id] = recipe;
        }

        // in both cases, the recipes array changed, so notify all interested subscribers
        this.recipesChanged.next();

    }

    // addToShoppingList() handler: delegate the task to the shopping list service
    addToShoppingList(ingredients: Ingredient[]): void {
        this.shoppingListService.addIngredients(ingredients);
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

    // unsubscribe upon service destruction
    ngOnDestroy() {
        this.selectedRecipeSubscription.unsubscribe();
    }

}
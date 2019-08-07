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
  	private recipes: Recipe[] = [

        new Recipe(

            'Test recipe name 1', 
            'Test recipe description 1', 
            'https://www.asouthernsoul.com/wp-content/uploads/2018/09/MPM131-768x768.jpg',

            [
                new Ingredient('Apples', 10),
                new Ingredient('Pears', 20),
                new Ingredient('Yoghurt', 10)
            ]

        ),

        new Recipe(
            
            'Test recipe name 2', 
            'Test recipe description 2', 
            'https://www.asouthernsoul.com/wp-content/uploads/2018/09/MPM131-768x768.jpg',

            [new Ingredient('Pineapple', 5),
            new Ingredient('Shit', 10),
            new Ingredient('Cheese', 2)]

        )
        
    ];
    
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
        console.log(ingredients);
    }

    // delete a recipe based on id and notify subscribers
    deleteRecipe(index: number): void {
        this.recipes.splice(index, 1);
        this.recipesChanged.next();
    }

    // unsubscribe upon service destruction
    ngOnDestroy() {
        this.selectedRecipeSubscription.unsubscribe();
    }

}
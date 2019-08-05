import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

// this service will receive as a dependency another service: shopping list service
// to make it injectable, use this decorator
@Injectable()
export class RecipeService {

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
    
    currentRecipeIndex: number;
    
    // selected recipe event emitter: emitters will send the position index where a particular recipe
    // item is found
    selectedRecipe = new EventEmitter<number>();
    
    // inject the shopping list global service
    constructor(private shoppingListService: ShoppingListService) {

        // make this service subscribe to its own emitter
        this.selectedRecipe.subscribe((index: number) => {

            // if the user selected the same recipe item
            // make the current recipe index equal to -1 as a flag to not add the .active bootstrap class

            // if the user however, selected a different recipe than the previous one, assing the new index
            // as the current recipe index
            if (this.currentRecipeIndex === index) {
                this.currentRecipeIndex = -1;
            } else {
                this.currentRecipeIndex = index;
            }
            
        })

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

    // addToShoppingList() handler: delegate the task to the shopping list service
    addToShoppingList(ingredients: Ingredient[]): void {
        this.shoppingListService.addIngredients(ingredients);
    }

}
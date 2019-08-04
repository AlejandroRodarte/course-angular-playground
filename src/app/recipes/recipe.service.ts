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

        [new Ingredient('Apples', 10),
        new Ingredient('Pears', 20),
        new Ingredient('Yoghurt', 10)]
        ),

        new Recipe(
            
        'Test recipe name 2', 
        'Test recipe description 2', 
        'https://www.asouthernsoul.com/wp-content/uploads/2018/09/MPM131-768x768.jpg',

        [new Ingredient('Pineapple', 5),
        new Ingredient('Shit', 10),
        new Ingredient('Cheese', 2)]
        ),
        
	];
    
    // selected recipe event emitter: will emit data when a recipe item is selected
    selectedRecipe = new EventEmitter<Recipe>();
    
    // inject the shopping list gloval service
    constructor(private shoppingListService: ShoppingListService) {

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
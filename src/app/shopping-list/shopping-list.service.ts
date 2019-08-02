import { Ingredient } from './../shared/ingredient.model';
import { EventEmitter } from '@angular/core';

// shopping list service
export class ShoppingListService {

    // ingredients array
	private ingredients: Ingredient[] = [
		new Ingredient('Apples', 5),
		new Ingredient('Tomatoes', 10)
    ];

    // ingredientWasAdded event emitter to notify components when a new ingredient was added
    ingredientWasAdded = new EventEmitter<Ingredient>();
    
    // add new ingredient handler: triggers when sendNewIngredient emitter from shopping edit component
    // emits a new ingredient from the form
    // also, use the emitter to send the new ingredient that was added
	addNewIngredient(ingredient: Ingredient): void {
        this.ingredients.push(ingredient);
        this.ingredientWasAdded.emit(ingredient);
    }
    
    // get a copy of the current ingredients array
    getIngredients(): Ingredient[] {
        return this.ingredients.slice();
    }

}
import { Ingredient } from './../shared/ingredient.model';
import { EventEmitter } from '@angular/core';

// shopping list service
export class ShoppingListService {

    // ingredients array
	private ingredients: Ingredient[] = [
		new Ingredient('Apples', 5),
		new Ingredient('Tomatoes', 10)
    ];

    // ingredientsChanged emitter: will notify other components that the ingredients service array changed
    // components may subscribe to this event to update their copy through the getter
    ingredientsChanged = new EventEmitter<void>();

    // add an array of ingredients (usually coming from a recipe)
    addIngredients(ingredients: Ingredient[]): void {

        // for each ingredient, call pushOrUpdate() method for the current ingredient
        // to either add it to the array (brand new) or update it (already existed)
        ingredients.forEach((ingredient: Ingredient) => {
            this.pushOrUpdate(ingredient);
        });

        // notify components the array changed
        this.ingredientsChanged.emit();

    }

    // add single ingredient handler
    // call pushOrUpdate on the ingredient and notify the change to other components through the emitter
	addIngredient(newIngredient: Ingredient): void {
        this.pushOrUpdate(newIngredient);
        this.ingredientsChanged.emit();
    }

    // pushOrUpdate() method
    pushOrUpdate(ingredient: Ingredient): void {

        // tracing boolean
        let existed: boolean = false;

        // loop through the current ingredients array
        for (let i = 0; i < this.ingredients.length; i++) {

            // if found (matching names): simply add the recipe amount to the item's amount on the shopping list
            // emit the updated ingredient, set the existed flag to true and send the index where this existing ingredient
            // was found
            if (this.ingredients[i].name === ingredient.name) {
                this.ingredients[i].amount += ingredient.amount;
                existed = true;
                break;
            }

        }

        // out of the loop: if item did not exist (brand new), simply push the ingredient to the array
        if (!existed) {
            this.ingredients.push(ingredient);
        }

    }
    
    // get a copy of the current ingredients array
    getIngredients(): Ingredient[] {
        return this.ingredients.slice();
    }

}
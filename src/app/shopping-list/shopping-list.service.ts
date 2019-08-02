import { Ingredient } from './../shared/ingredient.model';

// shopping list service
export class ShoppingListService {
    
    // ingredients array
	private ingredients: Ingredient[] = [
		new Ingredient('Apples', 5),
		new Ingredient('Tomatoes', 10)
    ];
    
    // add new ingredient handler: triggers when sendNewIngredient emitter from shopping edit component
	// emits a new ingredient from the form
	addNewIngredient(ingredient: Ingredient): void {
		this.ingredients.push(ingredient);
    }
    
    // get a copy of the current ingredients array
    getIngredients(): Ingredient[] {
        return this.ingredients.slice();
    }

}
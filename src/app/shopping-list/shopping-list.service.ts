import { Ingredient } from './../shared/ingredient.model';
import { Subject } from 'rxjs';

// shopping list service
export class ShoppingListService {

    // ingredients array
	private ingredients: Ingredient[] = [
		new Ingredient('Apples', 5),
		new Ingredient('Tomatoes', 10)
    ];

    // ingredientsChanged subject: will notify other components that the ingredients service array changed
    // components may subscribe to this event to update their copy through the getter
    ingredientsChanged = new Subject<void>();

    // subject that emits the index of a particular ingredient on the shopping list
    sendIngredientIndex = new Subject<number>();

    // get ingredient based on index
    getIngredient(index: number): Ingredient {
        return this.ingredients[index];
    }

    // get a copy of the current ingredients array
    getIngredients(): Ingredient[] {
        return this.ingredients.slice();
    }

    // add an array of ingredients (usually coming from a recipe)
    addIngredients(ingredients: Ingredient[]): void {

        // for each ingredient, call pushOrUpdate() method for the current ingredient
        // to either add it to the array (brand new) or update it (already existed)

        // since we are adding ingredients from a recipe, the edit mode flag is set to false
        ingredients.forEach((ingredient: Ingredient) => {
            this.pushOrUpdate(ingredient, false);
        });

        console.log(this.ingredients);

        // notify components the array changed
        this.ingredientsChanged.next();

    }

    // add single ingredient handler
    // call pushOrUpdate on the ingredient and notify the change to other components through the emitter
    // the editMode flag serves to inform the method whether we are adding an amount to an existing ingredient (false)
    // or overriding the amount overall (true)
	addIngredient(newIngredient: Ingredient, editMode: boolean): void {
        this.pushOrUpdate(newIngredient, editMode);
        this.ingredientsChanged.next();
    }

    // delete ingredient based on id
    // after deletion, notify the changes through the Subject
    deleteIngredient(index: number): void {
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next();
    }

    // pushOrUpdate() method
    pushOrUpdate(ingredient: Ingredient, editMode: boolean): void {

        // tracing boolean
        let existed: boolean = false;

        // loop through the current ingredients array
        for (let i = 0; i < this.ingredients.length; i++) {

            // if found (matching names)
            if (this.ingredients[i].name === ingredient.name) {

                // check if the existing ingredient should have overriden its previous amount completely through the editMode boolean
                // if not, simply add the given amount to the current one
                // otherwise, override the value completely by reassigning it
                if (!editMode) {
                    this.ingredients[i].amount += ingredient.amount;
                } else {
                    this.ingredients[i].amount = ingredient.amount;
                }

                // set the existed ingredient flag to true and jump out of the loop
                existed = true;
                break;

            }

        }

        // out of the loop: if item did not exist (brand new), simply push the ingredient to the array
        if (!existed) {
            this.ingredients.push(ingredient);
        }

    }

}
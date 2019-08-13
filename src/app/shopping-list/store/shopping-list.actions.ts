import { Action } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';

// constants for actions and evade typos
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';

// union type that defines all actions managed by the shopping list reducer
export type ShoppingListActions = AddIngredient | AddIngredients;

// class that describes what the AddIngredient Action should contain
export class AddIngredient implements Action {

    // readonly: must not be changed from outsite
    // the Action interface forces us to implement a type property, which will be the constant
    // we defined above
    readonly type = ADD_INGREDIENT;

    // payload: optional property by the Action interface
    // since we are adding an ingredient, the payload should be of type Ingredient
    constructor(public payload: Ingredient) {

    }

}

// add ingredients action: receive the array of ingredients as a payload
export class AddIngredients implements Action {

    readonly type = ADD_INGREDIENTS;

    constructor(public payload: Ingredient[]) {

    }

}
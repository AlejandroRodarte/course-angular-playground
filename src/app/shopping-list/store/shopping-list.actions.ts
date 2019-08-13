import { Action } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';

// constants for actions and evade typos
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const START_EDIT = 'START_EDIT';
export const STOP_EDIT = 'STOP_EDIT';

// union type that defines all actions managed by the shopping list reducer
export type ShoppingListActions = 
AddIngredient | 
AddIngredients | 
UpdateIngredient | 
DeleteIngredient | 
StartEdit | 
StopEdit;

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

// update ingredients action: we require the index of the ingredient and the new ingredient
export class UpdateIngredient implements Action {

    readonly type = UPDATE_INGREDIENT;

    constructor(public payload: { index: number, ingredient: Ingredient }) {

    }

}

// delete ingredients action: we just require the ingredient index
export class DeleteIngredient implements Action {

    readonly type = DELETE_INGREDIENT;

    constructor(public payload: number) {

    }

}

// start editing action
export class StartEdit implements Action {

    readonly type = START_EDIT;

    constructor(public payload: number) {

    }

}

// stop editing action
export class StopEdit implements Action {
    readonly type = STOP_EDIT;
}
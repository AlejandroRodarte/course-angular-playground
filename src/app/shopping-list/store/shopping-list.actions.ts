import { Action } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';

// constants for actions and evade typos
// following prefixing conventions to ensure type actions are unique across all reducers
export const ADD_INGREDIENT = '[Shopping List] Add Ingredient';
export const ADD_INGREDIENTS = '[Shopping List] Add Ingredients';
export const UPDATE_INGREDIENT = '[Shopping List] Update Ingredient';
export const DELETE_INGREDIENT = '[Shopping List] Delete Ingredient';
export const START_EDIT = '[Shopping List] Start Edit';
export const STOP_EDIT = '[Shopping List] Stop Edit';

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

// update ingredients action: we have already the index of the recipe to update
// so we just need the new ingredient information
export class UpdateIngredient implements Action {

    readonly type = UPDATE_INGREDIENT;

    constructor(public payload: Ingredient) {

    }

}

// delete ingredients action: we have the index already stored in the state, so nothing
// is required to perform this action
export class DeleteIngredient implements Action {
    readonly type = DELETE_INGREDIENT;
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
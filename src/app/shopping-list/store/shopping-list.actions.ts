import { Action } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';

// constants for actions and evade typos
export const ADD_INGREDIENT = 'ADD_INGREDIENT';

// class that describes what the AddIngredient Action should contain
export class AddIngredient implements Action {

    // readonly: must not be changed from outsite
    // the Action interface forces us to implement a type property, which will be the constant
    // we defined above
    readonly type: string = ADD_INGREDIENT;

    // payload: optional property by the Action interface
    // since we are adding an ingredient, the payload should be of type Ingredient
    payload: Ingredient;

}
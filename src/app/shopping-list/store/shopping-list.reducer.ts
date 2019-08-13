import { Ingredient } from '../../shared/ingredient.model';

// import everything (*) from the shopping-list.actions
// and give it the 'ShoppingListActions' alias to access all the imports through it
import * as ShoppingListActions from './shopping-list.actions';

// description of the app state that is altered by this reducer
export interface AppState {
    shoppingList: ShoppingListReducerState
}

// description of the state of this reducer
export interface ShoppingListReducerState {
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
}

// the initial state is, in most times, a javascript object
// the shopping list service manages in essence just the array of ingredients
// so we set here the initial ingredients that our app state will start with
const initialState: ShoppingListReducerState = {

    // list of ingredients
    ingredients: [
		new Ingredient('Apples', 5),
		new Ingredient('Tomatoes', 10)
    ],

    // ingredient we are editing
    editedIngredient: null,

    // index of the ingredient to edit
    editedIngredientIndex: -1

}

// reducers are just functions
// every reducer receives automatically 2 arguments by NgRx
// state: current state (before changed by this reducer)
// action: action from the service/component that will update the state
// we set the state argument a default value which will be the initial state
// the first time this reducer runs, it will load the initial state (kickstarter)
// on subsequent calls, NgRx will load the previous state

// update: make the action argument be of type AddIngredient to know we are expecting a payload
export function shoppingListReducer(
    state: ShoppingListReducerState = initialState, 
    action: ShoppingListActions.ShoppingListActions) {

    // inside of the reducer: determine the kind of action we receive to know
    // how to update the state -> we usually use a switch case statement
    switch (action.type) {

        // action type: add an ingredient; update the state accordingly
        // never touch the existing state: create a copy of it with the spread operator
        // attempt to add the new ingredient with the action payload
        // now we use a constant from the shopping-list.actions.ts to avoid typos and future problems
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
        
        
        // action type, add a set of ingredients
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            }
        
        // update an ingredient: update an existing ingredient
        case ShoppingListActions.UPDATE_INGREDIENT:

            // get a reference to the ingredient object to update
            const ingredient = state.ingredients[action.payload.index];

            // create a new copy of this ingredient
            // first place the old ingredient data
            // and then overwrite it with the new payload ingredient data
            const updatedIngredient = {
                ...ingredient,
                ...action.payload.ingredient
            };

            // get a copy of the array of ingredients of the old state
            const updatedIngredients = [...state.ingredients];

            // place the new ingredient on the right index of the copied array of ingredients
            updatedIngredients[action.payload.index] = updatedIngredient;

            // return the old state and the updated ingredients copy with the new ingredient
            return {
                ...state,
                ingredients: updatedIngredients
            }
        
        // delete an ingredient: simply apply splice and delete the ingredient at that index
        case ShoppingListActions.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter((ingredient: Ingredient, index: number) => {
                    return action.payload !== index;
                })
            }
        
        // start editing action
        // editedIngredient state will receive a brand new copy of the state ingredient selected
        // also attach such index
        case ShoppingListActions.START_EDIT:
            return {
                ...state,
                editedIngredient: {...state.ingredients[action.payload]},
                editedIngredientIndex: action.payload
            }
        
        // stop editing action
        // set the edited ingredient and its index to their default values
        case ShoppingListActions.STOP_EDIT:
            return {
                ...state,
                editedIngredient: null,
                editedIngredientIndex: -1
            }
        
        // default state: manages our kickstart action (assign state to be the initial state on start)
        default:
            return state;

    }

}
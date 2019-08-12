import { Ingredient } from '../../shared/ingredient.model';

// import everything (*) from the shopping-list.actions
// and give it the 'ShoppingListActions' alias to access all the imports through it
import * as ShoppingListActions from './shopping-list.actions';

// the initial state is, in most times, a javascript object
// the shopping list service manages in essence just the array of ingredients
// so we set here the initial ingredients that our app state will start with
const initialState = {

    ingredients: [
		new Ingredient('Apples', 5),
		new Ingredient('Tomatoes', 10)
    ]

}

// reducers are just functions
// every reducer receives automatically 2 arguments by NgRx
// state: current state (before changed by this reducer)
// action: action from the service/component that will update the state
// we set the state argument a default value which will be the initial state
// the first time this reducer runs, it will load the initial state (kickstarter)
// on subsequent calls, NgRx will load the previous state

// update: make the action argument be of type AddIngredient to know we are expecting a payload
export function shoppingListReducer(state = initialState, action: ShoppingListActions.AddIngredient) {

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
        
        // default state: manages our kickstart action (assign state to be the initial state on start)
        default:
            return state;

    }

}
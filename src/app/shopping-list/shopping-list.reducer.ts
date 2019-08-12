import { Ingredient } from '../shared/ingredient.model';

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
export function shoppingListReducer(state = initialState, action) {



}
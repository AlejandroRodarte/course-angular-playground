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
            
            // create copy of the state ingredients
            const addIngredientUpdatedIngredients = [...state.ingredients];

            // call method to either push the new ingreident to the array or add the amount to an existing one
            pushOrAddMore(action.payload, addIngredientUpdatedIngredients)

            // return the previous state and overwrite the ingredients property with the new ingredients array (copy)
            return {
                ...state,
                ingredients: addIngredientUpdatedIngredients
            };
        
        // action type, add a set of ingredients
        case ShoppingListActions.ADD_INGREDIENTS:

            // create copy of the state ingredients
            const addIngredientsUpdatedIngredients = [...state.ingredients];

            // for each ingredient in the payload, call the method to either add the brand new ingredient
            // or add its amount to an existing one
            // the method that calls this action provides as an argument a reference to the ingredients of a particular recipe,
            // so we create a new Ingredient instance and pass it as an argument to avoid strange behavior in our app
            action.payload.forEach((ingredient: Ingredient) => {
                pushOrAddMore(new Ingredient(ingredient.name, ingredient.amount), addIngredientsUpdatedIngredients);
            });

            // return the old state with the new ingredients property overwritten
            return {
                ...state,
                ingredients: addIngredientsUpdatedIngredients
            }
        
        // update an ingredient: update an existing ingredient
        case ShoppingListActions.UPDATE_INGREDIENT:

            // get a reference to the ingredient object to update
            const ingredient = state.ingredients[state.editedIngredientIndex];

            // create a new copy of this ingredient
            // first place the old ingredient data
            // and then overwrite it with the new payload ingredient data
            const updatedIngredient = {
                ...ingredient,
                ...action.payload
            };

            // get a copy of the array of ingredients of the old state
            const updatedIngredients = [...state.ingredients];

            // place the new ingredient on the right index of the copied array of ingredients
            updatedIngredients[state.editedIngredientIndex] = updatedIngredient;

            // return the old state and the updated ingredients copy with the new ingredient
            // also, reset the edited ingredient properties
            return {
                ...state,
                ingredients: updatedIngredients,
                editedIngredient: null,
                editedIngredientIndex: -1
            }
        
        // delete an ingredient: simply apply splice and delete the ingredient at that index
        // also, reset the edited ingredient properties
        case ShoppingListActions.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter((ingredient: Ingredient, index: number) => {
                    return state.editedIngredientIndex !== index;
                }),
                editedIngredient: null,
                editedIngredientIndex: -1
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

// helper method: push new ingredient to array or add amount to existing one
function pushOrAddMore(ingredient: Ingredient, stateIngredients: Ingredient[]): void {

    // tracker flag
    let existed: boolean = false;
    
    // loop through all ingredients on the latest state
    for (let i = 0; i < stateIngredients.length; i++) {

        // if the ingredient to add already exists on the list, just add the new amount
        // to the existing one; end the loop and mark as existing
        if (stateIngredients[i].name === ingredient.name) {
            
            stateIngredients[i].amount += ingredient.amount;

            existed = true;
            break;

        }

    }

    // if the ingredient did not exist, push the ingredient to the array
    if (!existed) {
        stateIngredients.push(ingredient);
    }

}
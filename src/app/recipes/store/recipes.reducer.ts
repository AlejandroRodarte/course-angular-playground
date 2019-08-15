import { Recipe } from '../recipe.model';
import * as RecipeActions from './recipes.actions';

// structure of the recipes reducer state
// 1. the list of all the recipes
// 2. a list of recipes we need to update when persisting
// 3. a list of recipes we need to delete when persisting
// 4. the currently selected recipe by the user
// 5. the index of such selected recipe
export interface RecipesReducerState {
    recipes: Recipe[];
    recipesToUpdate: string[];
    recipesToDelete: string[];
    selectedRecipe: Recipe;
    selectedRecipeIndex: number;
}

// initial form of the state
const initialState: RecipesReducerState = {
    recipes: [],
    recipesToUpdate: [],
    recipesToDelete: [],
    selectedRecipe: null,
    selectedRecipeIndex: -1
}

// helper methods

// update a recipe from the UI
const updateRecipe = function(state: RecipesReducerState, payload: Recipe) {

    // get copy of the final state
    const finalState = {
        ...state
    };

    // get a copy of the recipes array from the original state
    const recipesCopy = [...state.recipes];

    // replace the new recipe information inside the copied array
    recipesCopy[state.selectedRecipeIndex] = payload;

    // use the copied (updated) recipes and save into final state
    finalState.recipes = recipesCopy;

    // if the recipe has not an undefined Firebase id (persisted)
    if (payload.id !== undefined) {

        // get a copy of the recipes to update tracker list
        const recipesToUpdateCopy = [...state.recipesToUpdate];

        // push into the copy the recipe id to mark as a to-do task (to-update)
        recipesToUpdateCopy.push(payload.id);

        // use the copied list to set the final state
        finalState.recipesToUpdate = recipesToUpdateCopy;
        
    }
    
    // set the final state selected recipe to the updated recipe
    finalState.selectedRecipe = payload;

    // return the final state
    return finalState;

}

// remove a recipe from the UI
const removeRecipe = function(state: RecipesReducerState) {

    // final state initial configuration (copy)
    // remove recipe from list on index (filter returns a brand new array)
    // set the selected recipe properties to their default values
    const finalState = {
        ...state,
        recipes: state.recipes.filter((recipe: Recipe, index: number) => {
            return state.selectedRecipeIndex !== index;
        }),
        selectedRecipe: null,
        selectedRecipeIndex: -1
    }

    // check if the original state's (NOT THE COPY) selected recipe has a Firebase id (persisted)
    if (state.selectedRecipe.id !== undefined) {

        // get a copy of the recipes to delete tracker list
        const recipesToDeleteCopy = [...state.recipesToDelete];

        // push the recipe's Firebase id as a mark for a to-do task (to-delete)
        recipesToDeleteCopy.push(state.selectedRecipe.id);

        // set to the final state the new to-delete list
        finalState.recipesToDelete = recipesToDeleteCopy;

        // check if the selected recipe was already placed on the to-update list
        const recipeToUpdateIndex 
            = state
                .recipesToUpdate
                .indexOf(
                    state.selectedRecipe.id
                );

        // if it was...
        if (recipeToUpdateIndex !== -1) {

            // get a copy of the to-update track list
            const recipesToUpdateCopy = [...state.recipesToUpdate];

            // and remove it from the queue since deletion comes first
            recipesToUpdateCopy.splice(recipeToUpdateIndex, 1);

            // set the final state copy with the new to-update list
            finalState.recipesToUpdate = recipesToUpdateCopy;

        }

    }

    // return the final state
    return finalState;

}

// attach Firebase id to persisted recipe
const attachId = function(state: RecipesReducerState, payload: {recipeIndex: number, recipeId: string}) {

    // get a copy of the recipes from the original state
    const recipesCopy = [...state.recipes];

    // search for the recipe on the copy based on the index and set its id with the payload
    recipesCopy[payload.recipeIndex].id = payload.recipeId;

    // return the final state with the modified recipes array
    return {
        ...state,
        recipes: recipesCopy
    }

}

// clear an update from the to-update queue
const clearUpdate = function(state: RecipesReducerState, payload: string) {

    // get copy of final state
    const finalState = {
        ...state
    }

    // get copy of of the to-update list
    const recipesToUpdateCopy = [...state.recipesToUpdate];

    // find the Firebase id on the copy
    const updateIdFoundIndex = recipesToUpdateCopy.indexOf(payload);

    // if found, delete it from the to-do list and set the new list on the final state
    if (updateIdFoundIndex !== -1) {
        recipesToUpdateCopy.splice(updateIdFoundIndex, 1);
        finalState.recipesToUpdate = recipesToUpdateCopy;
    }

    // return the final state
    return finalState;

}

const clearDelete = function(state: RecipesReducerState, payload: string) {

    // get copy of final state
    const finalState = {
        ...state
    }

    // get copy of of the to-delete list
    const recipesToDeleteCopy = [...state.recipesToDelete];

    // if found, delete it from the to-do list and set the new list on the final state
    const deleteIdFoundIndex = recipesToDeleteCopy.indexOf(payload);

    if (deleteIdFoundIndex !== -1) {
        recipesToDeleteCopy.splice(deleteIdFoundIndex, 1);
        finalState.recipesToDelete = recipesToDeleteCopy;
    }

    // return the final state
    return finalState;

}

// the big reducer boy
export function recipesReducer(state = initialState, action: RecipeActions.RecipeActions) {

    // check for action type
    switch (action.type) {
        
        // add a recipe
        // just append it at the end of the array
        case RecipeActions.ADD_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            };
        
        // add recipes
        // just spread the payload array at the end of the state array
        case RecipeActions.ADD_RECIPES:
            return {
                ...state,
                recipes: [...state.recipes, ...action.payload]
            }
        
        // select a recipe
        // set the selected recipe to the one found at the imposed index
        // and also set the index
        // remember to always pass in new objects/arrays when returning the state
        case RecipeActions.SELECT_RECIPE:
            return {
                ...state,
                selectedRecipe: {...state.recipes[action.payload]},
                selectedRecipeIndex: action.payload
            };
        
        // update a recipe: run appropiate method
        case RecipeActions.UPDATE_RECIPE:
            return updateRecipe(state, action.payload);
        
        // remove a recipe
        case RecipeActions.REMOVE_RECIPE:
            return removeRecipe(state);
        
        // clear selected recipe information from store: set their values to their initial state
        case RecipeActions.CLEAR_RECIPE:
            return {
                ...state,
                selectedRecipe: null,
                selectedRecipeIndex: -1
            };
        
        // attach Firebase id to persisted recipe
        case RecipeActions.ATTACH_ID:
            return attachId(state, action.payload);
        
        // clear update task
        case RecipeActions.CLEAR_UPDATE:
            return clearUpdate(state, action.payload);

        // clear deletion task
        case RecipeActions.CLEAR_DELETE:
            return clearDelete(state, action.payload);

        // initialize state (and catch unknown actions)
        default:
            return state;

    }

}
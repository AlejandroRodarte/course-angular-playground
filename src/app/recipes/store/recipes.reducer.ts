import { Recipe } from '../recipe.model';

import * as RecipeActions from './recipes.actions';

export interface RecipesReducerState {
    recipes: Recipe[];
    recipesToUpdate: string[];
    recipesToDelete: string[];
    selectedRecipe: Recipe;
    selectedRecipeIndex: number;
    readyToUpdate: boolean;
    readyToDelete: boolean;
}

const initialState: RecipesReducerState = {
    recipes: [],
    recipesToUpdate: [],
    recipesToDelete: [],
    selectedRecipe: null,
    selectedRecipeIndex: -1,
    readyToUpdate: false,
    readyToDelete: false
}

export function recipesReducer(state = initialState, action: RecipeActions.RecipeActions) {

    switch (action.type) {
        
        case RecipeActions.ADD_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            };
        
        case RecipeActions.ADD_RECIPES:
            return {
                ...state,
                recipes: [...state.recipes, ...action.payload]
            }
        
        case RecipeActions.SELECT_RECIPE:
            return {
                ...state,
                selectedRecipe: {...state.recipes[action.payload]},
                selectedRecipeIndex: action.payload
            };
        
        case RecipeActions.UPDATE_RECIPE:

            const updateRecipeFinalState = {
                ...state
            };

            const updateRecipeRecipesCopy = [...state.recipes];
            updateRecipeRecipesCopy[state.selectedRecipeIndex] = action.payload;

            updateRecipeFinalState.recipes = updateRecipeRecipesCopy;

            if (action.payload.id !== undefined) {

                const updateRecipeRecipesToUpdateCopy = [...state.recipesToUpdate];
                updateRecipeRecipesToUpdateCopy.push(action.payload.id);

                updateRecipeFinalState.recipesToUpdate = updateRecipeRecipesToUpdateCopy;
                
            }
            
            updateRecipeFinalState.selectedRecipe = null;
            updateRecipeFinalState.selectedRecipeIndex = -1;

            console.log(updateRecipeFinalState);

            return updateRecipeFinalState;
        
        case RecipeActions.REMOVE_RECIPE:

            const removeRecipeFinalState = {
                ...state,
                recipes: state.recipes.filter((recipe: Recipe, index: number) => {
                    return state.selectedRecipeIndex !== index;
                }),
                selectedRecipe: null,
                selectedRecipeIndex: -1
            }

            if (state.selectedRecipe.id !== undefined) {

                const removeRecipeRecipestoDeleteCopy = [...state.recipesToDelete];
                removeRecipeRecipestoDeleteCopy.push(state.selectedRecipe.id);

                removeRecipeFinalState.recipesToDelete = removeRecipeRecipestoDeleteCopy;

                const recipeToUpdateIndex = state.recipesToUpdate.indexOf(state.recipes[state.selectedRecipeIndex].id);

                if (recipeToUpdateIndex !== -1) {

                    const removeRecipeRecipestoUpdateCopy = [...state.recipesToUpdate];
                    removeRecipeRecipestoUpdateCopy.splice(recipeToUpdateIndex, 1);

                    removeRecipeFinalState.recipesToUpdate = removeRecipeRecipestoUpdateCopy;

                }

            }

            return removeRecipeFinalState;
        
        case RecipeActions.ATTACH_ID:

            const attachIdRecipesCopy = [...state.recipes];

            attachIdRecipesCopy[action.payload.recipeIndex].id = action.payload.recipeId;

            return {
                ...state,
                recipes: attachIdRecipesCopy
            }
        
        case RecipeActions.CLEAR_UPDATE:

            const clearUpdateFinalState = {
                ...state
            }

            const clearUpdateRecipesToUpdateCopy = [...state.recipesToUpdate];

            const updateIdFoundIndex = clearUpdateRecipesToUpdateCopy.indexOf(action.payload);

            console.log(clearUpdateRecipesToUpdateCopy);
            console.log(action.payload);

            if (updateIdFoundIndex !== -1) {
                clearUpdateRecipesToUpdateCopy.splice(updateIdFoundIndex, 1);
                clearUpdateFinalState.recipesToUpdate = clearUpdateRecipesToUpdateCopy;
            }

            clearUpdateFinalState.readyToUpdate = true;

            return clearUpdateFinalState;

        case RecipeActions.CLEAR_DELETE:

            const clearDeleteFinalState = {
                ...state
            }

            const clearDeleteRecipesToDeleteCopy = [...state.recipesToDelete];

            const deleteIdFoundIndex = clearDeleteRecipesToDeleteCopy.indexOf(action.payload);

            if (deleteIdFoundIndex !== -1) {
                clearDeleteRecipesToDeleteCopy.splice(deleteIdFoundIndex, 1);
                clearDeleteFinalState.recipesToDelete = clearDeleteRecipesToDeleteCopy;
            }

            return clearDeleteFinalState;

        case RecipeActions.DENY_UPDATE:
            return {
                ...state,
                readyToUpdate: false
            };

        case RecipeActions.ALLOW_UPDATE:
            return {
                ...state,
                readyToUpdate: true
            };

        default:
            return state;

    }

}
import { Recipe } from '../recipe.model';

import * as RecipeActions from './recipes.actions';

export interface RecipesReducerState {
    recipes: Recipe[];
    recipesToUpdate: string[];
    recipesToDelete: string[];
    selectedRecipe: Recipe;
    selectedRecipeIndex: number;
}

const initialState: RecipesReducerState = {
    recipes: [],
    recipesToUpdate: [],
    recipesToDelete: [],
    selectedRecipe: null,
    selectedRecipeIndex: -1
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

                if (recipeToUpdateIndex !== null) {

                    const removeRecipeRecipestoUpdateCopy = [...state.recipesToUpdate];
                    removeRecipeRecipestoUpdateCopy.splice(recipeToUpdateIndex, 1);

                    removeRecipeFinalState.recipesToUpdate = removeRecipeRecipestoUpdateCopy;

                }

            }

            return removeRecipeFinalState;


        default:
            return state;

    }

}
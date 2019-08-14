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
        
        case RecipeActions.SELECT_RECIPE:
            return {
                ...state,
                selectedRecipe: {...state.recipes[action.payload]},
                selectedRecipeIndex: action.payload
            };
        
        case RecipeActions.UPDATE_RECIPE:

            const finalState = {
                ...state
            };

            const updateRecipeRecipesCopy = [...state.recipes];
            updateRecipeRecipesCopy[state.selectedRecipeIndex] = action.payload;

            finalState.recipes = updateRecipeRecipesCopy;

            if (action.payload.id !== undefined) {

                const updateRecipeRecipesToUpdateCopy = [...state.recipesToUpdate];
                updateRecipeRecipesToUpdateCopy.push(action.payload.id);

                finalState.recipesToUpdate = updateRecipeRecipesToUpdateCopy;
                
            }
            
            finalState.selectedRecipe = null;
            finalState.selectedRecipeIndex = -1;

            return finalState;
            
        default:
            return state;

    }

}
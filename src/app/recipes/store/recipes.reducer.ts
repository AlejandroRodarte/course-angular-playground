import { Recipe } from '../recipe.model';

import * as RecipeActions from './recipes.actions';

export interface RecipesReducerState {
    recipes: Recipe[];
    recipesToUpdate: Recipe[];
    recipesToDelete: Recipe[];
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

        default:
            return state;

    }

}
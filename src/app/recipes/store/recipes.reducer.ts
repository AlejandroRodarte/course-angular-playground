import { Recipe } from '../recipe.model';

import * as RecipeActions from './recipes.actions';

export interface RecipesReducerState {
    recipes: Recipe[];
    recipesToUpdate: Recipe[];
    recipesToDelete: Recipe[];
    editedRecipe: Recipe[];
    editedRecipeIndex: number;
}

const initialState: RecipesReducerState = {
    recipes: [],
    recipesToUpdate: [],
    recipesToDelete: [],
    editedRecipe: null,
    editedRecipeIndex: -1
}

export function recipesReducer(state = initialState, action: RecipeActions.RecipeActions) {

    switch (action.type) {
        
        case RecipeActions.ADD_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            };

        default:
            return state;

    }

}
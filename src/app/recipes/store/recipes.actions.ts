import { Action } from '@ngrx/store';
import { Recipe } from '../recipe.model';

export const ADD_RECIPE = '[Recipes] Add Recipe';
export const ADD_RECIPES = '[Recipes] Add Recipes'
export const SELECT_RECIPE = '[Recipes] Select Recipe';
export const UPDATE_RECIPE = '[Recipes] Update Recipe';
export const REMOVE_RECIPE = '[Recipes] Remove Recipe';

export const GET_RECIPES = '[Recipes] Get Recipes';

export type RecipeActions = 
                            AddRecipe | 
                            AddRecipes | 
                            SelectRecipe | 
                            UpdateRecipe | 
                            RemoveRecipe | 
                            GetRecipes;

export class AddRecipe implements Action {

    readonly type = ADD_RECIPE;

    constructor(public payload: Recipe) {

    }

}

export class AddRecipes implements Action {

    readonly type = ADD_RECIPES;

    constructor(public payload: Recipe[]) {

    }

}

export class SelectRecipe implements Action {

    readonly type = SELECT_RECIPE;

    constructor(public payload: number) {

    }

}

export class UpdateRecipe implements Action {
    
    readonly type = UPDATE_RECIPE;

    constructor(public payload: Recipe) {

    }

}

export class RemoveRecipe implements Action {
    readonly type = REMOVE_RECIPE;
}

export class GetRecipes implements Action {
    readonly type = GET_RECIPES;
}
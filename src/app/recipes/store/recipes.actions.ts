import { Action } from '@ngrx/store';
import { Recipe } from '../recipe.model';

export const ADD_RECIPE = '[Recipes] Add Recipe';
export const ADD_RECIPES = '[Recipes] Add Recipes'
export const SELECT_RECIPE = '[Recipes] Select Recipe';
export const UPDATE_RECIPE = '[Recipes] Update Recipe';
export const REMOVE_RECIPE = '[Recipes] Remove Recipe';

export const GET_RECIPES = '[Recipes] Get Recipes';
export const POST_RECIPE = '[Recipes] Post Recipe';
export const PUT_RECIPE = '[Recipes] Put Recipe';
export const DELETE_RECIPE = '[Recipes] Delete Recipe';

export const ATTACH_ID = '[Recipes] Attach Id';

export const CLEAR_UPDATE = '[Recipes] Clear Update';
export const CLEAR_DELETE = '[Recipes] Clear Delete';

export const DENY_UPDATE = '[Recipes] Deny Update';
export const ALLOW_UPDATE = '[Recipes] Allow Update';

export const PUT_RECIPES = '[Recipes] Put Recipes';
export const POST_RECIPES = '[Recipes] Post Recipes';
export const DELETE_RECIPES = '[Recipes] Delete Recipes'

export type RecipeActions = 
                            AddRecipe | 
                            AddRecipes | 
                            SelectRecipe | 
                            UpdateRecipe | 
                            RemoveRecipe | 
                            GetRecipes | 
                            PostRecipe | 
                            PutRecipe | 
                            DeleteRecipe |
                            AttachId | 
                            ClearUpdate |
                            ClearDelete |
                            DenyUpdate |
                            AllowUpdate |
                            PutRecipes |
                            PostRecipes |
                            DeleteRecipes;

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

export class PostRecipe implements Action {

    readonly type = POST_RECIPE;

    constructor(public payload: {recipe: Recipe, index: number}) {

    }

}

export class PutRecipe implements Action {

    readonly type = PUT_RECIPE;

    constructor(public payload: {recipe: Recipe, id: string}) {

    }

}

export class DeleteRecipe implements Action {

    readonly type = DELETE_RECIPE;

    constructor(public payload: string) {

    }

}

export class AttachId implements Action {

    readonly type = ATTACH_ID;

    constructor(public payload: { recipeIndex: number, recipeId: string }) {

    }

}

export class ClearUpdate implements Action {

    readonly type = CLEAR_UPDATE;

    constructor(public payload: string) {
        
    }

}

export class ClearDelete implements Action {

    readonly type = CLEAR_DELETE;

    constructor(public payload: string) {

    }

}

export class AllowUpdate implements Action {
    readonly type = ALLOW_UPDATE;
}

export class DenyUpdate implements Action {
    readonly type = DENY_UPDATE;
}

export class PutRecipes implements Action {
    readonly type = PUT_RECIPES;
    constructor(public payload: {recipe: Recipe, id: string}[]) {

    }
}

export class PostRecipes implements Action {
    readonly type = POST_RECIPES;
    constructor(public payload: {recipe: Recipe, index: number}[]) {

    }
}

export class DeleteRecipes implements Action {
    readonly type = DELETE_RECIPES;
    constructor(public payload: string[]) {

    }
}
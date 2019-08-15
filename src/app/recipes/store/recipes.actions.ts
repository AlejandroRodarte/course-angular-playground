import { Action } from '@ngrx/store';
import { Recipe } from '../recipe.model';

// UI-related actions
// add recipe, add recipes, select a recipe, update a recipe and remove a recipe
export const ADD_RECIPE = '[Recipes] Add Recipe';
export const ADD_RECIPES = '[Recipes] Add Recipes'
export const SELECT_RECIPE = '[Recipes] Select Recipe';
export const UPDATE_RECIPE = '[Recipes] Update Recipe';
export const REMOVE_RECIPE = '[Recipes] Remove Recipe';

// Store-related action: clear currently selected recipe
export const CLEAR_RECIPE = '[Recipes] Clear Recipe';

// Route-related action: cancel recipe and route back user
export const CANCEL_RECIPE = '[Recipes] Cancel Recipe';

// HTTP-related actions
// post a recipe, put a recipe and delete a recipe
export const POST_RECIPE = '[Recipes] Post Recipe';
export const PUT_RECIPE = '[Recipes] Put Recipe';
export const DELETE_RECIPE = '[Recipes] Delete Recipe';

// HTTP-related actions
// fetch all recipes, post all recipes, update all recipes, delete all recipes
export const GET_RECIPES = '[Recipes] Get Recipes';
export const POST_RECIPES = '[Recipes] Post Recipes';
export const PUT_RECIPES = '[Recipes] Put Recipes';
export const DELETE_RECIPES = '[Recipes] Delete Recipes'

// HTTP-aftermath-related actions
// attach Firebase id to recipe, mark update task as finished and mark deletion task as finished
export const ATTACH_ID = '[Recipes] Attach Id';
export const CLEAR_UPDATE = '[Recipes] Clear Update';
export const CLEAR_DELETE = '[Recipes] Clear Delete';

// union type for all actions
export type RecipeActions 
    =   AddRecipe | 
        AddRecipes | 
        SelectRecipe | 
        UpdateRecipe | 
        RemoveRecipe | 
        ClearRecipe | 
        CancelRecipe |
        PostRecipe | 
        PutRecipe | 
        DeleteRecipe |
        GetRecipes | 
        PutRecipes |
        PostRecipes |
        DeleteRecipes |
        AttachId | 
        ClearUpdate |
        ClearDelete;

// add recipe
// payload: a recipe to add
export class AddRecipe implements Action {

    readonly type = ADD_RECIPE;

    constructor(public payload: Recipe) {

    }

}

// add recipes
// payload: a list of recipes to add
export class AddRecipes implements Action {

    readonly type = ADD_RECIPES;

    constructor(public payload: Recipe[]) {

    }

}

// select recipe
// payload: index of the selected recipe
export class SelectRecipe implements Action {

    readonly type = SELECT_RECIPE;

    constructor(public payload: number) {

    }

}

// update recipe
// payload: the updated recipe
export class UpdateRecipe implements Action {
    
    readonly type = UPDATE_RECIPE;

    constructor(public payload: Recipe) {

    }

}

// remove recipe
// no payload
export class RemoveRecipe implements Action {
    readonly type = REMOVE_RECIPE;
}

// clear currently selected recipe from store
// no payload
export class ClearRecipe implements Action {
    readonly type = CLEAR_RECIPE;
}

// cancel recipe form
// payload: a recipe to add
export class CancelRecipe implements Action {
    readonly type = CANCEL_RECIPE;
}

// post recipe
// payload: a recipe and its index
export class PostRecipe implements Action {

    readonly type = POST_RECIPE;

    constructor(public payload: {recipe: Recipe, index: number}) {

    }

}

// put recipe
// payload: a recipe and its Firebase id
export class PutRecipe implements Action {

    readonly type = PUT_RECIPE;

    constructor(public payload: {recipe: Recipe, id: string}) {

    }

}

// delete recipe
// payload: the recipe's Firebase id
export class DeleteRecipe implements Action {

    readonly type = DELETE_RECIPE;

    constructor(public payload: string) {

    }

}

// fetch all recipes
// no required payload
export class GetRecipes implements Action {
    readonly type = GET_RECIPES;
}

// post all recipes
// payload: array of objects conformed of the recipes to add and its indexes
export class PostRecipes implements Action {

    readonly type = POST_RECIPES;

    constructor(public payload: {recipe: Recipe, index: number}[]) {

    }

}

// update all recipes
// payload: array of objects of the recipes to update and their Firebase id's
export class PutRecipes implements Action {

    readonly type = PUT_RECIPES;

    constructor(public payload: {recipe: Recipe, id: string}[]) {

    }

}

// delete all recipes
// payload: array of Firebase id's of recipes to delete
export class DeleteRecipes implements Action {

    readonly type = DELETE_RECIPES;

    constructor(public payload: string[]) {

    }

}

// attach Firebase id to recently persisted recipe
// payload: the index of the recipe and its new Firebase id
export class AttachId implements Action {

    readonly type = ATTACH_ID;

    constructor(public payload: { recipeIndex: number, recipeId: string }) {

    }

}

// clear an update task when updating an existing recipe
// payload: the Firebase id of the recipe that got updated
export class ClearUpdate implements Action {

    readonly type = CLEAR_UPDATE;

    constructor(public payload: string) {
        
    }

}

// clear a delete task when deleting an existing recipe
// payload: the Firebase id of the recipe that got deleted
export class ClearDelete implements Action {

    readonly type = CLEAR_DELETE;

    constructor(public payload: string) {

    }

}
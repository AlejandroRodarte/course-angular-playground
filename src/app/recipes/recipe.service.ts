import { Recipe } from './recipe.model';
import { EventEmitter } from '@angular/core';

export class RecipeService {

    // an array of Recipe models
  	private recipes: Recipe[] = [
		new Recipe('Test recipe name 1', 'Test recipe description 1', 'https://s3.amazonaws.com/finecooking.s3.tauntonclud.com/app/uploads/2019/03/04141012/lime-roasted-salmon-skillet-square-500x500.jpg'),
		new Recipe('Test recipe name 2', 'Test recipe description 2', 'https://s3.amazonaws.com/finecooking.s3.tauntonclud.com/app/uploads/2019/03/04141012/lime-roasted-salmon-skillet-square-500x500.jpg')
	];
    
    // selected recipe event emitter: will emit data when a recipe item is selected
	selectedRecipe = new EventEmitter<Recipe>();

    // get recipes
    // this.recipes simply would return a reference to this same array
    // so we apply an empty slice() method call to return a copy of this array
    getRecipes(): Recipe[] {
        return this.recipes.slice();
    }

}
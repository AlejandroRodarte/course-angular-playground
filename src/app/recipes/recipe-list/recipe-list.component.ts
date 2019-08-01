import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

// recipe list component class definition
@Component({
  	selector: 'app-recipe-list',
  	templateUrl: './recipe-list.component.html',
  	styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

	// an array of Recipe models
  	recipes: Recipe[] = [
		new Recipe('Test recipe name 1', 'Test recipe description 1', 'https://s3.amazonaws.com/finecooking.s3.tauntonclud.com/app/uploads/2019/03/04141012/lime-roasted-salmon-skillet-square-500x500.jpg'),
		new Recipe('Test recipe name 2', 'Test recipe description 2', 'https://s3.amazonaws.com/finecooking.s3.tauntonclud.com/app/uploads/2019/03/04141012/lime-roasted-salmon-skillet-square-500x500.jpg')
	];

	// sendSelectedRecipe event emitter to forward recipe data to the RecipesComponent
	@Output()
	sendSelectedRecipe = new EventEmitter<Recipe>();

  	constructor() {
	}

  	ngOnInit() {

	}
	  
	// onRecipeSelected() handler, triggered when the recipeSelected event emitter
	// from the RecipeItemComponent sends recipe information

	// simply forward the recipe information to the sendSelectedRecipe event emitter
	// for the RecipesComponent to hear
	onRecipeSelected(recipe: Recipe) {
		this.sendSelectedRecipe.emit(recipe);
	}

}
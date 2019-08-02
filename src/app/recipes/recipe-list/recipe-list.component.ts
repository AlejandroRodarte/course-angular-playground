import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

// recipe list component class definition
@Component({
  	selector: 'app-recipe-list',
  	templateUrl: './recipe-list.component.html',
  	styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

	recipes: Recipe[];

	// sendSelectedRecipe event emitter to forward recipe data to the RecipesComponent
	@Output()
	sendSelectedRecipe = new EventEmitter<Recipe>();

	// receive recipe service singleton from parent (RecipesComponent)
  	constructor(private recipeService: RecipeService) {

	}

	// on initialization, receive a copy of the recipes array
  	ngOnInit() {
		this.recipes = this.recipeService.getRecipes();
	}
	  
	// onRecipeSelected() handler, triggered when the recipeSelected event emitter
	// from the RecipeItemComponent sends recipe information

	// simply forward the recipe information to the sendSelectedRecipe event emitter
	// for the RecipesComponent to hear
	onRecipeSelected(recipe: Recipe) {
		this.sendSelectedRecipe.emit(recipe);
	}

}
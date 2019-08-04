import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
	selector: 'app-recipe-item',
	templateUrl: './recipe-item.component.html',
	styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

	// recipe property that catches the current recipe iteration value
	// from the recipes array found on the RecipeListComponent
	@Input()
	recipe: Recipe;

	// receive recipeService singleton from RecipesComponent parent
	constructor(private recipeService: RecipeService) { 

	}

	ngOnInit() {

	}

	// event handler when clicking on a recipe item
	// load the recipe data through the event emitter that the recipe service contains
	onRecipeItemClick(): void {
		this.recipeService.selectedRecipe.emit(this.recipe);
	}

}

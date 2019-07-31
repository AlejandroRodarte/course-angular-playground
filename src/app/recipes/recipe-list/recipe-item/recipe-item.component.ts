import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../recipe.model';

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

	// event emitter to send RecipeItemComponent data to RecipeListComponent
	@Output()
	recipeSelected = new EventEmitter<Recipe>();

	constructor() { 

	}

	ngOnInit() {
	}

	// event handler when clicking on a recipe item
	// load the recipe data and emit it throut the recipeSelected event emitter
	onRecipeItemClick(): void {
		this.recipeSelected.emit(this.recipe);
	}

}

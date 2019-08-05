import { Component, OnInit, Input, Renderer2, ElementRef } from '@angular/core';
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

	// we will embed to each recipe item an id for future use
	@Input()
	index: number;

	// receive recipeService singleton from RecipesComponent parent
	// renderer and element reference injections
	constructor(private recipeService: RecipeService) { 

	}

	ngOnInit() {

	}

	// on recipe item click
	onRecipeItemClick() {
		// emit its index
		this.recipeService.selectedRecipe.emit(this.index);
	}

	// method that defines if the .active boostrap class should be loaded
	// 1. the user must not have selected the same recipe item
	// 2. the current recipe index matches this recipe item's index
	isSelectedRecipeItem(): boolean {
		return this.recipeService.currentRecipeIndex !== -1 && this.recipeService.currentRecipeIndex === this.index;
	}

}

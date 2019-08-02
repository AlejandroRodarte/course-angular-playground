import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

// inject to this component the recipe service
@Component({
	selector: 'app-recipes',
	templateUrl: './recipes.component.html',
	styleUrls: ['./recipes.component.css'],
	providers: [RecipeService]
})
export class RecipesComponent implements OnInit {

	// reference to the current selected recipe by the user
	selectedRecipe: Recipe;

	// boolean flag to set false initially to not to attempt to render an undefined recipe
	doRenderDetails: boolean = false;

	constructor() {

	}

	ngOnInit() {

	}

	// setSelected() recipe handler
	setSelectedRecipe(recipe: Recipe): void {

		// check if the current selected recipe is not undefined
		// and if it is defined, check if user selected that same recipe item
		// compare both through the equals() method

		// if defined and equal to previous recipe, toggle the render

		// if undefined or not equal to previous recipe, then take the parameter recipe
		// and assign it to the current recipe and render it on screen
		if (this.selectedRecipe && this.selectedRecipe.equals(recipe)) {
			this.doRenderDetails = !this.doRenderDetails;
		} else {
			this.selectedRecipe = recipe;
			this.doRenderDetails = true;
		}

	}

}

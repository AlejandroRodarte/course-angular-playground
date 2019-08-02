import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

// inject to this parent component the recipe service
// RecipeListComponent, RecipeDetailComponent and RecipeItemComponent will share also this singleton instance
@Component({
	selector: 'app-recipes',
	templateUrl: './recipes.component.html',
	styleUrls: ['./recipes.component.css'],
	providers: [RecipeService]
})
export class RecipesComponent implements OnInit {

	// current selected recipe by user
	selectedRecipe: Recipe;

	// render flag to define if component should be rendered or not
	renderFlag: boolean = false;

	// inject the singleton recipe service
	constructor(private recipeService: RecipeService) {

		// subscribe to the selectedRecipe event emitter from the recipe Service
		// this is where the magic of cross-component communication occurs
		// each time data is submitted through the event emitter
		// the callback will catch that data (the selected recipe) and run the doRender() method
		this.recipeService.selectedRecipe.subscribe((recipe: Recipe) => {
			this.doRender(recipe);
		});

	}

	ngOnInit() {

	}

	// doRender() method, ran each time we select a recipe on the UI
	doRender(recipe: Recipe): void {

		// check if the previous recipe is equal to the received recipe
		// if true, toggle the render flag
		// if false, store the new recipe model and set the render flag to true to render
		if (this.selectedRecipe && this.selectedRecipe.equals(recipe)) {
			this.renderFlag = !this.renderFlag;
		} else {
			this.selectedRecipe = recipe;
			this.renderFlag = true;
		}

	}

}

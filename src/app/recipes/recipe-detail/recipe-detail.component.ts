import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
	selector: 'app-recipe-detail',
	templateUrl: './recipe-detail.component.html',
	styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

	// property binding to receive the currently selected recipe from RecipesComponent
	@Input()
	recipe: Recipe;

	// inject the recipe service singleton
	constructor(private recipeService: RecipeService) {

	}

	ngOnInit() {

	}

	// add ingredients to shopping list
	// delefate the task to the recipe service
	addToShoppingList() {
		this.recipeService.addToShoppingList(this.recipe.ingredients);
	}

}

import { Component, OnInit, Input } from '@angular/core';
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
	constructor(private recipeService: RecipeService) { 

	}

	ngOnInit() {

	}

	// on recipe item click, emit its index
	onRecipeItemClick() {
		this.recipeService.selectedRecipe.emit(this.index);
	}

}

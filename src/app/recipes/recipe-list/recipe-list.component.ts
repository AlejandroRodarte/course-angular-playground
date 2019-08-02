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

	// recipes copy property
	recipes: Recipe[];

	// receive recipe service singleton from parent (RecipesComponent)
  	constructor(private recipeService: RecipeService) {

	}

	// on initialization, receive a copy of the recipes array
  	ngOnInit() {
		this.recipes = this.recipeService.getRecipes();
	}

}
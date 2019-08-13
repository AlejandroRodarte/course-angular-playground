import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';

// recipe list component class definition
@Component({
  	selector: 'app-recipe-list',
  	templateUrl: './recipe-list.component.html',
  	styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

	// recipes array copy
	recipes: Recipe[];

	// recipes changed subscription
	recipesChangedSubscription: Subscription;

	// inject recipe service
	constructor(private recipeService: RecipeService) {

	}

	// initialization
  	ngOnInit() {

		// fetch recipes copy from service
		this.recipes = this.recipeService.getRecipes();

		// each time the recipes array changes, get a new copy
		this.recipesChangedSubscription = this.recipeService.recipesChanged.subscribe(() => {
			this.recipes = this.recipeService.getRecipes();
		});

	}
	
	// on destroy, unsubscribe
	ngOnDestroy(): void {
		this.recipesChangedSubscription.unsubscribe();
	}

}
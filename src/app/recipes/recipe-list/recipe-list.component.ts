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

	// recipes copy property
	recipes: Recipe[];

	// subscription to recipesChanged service Subject
	recipesChangedSubscription: Subscription;

	// receive recipe service singleton from parent (RecipesComponent)
	constructor(private recipeService: RecipeService) {

	}

	// on initialization, receive a copy of the recipes array
  	ngOnInit() {

		// fetch the recipes initially
		this.recipes = this.recipeService.getRecipes();

		// subscribe to the recipesChanged Subject to fetch the updated array each time a change occurs
		this.recipesChangedSubscription = this.recipeService.recipesChanged.subscribe(() => {
      console.log('recipes changed triggered, getting recipes');
			this.recipes = this.recipeService.getRecipes();
		});

	}

	// on destroy, unsubscribe
	ngOnDestroy(): void {
		this.recipesChangedSubscription.unsubscribe();
	}

}

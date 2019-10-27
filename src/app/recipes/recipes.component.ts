import { Component, OnInit } from '@angular/core';

// inject to this parent component the recipe service
// RecipeListComponent, RecipeDetailComponent and RecipeItemComponent will share also this singleton instance

// we deleted the recipe service since navigating away from it and going back resetted the service and did not
// allow us to delete recipes from the array
// the recipe service is now a global service
@Component({
	selector: 'app-recipes',
	templateUrl: './recipes.component.html',
	styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

	ngOnInit() {

	}

}

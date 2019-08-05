import { Component, OnInit } from '@angular/core';
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

	constructor() {

	}

	ngOnInit() {



	}

}

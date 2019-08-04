import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

// recipe edit component
@Component({
	selector: 'app-recipe-edit',
	templateUrl: './recipe-edit.component.html',
	styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

	// the recipe id
	id: number;

	// the recipe information
	recipe: Recipe;

	// edit mode
	// true: editing an existing recipe
	// false: creating a new recipe
	editMode: boolean = false;

	// inject recipe service and current route
	constructor(private recipeService: RecipeService,
				private route: ActivatedRoute) {

	}

	// when the component is instantiated...
	ngOnInit() {
		
		// subscribe to the current route parameters and...
		this.route.params.subscribe((params: Params) => {

			// fetch the id each time it changes
			this.id = +params['id'];

			// if id exists, it means the current route is
			// localhost:4200/recipes/1/edit to edit an existing recipe
			// so set edit mode to true and use the service to fetch the recipe information
			// to update
			if (this.id) {
				this.editMode = true;
				this.recipe = this.recipeService.getRecipe(this.id);
			}

		})

	}

}

import { Component, OnInit, Input, AfterContentChecked, AfterViewChecked, DoCheck, OnChanges } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
	selector: 'app-recipe-detail',
	templateUrl: './recipe-detail.component.html',
	styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

	// current index
	selectedIndex: number;

	// render flag
	renderFlag: boolean = true;

	// property binding to receive the currently selected recipe from RecipesComponent
	recipe: Recipe;

	// inject the recipe service singleton
	constructor(private recipeService: RecipeService,
				private route: ActivatedRoute) {

	}

	ngOnInit() {

		// listen for each time the recipe item emits a new index and call doRender()
		// to set the value of the render flag
		this.recipeService.selectedRecipe.subscribe((index: number) => {
			this.doRender(index);
		}) 

		// subscribe to the params observable: listen for changes in the id dynamic parameter
		// on trigger, access the params and fetch the id
		// and use the getRecipe() method to access the recipe to load through the service
		this.route.params.subscribe((params: Params) => {
			this.recipe = this.recipeService.getRecipe(+params['id']);
		})

	}

	// add ingredients to shopping list
	// delefate the task to the recipe service
	addToShoppingList() {
		this.recipeService.addToShoppingList(this.recipe.ingredients);
	}

	// doRender() method, ran each time we select a recipe on the UI
	doRender(index: number): void {

		// check if the user is clicking on the same recipe item through the incoming index
		// if true, toggle the render flag; if false, set the new index and set render true
		if (this.selectedIndex === index) {
			this.renderFlag = !this.renderFlag;
		} else {
			this.selectedIndex = index;
			this.renderFlag = true;
		}

	}

}

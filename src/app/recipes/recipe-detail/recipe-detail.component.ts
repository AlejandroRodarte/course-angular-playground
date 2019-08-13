import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

// recipe detail component
@Component({
	selector: 'app-recipe-detail',
	templateUrl: './recipe-detail.component.html',
	styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {

	// currently selected recipe index
	selectedIndex: number;

	// render flag
	renderFlag: boolean = true;

	// property binding to receive the currently selected recipe from RecipesComponent
	recipe: Recipe;

	// selected recipe subscription
	selectedRecipeSubscription: Subscription;

	// route parameter subscription
	private routeParamsSubscription: Subscription;

	// inject recipe service, router and route that loaded this component
	constructor(private recipeService: RecipeService,
				private router: Router,
				private route: ActivatedRoute) {

	}

	// initialization
	ngOnInit() {

		// subscribe to the selected recipe observable to fetch the recipe index the user selected on the UI
		// call doRender() to render or not the component
		this.selectedRecipeSubscription = this.recipeService.selectedRecipe.subscribe((index: number) => {
			this.doRender(index);
		});

		// subscribe to the params observable
		this.routeParamsSubscription = this.route.params.subscribe((params: Params) => {

			// get :id value
			const id = +params['id'];
			
			// get recipe through service based on id and save on this property
			this.recipe = this.recipeService.getRecipe(id);

			// also, save the id on the index property
			this.selectedIndex = id;

		});

	}

	// add ingredients to shopping list
	// use the service method to delegate task
	addToShoppingList() {
		this.recipeService.addToShoppingList(this.recipe.ingredients);
	}

	// do render?
	doRender(index: number): void {

		// if user clicks on the previously selected recipe, toggle render flag
		// if user clicks on different recipe, render the component and set the index on property
		if (this.selectedIndex === index) {
			this.renderFlag = !this.renderFlag;
		} else {
			this.selectedIndex = index;
			this.renderFlag = true;
		}

	}

	// delete recipe handler
	onDeleteRecipe(): void {

		// call service method to delegate task
		this.recipeService.deleteRecipe(this.selectedIndex);

		// if recipe has a Firebase id, register as a recipe to delete on database when saving changes
		if (this.recipe.id !== undefined) {
			this.recipeService.registerDeletedRecipe(this.recipe.id);
		}

		// navigate on upper level than the current one, relative to current route
		// example: /recipes/id -> /recipes
		this.router.navigate(['..'], {
			relativeTo: this.route
		});

	}

	// unsubscriptions
	ngOnDestroy() {
		this.selectedRecipeSubscription.unsubscribe();
		this.routeParamsSubscription.unsubscribe();
	}

}

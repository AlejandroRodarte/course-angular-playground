import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-recipe-detail',
	templateUrl: './recipe-detail.component.html',
	styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {

	// current index
	selectedIndex: number;

	// render flag
	renderFlag: boolean = true;

	// property binding to receive the currently selected recipe from RecipesComponent
	recipe: Recipe;

	// selected recipe service subscription
	selectedRecipeSubscription: Subscription;

	// inject the recipe service singleton
	// inject the router to redirect user and route to redirect based on relative path
	constructor(private recipeService: RecipeService,
				private router: Router,
				private route: ActivatedRoute) {

	}

	ngOnInit() {

		// listen for each time the recipe item emits a new index and call doRender()
		// to set the value of the render flag
		this.selectedRecipeSubscription = this.recipeService.selectedRecipe.subscribe((index: number) => {
			this.doRender(index);
		});

		// subscribe to the params observable: listen for changes in the id dynamic parameter
		// on trigger, access the params and fetch the id
		// and use the getRecipe() method to access the recipe to load through the service
		this.route.params.subscribe((params: Params) => {

			const id = +params['id'];
			
			this.recipe = this.recipeService.getRecipe(id);
			this.selectedIndex = id;

		});

	}

	// add ingredients to shopping list
	// delegate the task to the recipe service
	// we are passing a reference to the array of ingredients this particular recipe has
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

	// delete recipe button handler
	onDeleteRecipe(): void {

		// call the delete recipe method from the service and pass the selected recipe index
		this.recipeService.deleteRecipe(this.selectedIndex);

		// check if this recipe has a Firebase id or not (brand new or fetched from the start)
		// if it's fetched from Firebase, we will register it's id to know this recipe has been deleted by the user
		// and should be deleted from the database once it syncs the data
		if (this.recipe.id !== undefined) {
			this.recipeService.registerDeletedRecipe(this.recipe.id);
		}

		// navigate on upper level than the current one
		// when deleting a recipe, we are on path localhost:4200/recipes/id
		// when deleting, we will go to path localhost:4200/recipes
		this.router.navigate(['..'], {
			relativeTo: this.route
		});

	}

	// unsubscribe upon component destruction
	ngOnDestroy() {
		this.selectedRecipeSubscription.unsubscribe();
	}

}

import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../store/app.reducer';
import * as RecipeActions from '../../store/recipes.actions';

// recipe item component
@Component({
	selector: 'app-recipe-item',
	templateUrl: './recipe-item.component.html',
	styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

	// recipe object
	@Input()
	recipe: Recipe;

	// recipe index
	@Input()
	index: number;

	// inject recipe service
	constructor(private recipeService: RecipeService,
				private store: Store<fromApp.AppState>) { 

	}

	ngOnInit() {

	}

	// when clicking on a recipe item link, emit its index
	onRecipeItemClick() {
		// this.recipeService.selectedRecipe.next(this.index);
		this.store.dispatch(new RecipeActions.SelectRecipe(this.index));
	}

	// method that defines if the .active boostrap class should be loaded
	// 1. the user must not have selected the same recipe item
	// 2. the current recipe index matches this recipe item's index
	isSelectedRecipeItem(): boolean {
		return this.recipeService.currentRecipeIndex !== -1 && this.recipeService.currentRecipeIndex === this.index;
	}

}

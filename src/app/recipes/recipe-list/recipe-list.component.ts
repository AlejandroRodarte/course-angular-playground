import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

import * as fromApp from '../../store/app.reducer';
import * as fromRecipes from '../store/recipes.reducer';
import * as RecipeActions from '../store/recipes.actions';
import { Store } from '@ngrx/store';

// recipe list component class definition
@Component({
  	selector: 'app-recipe-list',
  	templateUrl: './recipe-list.component.html',
  	styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

	// recipes array copy
	recipes: Observable<fromRecipes.RecipesReducerState>;

	// inject recipe service
	constructor(private store: Store<fromApp.AppState>) {

	}

	// initialization
  	ngOnInit() {
		this.recipes = this.store.select('recipes');
	}

	onNewRecipe() {
		this.store.dispatch(new RecipeActions.ClearRecipe());
	}
	
}
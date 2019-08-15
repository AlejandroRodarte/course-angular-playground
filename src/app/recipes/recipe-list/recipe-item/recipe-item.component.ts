import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';
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

	// inject store
	constructor(private store: Store<fromApp.AppState>) { 

	}

	ngOnInit() {

	}

	// action dispatch: selected recipe
	onRecipeItemClick() {
		this.store.dispatch(new RecipeActions.SelectRecipe(this.index));
	}

}

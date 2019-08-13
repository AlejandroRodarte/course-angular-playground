import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromShoppingList from './store/shopping-list.reducer';

// shopping list component
@Component({
	selector: 'app-shopping-list',
	templateUrl: './shopping-list.component.html',
	styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

	// ingredients: observable that resolves an object with an ingredients property that contains
	// an array of ingredients (state resolved by the shoppingListReducer)
	ingredients: Observable<fromShoppingList.ShoppingListReducerState>;

	// receive singleton of shopping list service
	// injecting the store 
	// generic: must define how the store looks
	// keys: alias we provided in the app-module.ts forRoot() when mapping the reducers
	// values: what the associated reducer will update to the overall state, which is just
	// the array of ingredients state

	// now using the appState interface
	constructor(private store: Store<fromShoppingList.AppState>) {
		
	}

	// on initialization
	ngOnInit() {

		// selecting the shopping list part of my global store (application state); returns an observable of the
		// part of the state the shoppingListReducer returns (object with ingredients property and an ingredient array value)
		this.ingredients = this.store.select('shoppingList');

	}

	// when clicking on a shopping list ingredient, access the Subject emitter from the shopping list service
	// and emit the ingredient's index

	// now using the start edit action and sending the index
	onShoppingListIngredientClick(index: number): void {
		this.store.dispatch(new ShoppingListActions.StartEdit(index));
	}

	ngOnDestroy() {

	}

}

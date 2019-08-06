import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

// shopping list component
@Component({
	selector: 'app-shopping-list',
	templateUrl: './shopping-list.component.html',
	styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

	// ingredients copy from service
	ingredients: Ingredient[] = [];

	// store the ingredientsChanged subject subscription
	private ingredientsChangedSubscription: Subscription;

	// receive singleton of shopping list service
	constructor(private shoppingListService: ShoppingListService) { 
		
	}

	// on initialization
	ngOnInit() {

		// get a copy of these ingredients through the service
		this.ingredients = this.shoppingListService.getIngredients();

		// subscribe to the ingredientsChanged emitter from the service and push to this copy the new ingredient
		this.ingredientsChangedSubscription = this.shoppingListService.ingredientsChanged.subscribe(() => {
			this.ingredients = this.shoppingListService.getIngredients();
		});

	}

	// upon destruction, unsubscribe from the service's subject
	ngOnDestroy() {
		this.ingredientsChangedSubscription.unsubscribe();
	}

}

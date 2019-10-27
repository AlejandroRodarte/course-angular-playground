import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';

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
	constructor(private shoppingListService: ShoppingListService,
				private loggingService: LoggingService) { 
		
	}

	// on initialization
	ngOnInit() {

		// get a copy of these ingredients through the service
		this.ingredients = this.shoppingListService.getIngredients();

		// subscribe to the ingredientsChanged emitter from the service and push to this copy the new ingredient
		this.ingredientsChangedSubscription = this.shoppingListService.ingredientsChanged.subscribe(() => {
			this.ingredients = this.shoppingListService.getIngredients();
		});

		this.loggingService.printLog('Hello from ShoppingListComponent: on ngOnInit()');

	}

	// when clicking on a shopping list ingredient, access the Subject emitter from the shopping list service
	// and emit the ingredient's index
	onShoppingListIngredientClick(index: number): void {
		this.shoppingListService.sendIngredientIndex.next(index);
	}

	// upon destruction, unsubscribe from the service's subject
	ngOnDestroy() {
		this.ingredientsChangedSubscription.unsubscribe();
	}

}

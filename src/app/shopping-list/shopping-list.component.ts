import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

// shopping list component
@Component({
	selector: 'app-shopping-list',
	templateUrl: './shopping-list.component.html',
	styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

	// ingredients copy from service
	ingredients: Ingredient[] = [];

	// receive singleton of shopping list service
	constructor(private shoppingListService: ShoppingListService) { 

	}

	// on initialization, get a copy of these ingredients through the service
	ngOnInit() {
		this.ingredients = this.shoppingListService.getIngredients();
	}

}

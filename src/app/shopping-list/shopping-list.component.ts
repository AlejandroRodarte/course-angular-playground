import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

// shopping list component
@Component({
	selector: 'app-shopping-list',
	templateUrl: './shopping-list.component.html',
	styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

	// ingredients array
	public ingredients: Ingredient[] = [
		new Ingredient('Apples', 5),
		new Ingredient('Tomatoes', 10)
	];

	constructor() { 

	}

	ngOnInit() {

	}

	// add new ingredient handler: triggers when sendNewIngredient emitter from shopping edit component
	// emits a new ingredient from the form
	addNewIngredient(ingredient: Ingredient): void {
		this.ingredients.push(ingredient);
	}

}

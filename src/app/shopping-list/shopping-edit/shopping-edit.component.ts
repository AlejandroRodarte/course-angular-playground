import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from './../shopping-list.service';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

	// reference to the input html elements
	@ViewChild('ingredientNameInput', { static : false })
	ingredientName: ElementRef;

	@ViewChild('ingredientAmountInput', { static : false })
	ingredientAmount: ElementRef;

	// get shopping list service singleton
    constructor(private shoppingListService: ShoppingListService) {

	}

    ngOnInit() {
	}
	
	// listener for the submission button click
	onSubmitClick(): void {

		// capture the ingredient name and amount
		const name: string = this.ingredientName.nativeElement.value;
		const amount: number = this.ingredientAmount.nativeElement.value;

		// if not empty, add the new ingredient to the ingredients array found on the service and clear the fields
		if (name && amount) {
			this.shoppingListService.addNewIngredient(new Ingredient(name, amount));
			this.ingredientName.nativeElement.value = '';
			this.ingredientAmount.nativeElement.value = '';
		}
		
	}

}

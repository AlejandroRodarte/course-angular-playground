import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from './../shopping-list.service';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

	// shopping list form
	@ViewChild('shoppingListForm', { static : false })
	private shoppingListForm: NgForm;

	// get shopping list service singleton
    constructor(private shoppingListService: ShoppingListService) {

	}

    ngOnInit() {

	}
	
	// listener for the submission button click
	onSubmitClick(): void {

		// capture the ingredient name and amount from the template-driven form
		const name: string = this.shoppingListForm.form.value.ingredientName;
		const amount: number = +this.shoppingListForm.form.value.ingredientAmount;

		// add the ingredient through the service
		this.shoppingListService.addIngredient(new Ingredient(name, amount));

		// clear the form
		this.clearForm();
		
	}

	// clear form: just clear the ingredient name (not the amount)
	private clearForm() {
		this.shoppingListForm.controls['ingredientName'].reset();
	}

}

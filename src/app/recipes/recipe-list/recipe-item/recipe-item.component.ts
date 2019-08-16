import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';

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
	constructor() { 

	}

	ngOnInit() {

	}

}

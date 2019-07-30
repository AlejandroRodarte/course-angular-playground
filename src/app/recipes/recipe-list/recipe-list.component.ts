import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

// recipe list component class definition
@Component({
  	selector: 'app-recipe-list',
  	templateUrl: './recipe-list.component.html',
  	styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

	// an array of Recipe models
  	recipes: Recipe[] = [
		new Recipe('Test recipe name', 'Test recipe description', 'https://s3.amazonaws.com/finecooking.s3.tauntonclud.com/app/uploads/2019/03/04141012/lime-roasted-salmon-skillet-square-500x500.jpg')
	];

  	constructor() {
	}

  	ngOnInit() {

  	}

}

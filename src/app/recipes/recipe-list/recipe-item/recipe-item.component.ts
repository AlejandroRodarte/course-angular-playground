import { Component, OnInit, Input, Renderer2, ElementRef } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
	selector: 'app-recipe-item',
	templateUrl: './recipe-item.component.html',
	styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

	// recipe property that catches the current recipe iteration value
	// from the recipes array found on the RecipeListComponent
	@Input()
	recipe: Recipe;

	// we will embed to each recipe item an id for future use
	@Input()
	index: number;

	// toggle to add/remove bootstrap .active class
	toggle: boolean = true;

	// receive recipeService singleton from RecipesComponent parent
	// renderer and element reference injections
	constructor(private recipeService: RecipeService, 
				private renderer: Renderer2,
				private elementRef: ElementRef) { 

	}

	ngOnInit() {

	}

	// on recipe item click
	onRecipeItemClick() {

		// toggle logic
		// toggle between adding and removing the .active bootstrap class
		// the first child of the component's native element is the link that should
		// receive this class
		if (!this.toggle) {
			this.renderer.removeClass(this.elementRef.nativeElement.firstChild, 'active');
			this.toggle = true;
		} else {
			this.renderer.addClass(this.elementRef.nativeElement.firstChild, 'active');
			this.toggle = false;
		}

		// emit its index
		this.recipeService.selectedRecipe.emit(this.index);

	}

}

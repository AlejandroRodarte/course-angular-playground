import { Recipe } from '../recipes/recipe.model';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { DataStorageService } from './data-storage.service';

// recipe resolver service
// guarantees that, when accessing routes such as
// localhost:4200/recipes/0 and localhost:4200/recipes/0/edit
// we fetch beforehand the recipes from the database and set them into the recipes array
// this is, of course, an edge case: the normal routine is to enter the home page and press 'Fetch Data'
// but the user, manually, can enter this pages directly
@Injectable({
    providedIn: 'root'
})
export class RecipeResolverService implements Resolve<Recipe[]> {

    // data storage and recipe services
    constructor(private dataStorageService: DataStorageService,
                private recipeService: RecipeService) {

    }

    // when loading any of the routes that have this resolver, execute this code BEFORE actually rendering their respective component
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {

        // get the recipes we have right now locally on the recipes array
        const recipes = this.recipeService.getRecipes();

        // if it is empty, it means the user forcefully entered this path manually 
        // so access the data storage service and first fetch the recipes, set the, and notify components to render
        if (recipes.length === 0) {
            return this.dataStorageService.fetchRecipes();
        }

        return recipes;

    }

}
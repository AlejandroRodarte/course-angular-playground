import { Recipe } from './recipe.model';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { RecipeService } from './recipe.service';
import { DataStorageService } from '../shared/data-storage.service';

// recipe resolver service to load recipes before accessing some routes
@Injectable({
    providedIn: 'root'
})
export class RecipeResolverService implements Resolve<Recipe[]> {

    // inject data storage and recipe services
    constructor(private dataStorageService: DataStorageService,
                private recipeService: RecipeService) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {

        // get a recipes copy array
        const recipes = this.recipeService.getRecipes();

        // if the array is empty, it means the user has not fetched any data yet, so
        // fetch them through the data storage service and store them in the array
        if (recipes.length === 0) {
            return this.dataStorageService.fetchRecipes();
        }

        // if not empty, then we are good
        return recipes;

    }

}
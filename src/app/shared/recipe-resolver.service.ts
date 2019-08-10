import { Recipe } from '../recipes/recipe.model';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { DataStorageService } from './data-storage.service';

@Injectable({
    providedIn: 'root'
})
export class RecipeResolverService implements Resolve<Recipe[]> {

    constructor(private dataStorageService: DataStorageService) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
        return this.dataStorageService.fetchRecipes();
    }

}
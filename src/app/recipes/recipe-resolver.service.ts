import { Recipe } from './recipe.model';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { RecipeService } from './recipe.service';
import { DataStorageService } from '../shared/data-storage.service';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import * as RecipeActions from './store/recipes.actions';
import * as fromRecipes from './store/recipes.reducer';

// recipe resolver service to load recipes before accessing some routes
@Injectable({
    providedIn: 'root'
})
export class RecipeResolverService implements Resolve<void> {

    // inject data storage and recipe services
    constructor(private dataStorageService: DataStorageService,
                private recipeService: RecipeService,
                private store: Store<fromApp.AppState>) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): void | Observable<void> | Promise<void> {

        console.log(1);

        this
            .store
            .select('recipes')
            .subscribe(

                (recipeState: fromRecipes.RecipesReducerState) => {

                    if (recipeState.recipes.length === 0) {
                        this.store.dispatch(new RecipeActions.GetRecipes());
                    }

                }

            )
            .unsubscribe();

    }

}
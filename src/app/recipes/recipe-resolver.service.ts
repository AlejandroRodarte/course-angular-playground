import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as RecipeActions from './store/recipes.actions';
import * as fromRecipes from './store/recipes.reducer';

// recipe resolver service to load recipes before accessing some routes
@Injectable({
    providedIn: 'root'
})
export class RecipeResolverService implements Resolve<void> {

    // inject the store
    constructor(private store: Store<fromApp.AppState>) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): void | Observable<void> | Promise<void> {

        // subscribe to the recipes reducer state
        const recipesSubscription = 
            this
                .store
                .select('recipes')
                .subscribe(

                    // get the state
                    (recipeState: fromRecipes.RecipesReducerState) => {

                        // if it has no recipes; dispatch an action to fetch all the recipes
                        if (recipeState.recipes.length === 0) {
                            this.store.dispatch(new RecipeActions.GetRecipes());
                        }

                        // unsubscribe
                        recipesSubscription.unsubscribe();

                    }

                );

    }

}
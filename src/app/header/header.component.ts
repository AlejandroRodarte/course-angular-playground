import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { UserModel } from '../auth/user.model';

import * as fromApp from '../store/app.reducer'
import * as fromAuth from '../auth/store/auth.reducer';
import { Store } from '@ngrx/store';
import { AuthReducerState } from '../auth/store/auth.reducer';
import { map, tap } from 'rxjs/operators';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipeActions from '../recipes/store/recipes.actions';
import * as fromRecipes from '../recipes/store/recipes.reducer';
import { Router } from '@angular/router';

// header component
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

    // one-time fetch flag
    private alreadyFetched: boolean = false;

    // fetching flag and fetchSuccessful flag
    fetching: boolean = false;
    fetchSuccessful: boolean = false;

    // saving flag and saveSuccessful flag
    saving: boolean = false;
    saveSuccessful: boolean = false;

    // authentication flag
    isAuthenticated: boolean = false;

    // fetch recipes subscription
    private fetchRecipesSubscription: Subscription;

    // user data subscription
    private userSubscription: Subscription;

    private recipesSubscription: Subscription;

    private readyToUpdate: boolean = false;

    // inject data storage service, recipe service and authentication service
    constructor(private dataStorageService: DataStorageService,
                private recipeService: RecipeService,
                private authService: AuthService,
                private store: Store<fromApp.AppState>,
                private router: Router) {

    }

    // initialization
    // access auth state, extract the user property and check if null or not to define authentication
    ngOnInit(): void {

        this.userSubscription = this
                                    .store
                                    .select('auth')
                                    .pipe(
                                        map((authState: fromAuth.AuthReducerState) => {
                                            return authState.user;
                                        })
                                    )
                                    .subscribe((user: UserModel) => {
                                        this.isAuthenticated = !user ? false : true;
                                    });

    }

    // 'Save Recipes' button handler
    onSaveRecipes() {
        
        // set the 'saving' flag to true
        this.saving = true;

        this.recipeService.storeSnaphsot();

        // this.recipeService.recipesToUpdate.forEach((recipeData: {recipe: Recipe, id: string}) => {
        //     this.store.dispatch(new RecipeActions.PutRecipe(recipeData));
        // });

        this.store.dispatch(new RecipeActions.PostRecipes(this.recipeService.recipesToAdd));
        this.store.dispatch(new RecipeActions.DeleteRecipes(this.recipeService.recipesToDelete));
        this.store.dispatch(new RecipeActions.PutRecipes(this.recipeService.recipesToUpdate));

        // clear the saving flag
        this.saving = false;

        // set the saveSuccessful flag
        this.saveSuccessful = true;

        // clear the saveSuccessful flag in 3 seconds
        setTimeout(() => {
            this.saveSuccessful = false;
        }, 3000);

    }

    // 'Fetch Recipes' handler
    onFetchRecipes() {

        // check if first time
        if (!this.alreadyFetched) {

            // set first-time flag to never fetch again
            this.alreadyFetched = true;

            // set fetching flag
            this.fetching = true;
            
            this.store.dispatch(new RecipeActions.GetRecipes());

            // clear fetching flag
            this.fetching = false;

            // set fetchSuccessful flag
            this.fetchSuccessful = true;

            // clear fetchSuccessful flag in 3 seconds
            setTimeout(() => {
                this.fetchSuccessful = false;
            }, 3000);

        }

    }

    // on logout, call logout() authentication service method
    onLogout() {
        this.store.dispatch(new AuthActions.Logout());
    }

    // unsubscriptions
    ngOnDestroy(): void {
        this.fetchRecipesSubscription.unsubscribe();
        this.userSubscription.unsubscribe();
    }

}
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Subscription } from 'rxjs';
import { UserModel } from '../auth/user.model';
import * as fromApp from '../store/app.reducer'
import * as fromAuth from '../auth/store/auth.reducer';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs/operators';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipeActions from '../recipes/store/recipes.actions';
import * as fromRecipes from '../recipes/store/recipes.reducer';
import { Recipe } from '../recipes/recipe.model';

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

    // user data subscription
    private userSubscription: Subscription;

    // inject recipe service and store
    constructor(private recipeService: RecipeService,
                private store: Store<fromApp.AppState>) {

    }

    // initialization
    // access auth state, extract the user property and check if null or not to define authentication
    ngOnInit(): void {

        this.userSubscription = 

            this.store
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

        // get a snaphost of our current store to fetch the recipes we require to add, update
        // and delete
        this.recipeService.storeSnaphsot();

        // action dispatch: Post all recipes stored temporarily in the service
        // a series of PostRecipe actions are dispatched in sequence
        this.store.dispatch(new RecipeActions.PostRecipes(this.recipeService.recipesToAdd));

        // action dispatch: Delete all recipes stored temporarily in the service
        // a series of DeleteRecipe actions are dispatched in sequence
        this.store.dispatch(new RecipeActions.DeleteRecipes(this.recipeService.recipesToDelete));

        // action dispatch: Update all recipes stored temporarily in the service
        // a series of UpdateRecipe actions are dispatched in sequence
        this.store.dispatch(new RecipeActions.PutRecipes(this.recipeService.recipesToUpdate));

        // a note about the dispatches above:
        // dispatches are async in nature, so they will all run simultaneously and wait for their own resolve
        // so a mass of PostRecipe, DeleteRecipe and PutRecipe actions will be executed at the same time
        // we dispatch the aftermath actions (AttachId, ClearUpdate and ClearDelete) independently when each PostRecipe,
        // DeleteRecipe and PutRecipe is executed also with the dispatch() method, and they will most likely run after all the
        // http operations end

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
            
            // check if recipes have been already loaded (by the resolver, for example)
            // if so, set the one-time flag and return
            if (this.areRecipesLoaded()) {
                this.alreadyFetched = true;
                return;
            }

            // set first-time flag to never fetch again
            this.alreadyFetched = true;

            // set fetching flag
            this.fetching = true;
            
            // action dispatch: get all recipes from the database and save them on the store
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

    // action dispatch: logout
    onLogout() {
        this.store.dispatch(new AuthActions.Logout());
    }

    // check if recipes are already loaded
    private areRecipesLoaded(): boolean {

        // final judgement
        let result: boolean = false;

        // snapshot of the recipes reducer state
        this
            .store
            .select('recipes')
            .pipe(

                // get only the recipes array
                map(
                    (recipesState: fromRecipes.RecipesReducerState) => {
                        return recipesState.recipes;
                    }
                ),

                tap(

                    // if recipes are not empty, it means that the user already has in its UI
                    // the fetched recipes
                    (recipes: Recipe[]) => {
                        if (recipes.length > 0) {
                            result = true;
                        } else {
                            result = false;
                        }
                    }

                )

            )
            .subscribe()
            .unsubscribe();

        return result;

    }

    // unsubscriptions
    ngOnDestroy(): void {

        if (this.userSubscription) {
            this.userSubscription.unsubscribe();
        }

    }

}
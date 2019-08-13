import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { UserModel } from '../auth/user.model';

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

    // inject data storage service, recipe service and authentication service
    constructor(private dataStorageService: DataStorageService,
                private recipeService: RecipeService,
                private authService: AuthService) {

    }

    // initialization
    // subscribe to user subject: if user is null, authentication flag will be cleared,
    // and if user exists, authentication will be set
    ngOnInit(): void {
        this.userSubscription = this.authService.user.subscribe((user: UserModel) => {
            this.isAuthenticated = !user ? false : true;
        });
    }

    // 'Save Recipes' button handler
    onSaveRecipes() {
        
        // set the 'saving' flag to true
        this.saving = true;

        // fetch new recipes added by user before saving
        const newRecipes = this.recipeService.getNewRecipes();

        // fetch existing recipes that got updated by user before saving
        const updatedRecipes = this.recipeService.getUpdatedRecipes();

        // fetch recipe id's that got deleted by user before saving
        const deletedRecipes = this.recipeService.getDeletedRecipes();

        // burst of POST requests to add all new recipes
        newRecipes.forEach((newRecipe: Recipe) => {
            this.dataStorageService.saveRecipe(newRecipe);
        });

        // burst of DELETE requests to delete existing recipes
        deletedRecipes.forEach((recipeId: string) => {
            this.dataStorageService.deleteRecipe(recipeId);
        });

        // burst of PUT requests to update existing recipes
        updatedRecipes.forEach((updatedRecipe: Recipe) => {
            this.dataStorageService.updateRecipe(updatedRecipe);
        });

        // clear update and delete queued tasks
        this.recipeService.flushRegisteredRecipes();

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

            // subscribe to the fetchRecipes() returned observable to trigger request (not interested in response)
            this.fetchRecipesSubscription = this.dataStorageService.fetchRecipes().subscribe();

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
        this.authService.logout();
    }

    // unsubscriptions
    ngOnDestroy(): void {
        this.fetchRecipesSubscription.unsubscribe();
        this.userSubscription.unsubscribe();
    }

}
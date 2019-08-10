import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { Subscription } from 'rxjs';

// header component
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

    // one-time flag to know if user already fetched the data from database
    private alreadyFetched: boolean = false;

    // fetching: flag active while making the GET request and rendering data to user
    // fetchSuccessful: flag active for 3 seconds to inform user data was fetched without issue
    private fetching: boolean = false;
    private fetchSuccessful: boolean = false;

    // saving: flag active while making the GET request and rendering data to user
    // saveSuccessful: flag active for 3 seconds to inform user data was fetched without issue
    private saving: boolean = false;
    private saveSuccessful: boolean = false;

    // fetch recipes subscription
    private fetchRecipesSubscription: Subscription;

    // recipe servce injection
    constructor(private dataStorageService: DataStorageService,
                private recipeService: RecipeService) {

    }

    ngOnInit(): void {
        
    }

    // when saving all the recipes, we enter into a 3-step process:

    // 1. POST all the brand new recipes that have not been persisted (recipe Firebase id is undefined)

    // 2. DELETE all existing recipes that were deleted from the UI via the RecipeDetailComponent 'Delete Recipe' dropdown link
    // When the user makes such action, we will add that recipe's Firebase id (if it exists) to an array that will keep track of all
    // the recipes to delete on the database once the user synchronizes its local data through the 'Save Data' dropwdown link
    // as an additional step, we will check if such to-delete recipe was one that was updated and registered as a recipe to update into the database;
    // if that was the case, then we delete that recipe id from the recipe-to-update tracker, since it will be deleted anyway

    // 2. PUT (UPDATE) all existing recipes that were updated from the UI via the RecipeEditComponent when the 'Update Recipe' form submit button is pressed
    // When the user makes such action, we will add that recipe's Firebase id (if it exists) to an array that will keep track of all
    // the recipes to update on the database once the user synchronizes its local data through the 'Save Data' dropwdown link

    onSaveRecipes() {
        
        // set the 'saving' flag to true
        this.saving = true;

        // fetch the brand new recipes (Firebase id undefined)
        const newRecipes = this.recipeService.getNewRecipes();

        // fetch the recipes to update and that were fetched from the start from the database
        const updatedRecipes = this.recipeService.getUpdatedRecipes();

        // fetch all the recipe id's that will be deleted from the database
        const deletedRecipes = this.recipeService.getDeletedRecipes();

        // 1. loop through all new recipes; access the data storage service and save the recipes 1 by 1
        // in short, a burst of POST requests are made
        newRecipes.forEach((newRecipe: Recipe) => {
            this.dataStorageService.saveRecipe(newRecipe);
        });

        // 2. loop through all recipe id's to delete; access the data storage service and delete them 1 by 1
        // in short, a burst of DELETE requests are made
        deletedRecipes.forEach((recipeId: string) => {
            this.dataStorageService.deleteRecipe(recipeId);
        });

        // 3. loop through all recipes to update; access the data storage service and update them 1 by 1
        // in short, a burst of PUT requests are made
        updatedRecipes.forEach((updatedRecipe: Recipe) => {
            this.dataStorageService.updateRecipe(updatedRecipe);
        });

        // clear the arrays that held the Firebase id's of the recipes to update and delete
        this.recipeService.flushRegisteredRecipes();

        // set the 'saving' flag to false
        this.saving = false;

        // set the 'saveSuccessful' active to display...
        this.saveSuccessful = true;

        // ...a success message to the user for 3 seconds
        setTimeout(() => {
            this.saveSuccessful = false;
        }, 3000);

    }

    // when fetching recipes
    onFetchRecipes() {

        // check if it's the first time 
        if (!this.alreadyFetched) {

            // set the fetching flag to true
            this.fetching = true;

            // subscribe to the fetchService get() observable but just to trigger the request (the service already sets the recipes
            // and triggers the recipeChanged subject to render the recipes, so no more work is required to do on the response)
            this.fetchRecipesSubscription = this.dataStorageService.fetchRecipes().subscribe();

            // set the first-time flag to true to never commit this action again
            this.alreadyFetched = true;

            // set the fetching task flag to false
            this.fetching = false;

            // set the fetchSuccessful active to...
            this.fetchSuccessful = true;

            // display a message for three seconds
            setTimeout(() => {
                this.fetchSuccessful = false;
            }, 3000);

        }

    }

    // unsubscriptions
    ngOnDestroy(): void {
        this.fetchRecipesSubscription.unsubscribe();
    }

}
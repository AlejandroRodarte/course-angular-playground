import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import * as RecipeActions from './recipes.actions';
import { switchMap, map, tap, mergeMap } from 'rxjs/operators';
import { Recipe } from '../recipe.model';
import { Router } from '@angular/router';
import { RecipeService } from './../recipe.service';

// firebase recipes
export type FirebaseRecipes = { [key: string]: Recipe };

// recipe effects (injectable to use services and http client)
@Injectable()
export class RecipesEffects {

    // inject the actions listener, the http client, the store, the recipe service and the router
    constructor(private actions$: Actions,
                private http: HttpClient,
                private recipeService: RecipeService,
                private router: Router) {

    }

    // event handler: fetch all recipes from database
    @Effect()
    fetchRecipes = 
        this
            .actions$
            .pipe(

                // filter: code triggered on GetRecipes dispatch
                ofType(
                    RecipeActions.GET_RECIPES
                ),

                // switchMap(): inner observable strategy
                // subscribe to the inner observable (http get request)
                // if another GetRecipes action is triggered, it will cancel/kill the previous subscription
                // and switch to the new http observable
                switchMap(

                    // no argument on function since no payload is given
                    () => {

                        // the inner observable: subscribed automatically by switchMap() which will trigger the response
                        return this
                                    .http
                                    .get<FirebaseRecipes>(
                                        'https://angular-course-app-eeedb.firebaseio.com/recipes.json'
                                    )
                                    .pipe(

                                        // map(): parse the Firebase recipes into an array of recipes
                                        map(

                                            // argument: the resolved FirebaseRecipes
                                            (firebaseRecipes: FirebaseRecipes) => {

                                                // list of recipes
                                                const recipes: Recipe[] = [];

                                                // sweep through the Firebase id keys in the big object
                                                for (const key in firebaseRecipes) {

                                                    // create a new recipe instance based on the information
                                                    const recipe: Recipe = firebaseRecipes[key];
                                                    recipe.id = key;

                                                    // add the recipe
                                                    recipes.push(recipe);

                                                }

                                                // dispatch a new AddRecipes action to add the recipes to the store
                                                // final sequence of events: GetRecipes -> AddRecipes
                                                return new RecipeActions.AddRecipes(recipes);

                                            }

                                        )

                                    );

                    }

                )

            );
    
    // post a single recipe
    @Effect()
    postRecipe = 
        this
            .actions$
            .pipe(

                // filter: code run on action PostRecipe
                ofType(RecipeActions.POST_RECIPE),

                // mergeMap(): inner observable strategy
                // subscribe to the inner observable (http post request)
                // if another PostRecipe action is dispatched, a new subscription will be made, leaving the unresolved ones
                // still working

                // mergeMap() allows us to work with http requests that can be sent simultaneously 
                // using swithMap() in this case would actually cause the second PostRecipe subscription cancel the first one, thus
                // cancelling the whole request

                // concatMap() would make the second PostRecipe request wait for the first subscription (http post request) to end (get a response)
                // creating a queue if multiple PostRecipe actions are emitted, each subscription being handled one after the other

                // mergeMap() allows us to create multiple subscriptions if multiple PostRecipe actions are dispatched
                mergeMap(

                    // arguments: the PostRecipe payload (object with the recipe object and its index)
                    (recipeData: RecipeActions.PostRecipe) => {

                        // the inner observable (http post observable): subscribed automatically by the mergeMap() strategy
                        return this
                                    .http
                                    .post<{ name: string }>(
                                        'https://angular-course-app-eeedb.firebaseio.com/recipes.json',
                                        recipeData.payload.recipe
                                    )
                                    .pipe(

                                        // map(): take advantage that the returned value is wrapped automatically in an
                                        // observable (requirement for @Effects that dispatch actions)
                                        map(

                                            (firebaseId: {name: string}) => {

                                                // dispatch an AttachId action to attach the response (Firebase id) into the recently
                                                // persisted recipe

                                                // mergeMap() allows us to create a continous streams of PostRecipe actions and since they are all executed
                                                // very quickly, these store-related actions are left at last

                                                // if concatMap() is used, we would create a big chain of synchronous events
                                                // PostRecipe -> AttachId -> PostRecipe -> AttachId -> PostRecipe -> Attach Id -> ...and so on
                                                return new RecipeActions.AttachId({
                                                    recipeIndex: recipeData.payload.index,
                                                    recipeId: firebaseId.name
                                                });

                                            }
                                        )

                                    );

                    }

                )

            );
        
    
    // post recipes
    @Effect()
    postRecipes = 
        this
            .actions$
            .pipe(

                // filter: only runs on PostRecipes action
                ofType(RecipeActions.POST_RECIPES),

                // switchMap(): inner observable strategy
                // subscribe to the inner observable (array of actions)
                // if another PostRecipes action comes along, it will cancel/kill the subscription and
                // start the incoming one
                switchMap(

                    // get the payload (list of recipes)
                    (recipesData: RecipeActions.PostRecipes) => {
        
                        // create an array of actions to commit sequentially
                        const actionArr: RecipeActions.PostRecipe[] = [];

                        // for each recipe to post in the payload, add a new PostRecipe action to dispatch
                        recipesData.payload.forEach((recipeData: {recipe: Recipe, index: number}) => {
                            actionArr.push(new RecipeActions.PostRecipe(recipeData));
                        });

                        // return the array of actions, @Effect wraps it inside an observable so that they are executed
                        // in sequence
                        return actionArr;
            
                    }

                )

            );


    // update recipe: same story as post recipe, just that we execute a put request and the aftermath action is
    // the ClearUpdate action
    @Effect()
    updateRecipe = 
        this
            .actions$
            .pipe(

                ofType(RecipeActions.PUT_RECIPE),

                mergeMap(

                    (recipeData: RecipeActions.PutRecipe) => {

                        return this
                                    .http
                                    .put<Recipe>(
                                        `https://angular-course-app-eeedb.firebaseio.com/recipes/${recipeData.payload.id}.json`,
                                        recipeData.payload.recipe
                                    )
                                    .pipe(

                                        map(
                                            () => {
                                                return new RecipeActions.ClearUpdate(recipeData.payload.id);
                                            }
                                        )

                                    );

                    }

                )
                
            );
    
    // update recipes: same story as post recipes, but working with put requests
    @Effect()
    updateRecipes = 
        this
            .actions$
            .pipe(

                ofType(RecipeActions.PUT_RECIPES),

                switchMap(

                    (recipesData: RecipeActions.PutRecipes) => {
        
                        const actionArr: RecipeActions.PutRecipe[] = [];

                        recipesData.payload.forEach((recipeData: {recipe: Recipe, id: string}) => {
                            actionArr.push(new RecipeActions.PutRecipe(recipeData));
                        });

                        return actionArr;
            
                    }

                )

            );

    // delete recipe: same story as post recipe and put recipe, just working now with delete requests and the
    // ClearDelete aftermath action
    @Effect()
    deleteRecipe = 
        this
            .actions$
            .pipe(

                ofType(RecipeActions.DELETE_RECIPE),

                mergeMap(

                    (recipeData: RecipeActions.DeleteRecipe) => {

                        return this.http
                            .delete<null>(
                                `https://angular-course-app-eeedb.firebaseio.com/recipes/${recipeData.payload}.json`
                            )
                            .pipe(
                            
                                map(
                                    () => {
                                        return new RecipeActions.ClearDelete(recipeData.payload);
                                    }
                                )
                                
                            );

                    }

                )

            );
    
    // delete recipes: same story as post recipes and put recipes, but working with DeleteRecipe actions
    @Effect()
    deleteRecipes = 
        this
            .actions$
            .pipe(

                ofType(RecipeActions.DELETE_RECIPES),

                switchMap(

                    (recipesData: RecipeActions.DeleteRecipes) => {
        
                        const actionArr: RecipeActions.DeleteRecipe[] = [];

                        recipesData.payload.forEach((recipeData: string) => {
                            actionArr.push(new RecipeActions.DeleteRecipe(recipeData));
                        });

                        return actionArr;
            
                    }

                )
            
            );

    // recipes redirection
    @Effect({
        dispatch: false
    })
    recipesRedirect = 
        this
            .actions$
            .pipe(
                
                // triggers whenever we add/update/remov/cancel a recipe on the UI
                ofType(
                    RecipeActions.ADD_RECIPE, 
                    RecipeActions.UPDATE_RECIPE, 
                    RecipeActions.REMOVE_RECIPE,
                    RecipeActions.CANCEL_RECIPE
                ),

                // tap(): execute some middle-ware code
                tap(

                    // navigate one level up relative to the current route saved up on the service
                    () => {
                        this.router.navigate(['../'], {
                            relativeTo: this.recipeService.currentRoute
                        });
                    }

                )
                
            );

}
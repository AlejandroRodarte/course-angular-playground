import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import * as RecipeActions from './recipes.actions';
import { switchMap, map, tap, mergeMap } from 'rxjs/operators';
import { Recipe } from '../recipe.model';
import { from , of } from 'rxjs';
import * as fromApp from './../../store/app.reducer';
import { Store } from '@ngrx/store';
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
                private store: Store<fromApp.AppState>,
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

                // switchMap(): switch final observable to observable returned in callback
                switchMap(

                    // no argument on function since no payload is given
                    () => {

                        // return an http get request observable
                        // for now, the global observable would resolve the FirebaseRecipes
                        return this
                                    .http
                                    .get<FirebaseRecipes>(
                                        'https://angular-course-app-eeedb.firebaseio.com/recipes.json'
                                    )
                                    .pipe(

                                        // map() change the returned observable to what the callback returns
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

                                                // return an action dispatch: Add Recipes
                                                // @Effect automatically wraps this into an observable, so no need
                                                // to wrap on an of() operator
                                                // this observable becomes the final returned observable so
                                                // fetchRecipes: Observable<RecipeActions.AddRecipes>
                                                return new RecipeActions.AddRecipes(recipes);

                                            }

                                        )

                                    );

                    }

                )

            );
    
    // post a single recipe
    // will not explicitly dispatch an action at the end of this code, but use the store
    // to dispatch some aftermath actions
    @Effect({
        dispatch: false
    })
    postRecipe = 
        this
            .actions$
            .pipe(

                // filter: code run on action PostRecipe
                ofType(RecipeActions.POST_RECIPE),

                // tap(): execute some generic middle-ware code
                tap(

                    // arguments: the PostRecipe payload (object with the recipe object and its index)
                    (recipeData: RecipeActions.PostRecipe) => {

                        // execute a post request and subscribe to it to trigger the request immediately
                        const subscription = 
                            this.http
                                .post<{ name: string }>(
                                    'https://angular-course-app-eeedb.firebaseio.com/recipes.json',
                                    recipeData.payload.recipe
                                )
                                .pipe(

                                    // tap(): execute some middle-ware code
                                    tap(

                                        // resolved post observable data: the Firebase id of the new recipe
                                        (firebaseId: {name: string}) => {

                                            // action dispatch: attach the Firebase id to the recently persisted recipe

                                            // one big note:
                                            // our first attempt was to actually dispatch this action like how we did it on the
                                            // fetchRecipes handler, but it failed, why?
                                            // such method would have made the action handler an observer of that http aftermath action
                                            // example: in this case, postRecipe = Observable<RecipeActions.AttachId>

                                            // this means that, whenever this effect runs, it will actually be resolved until the AttachId action ends
                                            // however, since dispatches are async, a chain of PostRecipe actions would make the second one overcome
                                            // immediately the first one, unabling it to wait for the AttachId resolve, making the last one the only one
                                            // to resolve it

                                            // by dispatching from the store, we are decoupling in essence the PostRecipe action from its AttachId aftermath action so when
                                            // a second PostRecipe action comes in after the first one ends, the AttachId action will still be in queue and not be cancelled

                                            // In other words, a chain of PostRecipe actions will certainly follow the normal order: the second PostRecipe will not run
                                            // until the first one finishes, but by dispatching a new action inside it and waiting for it to be resolved like we attempted
                                            // on the first time was not respected by the subsequent PostRecipe actions, cancelling all requests since they never got
                                            // fully completed except for the last one
                                            this.store.dispatch(new RecipeActions.AttachId({
                                                recipeIndex: recipeData.payload.index,
                                                recipeId: firebaseId.name
                                            }));

                                        }
                                    )

                                )
                                .subscribe(

                                    // once we get a response from the server, unsubscribe
                                    () => {
                                        subscription.unsubscribe();
                                    }

                                )

                    }

                )

            );
        
    
    // post recipes
    @Effect()
    postRecipes = this
        .actions$
        .pipe(

            // filter: only runs on PostRecipes action
            ofType(RecipeActions.POST_RECIPES),

            // switchMap(): switch current observable with returned observable
            switchMap(

                // get the payload (list of recipes)
                (recipesData: RecipeActions.PostRecipes) => {
    
                    // create an array of actions to commit sequentially (not waiting for aftermath)
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
        @Effect({
            dispatch: false
        })
        updateRecipe = 
            this
                .actions$
                .pipe(

                    ofType(RecipeActions.PUT_RECIPE),

                    tap(
                        
                        (recipeData: RecipeActions.PutRecipe) => {

                            const subscription = this.http
                                    .put<Recipe>(
                                        `https://angular-course-app-eeedb.firebaseio.com/recipes/${recipeData.payload.id}.json`,
                                        recipeData.payload.recipe
                                    )
                                    .pipe(

                                        tap(
                                            (recipe: Recipe) => {
                                                this.store.dispatch(new RecipeActions.ClearUpdate(recipeData.payload.id));
                                            }
                                        )

                                    ).subscribe(

                                        () => {
                                            subscription.unsubscribe();
                                        }

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
    @Effect({
        dispatch: false
    })
    deleteRecipe = 
        this
            .actions$
            .pipe(

                ofType(RecipeActions.DELETE_RECIPE),

                tap(

                    (recipeData: RecipeActions.DeleteRecipe) => {

                        const subscription = this.http
                            .delete<null>(
                                `https://angular-course-app-eeedb.firebaseio.com/recipes/${recipeData.payload}.json`
                            )
                            .pipe(
                            
                                tap(
                                    () => {
                                        this.store.dispatch(new RecipeActions.ClearDelete(recipeData.payload));
                                    }
                                )
                                
                            )
                            .subscribe(
                                () => {
                                    subscription.unsubscribe();
                                }

                            )

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
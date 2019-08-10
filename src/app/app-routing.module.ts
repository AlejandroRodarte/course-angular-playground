import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'

import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeResolverService } from './shared/recipe-resolver.service';

// application routes
// root: redirect to /recipes
// /recipes: load RecipesComponent
// /shopping-list: load ShoppingListComponent
const appRoutes: Routes = [

    // localhost:4200
    {
        path: '',
        redirectTo: '/recipes',
        pathMatch: 'full'
    },

    // localhost:4200/shopping-list
    {
        path: 'shopping-list',
        component: ShoppingListComponent
    },

    // localhost:4200/recipes
    
    // children:
    // localhost:4200/recipes -> load RecipeStartComponent
    // localhost:4200/recipes/id
    // localhost:4200/recipe/new -> load RecipeEditComponent to add a new recipe
    // localhost:4200/recipe/id/edit -> load RecipeEditComponent to edit an existing recipe

    // http update: paths localhost:4200/recipes/id and localhost:4200/recipes/id/edit will resolve
    // run the RecipeResolverService resolve() code before rendering their components (fetch data from db)
    {
        path: 'recipes',
        component: RecipesComponent,
        children: [
            {
                path: '',
                component: RecipeStartComponent 
            },
            {
                path: 'new',
                component: RecipeEditComponent
            },
            {
                path: ':id',
                component: RecipeDetailComponent,
                resolve: [RecipeResolverService]
            },
            {
                path: ':id/edit',
                component: RecipeEditComponent,
                resolve: [RecipeResolverService]
            }
        ]
    }

]

// load application routes to module and export it
@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}
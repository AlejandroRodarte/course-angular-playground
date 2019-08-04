import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'

import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';

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
    {
        path: 'recipes',
        component: RecipesComponent,
        children: [
            {
                path: '',
                component: RecipeStartComponent 
            },
            {
                path: ':id',
                component: RecipeDetailComponent
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
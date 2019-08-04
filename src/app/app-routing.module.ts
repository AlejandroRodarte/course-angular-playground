import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'

import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

// application routes
// root: redirect to /recipes
// /recipes: load RecipesComponent
// /shopping-list: load ShoppingListComponent
const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/recipes',
        pathMatch: 'full'
    },
    {
        path: 'shopping-list',
        component: ShoppingListComponent
    },
    {
        path: 'recipes',
        component: RecipesComponent
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
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { AuthComponent } from './auth/auth.component';

// application routes
// root: redirect to /recipes
// /recipes: load RecipesComponent
// /shopping-list: load ShoppingListComponent

// updated: /recipes child routes moved to recipes-routing.module.ts
// updated: /shopping-list route moved to shopping-list-routing.module.ts
const appRoutes: Routes = [

    // localhost:4200
    {
        path: '',
        redirectTo: '/recipes',
        pathMatch: 'full'
    },

    // localhost:4200/auth
    {
        path: 'auth',
        component: AuthComponent
    }

]

// load application routes to module and export it
// forRoot() loads the root routes once and the forChild() routes from other modules
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
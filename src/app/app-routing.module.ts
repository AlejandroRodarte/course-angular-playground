import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'

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
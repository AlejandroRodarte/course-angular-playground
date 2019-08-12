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
    },

    // localhost:4200/recipes
    // when accessing this parent route, we want to load its children in a lazy manner
    // (download code in a separate bundle when accessing the route)
    // we declare the path to our recipes.module.ts file, place a hashtag and then declare the name
    // of our module class
    {
        path: 'recipes',
        loadChildren: './recipes/recipes.module#RecipesModule'
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
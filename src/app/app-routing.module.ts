import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router'

// main routes
const appRoutes: Routes = [

    // /: redirect to /recipes (on exact match of path)
    {
        path: '',
        redirectTo: '/recipes',
        pathMatch: 'full'
    },

    // lazy-loading of the RecipesModule when accessing /recipes
    {
        path: 'recipes',
        loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule)
    },

    // lazy-loading of the ShoppingListModule when accessing /shopping-list
    {
        path: 'shopping-list',
        loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule)
    },

    // lazy-loading of the AuthModule when accessing /auth
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    }

]

@NgModule({

    // imports: router module and register main routes
    // attempt to preload all lazy modules for optimization
    imports: [
        RouterModule.forRoot(
            appRoutes,
            {
                preloadingStrategy: PreloadAllModules
            }
        )
    ],

    // export router module with routes registered
    exports: [
        RouterModule
    ]

})
export class AppRoutingModule {

}
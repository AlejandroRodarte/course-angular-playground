import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { AuthGuard } from '../auth/auth.guard';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeResolverService } from './recipe-resolver.service';
import { NgModule } from '@angular/core';

const recipeRoutes: Routes = [

    {

        // /recipes: empty since it was declared on AppModule for lazy-loading
        path: '',

        component: RecipesComponent,

        canActivate: [
            AuthGuard
        ],

        children: [

            // /recipes
            {
                path: '',
                component: RecipeStartComponent 
            },

            // /recipes/new
            {
                path: 'new',
                component: RecipeEditComponent
            },

            // /recipes/id
            {
                path: ':id',
                component: RecipeDetailComponent,
                resolve: [
                    RecipeResolverService
                ]
            },

            // /recipes/id/edit
            {
                path: ':id/edit',
                component: RecipeEditComponent,
                resolve: [
                    RecipeResolverService
                ]
            }

        ]

    }

]

// import the RouterModule, and use forChild() to attach to our app-routing.module.ts the
// /recipes child routes and its children (forRoot() only runs once)
@NgModule({
    imports: [
        RouterModule.forChild(recipeRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class RecipesRoutingModule {

}
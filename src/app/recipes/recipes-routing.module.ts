import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { AuthGuard } from '../auth/auth.guard';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeResolverService } from './recipe-resolver.service';
import { NgModule } from '@angular/core';

// /recipes routes and children
const recipeRoutes: Routes = [

    // localhost:4200/recipes
    
    // children:
    // localhost:4200/recipes -> load RecipeStartComponent
    // localhost:4200/recipes/id
    // localhost:4200/recipe/new -> load RecipeEditComponent to add a new recipe
    // localhost:4200/recipe/id/edit -> load RecipeEditComponent to edit an existing recipe

    // http update: paths localhost:4200/recipes/id and localhost:4200/recipes/id/edit will resolve
    // run the RecipeResolverService resolve() code before rendering their components (fetch data from db)

    // the /recipes compoenent will now have the AuthGuard to prevent access to this route on unauthorized users
    {

        path: 'recipes',

        component: RecipesComponent,

        canActivate: [
            AuthGuard
        ],

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
                resolve: [
                    RecipeResolverService
                ]
            },

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
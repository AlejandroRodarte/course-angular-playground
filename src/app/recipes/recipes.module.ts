import { NgModule } from '@angular/core';
import { RecipesComponent } from './recipes.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipesRoutingModule } from './recipes-routing.module';
import { SharedModule } from '../shared/shared.module';

// module to handle everything related to recipes
// RecipesRoutingModule: Module with all the /recipes child routes declared
// CommonModule: replacement for BrowserModule to get access to directives such as *ngIf anf *ngFor
// ReactiveFormsModule: we use reactive form to add/update a recipe

// since the all the recipe components are not loaded by the app module or any of its components,
// and we load them only through the RecipesRoutingModule, there is no need to export them, but stil
// declare them here to use them on our RecipesRoutingModule
// now using shared module to have access to shared components/directives/modules
@NgModule({

    declarations: [
        RecipesComponent,
        RecipeDetailComponent,
        RecipeListComponent,
        RecipeItemComponent,
        RecipeStartComponent,
        RecipeEditComponent
    ],

    imports: [
        RecipesRoutingModule,
        ReactiveFormsModule,
        SharedModule
    ]

})
export class RecipesModule {

}
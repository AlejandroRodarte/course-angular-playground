import { NgModule } from '@angular/core';
import { RecipesComponent } from './recipes.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// module to handle everything related to recipes
// RouterModule: The RecipesComponent uses the <router-outlet> directive
// CommonModule: replacement for BrowserModule to get access to directives such as *ngIf anf *ngFor
// ReactiveFormsModule: we use reactive form to add/update a recipe
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
        RouterModule,
        CommonModule,
        ReactiveFormsModule
    ],

    exports: [
        RecipesComponent,
        RecipeDetailComponent,
        RecipeListComponent,
        RecipeItemComponent,
        RecipeStartComponent,
        RecipeEditComponent
    ]

})
export class RecipesModule {

}
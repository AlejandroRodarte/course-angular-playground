// required imports for the app go here

// default modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// FormsModule enables directives to set model attributes
import { FormsModule } from '@angular/forms';

// import root and custom components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';

// here go the components/modules we will implement on our app
// declarations : declare all components 
// imports : declare required external modules
// bootstrap : component to load when kickstarting app
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    RecipeDetailComponent,
    RecipeListComponent,
    RecipeItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

// required imports for the app go here

// default modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// FormsModule enables directives to set model attributes
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// import root and custom components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AppRoutingModule } from './app-routing.module';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';


// here go the components/modules we will implement on our app
// declarations : declare all components 
// imports : declare required external modules
// bootstrap : component to load when kickstarting app

// section 10: ShoppingListService becomes a global service since it will also be used
// by the recipes components later on
// section 12: add the App Routing module
// section 16: added the reactive forms module
// section 19: added the http client module
// section 20: added the authentication component
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    RecipeDetailComponent,
    RecipeListComponent,
    RecipeItemComponent,
    DropdownDirective,
    RecipeStartComponent,
    RecipeEditComponent,
    AuthComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ShoppingListService],
  bootstrap: [AppComponent]
})
export class AppModule { }

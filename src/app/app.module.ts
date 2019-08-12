// required imports for the app go here

// default modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// FormsModule enables directives to set model attributes
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// import root and custom components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AppRoutingModule } from './app-routing.module';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AlertComponent } from './shared/alert/alert.component';
import { PlaceholderDirective } from './shared/placeholder/placeholder.directive';
import { RecipesModule } from './recipes/recipes.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';


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

// added the AuthInterceptorService to append the user token on each subsequent request
// section 21: added the AlertComponent, added the PlaceHolder Directive

// entryComponents: components that should be loaded on runtime (via a factory)

// update: deleted recipes component since they moved to the recipes.module.ts
// RecipesModule imports RecipesRoutingModule, so we still have access to /recipes child routes

// updated: deleted shopping list components and declared them on the shopping-list.module.ts
@NgModule({

	declarations: [
		AppComponent,
		HeaderComponent,
		DropdownDirective,
		AuthComponent,
		LoadingSpinnerComponent,
		AlertComponent,
		PlaceholderDirective
	],

	imports: [
		BrowserModule,
		FormsModule,
		AppRoutingModule,
		ReactiveFormsModule,
		HttpClientModule,
		RecipesModule,
		ShoppingListModule
	],

	providers: [

		ShoppingListService,

		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptorService,
			multi: true
		}

	],

	bootstrap: [
		AppComponent
	],

	entryComponents: [
		AlertComponent
	]
	
})
export class AppModule {

}

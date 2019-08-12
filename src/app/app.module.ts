// required imports for the app go here
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';


// StoreModule: module to create our store
import { StoreModule } from '@ngrx/store';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';


import { shoppingListReducer } from './shopping-list/store/shopping-list.reducer';


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
// now using shared module to have access to shared components/directives/modules
// added the core module to notify angular of our root services
// added now the AuthModule
// imported modules are loaded eagerly
// since now the RecipesModule is loaded lazily (in a separate coed bundle), we delete it from here
// also deleted eager loading of the AuthModule and ShoppingListModule

// NgRx: added the StoreModule and gave it a map to our reducers
@NgModule({

	declarations: [
		AppComponent,
		HeaderComponent
	],

	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		StoreModule.forRoot({
			shoppingList: shoppingListReducer
		}),
		SharedModule,
		CoreModule
	],

	bootstrap: [
		AppComponent
	]
	
})
export class AppModule {

}

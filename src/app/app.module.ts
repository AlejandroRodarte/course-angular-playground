import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { shoppingListReducer } from './shopping-list/store/shopping-list.reducer';

// app module
@NgModule({

	// requires components
	declarations: [
		AppComponent,
		HeaderComponent
	],

	// imports: main routing module, http client, NgRx store (add Action-Reducer Map),
	// shared module and core module for services
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

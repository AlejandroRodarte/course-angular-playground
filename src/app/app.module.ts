import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { appReducer } from './store/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/store/auth.effects';

// app module
@NgModule({

	// requires components
	declarations: [
		AppComponent,
		HeaderComponent
	],

	// imports: main routing module, http client, NgRx store (add Action-Reducer Map),
	// shared module and core module for services
	// to declare the ActionReducerMap, we access its definition found on the app.reducer.ts file

	// EffectsModule: use @Effects for side effect code to work
	// use forRoot() to register all Effect classes
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		StoreModule.forRoot(appReducer),
		EffectsModule.forRoot([
			AuthEffects
		]),
		SharedModule,
		CoreModule
	],

	bootstrap: [
		AppComponent
	]
	
})
export class AppModule {

}

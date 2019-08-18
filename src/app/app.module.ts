import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { appReducer } from './store/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/store/auth.effects';
import { environment } from '../environments/environment';
import { RecipesEffects } from './recipes/store/recipes.effects';

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

	// added the StoreDevtoolsModule with .instrument() to inform we want to log only during development
	imports: [
		BrowserModule.withServerTransition({ appId: 'serverApp' }),
		AppRoutingModule,
		HttpClientModule,
		StoreModule.forRoot(appReducer),
		StoreDevtoolsModule.instrument({
			logOnly: environment.production
		}),
		StoreRouterConnectingModule.forRoot(),
		EffectsModule.forRoot([
			AuthEffects,
			RecipesEffects
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

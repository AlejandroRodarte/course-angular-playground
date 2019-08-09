import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// the http client module will allow us to make http requests
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthInterceptorService } from './auth-interceptor.service';
import { LoggingInterceptorService } from './logging-interceptor.service';

// on the app module we declare that we will import the http client module

// declaring interceptors
// provide: HTTP_INTERCEPTORS -> token to indicate this service is an http interceptor
// useClass: interceptor class
// multi: allow for multiple interceptors
// ORDER MATTERS: interceptors are executed as they are declared here from top to bottom
@NgModule({

	declarations: [
		AppComponent
	],

	imports: [
		BrowserModule, 
		FormsModule, 
		HttpClientModule
	],

	providers: [

		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptorService,
			multi: true
		},

		{
			provide: HTTP_INTERCEPTORS,
			useClass: LoggingInterceptorService,
			multi: true
		}

	],

	bootstrap: [
		AppComponent
	]
	
})
export class AppModule {}

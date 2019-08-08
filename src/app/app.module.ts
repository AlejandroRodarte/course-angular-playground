import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// the http client module will allow us to make http requests
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

// on the app module we declare that we will import the http client module
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

	],

	bootstrap: [
		AppComponent
	]
	
})
export class AppModule {}

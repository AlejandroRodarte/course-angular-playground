// required imports for the app go here

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// FormsModule enables directives to set model attributes
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

// here go the components/modules we will implement on our app 
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

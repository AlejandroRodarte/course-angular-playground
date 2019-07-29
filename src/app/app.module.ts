import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// required imports for the app go here
// FormsModule enables directives to set model attributes
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

// on the imports property we place all the required angular sub-modules we need to make our app work
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

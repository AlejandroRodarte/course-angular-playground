// required imports for the app go here

// default modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// FormsModule enables directives to set model attributes
import { FormsModule } from '@angular/forms';

// import root and custom components
import { AppComponent } from './app.component';
import { ServerComponent } from './server/server.component';

// here go the components/modules we will implement on our app
// declarations : declare all components 
// imports : declare required external modules
// bootstrap : component to load when kickstarting app
@NgModule({
  declarations: [
    AppComponent,
    ServerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

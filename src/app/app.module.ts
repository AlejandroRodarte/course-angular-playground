import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';


// app module
@NgModule({

    // requires components
    declarations: [
      AppComponent,
      UserComponent
    ],

    imports: [
      BrowserModule
    ],

    bootstrap: [
        AppComponent
    ]

})
export class AppModule {

}

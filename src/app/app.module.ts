import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';


// app module
@NgModule({

    // requires components
    declarations: [
        AppComponent
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

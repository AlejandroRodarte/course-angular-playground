import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AlertComponent } from './alert.component';


// app module
@NgModule({

    // requires components
    declarations: [
        AppComponent,
        AlertComponent
    ],

    imports: [
        BrowserModule
    ],

    bootstrap: [
        AppComponent
    ],

    // register the component to render dynamically on the entryComponents property since it won't be hardcoded in the app
    // but be implemented through a factory
    entryComponents: [
        AlertComponent
    ]

})
export class AppModule {

}

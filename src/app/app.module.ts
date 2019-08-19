import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import {ReversePipe} from './shared/reverse.pipe';


// app module
@NgModule({

    // requires components
    declarations: [
        AppComponent,
        UserComponent,
        ReversePipe
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

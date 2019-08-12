import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';

// authentication module
// declare authentication related modules
// we need the forms module, the auth routing module and the shared module
// since we require to load some components/directives/modules from there and also the CommonsModule

// we do not export the AuthComponent since no other external component outside of this module will load
// this component
@NgModule({

    declarations: [
        AuthComponent
    ],

    imports: [
        FormsModule,
        AuthRoutingModule,
        SharedModule
    ]

})
export class AuthModule {

}
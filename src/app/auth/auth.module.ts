import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';

// authentication module
@NgModule({

    // required authentication components
    declarations: [
        AuthComponent
    ],

    // imports: requires forms, its routing schema and the shared module for the
    // PlaceholderDirective
    imports: [
        FormsModule,
        AuthRoutingModule,
        SharedModule
    ]

})
export class AuthModule {

}
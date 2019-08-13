import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';

// authentication routes
const authRoutes: Routes = [

    // localhost:4200/auth
    {
        path: '',
        component: AuthComponent
    }

]

@NgModule({

    // import router module: load auth routes
    imports:[
        RouterModule.forChild(authRoutes)
    ],

    // export router module with loaded routes
    exports: [
        RouterModule
    ]

})
export class AuthRoutingModule {

}
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';

// authentication routes
const authRoutes: Routes = [

    // localhost:4200/auth
    {
        path: 'auth',
        component: AuthComponent
    }

]

// import router module and load authentication routes
// export the router module with routes loaded
@NgModule({

    imports:[
        RouterModule.forChild(authRoutes)
    ],

    exports: [
        RouterModule
    ]

})
export class AuthRoutingModule {

}
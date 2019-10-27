import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingListComponent } from './shopping-list.component';

// shopping list route definitions
const shoppingListRoutes: Routes = [

    // localhost:4200/shopping-list
    // cleared path since we are already loading it on AppModule with lazy-loading
    {
        path: '',
        component: ShoppingListComponent
    }

]

// NgModule, import the router module and register all related shopping list routes
// and export the router module with the registered routes
@NgModule({

    imports: [
        RouterModule.forChild(shoppingListRoutes)
    ],

    exports: [
        RouterModule
    ]

})
export class ShoppingListRoutingModule {

}
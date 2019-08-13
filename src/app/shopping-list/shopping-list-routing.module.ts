import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingListComponent } from './shopping-list.component';


const shoppingListRoutes: Routes = [

    // /shopping-list
    // path empty since its declared on AppRoutingModule for lazy-loading
    {
        path: '',
        component: ShoppingListComponent
    }

]

// shopping list routing moduke
@NgModule({

    // import routing module and register routes
    imports: [
        RouterModule.forChild(shoppingListRoutes)
    ],

    // export routing module with loaded routes
    exports: [
        RouterModule
    ]

})
export class ShoppingListRoutingModule {

}
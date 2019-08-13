import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

// shopping list module
@NgModule({

    // required components
    declarations: [
        ShoppingListComponent,
		ShoppingEditComponent
    ],

    // imported modules: its own routing module, template form module and shared module
    imports: [
        ShoppingListRoutingModule,
        FormsModule,
        SharedModule
    ]

})
export class ShoppingListModule {

}
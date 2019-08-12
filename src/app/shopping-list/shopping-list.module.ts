import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

// shopping list module
// declarations: all shopping list related components
// imports: we use our own shopping list routing module, the common module to access ngIf and ngFor directives
// and we use the FormsModule since our form is template-driven
// now using shared module to have access to shared components/directives/modules
@NgModule({

    declarations: [
        ShoppingListComponent,
		ShoppingEditComponent
    ],

    imports: [
        ShoppingListRoutingModule,
        FormsModule,
        SharedModule
    ]

})
export class ShoppingListModule {

}
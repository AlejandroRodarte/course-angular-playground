import { NgModule } from '@angular/core';
import { AlertComponent } from './alert/alert.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { PlaceholderDirective } from './placeholder/placeholder.directive';
import { DropdownDirective } from './dropdown.directive';
import { CommonModule } from '@angular/common';

// shared module
@NgModule({

    // declared components and directives
    declarations: [
        AlertComponent,
        LoadingSpinnerComponent,
        PlaceholderDirective,
        DropdownDirective
    ],

    // imports: these components and directives make use of the CommonModule
    imports: [
        CommonModule
    ],

    // exports: for these components and directives to be used by other modules, we also
    // export them
    exports: [
        AlertComponent,
        LoadingSpinnerComponent,
        PlaceholderDirective,
        DropdownDirective,
        CommonModule
    ],

    // AlertComponent must be loaded on demand (through a factory)
    entryComponents: [
		AlertComponent
	]

})
export class SharedModule {

}
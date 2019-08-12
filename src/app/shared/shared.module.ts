import { NgModule } from '@angular/core';
import { AlertComponent } from './alert/alert.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { PlaceholderDirective } from './placeholder/placeholder.directive';
import { DropdownDirective } from './dropdown.directive';
import { CommonModule } from '@angular/common';
import { LoggingService } from '../logging.service';

// shared module
// we declare all the shared components, directives and modules
// since we won't load these components from inside this module, but we want to make
// these features AVAILABLE to other modules, we export these same components, directives and modules
// so that when a module imports this shared module has access to all these components, directives and modules
@NgModule({

    declarations: [
        AlertComponent,
        LoadingSpinnerComponent,
        PlaceholderDirective,
        DropdownDirective
    ],

    imports: [
        CommonModule
    ],

    exports: [
        AlertComponent,
        LoadingSpinnerComponent,
        PlaceholderDirective,
        DropdownDirective,
        CommonModule
    ],

    providers: [
        LoggingService
    ],

    entryComponents: [
		AlertComponent
	]

})
export class SharedModule {

}
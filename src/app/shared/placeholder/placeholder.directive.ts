import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[appPlaceholder]'
})
export class PlaceholderDirective {

    // the view container ref allows us to get a pointer to where the element that has
    // this directive written is in the DOM
    constructor(public viewContainerRef: ViewContainerRef) {

    }

}
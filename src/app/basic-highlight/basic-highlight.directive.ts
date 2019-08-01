import { Directive, ElementRef, OnInit } from '@angular/core';

// basic highlight custom directive

// @Directive configuration
// arguments
// selector: the way we will annotate the directive on our properties
// [appBasicHighlight]: Angular will scan for html elements that have the appBasicHighlight property
@Directive({
    selector: '[appBasicHighlight]'
})
export class BasicHighlightDirective implements OnInit {

    // when an instance of this directive is created, we receive an injecto from an Angular:
    // a reference to the HTML Element that has this directive attached
    constructor(private elementRef: ElementRef) {

    }

    // it is normal to apply the code of this directive on the ngOnInit() lifecycle method
    // apply some green background
    ngOnInit() {
        this.elementRef.nativeElement.style.backgroundColor = 'green';
    }

}
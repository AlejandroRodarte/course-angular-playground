import { Directive, ViewContainerRef, ElementRef, Renderer2, Input, HostListener } from '@angular/core';

// dropdown directive
@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {

    // toggle
    isOpen: boolean = false;

    // constructor
    constructor(private elementRef: ElementRef, private renderer: Renderer2) {

    }

    // listen for a click on the document itself, capture the event object
    @HostListener('document:click', ['$event'])
    mouseenter(event: Event): void {

        // switch toggle logic: we will use event delegation
        // we will condition if what the user clicked happens to be the first child of the html element that has this directive
        // the first child happen to be the dropdown buttons
        // in essence, we are asking if the user happened to click on any of the dropdown buttons
        // if true, toggle to dropdown (open or close), if false, that means the user clicked outsite of the dropdown menu if already open
        // so set to false
        this.isOpen = event.target === this.elementRef.nativeElement.firstChild ? !this.isOpen : false;

        // if true, add the .open bootstrap class to display dropdown elements
        // if false, remove the .open class
        if (this.isOpen) {
            this.renderer.addClass(this.elementRef.nativeElement, 'open');
        } else {
            this.renderer.removeClass(this.elementRef.nativeElement, 'open');
        }

    }

}
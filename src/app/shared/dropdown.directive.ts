import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

// dropdown directive
@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {

    // toggle to know whether the dropdown is open or not
    isOpen: boolean = false;

    // get reference to element that has the directive on
    // get renderer to be able to add classes to this element
    constructor(private elementRef: ElementRef, private renderer: Renderer2) {

    }

    // listen for a click on the document itself, capture the event object
    @HostListener('document:click', ['$event'])
    toggleOpen(event: Event): void {

        // switch toggle logic
        // check if what the user clicked on the entire document (target) is the first child of
        // the element reference that has this directive, which is the dropdown link
        // if true: toggle the open flag, if false: clear the flag
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
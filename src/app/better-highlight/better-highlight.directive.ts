import { Directive, Renderer2, OnInit, ElementRef, HostListener, HostBinding } from '@angular/core';

// better highlight directive
@Directive({
  	selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {

	// bind to the style.backgroundColor of the html native element with @HostBinding
	@HostBinding('style.backgroundColor')
	backgroundColor: string = 'transparent';

	// constructor: access to the element that has the directive
	// and a renderer instance to access the DOM (best practice)
	constructor(private elementRef: ElementRef, private renderer: Renderer2) { 

	}

	// to apply a style to the element, use the renderer instance (has the usual DOM manipulation methods)
	// and call setStyle(), where we can pass the native element, the property css name and the value
	ngOnInit(): void {
		// this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'blue');
	}

	// @HostListener, listen for the native mouseenter event, make background color blue
	@HostListener('mouseenter')
	mouseenter(eventData: Event): void {
		// this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'blue');
		this.backgroundColor = 'blue'
	}

	// @HostListener, listen for the native mouseleave event, make background color transparent
	@HostListener('mouseleave')
	mouseleave(eventData: Event): void {
		// this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'transparent');
		this.backgroundColor = 'transparent';
	}

}

import { Directive, Renderer2, OnInit, ElementRef, HostListener } from '@angular/core';

// better highlight directive
@Directive({
  	selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {

	// constructor: access to the element that has the directive
	// and a renderer instance to access the DOM (best practice)
	constructor(private elementRef: ElementRef, private renderer: Renderer2) { 

	}

	// to apply a style to the element, use the renderer instance (has the usual DOM manipulation methods)
	// and call setStyle(), where we can pass the native element, the property css name and the value
	ngOnInit(): void {
		// this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'blue');
	}

	@HostListener('mouseenter')
	mouseenter(eventData: Event): void {
		this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'blue');
	}

	@HostListener('mouseleave')
	mouseleave(eventData: Event): void {
		this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'transparent');
	}

}

import { Directive, Renderer2, OnInit, ElementRef, HostListener, HostBinding, Input } from '@angular/core';

// better highlight directive
@Directive({
  	selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {

	// input that we will receive from our html element that has the directive: default color
	// [defaultColor] = 'someColor'
	@Input()
	defaultColor: string = 'transparent';

	// input that we will receive from our html element that has the directive: highlight color
	// special case: our alias for this input matches the directive selector, so we can to this
	// [appBetterHighlight] = 'someColor'
	@Input('appBetterHighlight')
	highlightColor: string = 'blue';

	// bind to the style.backgroundColor of the html native element with @HostBinding
	@HostBinding('style.backgroundColor')
	backgroundColor: string;

	// constructor: access to the element that has the directive
	// and a renderer instance to access the DOM (best practice)
	constructor(private elementRef: ElementRef, private renderer: Renderer2) { 

	}

	// to apply a style to the element, use the renderer instance (has the usual DOM manipulation methods)
	// and call setStyle(), where we can pass the native element, the property css name and the value
	ngOnInit(): void {
		// this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'blue');
		this.backgroundColor = this.defaultColor;
	}

	// @HostListener, listen for the native mouseenter event, make background color the highlight color
	@HostListener('mouseenter')
	mouseenter(eventData: Event): void {
		// this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'blue');
		this.backgroundColor = this.highlightColor;
	}

	// @HostListener, listen for the native mouseleave event, make background color the default color
	@HostListener('mouseleave')
	mouseleave(eventData: Event): void {
		// this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'transparent');
		this.backgroundColor = this.defaultColor;
	}

}

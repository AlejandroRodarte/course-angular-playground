import { Component, OnInit, Input, ViewEncapsulation, OnChanges, SimpleChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewChecked, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';

// interface for object literals that represent single server element
export interface ServerElement {
	type: string;
	name: string;
	content: string;
}

@Component({
	selector: 'app-server-element',
	templateUrl: './server-element.component.html',
	styleUrls: ['./server-element.component.css'],
	encapsulation: ViewEncapsulation.Emulated
})
export class ServerElementComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {

	// element of type ServerElement
	// @Input: make this field public for parent components to access and pass in values
	@Input('srvElement')
	element: ServerElement;

	// component lifecycle demo: name property, binded with @Input with parent components to receive information from them
	@Input()
	name: string;

	// accessing html element with local reference #header
	@ViewChild('heading', { static : true })
	header: ElementRef;

	// 1. constructor is called (once)
    constructor() {
		console.log('constructor called');
	}

	// 2. onChanges is called (and each time a component property does)
	// returns a changes argument that contains the previous component properties (before the change) and the actual component properties
	ngOnChanges(changes: SimpleChanges) {
		console.log('ngOnChanges called');
		console.log(changes);
	}

	// 3. onInit is called (once)
	// text content is still not available
    ngOnInit() {
		console.log('ngOnInit called');
		console.log('Text Content: ' + this.header.nativeElement.textContent);
	}
	
	// 4. doCheck is called (and each time a change occurs according to Angular standards, which is a lot)
	ngDoCheck() {
		console.log('ngDoCheck called');
	}

	// 5. afterContentInit is called (once)
	ngAfterContentInit() {
		console.log('ngAfterContentInit called');
	}

	// 6. afterContentChecked is called (and each time the component content such as a property, changes)
	ngAfterContentChecked() {
		console.log('ngAfterContentChecked called');
	}

	// 7. afterViewInit is called (once)
	// text content from template is now available
	ngAfterViewInit() {
		console.log('ngAfterViewInit called');
		console.log('Text Content: ' + this.header.nativeElement.textContent);
	}

	// 8. afterViewChecked is called (and each time the component template changes)
	ngAfterViewChecked() {
		console.log('ngAfterViewChecked called');
	}

	// 9. ngOnDestroy is called (once, before destroying the component)
	ngOnDestroy() {
		console.log('ngOnDestroy called');
	}

}

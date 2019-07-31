import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

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
export class ServerElementComponent implements OnInit {

	// element of type ServerElement
	// @Input: make this field public for parent components to access and pass in values
	@Input('srvElement')
	element: ServerElement;

    constructor() { }

    ngOnInit() {
    }

}

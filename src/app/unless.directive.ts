import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';

// unless directive
@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {

	// unless property
	// this is still a property, but the 'set' keyword allows a method to run each time its binded value changes
	// [unless]="expression"
	// where the expression is represented here as the 'condition' parameter: which should be a boolean value
	@Input()
	set appUnless(condition: boolean) {

		// if condition is false: display content found inside the 
		// <ng-template> html selector found on our component html

		// if condition is true: do not display <ng-template> content
		if (!condition) {

			// createEmbeddedView(): get a view from the view content reference
			// simply append the template we want to display
			this.vcRef.createEmbeddedView(this.templateRef);

		} else {
			
			// clear(): remove everything from this template on the DOM
			this.vcRef.clear();

		}

	}

	// angular injects automatically the template reference (<ng-template> content)
	// on all <ng-templates> that have attached this directive

	// also, we receive injected a view content reference to know where to place the <ng-template> content
    constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef) {

	}

}

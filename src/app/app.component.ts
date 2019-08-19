import {Component, Injector} from '@angular/core';
import {createCustomElement} from '@angular/elements';
import {AlertComponent} from './alert.component';
import {DomSanitizer} from '@angular/platform-browser';

// component that will render the dynamic component
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    content = null;

    // constructor: requires an injector since all components have a way for them to receive a form of dependency injection
    // domSanitizer: injection required to fully load the dynamic component and bypass the security trust by html since the dynamic
    // content to render is safe
    constructor(injector: Injector, domSanitizer: DomSanitizer) {

        // create the Angular Element with its component definition and the createCustomElement() method
        const AlertElement = createCustomElement(AlertComponent, {
            injector
        });

        // register on the DOM a new html element named <app-alert></app-alert> that will render the new Angular Element
        // the name can actually whatever you want, it does not need to be the component's selector name
        customElements.define('app-alert', AlertElement);

        // use the dom sanitizer and insert the html that represents the dynamic Angular Element to load
        setTimeout(() => {
            this.content = domSanitizer.bypassSecurityTrustHtml(`<app-alert message='Rendered Dynamically'></app-alert>`);
        }, 1000);

    }

}

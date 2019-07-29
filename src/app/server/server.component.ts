// import the @Component decorator
import { Component } from '@angular/core';

// before declaring the component class definition, we inform Angular that this class
// is an Angular component (Angular will instantiate this class when we load the app)
// selector : parent node selector to find on app.componet.html to inject the compoent template
// templateUrl : HTML template of the component
// styleUrls : array of paths to CSS stylesheets for the component
@Component({
    selector: 'app-server',
    templateUrl: './server.component.html',
    styleUrls: ['./server.component.css']
})

// custom component : server component
export class ServerComponent {
}
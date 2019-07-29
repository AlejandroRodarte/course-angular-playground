import { Component } from '@angular/core';

// warning alert component class definition with @component pointing to selector to watch on app.component.html
// and the component's html and css files
@Component({
    selector: 'app-warning-alert',
    templateUrl: './warning-alert.component.html',
    styleUrls: ['./warning-alert.component.css']
})
export class WarningAlertComponent {

}
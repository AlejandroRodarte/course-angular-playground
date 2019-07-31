import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {

    // event emitter to send the section we want to display
    @Output()
    featureToDisplay = new EventEmitter<string>();

    // onSectorChange event handler, emit the feature to display on the root component
    onFeatureChange(feature: string): void {
        this.featureToDisplay.emit(feature);
    }

}
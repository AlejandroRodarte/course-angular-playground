import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css']
})
export class AlertComponent {

    // message received by parent component through property binding
    @Input()
    message: string;

    // event emitter for parent component to listen
    @Output()
    close = new EventEmitter<void>();

    // when close button is clicked, inform parent component
    onClose() {
        this.close.emit();
    }

}
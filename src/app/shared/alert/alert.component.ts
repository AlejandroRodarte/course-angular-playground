import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css']
})
export class AlertComponent {

    // message received by parent component through property binding
    @Input()
    private message: string;

    @Output()
    close = new EventEmitter<void>();

    onClose() {
        this.close.emit();
    }

}
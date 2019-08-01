import { Component, EventEmitter, Input, Output } from '@angular/core';

// account component
@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css']
})
export class AccountComponent {

    // receive the current account info from root component *ngFor directive
    @Input() 
    account: {name: string, status: string};

    // receive the id of the account (index of the *ngFor loop)
    @Input() 
    id: number;

    // event emitter: root component will listen for this statusChanged emitter
    @Output() 
    statusChanged = new EventEmitter<{id: number, newStatus: string}>();

    // onSetTo() event handler: emit data through the statusChanged emitter
    onSetTo(status: string) {

        // send the target accout id and the new status value
        this.statusChanged.emit({
            id: this.id, 
            newStatus: status}
        );

        console.log('A server status changed, new status: ' + status);

    }

}

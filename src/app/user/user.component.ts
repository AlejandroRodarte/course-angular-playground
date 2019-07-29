import { Component } from '@angular/core';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent {

    // username property
    private username: string = 'Alex';

    // check if username is empty
    isUsernameEmpty(): boolean {
        return this.username.length === 0;
    }

    // event handler for clear button click, clear the username
    clearUsername(): void {
        this.username = '';
    }

}
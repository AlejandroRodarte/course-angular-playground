import { Injectable, AfterContentChecked, AfterViewChecked, DoCheck } from '@angular/core';
import { CounterService } from './counter.service';

// enum to represent user status
export enum UserStatus {
    Active = 'active',
    Inactive = 'inactive'
}

// interface to define properties of a user object literal
export interface UserProps {
    name: string;
    status: UserStatus;
}

// user service
// @Injectable to inject a counterService instance
@Injectable()
export class UserService {

    // list of users with the name and the status
    users: UserProps[] = [
        {
            name: 'Mark',
            status: UserStatus.Active
        },
        {
            name: 'John',
            status: UserStatus.Active
        },
        {
            name: 'Mary',
            status: UserStatus.Inactive
        },
        {
            name: 'Samantha',
            status: UserStatus.Inactive
        }
    ]

    // reference to counterService counters
    inactiveToActive: number = 0;
    activeToInactive: number = 0;

    // counter service injection
    constructor(private counterService: CounterService) {

    }

    // update a target user's status
    updateUserStatus(id: number, newStatus: UserStatus): void {

        // update the status
        this.users[id].status = newStatus;

        // check the status
        switch (newStatus) {
            
            // if new status is active, increment inactive to active counter
            // if new status is inactive, increment active to inactive counter
            case UserStatus.Active:
                this.counterService.incrementInactiveToActive();
                this.inactiveToActive = this.counterService.inactiveToActive;
                break;
            case UserStatus.Inactive:
                this.counterService.incrementActiveToInactive();
                this.activeToInactive = this.counterService.activeToInactive;
                break;
            default:
                console.log('lol');

        }

    }

}
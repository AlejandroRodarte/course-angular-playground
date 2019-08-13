import { Action } from '@ngrx/store';

// action types
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

// union type to define all possible auth actions
export type AuthActions = Login | Logout;

// login action
export class Login implements Action {

    readonly type = LOGIN;

    // receive raw user data
    constructor(public payload: {
        email: string,
        userId: string,
        token: string,
        expirationDate: Date
    }) {

    }

}

// logout action
export class Logout implements Action {
    readonly type = LOGOUT;
}
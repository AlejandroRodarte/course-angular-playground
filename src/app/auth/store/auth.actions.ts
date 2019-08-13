import { Action } from '@ngrx/store';

// action types (for reducers)
// following prefixing conventions to ensure type actions are unique across all reducers
export const LOGIN = '[Auth] Login';
export const LOGOUT = '[Auth] Logout';

// action types (for effects)
export const LOGIN_START = '[Auth] Login Start'

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

export class LoginStart implements Action {

    readonly type = LOGIN_START;

    constructor(public payload: {
        email: string,
        password: string
    }) {
        
    }

}

// logout action
export class Logout implements Action {
    readonly type = LOGOUT;
}
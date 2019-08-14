import { Action } from '@ngrx/store';

// action types (for reducers and effects to listen)
// following prefixing conventions to ensure type actions are unique across all reducers
export const LOGIN = '[Auth] Login';
export const LOGOUT = '[Auth] Logout';
export const LOGIN_START = '[Auth] Login Start'
export const LOGIN_FAIL = '[Auth] Login Fail'

// union type to define all possible auth actions
export type AuthActions = Login | Logout | LoginStart | LoginFail;

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

// login kickoff start action
export class LoginStart implements Action {

    readonly type = LOGIN_START;

    // payload: user email and password
    constructor(public payload: {
        email: string,
        password: string
    }) {
        
    }

}

// login failed action
export class LoginFail implements Action {

    readonly type = LOGIN_FAIL;

    // payload: error message
    constructor(public payload: string) {

    }

}

// logout action
export class Logout implements Action {
    readonly type = LOGOUT;
}
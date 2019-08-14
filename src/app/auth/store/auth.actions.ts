import { Action } from '@ngrx/store';

// action types (for reducers and effects to listen)
// following prefixing conventions to ensure type actions are unique across all reducers
export const LOGIN_START = '[Auth] Login Start';
export const LOGOUT = '[Auth] Logout';
export const AUTHENTICATE_SUCCESS = '[Auth] Authenticate Success';
export const AUTHENTICATE_FAIL = '[Auth] Authenticate Fail';
export const SIGNUP_START = '[Auth] Signup Start';

// union type to define all possible auth actions
export type AuthActions = LoginStart | Logout | AuthenticateSuccess | AuthenticateFail | SignupStart;

// login action
export class AuthenticateSuccess implements Action {

    readonly type = AUTHENTICATE_SUCCESS;

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
export class AuthenticateFail implements Action {

    readonly type = AUTHENTICATE_FAIL;

    // payload: error message
    constructor(public payload: string) {

    }

}

// logout action
export class Logout implements Action {
    readonly type = LOGOUT;
}

// sign up start
export class SignupStart implements Action {

    readonly type = SIGNUP_START;

    // payload: email and password
    constructor(public payload: {
        email: string,
        password: string
    }) {
        
    }

}
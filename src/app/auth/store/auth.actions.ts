import { Action } from '@ngrx/store';

// action types (for reducers and effects to listen)
// following prefixing conventions to ensure type actions are unique across all reducers

// kickstarters to login and signup
export const LOGIN_START = '[Auth] Login Start';
export const SIGNUP_START = '[Auth] Signup Start';

// auto login action
export const AUTO_LOGIN = '[Auth] Auto Login';

// logout action
export const LOGOUT = '[Auth] Logout';

// actions for successfull o failed authentication
export const AUTHENTICATE_SUCCESS = '[Auth] Authenticate Success';
export const AUTHENTICATE_FAIL = '[Auth] Authenticate Fail';

// action to clear the error message
export const CLEAR_ERROR = '[Auth] Clear Error'

// union type to define all possible auth actions
export type AuthActions = 
                LoginStart | 
                SignupStart | 
                AutoLogin | 
                Logout | 
                AuthenticateSuccess | 
                AuthenticateFail |
                ClearError;

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

// signup kickoff start action
export class SignupStart implements Action {

    readonly type = SIGNUP_START;

    // payload: user email and password
    constructor(public payload: {
        email: string,
        password: string
    }) {
        
    }

}

// auto-login action: no required payload since we will
// attempt to fetch user data from local storage
export class AutoLogin implements Action {
    readonly type = AUTO_LOGIN;
}

// logout action: no required payload
export class Logout implements Action {
    readonly type = LOGOUT;
}

// authentication success action
export class AuthenticateSuccess implements Action {

    readonly type = AUTHENTICATE_SUCCESS;

    // payload: user raw data
    constructor(public payload: {
        email: string,
        userId: string,
        token: string,
        expirationDate: Date,
        redirect: boolean
    }) {

    }

}

// authentication fail action
export class AuthenticateFail implements Action {

    readonly type = AUTHENTICATE_FAIL;

    // payload: error message
    constructor(public payload: string) {

    }

}

// clear error action: no payload required
export class ClearError implements Action {
    readonly type = CLEAR_ERROR;
}
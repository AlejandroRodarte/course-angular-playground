import { UserModel } from '../user.model';

import * as AuthActions from './auth.actions';

// auth reducer state definition
export interface AuthReducerState {
    user: UserModel;
    authError: string;
    loading: boolean;
}

// initial state
const initialState = {
    user: null,
    authError: null,
    loading: false
};

// reducer function
export function authReducer(
    state = initialState, 
    action: AuthActions.AuthActions) {

    // handle actions
    switch (action.type) {

        // login case
        case AuthActions.AUTHENTICATE_SUCCESS:

            // with payload, create new user instance
            const user: UserModel = new UserModel(
                action.payload.email,
                action.payload.userId,
                action.payload.token,
                action.payload.expirationDate
            );

            // return copy of old state with the user property overwritten with the
            // new user instance
            // set error message to null and loading flag to false since process ended
            return {
                ...state,
                user,
                authError: null,
                loading: false
            };

        // logout case
        // return copy of old state with user property overwritten to null
        case AuthActions.LOGOUT:
            return {
                ...state,
                user: null
            };
        
        // login start case (side effect code is also ran when this action is dispatched)
        // set error message to null since we are attempting to login again and set the loading flag
        // since we kickstarted the login process
        case AuthActions.LOGIN_START:
            return {
                ...state,
                authError: null,
                loading: true
            };
        
        // login payload case
        // set user to null and error message with payload
        // and set loading flag to false since process ended due to error
        case AuthActions.AUTHENTICATE_FAIL:
            return {
                ...state,
                user: null,
                authError: action.payload,
                loading: false
            };

        // proper state initialization
        default:
            return state;

    }

}
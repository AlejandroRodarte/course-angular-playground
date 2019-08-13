import { UserModel } from '../user.model';

import * as AuthActions from './auth.actions';

// auth reducer state definition
export interface AuthReducerState {
    user: UserModel;
}

// initial state
const initialState = {
    user: null
};

// reducer function
export function authReducer(
    state = initialState, 
    action: AuthActions.AuthActions) {

    // handle actions
    switch (action.type) {

        // login case
        case AuthActions.LOGIN:

            // with payload, create new user instance
            const user: UserModel = new UserModel(
                action.payload.email,
                action.payload.userId,
                action.payload.token,
                action.payload.expirationDate
            );

            // return copy of old state with the user property overwritten with the
            // new user instance
            return {
                ...state,
                user
            }

        // logout case
        // return copy of old state with user property overwritten to null
        case AuthActions.LOGOUT:
            return {
                ...state,
                user: null
            }

        // proper state initialization
        default:
            return state;

    }

}
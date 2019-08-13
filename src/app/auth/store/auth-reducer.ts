import { UserModel } from '../user.model';

// auth reducer state definition
export interface AuthReducerState {
    user: UserModel;
}

// initial state
const initialState = {
    user: null
};

// reducer function
export function authReducer(state = initialState, action) {
    return state;
}
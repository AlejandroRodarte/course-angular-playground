import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
import * as fromAuth from '../auth/store/auth-reducer';
import { ActionReducerMap } from '@ngrx/store';

// global app state
// keys -> reducer alias
// values -> reducer state definitions
export interface AppState {
    shoppingList: fromShoppingList.ShoppingListReducerState;
    auth: fromAuth.AuthReducerState
}

// action reducer map: resolves the global applicaion state
// keys -> reducer alias
// values -> reducer functions
export const appReducer: ActionReducerMap<AppState> = {
    shoppingList: fromShoppingList.shoppingListReducer,
    auth: fromAuth.authReducer
}
import { Actions, ofType } from '@ngrx/effects'
import * as AuthActions from './auth.actions';

// effects are organized in classes
export class AuthEffects {

    // action handler: defined as a regular property
    // subscribe to the observable of actions to listen to action dispatches from components/services
    // (similar to reducers)
    authLogin = this
                    .actions$
                    .pipe(

                        // ofType() filter: continue in observable chain only if the action type
                        // is of type LOGIN_START (similar to switch statement)
                        // comma-separated values for multiple actions
                        ofType(AuthActions.LOGIN_START)

                    );

    // actions ($ is a convention to mark the variable as an observable)
    // huge observable that gives us access to all dispatch actions so that we
    // we do not change any state (since side effect code should not), but the idea of this
    // is that we can still execute code based on action types, just as reducer functions
    constructor(private actions$: Actions) {

    }

}
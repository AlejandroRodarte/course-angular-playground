import { Observable } from 'rxjs';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// when leaving a path, we have a component already loaded, and the deactivation logic will be inside such
// component; for this, we create an interface that all components can use to perform some logic when deactivating

// they should implement a canDeactivate() method which returns an observavble boolean, a promised boolean or a boolean
export interface CanComponentDeactivate {
    canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

// deactivation guard service, implements the Angular CanDeactivate interface, and we pass as a type the CanComponentDeactivate
// interface, guaranteering that we implement this service on deactivable components
export class CanDeactivateGuardService implements CanDeactivate<CanComponentDeactivate> {

    // CanDeactivate forces us to implement the canDeactivate() method, where it accepts as an argument the deactivable component
    canDeactivate(component: CanComponentDeactivate, 
                    currentRoute: ActivatedRouteSnapshot, 
                    state: RouterStateSnapshot, 
                    nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        
        // this angular method will simply make a call to the component's implementation of the canDeactivate() method
        // required by such CanComponentDeactivate interface
        return component.canDeactivate();

    }

}
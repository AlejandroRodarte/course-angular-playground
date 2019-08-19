import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { UserService } from './user.service';

// user component testing environment
describe('UserComponent', () => {

    // before each test...
    // configure the testing module where we pass in the component to test
    // finally, compile components (do not do this when working with Webpack)
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                UserComponent
            ]
        }).compileComponents();
    });

    // 1. test to check if app was created
    // create the UserComponent, access its instance and check if it was correctly created
    it('should create the app', () => {
        const fixture = TestBed.createComponent(UserComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });

    // 2. test that user in the user service was injected in the user component properly
    it('should use the user name from the service', () => {

        // create user component and access the instance
        const fixture = TestBed.createComponent(UserComponent);
        const app = fixture.debugElement.componentInstance;

        // use the injector to inject the service into the user component
        const userService = fixture.debugElement.injector.get(UserService);

        // detect changes so we can detect alterations from the initial state of the component
        fixture.detectChanges();

        // make the comparison
        expect(userService.user.name).toEqual(app.user.name);

    });

    // 3. check if user name is displayed on template when logging in
    it('should display the user name if user is logged in', () => {

        // access component and its instance
        const fixture = TestBed.createComponent(UserComponent);
        const app = fixture.debugElement.componentInstance;

        // set the log in toggle to true
        app.isLoggedIn = true;

        // enable change detection
        fixture.detectChanges();

        // access the user component template
        const compiled = fixture.debugElement.nativeElement;

        // search for the html element that has the name and make the contain comparison
        expect(compiled.querySelector('p').textContent).toContain(app.user.name);

    });

    // 4. same as test 3 but checking for logout status
    it('should display the user name if user is not logged in', () => {

        const fixture = TestBed.createComponent(UserComponent);
        const app = fixture.debugElement.componentInstance;

        fixture.detectChanges();

        const compiled = fixture.debugElement.nativeElement;

        // user the 'not' property to check that the content placed does not exist on the template
        expect(compiled.querySelector('p').textContent).not.toContain(app.user.name);

    });

});

import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { UserComponent } from './user.component';
import { UserService } from './user.service';
import {DataService} from '../shared/data.service';

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

    // 4. test that data should not be fetched if we do not use the async() method
    it('should not fetch data if not called asynchronously', () => {

        // create component and instance
        const fixture = TestBed.createComponent(UserComponent);
        const app = fixture.debugElement.componentInstance;

        // inject the data service
        const dataService = fixture.debugElement.injector.get(DataService);

        // spy (not execute) on the getDetails() method, which should returned a Promise wrapper of the data it should return
        const spy = spyOn(dataService, 'getDetails').and.returnValue(Promise.resolve('Data'));

        // update our component with changes
        fixture.detectChanges();

        // we expect our data on the component to actually be undefined since this code is synchronous and will not wait for async tasks
        // to be resolved
        expect(app.data).toBe(undefined);

    });

    // 5. test that data should be fetched now that we use the async() test method wrapper
    it('should fetch data if called asynchronously', async(() => {

        // same as test 4.
        const fixture = TestBed.createComponent(UserComponent);
        const app = fixture.debugElement.componentInstance;
        const dataService = fixture.debugElement.injector.get(DataService);
        const spy = spyOn(dataService, 'getDetails').and.returnValue(Promise.resolve('Data'));
        fixture.detectChanges();

        // whenStable() allows us to access the component once it is 'stable' (async tasks where already executed
        // after all component's promises where resolved, then apply the expect() judgement
        fixture.whenStable().then(() => {
            expect(app.data).toBe('Data');
        });


    }));

    // 7. same as test 6. but using a fakeSync to be explicit that we are working on a fake asynchronous environment
    it('should fetch data if called asynchronously', fakeAsync(() => {

        // same as test 4. and 5.
        const fixture = TestBed.createComponent(UserComponent);
        const app = fixture.debugElement.componentInstance;
        const dataService = fixture.debugElement.injector.get(DataService);
        const spy = spyOn(dataService, 'getDetails').and.returnValue(Promise.resolve('Data'));
        fixture.detectChanges();

        // tick(): forces all fake async tasks to complete and be resolved
        tick();

        // execute freely the expect() judgement
        expect(app.data).toBe('Data');

    }));

});

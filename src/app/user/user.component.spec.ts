import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';

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

});

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

// describe()
// description: the name of the test (the name of the component)
// specDefinitions: function to run before running the tests
describe('AppComponent', () => {

    // beforeEach(): run this async code before each individual test
    beforeEach(async(() => {

        // configure a module environment for this component to test (similar to the @NgModule declarations on the app.module.ts)
        TestBed.configureTestingModule({
            declarations: [
              AppComponent
            ],
        }).compileComponents();

    }));

    // stream of it() methods: represent the individual tests to execute on the component

    // 1. check if the app is created
    // we need to always first create the component with createComponent() and store it in a variable usually named 'fixture'
    // on this 'fixture', we access the component instance
    // finally, we use the expect() method to declare what we expect from this component instance, which is to exist with the toBeTruthy()
    // method
    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });

    // 2. check if the AppComponent has a 'title' property with a value of 'my-first-app'
    // again, we create an instance and expect() the app.title property to be equal to 'my-first-app'
    it(`should have as title 'my-first-app'`, () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual('my-first-app');
    });

    // 3. check if the AppComponent template has an <h1> tag with a text content 'Welcome to my-first-app!'
    // use detectChanges() to be able to detect template changes on the AppComponent
    // use nativeElement to access the whole AppComponent template
    // query for the h1 tag inside the template, acces its text content and use toContain() to validate what this tag should contain
    // as text
    it('should render title in a h1 tag', () => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h1').textContent).toContain('Welcome to my-first-app!');
    });

});

import { Component } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

// animations property: set animations on the component

// trigger
// name: selector that go attached to html elements to animate
// definitions: array of states

// state
// name: state name (initialized as an expression on the html element that has the trigger name)
// style: CSS styling for that state

// on the example; we set a 'divState' trigger for html elements
// they will be initialized on the 'normal' state with some CSS styling and transition to the 'highlighted' station with some
// final CSS properties

// transition: we pass in a state change expression writing the initials state, an arrow and the final state
// then, we can pass in an animate() method where we can pass several arguments such as the transition time
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',

    animations: [

        trigger('divState', [
            state('normal', style({
                'background-color': 'red',
                transform: 'translateX(0)'
            })),
            state('highlighted', style({
                'background-color': 'blue',
                transform: 'translate(100px)'
            })),

            // allows for bi-directional transition definitions
            transition('normal <=> highlighted', animate(300))

        ]),

        trigger('wildState', [
            state('normal', style({
                'background-color': 'red',
                transform: 'translateX(0) scale(1)'
            })),
            state('highlighted', style({
                'background-color': 'blue',
                transform: 'translate(100px) scale(1)'
            })),
            state('shrunken', style({
                'background-color': 'green',
                transform: 'translateX(0) scale(0.5)'
            })),
            transition('normal => highlighted', animate(300)),
            transition('highlighted => normal', animate(800)),

            // from the shrunken state to ANY state and from ANY state to the shrunken state

            // lone style(): jump directly to initial styling
            // animate() with a timer and a style(): execute middle-ware styling and apply a transition timing
            // lone animate(): transition to final state
            transition('shrunken <=> *', [
                style({
                    'background-color': 'orange',
                    'border-radius': '0'
                }),
                animate(1000, style({
                    'border-radius': '50px'
                })),
                animate(500)
            ])

        ]),

    ]

})
export class AppComponent {

    // divState states
    state = 'normal';

    wildState = 'normal';

    list = ['Milk', 'Sugar', 'Bread'];

    // animate! click event: toggle between states
    onAnimate() {
        this.state === 'normal' ? this.state = 'highlighted' : this.state = 'normal';
        this.wildState === 'normal' ? this.wildState = 'highlighted' : this.wildState = 'normal';
    }

    onShrink() {
        this.wildState = 'shrunken';
    }

    onAdd(item) {
        this.list.push(item);
    }

    onDelete(item: string) {
        this.list.splice(this.list.indexOf(item), 1);
    }

}

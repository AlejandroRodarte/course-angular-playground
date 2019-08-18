import { Component } from '@angular/core';
import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';

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

        // list item trigger
        // just one state: 'in' which is really a dummy state since it's never declared in the component class
        // void: built-in state in @angular/animations to represent the case where the html element that has the trigger attached
        // is not even on the DOM yet
        // void => *: transition from a state of nothingness (html element is about to be created) to any state
        // (the 'in' state in this case)
        // since we start from void, we need to kick off with a starting style() animation to be able to transition to such 'in' state
        // * => void: transition from any state to nothingness (html element is about to be deleted)
        // here we place our typical animate() method with its style() method to transition into nothingness
        trigger('list1', [
            state('in', style({
                opacity: '1',
                transform: 'translateX(0)'
            })),
            transition('void => *', [
                style({
                    opacity: 0,
                    transform: 'translateX(-100px)'
                }),
                animate(300)
            ]),
            transition('* => void', animate(300, style({
                transform: 'translateX(100px)',
                opacity: 0
            })))
        ]),

        // keyframes(): array of steps to apply some styles at certain points of the animate() time lapse (1000 ms)
        // 1. offset 0: style applied at 0 ms (start)
        // 1. offset 0.3: style applied at 300 ms
        // 1. offset 0.8: style applied at 800 ms
        // 1. offset 1: style applied at 1000 ms (end)
        trigger('list2', [
            state('in', style({
                opacity: '1',
                transform: 'translateX(0)'
            })),
            transition('void => *', [
                animate(1000, keyframes([
                    style({
                        transform: 'translateX(-100px)',
                        opacity: 0,
                        offset: 0
                    }),
                    style({
                        transform: 'translateX(-50px)',
                        opacity: 0.5,
                        offset: 0.3
                    }),
                    style({
                        transform: 'translateX(-20px)',
                        opacity: 1,
                        offset: 0.8
                    }),
                    style({
                        transform: 'translateX(0)',
                        offset: 1
                    })
                ]))
            ]),
            transition('* => void', animate(300, style({
                transform: 'translateX(100px)',
                opacity: 0
            })))
        ])

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

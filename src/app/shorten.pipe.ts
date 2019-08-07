import { PipeTransform, Pipe } from '@angular/core';

// custom pipe; regular class definition
// PipeTransform: allows this class to become a Pipe

// @Pipe: set the name of the pipe to use on the template
@Pipe({
    name: 'shorten'
})
export class ShortenPipe implements PipeTransform {

    // transform implementation
    // get the value (output to transform), injected by Angular automatically when using this pipe

    // ...args: expect a series of arguments to parameterize the type
    // args[0]: the limit of characters to shorten the text
    transform(value: string, ...args: string[]): string {

        // pipe parsing logic goes here
        if (value.length > +args[0]) {
            return value.substr(0, +args[0]) + ' ...';
        }

        return value;

    }

}
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
    transform(value: string) {

        // pipe parsing logic goes here
        if (value.length > 10) {
            return value.substr(0, 10) + ' ...';
        }

        return value;

    }

}
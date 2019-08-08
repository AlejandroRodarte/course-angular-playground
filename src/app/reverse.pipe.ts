import { PipeTransform, Pipe } from '@angular/core';

// reverse pipe
@Pipe({
    name: 'reverse'
})
export class ReversePipe implements PipeTransform {

    // method: simply split the string into an array to access the reverse method, then rejoin again
    transform(value: string): string {
        return value.split('').reverse().join('');
    }

}

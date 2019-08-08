import { Pipe, PipeTransform } from '@angular/core';
import { ServerProps } from './app.component';

// sort pipe
@Pipe({
    name: 'sort'
})
export class SortPipe implements PipeTransform {

    // arguments: the array of servers, and the property name to base or sorting on
    transform(value: ServerProps[], propertyName: string): ServerProps[] {

        // return a sorted array: the sort() method requires a compare function between two servers
        return value.sort((server1: ServerProps, server2: ServerProps): number => {

            // return 1, -1 or 0 in dependence of the values on each server for a particular property
            if (server1[propertyName] > server2[propertyName]) {
                return 1;
            } else if (server1[propertyName] < server2[propertyName]) {
                return -1;
            } else {
                return 0;
            }

        });

    }

}

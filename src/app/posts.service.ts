import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostProps } from './app.component';
import { map, catchError } from 'rxjs/operators';
import { Observable, Subject, throwError } from 'rxjs';

// posts service: global module
// will handle the http requests
@Injectable({
    providedIn: 'root'
})
export class PostsService {

	// http error subject
	error = new Subject<string>();

    // inject the http client
    constructor(private http: HttpClient) {

    }

    createAndStorePost(title: string, content: string): void {
        
        // convert the arguments in a post object
        const postData: PostProps = {
            title,
            content
        };

        // access the http client instance and call the post() method
		// we pass in the API endpoint, the request body (postData)
		// and call the subscribe data afterwards to wait for an http response (log it)

		// the '/posts.json' is the API Endpoint in itself (post the data on a /json directory inside Firebase and expect a JSON file))
		// the post data will be automatically parsed to JSON by Angular

		// http requests are managed by observables so we can subscribe to them and fetch the http response
		// if we do not set a subscription, Angular implies that we are not interested in a response, so by default
        // it will not even send the request

        // execute the post operation

		// in the post() case, our component is simply not interested in the response, so there is no reason to make it subscribe to it
		
		// when en error is sent by the server, catch it and emit it through the subject
		this.http
            .post<{ name: string }>(
                'https://angular-course-app-eeedb.firebaseio.com/posts.json',
                postData
			)
			.subscribe(response => {
				console.log(response);
			}, error => {
				this.error.next(error.message);
			});

    }

    fetchPosts(): Observable<PostProps[]> {

        // get request: just place the rest api endpoint url
		// we desire to edit the raw data that comes from firebase which comes in this format

		// 	{
		// 		idValue: {
		// 			title: titleValue
		// 			content: contentValue
		// 		},
		// 		idValue: {
		// 			title: titleValue
		// 			content: contentValue
		// 		}
		// 	}

        // so we will use observable operators with the pipe() method to beutify this data
        
        // subscription deleted and returning the get() observable so component can subscribe to it
        // and fetch response

		return this.http
			.get<{ [key: string]: PostProps }>(
				'https://angular-course-app-eeedb.firebaseio.com/posts.json'
			)
			.pipe(

				map((response: { [key: string]: PostProps }) => {

					// we will go from an object of objects to an array of objects
					const responseArray: PostProps[] = [];

					// loop through each object inside the big object with the keys
					for (const key in response) {

						// check if it has the key
						// if so, we will push to the array a brand new object that has the properties of the
						// looped object plus the key
						if (response.hasOwnProperty(key)) {
							responseArray.push( { ...response[key], id: key } );
						}

					}

					return responseArray;

				}),

				catchError(errorResponse => {

					// maybe send to an analytics server...

					// throwError returns an observable to which we can subscribe and listen for error responses
					return throwError(errorResponse);

				})
                
			);

	}
	
	// delete posts: return the delete() observable
	deletePosts(): Observable<any> {

		return this.http
			.delete('https://angular-course-app-eeedb.firebaseio.com/posts.json');

	}

}
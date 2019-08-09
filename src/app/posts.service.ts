import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { PostProps } from './app.component';
import { map, catchError, tap } from 'rxjs/operators';
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

		// observe: 'response' -> get the full http response, not the body
		this.http
            .post<{ name: string }>(
                'https://angular-course-app-eeedb.firebaseio.com/posts.json',
				postData,
				{
					observe: 'response'
				}
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
		
		// headers: set custom headers
		// params: set multipe query params

		// responseType: 'json': informs angular to parse the repsonse automatically to a JSON object
		let searchParams = new HttpParams();
		searchParams = searchParams.append('print', 'pretty');
		searchParams = searchParams.append('custom', 'key');

		return this.http
			.get<{ [key: string]: PostProps }>(
				'https://angular-course-app-eeedb.firebaseio.com/posts.json',
				{
					headers: new HttpHeaders({
						'custom-header': 'custom-header-value',
					}),
					params: searchParams,
					responseType: 'json'
				}
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

		// observe: 'events' -> get the full http response and an events object
		// this object has a type property and a number, where the number encodes an event
		// which represents a certain stage of the request/response interchange

		// the tap() observer allows us to execute some tasks with the event encoding value while not altering
		// the overall subscription to the request

		// to enhance human lecture, the HttpEventType represents a readable version of the event types
		// we have access to all this stages of the request/response process and execute some custom code that can either alter the UI
		// or execute some internal code we desire

		// responseType: 'json': informs angular to parse the repsonse automatically to a JSON object
		return this.http
			.delete(
				'https://angular-course-app-eeedb.firebaseio.com/posts.json',
				{
					observe: 'events',
					responseType: 'json'
				}
			)
			.pipe(
				tap(event => {

					console.log(event);

					if (event.type === HttpEventType.Sent) {
						// maybe update something in the UI...
					}

					if (event.type === HttpEventType.Response) {
						console.log(event.body);
					}

				})
			);

	}

}
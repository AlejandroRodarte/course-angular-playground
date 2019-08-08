import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

// interface for the information a post has
// used to inform TypeScript the data we expect at the end of the http response
export interface PostProps {
	title: string;
	content: string;
	id?: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

	// locally loaded posts from the database
	loadedPosts: PostProps[] = [];
	
	// boolean flag to know when are we fetching data to load a loading text or gif
	isFetching: boolean = false;

	// inject the http client dependency to use client method to make http requests
    constructor(private http: HttpClient) {

    }

    ngOnInit() {
		this.fetchPosts();
    }

	// on form submission
    onCreatePost(postData: PostProps) {

		// access the http client instance and call the post() method
		// we pass in the API endpoint, the request body (postData)
		// and call the subscribe data afterwards to wait for an http response (log it)

		// the '/posts.json' is the API Endpoint in itself (post the data on a /json directory inside Firebase and expect a JSON file))
		// the post data will be automatically parsed to JSON by Angular

		// http requests are managed by observables so we can subscribe to them and fetch the http response
		// if we do not set a subscription, Angular implies that we are not interested in a response, so by default
		// it will not even send the request
		this.http
			.post<{ name: string }>(
				'https://angular-course-app-eeedb.firebaseio.com/posts.json',
				postData
			)
			.subscribe((httpResponse) => {
				console.log(httpResponse);
			});
		  
    }

    onFetchPosts() {
		this.fetchPosts();
    }

    onClearPosts() {
      // Send Http request
	}

	private fetchPosts() {

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

		// set the fetching flag to true
		this.isFetching = true;

		this.http
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

				})
			)
			.subscribe((response) => {

				// get the array of post props and load it into the field
				this.loadedPosts = response;

				// since the fetching is done, set again the flag to false
				this.isFetching = false;

			});

	}
	
}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

	// locally loaded posts from the database
    loadedPosts = [];

	// inject the http client dependency to use client method to make http requests
    constructor(private http: HttpClient) {

    }

    ngOnInit() {
		this.fetchPosts();
    }

	// on form submission
    onCreatePost(postData: { title: string; content: string }) {

		// access the http client instance and call the post() method
		// we pass in the API endpoint, the request body (postData)
		// and call the subscribe data afterwards to wait for an http response (log it)

		// the '/posts.json' is the API Endpoint in itself (post the data on a /json directory inside Firebase and expect a JSON file))
		// the post data will be automatically parsed to JSON by Angular

		// http requests are managed by observables so we can subscribe to them and fetch the http response
		// if we do not set a subscription, Angular implies that we are not interested in a response, so by default
		// it will not even send the request
		this.http
			.post(
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

		this.http
			.get(
				'https://angular-course-app-eeedb.firebaseio.com/posts.json'
			)
			.subscribe((response) => {
				console.log(response);
			});

	}
	
}

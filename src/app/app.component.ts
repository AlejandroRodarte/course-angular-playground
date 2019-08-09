import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostsService } from './posts.service';
import { Subscription } from 'rxjs';

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
export class AppComponent implements OnInit, OnDestroy {

	// locally loaded posts from the database
	loadedPosts: PostProps[] = [];
	
	// boolean flag to know when are we fetching data to load a loading text or gif
	isFetching: boolean = false;

	error = null;

	// error subscription
	private errorSub: Subscription;

	// inject the posts service which will handle the http client requests and responses
    constructor(private postsService: PostsService) {

    }

	// on initialization, fetch posts
    ngOnInit() {

		this.fetchPosts();

		// each time the subject emits an error message, store it in the component field
		this.errorSub = this.postsService.error.subscribe(message => {
			this.error = message;
		});

    }

	// on form submission: post the data
	// the component does not care about the response in this case, so the createAndStorePost() method
	// does not return anything

	// finally, push the new post to the array
    onCreatePost(postData: PostProps) {
		this.postsService.createAndStorePost(postData.title, postData.content);
		this.loadedPosts.push(postData);
    }

	// when fetching posts, fetch the posts (duh)
    onFetchPosts() {
		this.fetchPosts();
    }

	// when clearing posts: subscribe to the deletePosts() returned observable
	// when deletion is complete, empty the loaded posts array
    onClearPosts() {
      this.postsService.deletePosts().subscribe(() => {
		  this.loadedPosts = [];
	  });
	}

	// fetch posts
	private fetchPosts() {

		// set toggle to true
		this.isFetching = true;

		// this component is interested in the http response of the get() request
		// so we make this component subscribe to the get() observable and wait for the clean
		// data to come to finally set the toggle to false and store the fetched posts

		// second funciton argument: error handling, assign the error message to the error property
		this.postsService.fetchPosts().subscribe((posts) => {
			this.isFetching = false;
			this.loadedPosts = posts;
		}, (error) => {
			this.error = error.message;
			console.log(error);
		});

	}

	// unsub from subject
	ngOnDestroy(): void {
		this.errorSub.unsubscribe();
	}
	
}

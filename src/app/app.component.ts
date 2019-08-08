import { Component, OnInit } from '@angular/core';
import { PostsService } from './posts.service';

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

	// inject the posts service which will handle the http client requests and responses
    constructor(private postsService: PostsService) {

    }

	// on initialization, fetch posts
    ngOnInit() {
		this.postsService.fetchPosts();
    }

	// on form submission
    onCreatePost(postData: PostProps) {
		this.postsService.createAndStorePost(postData.title, postData.content);
    }

	// when fetching posts, fetch the posts (duh)
    onFetchPosts() {
		this.postsService.fetchPosts();
    }

    onClearPosts() {
      // Send Http request
	}
	
}

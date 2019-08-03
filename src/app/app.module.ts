import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { ServersService } from './servers/servers.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

// app routes are defined in the app.module.ts file
const appRoutes: Routes = [

	// localhost:4200/: load HomeComponent
	{
		path: '',
		component: HomeComponent
	},

	// localhost:4200/users: load UsersComponent
	{
		path: 'users',
		component: UsersComponent,
		children: [

			// load a single user component by id
			// the ':' informs Angular that this a dynamic part of the path (the user id)
			// add a name dynamic piece of data too
			{
				path: ':id/:name',
				component: UserComponent
			}

		]
	},

	// localhost:4200/servers: load ServersComponent
	{
		path: 'servers',
		component: ServersComponent,
		children: [

			// localhost:4200/servers/id
			{
				path: ':id',
				component: ServerComponent,
			},

			// localhost:4200/id/edit
			{
				path: ':id/edit',
				component: EditServerComponent
			}

		]
	},

	// localhost:4200/not-found
	// component to load whenever user attempts to access unknown route
	{
		path: 'not-found',
		component: PageNotFoundComponent
	},

	// ** wildcard: covers all paths unknown to us
	// will not load a component but redirect to /not-found, which loads the PageNotFoundComponent
	// make sure to place this at the very botton: paths are parsed from top to bottom!
	{
		path: '**',
		redirectTo: '/not-found'
	}

];

// serversService defines a global service (singleton)
// using the RouterModule to use the Angular router
// method forRoot() allows us to register or constant that defines the application routes
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    ServersComponent,
    UserComponent,
    EditServerComponent,
    ServerComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
	FormsModule,
	RouterModule.forRoot(appRoutes)
  ],
  providers: [ServersService],
  bootstrap: [AppComponent]
})
export class AppModule { }

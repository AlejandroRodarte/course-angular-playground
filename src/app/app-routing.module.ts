import { Routes, RouterModule, Router } from '@angular/router';

import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';
import { ServersComponent } from './servers/servers.component';
import { ServerComponent } from './servers/server/server.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuardService } from './auth-guard.service';

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
    // canActivate: accepts an array of guards (classes that implement CanActivate interface)
    // the ServersComponent will be loaded when all guard canActivate() implementations return true

    // canActivateChild: sets guards to protect the children of this parent
	{
        path: 'servers',
        // canActivate: [
        //     AuthGuardService
        // ],
        canActivateChild: [
            AuthGuardService
        ],
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

// app routing module
// import the router module and apply forRoot() to register the routes
@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}
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
		component: UsersComponent
	},

	// localhost:4200/servers: load ServersComponent
	{
		path: 'servers',
		component: ServersComponent
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
    ServerComponent
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

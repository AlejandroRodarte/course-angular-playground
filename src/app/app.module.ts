import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { ServersService } from './servers/servers.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';

// serversService defines a global service (singleton)
// using the RouterModule to use the Angular router
// method forRoot() allows us to register or constant that defines the application routes

// added the authentication and authentication guard services
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
		AppRoutingModule
	],
	providers: [
		ServersService,
		AuthService,
		AuthGuardService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }

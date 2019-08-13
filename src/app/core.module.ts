import { NgModule } from '@angular/core';
import { RecipeService } from './recipes/recipe.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth/auth-interceptor.service';

// core module: services
@NgModule({

	// services and interceptors
    providers: [
		
        RecipeService,

		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptorService,
			multi: true
		}

    ]

})
export class CoreModule {

}
import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable()
export class GlobalHttpInterceptorService implements HttpInterceptor {
	constructor(public router: Router) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(req).pipe(
			catchError((error) => {
				console.log('error is intercept');
				console.error(error);
				if (this.router.url.indexOf('/event/') !== -1 && error.message.indexOf('500 OK') !== -1) {
					//this.router.navigate(['/event/not_found']);
				}
				return throwError(() => new Error(error.message));
			})
		);
	}
}

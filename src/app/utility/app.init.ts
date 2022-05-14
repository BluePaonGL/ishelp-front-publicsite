import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor,HttpRequest} from '@angular/common/http';
import {Observable, of, throwError} from "rxjs";
import {catchError, map} from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class GlobalHttpInterceptorService implements HttpInterceptor {
    
    constructor(public router: Router) {
    }

    handleError(error: HttpErrorResponse){
        console.log(error.message);
        return throwError(error);
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error) => {
                console.log('error is intercept')
                console.error(error);
                return throwError(error.message);
            })
        )
    }
}
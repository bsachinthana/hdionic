import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(public storage: Storage) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available

        return from(this.storage.get('currentUser').then(userData => {
            const currentUser = JSON.parse(userData);
            console.log(userData);
            if (currentUser && currentUser.token) {
                request = request.clone({
                    setHeaders: {
                        Authorization: `${currentUser.token}`
                    }
                });

            }
            return next.handle(request);
        })).pipe(mergeMap(map =>  map));
        console.log(request);
        // return next.handle(request);
    }
}

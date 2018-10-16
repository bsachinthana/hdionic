import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(public storage: Storage) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        this.storage.get('currentUser').then(user => {
            const currentUser = JSON.parse(user);
            if (currentUser && currentUser.token) {
                request = request.clone({
                    setHeaders: {
                        Authorization: `${currentUser.token}`
                    }
                });
            }
        });
        return next.handle(request);
    }
}

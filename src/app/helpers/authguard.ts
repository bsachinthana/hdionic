import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DataService } from './../data.service';
import { map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private dataService: DataService, public storage: Storage) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.storage.get('currentUser').then(item => {
            if (item) {
                return  this.dataService.validate().pipe(map(msg => {
                    const m: any = msg;
                    if (m.message === 'user' || m.message === 'admin') {
                        return true;
                    } else {
                       this.storage.remove('currentUser').then(res => {
                        this.router.navigate(['/login'], { queryParams: { landStatus: 'session_expired' } });
                        return false;
                       });
                    }
                }));
            }
        });

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login']);
        return false;
    }
}

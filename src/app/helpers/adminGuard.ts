import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DataService } from './../data.service';

@Injectable()
export class AdminGuard implements CanActivate {

    constructor(private router: Router, private dataService: DataService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUser')) {
            return  this.dataService.validate().pipe(map(msg => {
                const m: any = msg;
                if (m.message === 'admin') {
                    return true;
                } else {
                    this.router.navigate(['/view']);
                    return false;
                }

            }));
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/view']);
        return false;
    }
}

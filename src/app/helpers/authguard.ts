import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DataService } from './../data.service';
import { map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private dataService: DataService, public storage: Storage) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      /*  let xitem = null;
        this.storage.get('currentUser').then(item => {
            xitem = item;
        });*/
      //  if (xitem) {
          const x =   this.dataService.validate().pipe(map(msg => {
                const m: any = msg;
                console.log(msg);
                if (m.message === 'user' || m.message === 'admin') {
                    console.log('valid user');
                    return true;
                } else {
                   /*this.storage.remove('currentUser').then(res => {
                    this.router.navigate(['/login'], { queryParams: { landStatus: 'session_expired' } });
                    return false;
                   });*/
                   return false;
                }
            }));
      //  });

            return x;
       // }
    // not logged in so redirect to login page with the return url
     //  this.router.navigate(['/login']);
      //  return false;
    }
}

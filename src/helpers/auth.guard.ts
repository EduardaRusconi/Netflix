import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { tokenJWT } from 'src/model/tokenJWT';

import { UserServices } from 'src/services/UserServices';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    /* #region Construtor*/
    constructor(
        private router: Router,
        private userService: UserServices
    ) { }
    /* #ednregion */

    /* #region Metodos Publicos*/

    /** Ativação do login  */
    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let currentUser: tokenJWT = this.userService.currentUserValue;
        if (currentUser) {
            // logged in, so return true
            return true;
        }

        // not logged in, so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
    /* #ednregion */
}

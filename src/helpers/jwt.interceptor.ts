import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserServices } from 'src/services/UserServices';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    /* #region Construtor */
    constructor(private userServices: UserServices) { }
    /* #ednregion */

    /* #region Metods Publicos*/
    /** Autorização de token */
    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // add authorization header with jwt token if available
        let currentUser = this.userServices.currentUserValue;
        if (currentUser && currentUser?.access_token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser?.access_token}`
                }
            });
        }

        return next.handle(request);
    }
    /* #ednregion */
}
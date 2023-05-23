import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserServices } from 'src/services/UserServices';
import { SnackBarUtil } from './snarckBar.util';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommunicationComponentService } from './communication.component.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    /* #region Construtor */
    constructor(private userServices: UserServices, snackBar: MatSnackBar, private router: Router, private communicationComponentService: CommunicationComponentService) {
        SnackBarUtil.snackBar = snackBar;
    }
    /* #ednregion */

    /* #region Metodos Publicos */
    /** Exibição mensagens de erro do sistema*/
    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.userServices.logout();
                this.router.navigate(['/login']);
            }

            const error = err.error.Message || err.error.message || err.error.error_description || err.statusText;

            SnackBarUtil.show(error);

            this.communicationComponentService.hideLoading();

            return throwError(error);
        }));
    }
    /* #ednregion */
}

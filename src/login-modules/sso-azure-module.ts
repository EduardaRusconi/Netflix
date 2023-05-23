import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsalInterceptor, MsalModule, MsalService } from '@azure/msal-angular';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment, GlobalEnvironment } from 'src/environments/environment';
import { SSOAzureRoutingModule } from './sso-azure-routing-module';

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;


@NgModule({
  imports: [
    CommonModule,
    SSOAzureRoutingModule,

    MsalModule.forRoot({
      auth: {
        clientId: GlobalEnvironment.environmentConfiguration.azure.ClientId,
        authority: GlobalEnvironment.environmentConfiguration.azure.Authority,
        redirectUri: environment.redirectUri,
      },
      cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: isIE, // Set to true for Internet Explorer 11
      },
    }, {
      popUp: !isIE,
      consentScopes: [
        'user.read',
        'openid',
        'profile',
      ],
      unprotectedResources: [],
      protectedResourceMap: [
        ['https://graph.microsoft.com/v1.0/me', ['user.read']]
      ],
      extraQueryParameters: {}
    }),
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: MsalInterceptor,
    multi: true
  } ]
})
export class SSOAzureModule { }

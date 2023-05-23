import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsalInterceptor, MsalModule } from '@azure/msal-angular';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { GlobalEnvironment } from 'src/environments/environment';
import { DefaultRoutingModule } from './default-routing-module';

@NgModule({
  imports: [
    CommonModule,
    DefaultRoutingModule,
    MsalModule.forRoot({
      auth: {
        clientId: '',
        authority: '',
        redirectUri: '',
      }
    }),
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: MsalInterceptor,
    multi: true
  }]
})
export class DefaultModule {
  constructor() {
  }
}

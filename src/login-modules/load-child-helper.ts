import { HttpClient, HttpHandler, HttpXhrBackend } from '@angular/common/http';
import { Injector } from '@angular/core';
import { environment, GlobalEnvironment } from 'src/environments/environment';
import { clientModel } from 'src/model/clientModel';
import { HttpClientHelper } from 'src/services/HttpClientHelper';

export class LoadChildHelper {
  public static defaultLoadChild(): Promise<any> {
    GlobalEnvironment.environmentConfiguration = {
      logoUrl: 'http://greend.com.br/wp-content/uploads/2020/09/admin-ajax.png',
      azure: {
        ApiScope: '',
        Authority: '',
        ClientId: '',
        URLToLogin: '',
      },
    };

    return import('src/login-modules/default-module').then(m => m.DefaultModule);
  }

  public static async azureLoadChild(): Promise<any> {
    const injector = Injector.create({
      providers: [
        { provide: HttpClient, deps: [HttpHandler] },
        { provide: HttpHandler, useValue: new HttpXhrBackend({ build: () => new XMLHttpRequest }) }
      ],
    });

    const httpClient: HttpClient = injector.get(HttpClient);

    let client = await HttpClientHelper.get<clientModel>(
      httpClient,
      environment.urlAPI + 'Client/GetClientAzureSSO?ssoClient=',
      location.href.split('/')[location.href.split('/').length - 1]
    );

    if (client == null) {
      location.href = '';
      return;
    }

    GlobalEnvironment.environmentConfiguration = {
      logoUrl: client?.Logo || 'http://greend.com.br/wp-content/uploads/2020/09/admin-ajax.png',
      azure: {
        ClientId: client?.AzureClientId ?? "",
        Authority: 'https://login.microsoftonline.com/' + client?.AzureTenant, // This is your tenant ID
        ApiScope: "api://" + client?.AzureClientId + "/access_as_user",
        URLToLogin: client?.AzureURLToLogin ?? '',
      },
    };

    return import('src/login-modules/sso-azure-module').then(m => m.SSOAzureModule);
  }
}

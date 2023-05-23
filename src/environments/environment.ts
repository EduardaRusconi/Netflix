// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { azureModel } from "src/model/azureModel";

export const environment = {
  production: false,
  urlAPI: 'https://localhost:44351/api/',
  urlToken: 'https://localhost:44351/token',
  // urlAPI: 'https://172.16.0.16:44352/api/',
  // urlToken: 'https://172.16.0.16:44352/token',

  redirectUri: 'http://localhost:44342/dashboard', // This is your redirect URI AD
 // redirectUri: 'https://172.16.0.16:44342/dashboard', // This is your redirect URI AD
};

export class GlobalEnvironment {
  public static environmentConfiguration: EnvironmentConfiguration = {
    azure: {
      ApiScope: '',
      Authority: '',
      ClientId: '',
      URLToLogin: '',
    },
    logoUrl: '',
  };
}

export class EnvironmentConfiguration {
  public azure: azureModel = {
    ApiScope: '',
    Authority: '',
    ClientId: '',
    URLToLogin: '',
  };
  public logoUrl: string = '';
}


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
// link para acessar o site https://172.16.0.16:44342/ 
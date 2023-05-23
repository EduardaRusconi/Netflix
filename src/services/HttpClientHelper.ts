import { HttpClient, HttpHeaders } from "@angular/common/http";

export class HttpClientHelper {
  /* #region Metodos Publicos */
  /** Adiciona dados do cliente  no sistema */
  public static async post<U>(httpClient: HttpClient, url: string, data: any, option?: { headers: HttpHeaders }): Promise<U> {
    return httpClient.post<U>(url, data, option)
      .toPromise().then(data => {
        return data;
      });
  }

  /** Busca dados do cliente no sistema */
  public static async get<U>(httpClient: HttpClient, url: string, data: string): Promise<U | null> {
    return httpClient.get<U>(url + data)
      .toPromise().then(data => {
        return data;
      }).catch(() => {
        return null;
      });
  }
  /* #endregion */
}
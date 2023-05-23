import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { HttpClientHelper } from "./HttpClientHelper";

export abstract class BaseServices<T> {

    /* #region Construtor */
    constructor(public controller: string, public http: HttpClient) {
    }
    /* #endregion */

    /* #region Metodos Publicos */
    public async add(baseModel: T): Promise<T> {
        return await HttpClientHelper.post<T>(this.http, environment.urlAPI + this.controller + '/Add', baseModel);
    }

    public async update(baseModel: T): Promise<boolean> {
        return await HttpClientHelper.post<boolean>(this.http, environment.urlAPI + this.controller + '/Update', baseModel);
    }

    public async delete(Id: number): Promise<boolean> {
        return await HttpClientHelper.get<boolean>(this.http, environment.urlAPI + this.controller + '/Remove/' + Id, '') ?? true;
    }

    public async getData(Id: number): Promise<T | null> {
        return await HttpClientHelper.get<T>(this.http, environment.urlAPI + this.controller + '/GetData/' + Id, '');
    }

    public async listDatas(): Promise<T[] | null> {
        return await HttpClientHelper.get<T[]>(this.http, environment.urlAPI + this.controller + '/ListDatas', '');
    }

    /* #endregion */
}
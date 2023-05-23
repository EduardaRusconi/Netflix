import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { groupModel } from "src/model/groupModel";
import { BaseServices } from "./BaseServices";



@Injectable()

export class GroupServices extends BaseServices<groupModel> {

  /* #region Cosntrutor */

  constructor(http: HttpClient) {
    super('Group', http);
  }
  /* #endregion */
}
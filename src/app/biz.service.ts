import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { BizInfo, GetBizListRsp} from "./biz_info";


@Injectable({
  providedIn: 'root'
})
export class BizService {

  host = 'https://flask-server-angular.azurewebsites.net';
  // host = '';
  constructor(
    private http: HttpClient,
  ) { }
  getBizList() {
        return this.http.get<GetBizListRsp>(this.host + '/get_biz_list', {
            responseType: 'json'
        }); 
    }
  getBizInfo(bizId: string) {
        return this.http.get(this.host + '/get_biz_info', {
            responseType: 'json',
            params: {id: bizId}
        }); 
    }
  deleteBizInfo(bizId: string) {
        return this.http.get(this.host + '/delete_biz_info', {
            responseType: 'json',
            params: {id: bizId}
        }); 
    }
  addCompanyInfo(info: Object) {
        return this.http.post(this.host + '/add_company_info', info); 
    }
  updateCompanyInfo(info: Object) {
        // info['id'] = bizId;
        return this.http.post(this.host + '/update_company_info', info); 
    }
}

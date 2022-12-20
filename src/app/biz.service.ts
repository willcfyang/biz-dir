import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { BizInfo, GetBizListRsp} from "./biz_info";


@Injectable({
  providedIn: 'root'
})
export class BizService {

  constructor(
    private http: HttpClient,
  ) { }
  getBizList() {
        return this.http.get<GetBizListRsp>('http://192.168.5.23:5002/get_biz_list', {
            responseType: 'json'
        }); 
    }
  getBizInfo(bizId: string) {
        return this.http.get('http://192.168.5.23:5002/get_biz_info', {
            responseType: 'json',
            params: {id: bizId}
        }); 
    }
  deleteBizInfo(bizId: string) {
        return this.http.get('http://192.168.5.23:5002/delete_biz_info', {
            responseType: 'json',
            params: {id: bizId}
        }); 
    }
  addCompanyInfo(info: Object) {
        return this.http.post('http://192.168.5.23:5002/add_company_info', info); 
    }
  updateCompanyInfo(info: Object) {
        // info['id'] = bizId;
        return this.http.post('http://192.168.5.23:5002/update_company_info', info); 
    }
}

import { Component } from '@angular/core';
import { Item } from "./item";
import { BizInfo, GetBizListRsp} from "./biz_info";
import {BizService} from './biz.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
        private bizService: BizService,
    ) {
    }

  async ngOnInit() {
        const res = await this.bizService.getBizList().toPromise() 
        if(res && res.data){
            this.allItems = res.data;
            console.log("set allItems to");
        }
            console.log("res:",res);
        this.bizService.getBizInfo('639bb6264dc2cfe298bc7833').subscribe(res => {
            console.log(res);
        });
        var obj = {
          'company_name':'apple',
          'location_type':'apple',
          'country':'apple',
          'address':'apple',
          'id':'',
        };
        // this.bizService.addCompanyInfo(obj).subscribe(res => {
            // console.log(res);
        // });
        obj['country'] = 'txt';
        obj['id'] = '639bdd54f4a9c8d63a6104b7';
        // this.bizService.updateCompanyInfo(obj).subscribe(res => {
          //  console.log(res);
        // });
    }
  title = 'todo';
  filter: 'all' | 'active' | 'done' = 'all';
  allItems:BizInfo[] = [];

  get items() {
    console.log("allItems:",this.allItems);
    if (this.filter === 'all') {
      return this.allItems;
    }
    return this.allItems;
    // return this.allItems.filter((item) => this.filter === 'done' ? item.done : !item.done);
  }
  addItem(company_name: string, location_type:string, country: string, address: string) {
    var item = {
      company_name,
      location_type,
      country,
      address,
    };
    this.bizService.addCompanyInfo(item).subscribe(res => { 
      console.log(res);                                  
    });                                                    
    this.allItems.unshift(item);
  }
  searchItem(company_name: string, location_type:string, country: string, address: string) {
    var item = {
      company_name,
      location_type,
      country,
      address,
    };
    this.bizService.addCompanyInfo(item).subscribe(res => { 
      console.log(res);                                  
    });                                                    
    this.allItems.unshift(item);
  }
  remove(item: BizInfo) {
    if(item.id)
    this.bizService.deleteBizInfo(item.id)
    this.allItems.splice(this.allItems.indexOf(item), 1);
  }
}

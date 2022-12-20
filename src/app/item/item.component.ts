import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Item } from "../item";
import { BizInfo, GetBizListRsp } from "../biz_info"; 

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  editable = false;

  @Input() item!: BizInfo;
  @Input() newItem!: string;
  @Output() remove = new EventEmitter<BizInfo>();

  saveItem(company_name: string, location_type: string, country:string, address:string) {
    var obj = {
      company_name,
      location_type,
      country,
      address,
    }
    this.item = obj;
    this.editable = false;
    // this.bizService.updateCompanyInfo(obj).subscribe(res => {});
  }
}

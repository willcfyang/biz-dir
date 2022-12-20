export interface GetBizListRsp {
  ret: number;
  msg: string;
  data: BizInfo[];
}
export interface BizInfo {
  id?: string;
  company_name: string;
  location_type: string;
  country: string;
  address: string;
}

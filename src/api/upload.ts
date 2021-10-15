import { Object2FormData } from '../utils';
import request, { checkResult } from '../utils/request';


const prefix2 = process.env.NODE_ENV === 'production' ? '//api.8and1.cn/v1' : 'http://127.0.0.1:7001/api/v1';

export function uploadImg(data: any) {
  return request({
    method: "POST",
    url: `${prefix2}/common/uploadImg`,
    data: Object2FormData(data),
  }).then(checkResult);
}

export function uploadURL(urlList: string[]) {
  return request<Record<string, string>>({
    method: "POST",
    url: `${prefix2}/proxy/sm/upload`,
    data: {
      urls: urlList
    },
  }).then(checkResult);
}
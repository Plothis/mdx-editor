import { Object2FormData } from '../utils';
import request, { checkResult } from '../utils/request';


const prefix2 = process.env.NODE_ENV === 'production' ? 'http://114.67.103.78:3003/api' : 'http://localhost:3003/api';

export function uploadImg(data: any) {
  return request({
    method: "POST",
    url: `${prefix2}/upload`,
    data: Object2FormData(data),
  }).then(checkResult);
}

export function uploadURL(urlList: string[]) {
  return request<Record<string, string>>({
    method: "POST",
    url: `${prefix2}/upload-url`,
    data: {
      urls: urlList
    },
  }).then(checkResult);
}
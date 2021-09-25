import { Object2FormData } from '../utils';
import request, { checkResult } from '../utils/request';


const prefix2 = 'http://114.67.103.78:3003//api';
export function uploadImg(data: any) {
  return checkResult(request({
    method: "POST",
    url: `${prefix2}/upload`,
    data: Object2FormData(data),
  }));
}


import { Object2FormData } from '../utils';
import request, { checkResult } from '../utils/request';

const prefix = `/v2`

const smURL = 'https://sm.ms/api/v2';
const prefix2 = 'http://localhost:3003/api';
export function uploadImg(data: any) {
  return checkResult(request({
    method: "POST",
    url: `${prefix2}/upload`,
    data: Object2FormData(data),
  }));
}


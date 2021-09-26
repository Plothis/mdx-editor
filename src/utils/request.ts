import Axios, { AxiosRequestConfig } from 'axios';
import { isObjectLike } from 'lodash';
import { notification } from 'antd';
import { ResponseData } from '../interface/http';
interface Config extends AxiosRequestConfig {
  errorTip?: string; // 错误提示内容，获取后端数据失败时，
}
export const rootPath = '/api';

export const http = Axios.create({
  baseURL: rootPath,
  timeout: 300000,
  // headers: {
  //   'Content-Type': 'application/json',
  // },
  // withCredentials: true,
});


export const request = async function<T = any>(config: Config) {
  const tip = config.errorTip || '网络开小差了！';
  try {
    const result = await http.request<ResponseData<T>>(config);
    if (
      result &&
      result.status >= 200 &&
      result.status < 300 &&
      isObjectLike(result.data)
    ) {
      return result.data;
    }

    const error = {
      tip,
      response: result,
      url: config.url,
    };
    notification.error({
      message: `${tip}`,
      description: error.tip,
    });
    throw error
  } catch (error) {
    notification.error({
      message: `${tip}`,
      description: `${error}`,
    });
    throw error
  }


};
export default request;
/**
 * 检测服务端处理结果，失败就提示，成功就返回data.data
 * 注意：下游将无法获取data.code 和data.massage，下游可在catch中处理失败的情况
 * @param res
 */
export function checkResult<T extends any>(data: ResponseData<T>) {
  if (data.code !== 0 && data.message) {
    notification.error({
      message: `请求错误 ${data.code}`,
      description: String(data.message),
    });
    throw data.message;
  } else {
    return data.data;
  }
}

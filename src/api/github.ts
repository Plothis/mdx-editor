import Cookies from 'js-cookie';
import request, { checkResult } from '../utils/request';

const prefix2 = '//api.8and1.cn/mdx-editor/v1';
// const prefix2 = '//192.168.1.4:7001/api/v1';

export async function getUser(): Promise<any> {
    return request({
        url: `https://api.github.com/user`,
        headers: {
            Authorization: `Bearer ${ Cookies.get('github-token')}`
        }
    })
}

export function loginOAuth(code: string) {
    return request<{
        access_token: string
        scope: string
        token_type: string
    }>({
      method: "GET",
      url: `${prefix2}/github/oauth?code=${code}`,
    }).then(checkResult);
}

import Cookies from 'js-cookie';
import request, { checkResult } from '../utils/request';

export async function getUser() {

    return request({
        url: `https://api.github.com/user`,
        headers: {
            Authorization: Cookies.get('githubAuth')
        }
    })
}
export function loginOAuth() {
    return request({
        url: `https://api.github.com/login/oauth/${Cookies.get('githubAuth')}`
    })
}


import _ from 'lodash';
import {makeApiPost} from './api-service'
import { AUTH_PATH } from '../services/auth-const'
import { jwt } from '../helpers/stores'
import { get } from 'svelte/store';

export async function register(email, password) {
    const resourcePath = `${AUTH_PATH.SERVER}${AUTH_PATH.REGISTER}`;
    return makeApiPost(resourcePath, { email, password, confirmPassword: password, acceptTerms: true });
}

export async function login(email, password) {
    const resourcePath = `${AUTH_PATH.SERVER}${AUTH_PATH.LOGIN}`;
    return makeApiPost(resourcePath, { email, password });
}

export async function forgotPassword(email) {
    const resourcePath = `${AUTH_PATH.SERVER}${AUTH_PATH.FORGOT_PASSWORD}`;
    return makeApiPost(resourcePath, { email });
}

export async function verifyEmail(token) {
    console.log('verifyEmail...', token)
    const resourcePath = `${AUTH_PATH.SERVER}${AUTH_PATH.EMAIL_VERIFICATION}`;
    return makeApiPost(resourcePath, { token });
}

export function logOut() {
    
    jwt.update(token => false)
    localStorage.removeItem('email')
    localStorage.removeItem('role')
    
}

function storeUserInfo(userInfo) {
    const jwt = _.get(userInfo, 'jwt')
    const email = _.get(userInfo, 'email')
    const role = _.get(userInfo, 'role')

    if (jwt) {
        localStorage.setItem('jwt', jwt)
    }

    if (email) {
        localStorage.setItem('email', email)
    }

    if (role) {
        localStorage.setItem('role', role)
    }
}


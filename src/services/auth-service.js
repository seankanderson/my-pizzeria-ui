import _ from 'lodash';
import {makeApiPost} from './api-service'
import { ACCOUNT_PATH, createUrlFor } from '../services/api-const'
import { jwt } from '../helpers/stores'
import { get } from 'svelte/store'
import jwt_decode from 'jwt-decode '

export async function register(email, password) {
    const resourcePath = createUrlFor(ACCOUNT_PATH.REGISTER)
    return makeApiPost(resourcePath, { email, password, confirmPassword: password, acceptTerms: true })
}

export async function login(email, password) {
    const loginPath = createUrlFor(ACCOUNT_PATH.LOGIN)
    return makeApiPost(loginPath, { email, password })    
}

export async function forgotPassword(email) {
    const resourcePath = createUrlFor(ACCOUNT_PATH.FORGOT_PASSWORD)
    return makeApiPost(resourcePath, { email })
}

export async function verifyEmail(token) {
    const resourcePath = createUrlFor(ACCOUNT_PATH.EMAIL_VERIFICATION)
    return makeApiPost(resourcePath, { token })
}

export async function refreshToken() { 
    const resourcePath = createUrlFor(ACCOUNT_PATH.REFRESH_TOKEN)
    return makeApiPost(resourcePath, {})
}

export async function revokeToken() { 
    const resourcePath = createUrlFor(ACCOUNT_PATH.REVOKE_TOKEN)
    const token = get(jwt)
    const body = {token}
    console.log('body...', body)
    return makeApiPost(resourcePath, body)
}

export async function revokeCookie() { //uses refresh cookie
    const resourcePath = createUrlFor(ACCOUNT_PATH.REVOKE_TOKEN)
    return makeApiPost(resourcePath, {})
}

export async function logOut() {
    const request = revokeCookie()
    jwt.update(token => false)
    return request
}

export function parseJwt() {
    const token = get(jwt)
    if (token) {
        return jwt_decode(token)
    }else {
        return null
    }
    
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


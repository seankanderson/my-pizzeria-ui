import axios from 'axios';
import _ from 'lodash';
import { AUTH_PATH } from '../services/auth-const'


export async function register(email, password) {
    const resourcePath = `${AUTH_PATH.SERVER}${AUTH_PATH.REGISTER}`;
    return makeApiPost(resourcePath, {email, password, confirmPassword: password, acceptTerms: true});
}

export async function login(email, password) {
    const resourcePath = `${AUTH_PATH.SERVER}${AUTH_PATH.LOGIN}`;
    return makeApiPost(resourcePath, {email, password});
}

export async function forgotPassword(email) {
    const resourcePath = `${AUTH_PATH.SERVER}${AUTH_PATH.FORGOT_PASSWORD}`;
    return makeApiPost(resourcePath, {email});
}

export async function verifyEmail(token) { 
    console.log('verifyEmail...', token)
    const resourcePath = `${AUTH_PATH.SERVER}${AUTH_PATH.EMAIL_VERIFICATION}`;
    return makeApiPost(resourcePath, {token});
}

async function makeApiPost(resourcePath, bodyJson) {
    console.log('postBody...', bodyJson);
    try {
        const { data } = await axios.post(resourcePath, bodyJson);
        console.log(`${resourcePath}-->`, data);
        return mapApiResponseResult(data);

    } catch (error) {
        return mapApiErrorResult(error);
    }
}

const mapApiResponseResult = (responseData) => {
    return { response: responseData, error: false };
}

const mapApiErrorResult = (error) => {
    let errorMessage = null;
    if (_.get(error, 'code') === 'ERR_NETWORK') {
        errorMessage = `Unable to reach server: ${server} Internet connection?`
    }

    const serverError = _.get(error.response, 'data')
    if (serverError) {
        if (_.get(serverError, 'message')) {
            errorMessage = serverError.message;
        }
    }

    return { response: null, error: errorMessage }
} 
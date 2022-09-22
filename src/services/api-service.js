import _ from 'lodash'
import axios from 'axios'
import { get } from 'svelte/store';
import { jwt } from '../helpers/stores'
 
export async function makeApiPost(resourcePath, bodyJson) {
    const config = createConfig()
    try {
        const { data } = await axios.post(resourcePath, bodyJson, config);
        return mapApiResponseResult(data);

    } catch (error) {
        return mapApiErrorResult(error);
    }
}

const createConfig = () => {
   const config = {
        headers: {
            Authorization: `Bearer ${get(jwt)}`
        }
    }

    console.log('api-service-header-config-from-store: ', config.headers)

    return config
}

const mapApiResponseResult = (responseData) => {
    return { data: responseData, error: false };
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

    return { data: null, error: errorMessage }
} 

export function getResponseMessages(axiosResponse) {
    
    let responseMessage;
    let errorMessage;

    if (axiosResponse.response) {
        
        const jwt = _.get(axiosResponse.response, "jwtToken");
        if (jwt) {
            responseMessage = "Success!";
        }

        responseMessage = responseMessage ? responseMessage : _.get(axiosResponse.response, "message");
        responseMessage = responseMessage ? responseMessage : axiosResponse.response;
    }

    if (axiosResponse.error) {
        errorMessage = axiosResponse.error;
    }

    return {responseMessage, errorMessage}
}
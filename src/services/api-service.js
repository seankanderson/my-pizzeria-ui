import _, { update } from 'lodash'
import axios from 'axios'
import { get } from 'svelte/store';
import { jwt } from '../helpers/stores'
 
export async function makeApiGet(resourcePath) {
    const config = createConfig()
    try {
        const { data } = await axios.get(resourcePath, config);
        return mapApiResponseResult(data)

    } catch (error) {
        return mapApiErrorResult(error)
    }
}

export async function makeApiPost(resourcePath, bodyJson) {
    const config = createConfig()
    try {
        const response = await axios.post(resourcePath, bodyJson, config);
        return mapApiResponseResult(response.data)

    } catch (error) {
        return mapApiErrorResult(error)
    }
}

const createConfig = () => {
   const config = {
        headers: {
            Authorization: `Bearer ${get(jwt)}`
        },
        withCredentials: true
    }
    return config
}

const mapApiResponseResult = (responseData) => {
    return { data: responseData, error: false }
}

const mapApiErrorResult = (error) => {
    let errorMessage = null;
    if (_.get(error, 'code') === 'ERR_NETWORK') {
        errorMessage = `Unable to reach server. Internet connection?`
    }

    const serverError = _.get(error.response, 'data')
    if (serverError) {
        if (_.get(serverError, 'message')) {
            errorMessage = serverError.message;
        }
    }

    if (errorMessage === 'Unauthorized') {
        jwt.update(x => false)
    }

    return { data: null, error: errorMessage }
} 

export function getResponseMessages(axiosResponse) {
    
    let responseMessage;
    let errorMessage;

    if (axiosResponse.response) {
        
        const jwt = _.get(axiosResponse.response, "jwtToken")
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
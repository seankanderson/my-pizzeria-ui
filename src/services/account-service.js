import _ from 'lodash';
import {makeApiGet} from './api-service'
import { createUrlFor, ACCOUNT_PATH } from '../services/api-const'

export async function getAllAccounts() {
    const resourcePath = createUrlFor(ACCOUNT_PATH.ACCOUNTS)
    return makeApiGet(resourcePath)
}


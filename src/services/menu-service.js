import _ from 'lodash';
import { makeApiGet, makeApiPost } from './api-service'
import { createUrlFor, MENU_PATH } from '../services/api-const'

export async function getAllCategories() {
    const resourcePath = createUrlFor(MENU_PATH.CATEGORIES)
    return makeApiGet(resourcePath)
}

export async function createOrUpdateCategory(category) {
    const resourcePath = createUrlFor(MENU_PATH.CATEGORIES)
    return makeApiPost(resourcePath, category)
}

export async function createOrUpdateTopping(topping) {
    const resourcePath = createUrlFor(MENU_PATH.TOPPINGS)
    return makeApiPost(resourcePath, topping)
}

export async function getAllToppings() {
    const resourcePath = createUrlFor(MENU_PATH.TOPPINGS)
    return makeApiGet(resourcePath)
}

export function addCategoryTo(categorized, category) {
    const categories = _.get(categorized, 'categories')

    if (!categories) {

        categorized.categories = []
        categorized.categories.push(category)
        return categorized

    } else {

        if (categories.length == 0) {
            
            categorized.categories.push(category)
            return categorized

        } else {
            
            const categoriesFound = categories.find(x => x === category)
            
            if (categoriesFound) {
                return categorized
            } else {
                categorized.categories.push(category)
                return categorized
            }
            
        }

    }

}


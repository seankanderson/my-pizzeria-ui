
export const SERVER = {
    HOST: 'http://127.0.0.1',
    PORT: '4000'
}

export const ACCOUNT_PATH = {
    REGISTER: '/accounts/register',
    EMAIL_VERIFICATION: '/accounts/verify-email',
    FORGOT_PASSWORD: '/accounts/forgot-password',
    RESET_PASSWORD: 'accounts/reset-password',
    LOGIN: '/accounts/authenticate',
    REFRESH_TOKEN: '/accounts/refresh-token',
    REVOKE_TOKEN: '/accounts/revoke-token',
    ACCOUNTS: '/accounts'
}

export const createUrlFor = (apiRoute) => {
    return `${SERVER.HOST}:${SERVER.PORT}${apiRoute}`
}

export const MENU_PATH = {
    CATEGORIES: '/menu/category',
    TOPPINGS: '/menu/topping'
}
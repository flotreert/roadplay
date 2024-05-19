// This file is auto-generated by @hey-api/openapi-ts

import type { CancelablePromise } from '../core/CancelablePromise';
import { ClientApi } from '../core/ClientApi';
import { request as __request } from '../core/request';
import type { $OpenApiTs } from '../types/auth';

export class AuthService {
    /**
     * Login For Access Token
     * @param data The data for the request.
     * @param data.formData
     * @returns Token Successful Response
     * @throws ApiError
     */
    public static loginForAccessTokenTokenLoginPost(data: $OpenApiTs['/token/login']['post']['req']): CancelablePromise<$OpenApiTs['/token/login']['post']['res'][200]> {
        return __request(ClientApi, {
            method: 'POST',
            url: '/token/login',
            formData: data.formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                422: 'Validation Error'
            }
        });
    }
    
    /**
     * Refresh Token
     * @param data The data for the request.
     * @returns unknown Successful Response
     * @throws ApiError
     */
    public static refreshTokenTokenRefreshPost(): CancelablePromise<$OpenApiTs['/token/refresh']['post']['res'][200]> {
        return __request(ClientApi, {
            method: 'POST',
            url: '/token/refresh',
            errors: {
                422: 'Validation Error'
            }
        });
    }
    
    /**
     * Read Users Me
     * @param data The data for the request.
     * @returns User Successful Response
     * @throws ApiError
     */
    public static readUsersMeUsersMeGet(): CancelablePromise<$OpenApiTs['/users/me/']['get']['res'][200]> {
        return __request(ClientApi, {
            method: 'GET',
            url: '/users/me/',
            errors: {
                422: 'Validation Error'
            }
        });
    }
    
    /**
     * Read Own Items
     * @param data The data for the request.
     * @returns unknown Successful Response
     * @throws ApiError
     */
    public static readOwnItemsUsersMeItemsGet(data: $OpenApiTs['/users/me/items/']['get']['req']): CancelablePromise<$OpenApiTs['/users/me/items/']['get']['res'][200]> {
        return __request(ClientApi, {
            method: 'GET',
            url: '/users/me/items/',
            query: {
                session: data.session
            },
            errors: {
                422: 'Validation Error'
            }
        });
    }
    
    /**
     * Get User
     * @param data The data for the request.
     * @param data.userId
     * @returns unknown Successful Response
     * @throws ApiError
     */
    public static getUserUserIdGet(data: $OpenApiTs['/{user_id}']['get']['req']): CancelablePromise<$OpenApiTs['/{user_id}']['get']['res'][200]> {
        return __request(ClientApi, {
            method: 'GET',
            url: '/{user_id}',
            path: {
                user_id: data.userId
            },
            errors: {
                422: 'Validation Error'
            }
        });
    }
    
    /**
     * Create User
     * @param data The data for the request.
     * @param data.requestBody
     * @returns unknown Successful Response
     * @throws ApiError
     */
    public static createUserCreatePost(data: $OpenApiTs['/create']['post']['req']): CancelablePromise<$OpenApiTs['/create']['post']['res'][201]> {
        return __request(ClientApi, {
            method: 'POST',
            url: '/create',
            body: data.requestBody,
            mediaType: 'application/json',
            errors: {
                422: 'Validation Error'
            }
        });
    }
    
}

export class UserService {
    /**
     * Read Users Me
     * @param data The data for the request.
     * @param data.session
     * @returns User Successful Response
     * @throws ApiError
     */
    public static readUsersMeUsersMeGet(data: $OpenApiTs['/users/me/']['get']['req']): CancelablePromise<$OpenApiTs['/users/me/']['get']['res'][200]> {
        return __request(ClientApi, {
            method: 'GET',
            url: '/users/me/',
            query: {
                session: data.session
            },
            errors: {
                422: 'Validation Error'
            }
        });
    }
    
    /**
     * Read Own Items
     * @param data The data for the request.
     * @param data.session
     * @returns unknown Successful Response
     * @throws ApiError
     */
    public static readOwnItemsUsersMeItemsGet(data: $OpenApiTs['/users/me/items/']['get']['req']): CancelablePromise<$OpenApiTs['/users/me/items/']['get']['res'][200]> {
        return __request(ClientApi, {
            method: 'GET',
            url: '/users/me/items/',
            query: {
                session: data.session
            },
            errors: {
                422: 'Validation Error'
            }
        });
    }
    
    /**
     * Get User
     * @param data The data for the request.
     * @param data.userId
     * @returns unknown Successful Response
     * @throws ApiError
     */
    public static getUserUserIdGet(data: $OpenApiTs['/{user_id}']['get']['req']): CancelablePromise<$OpenApiTs['/{user_id}']['get']['res'][200]> {
        return __request(ClientApi, {
            method: 'GET',
            url: '/{user_id}',
            path: {
                user_id: data.userId
            },
            errors: {
                422: 'Validation Error'
            }
        });
    }
    
    /**
     * Create User
     * @param data The data for the request.
     * @param data.requestBody
     * @returns unknown Successful Response
     * @throws ApiError
     */
    public static createUserCreatePost(data: $OpenApiTs['/create']['post']['req']): CancelablePromise<$OpenApiTs['/create']['post']['res'][201]> {
        return __request(ClientApi, {
            method: 'POST',
            url: '/create',
            body: data.requestBody,
            mediaType: 'application/json',
            errors: {
                422: 'Validation Error'
            }
        });
    }
    
}
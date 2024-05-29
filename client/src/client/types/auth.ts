export type Body_login_for_access_token_token_login_post = {
    grant_type?: string | null;
    username: string;
    password: string;
    scope?: string;
    client_id?: string | null;
    client_secret?: string | null;
};

export type CreateUserModel = {
    username: string;
    email: string;
    password: string;
};

export type HTTPValidationError = {
    detail?: Array<ValidationError>;
};

export type Token = {
    access_token: string;
    token_type: string;
};

export type User = {
    username: string;
    email?: string | null;
    full_name?: string | null;
    disabled?: boolean | null;
};

export type ValidationError = {
    loc: Array<(string | number)>;
    msg: string;
    type: string;
};

export type $OpenApiTs = {
    '/token/login': {
        post: {
            req: {
                formData: Body_login_for_access_token_token_login_post;
            };
            res: {
                /**
                 * Successful Response
                 */
                200: Token;
                /**
                 * Validation Error
                 */
                422: HTTPValidationError;
            };
        };
    };
    '/token/refresh': {
        post: {
            req: {
                session: unknown;
            };
            res: {
                /**
                 * Successful Response
                 */
                200: {
                    [key: string]: unknown;
                };
                /**
                 * Validation Error
                 */
                422: HTTPValidationError;
            };
        };
    };
    '/users/me/': {
        get: {
            req: {
                session: unknown;
            };
            res: {
                /**
                 * Successful Response
                 */
                200: User;
                /**
                 * Validation Error
                 */
                422: HTTPValidationError;
            };
        };
    };
    '/users/me/items/': {
        get: {
            req: {
                session: unknown;
            };
            res: {
                /**
                 * Successful Response
                 */
                200: unknown;
                /**
                 * Validation Error
                 */
                422: HTTPValidationError;
            };
        };
    };
    '/{user_id}': {
        get: {
            req: {
                userId: number;
            };
            res: {
                /**
                 * Successful Response
                 */
                200: unknown;
                /**
                 * Validation Error
                 */
                422: HTTPValidationError;
            };
        };
    };
    '/create': {
        post: {
            req: {
                requestBody: CreateUserModel;
            };
            res: {
                /**
                 * Successful Response
                 */
                201: unknown;
                /**
                 * Validation Error
                 */
                422: HTTPValidationError;
            };
        };
    };
};
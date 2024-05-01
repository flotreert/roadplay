// This file is auto-generated by @hey-api/openapi-ts

export type HTTPValidationError = {
    detail?: Array<ValidationError>;
};

/**
 * Tournament create model
 */
export type TournamentCreate = {
    name: string;
    sex: string;
    start_date: string;
    end_date: string;
    location: string;
    sport: string;
    age_group: Array<(string)>;
    category: string;
    fees: number;
    number_of_teams: number;
    description: string;
    organizer_id: number;
};

export type ValidationError = {
    loc: Array<(string | number)>;
    msg: string;
    type: string;
};

export type $OpenApiTs = {
    '/': {
        get: {
            res: {
                /**
                 * Successful Response
                 */
                200: unknown;
            };
        };
    };
    '/tournaments': {
        get: {
            res: {
                /**
                 * Successful Response
                 */
                200: unknown;
            };
        };
        post: {
            req: {
                requestBody: TournamentCreate;
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
    '/tournaments/{tournament_id}': {
        get: {
            req: {
                tournamentId: number;
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
        put: {
            req: {
                tournamentId: number;
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
        delete: {
            req: {
                tournamentId: number;
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
    '/tournaments/{tournament_id}/fill': {
        post: {
            req: {
                tournamentId: number;
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
    '/tournaments/{tournament_id}/remove_team': {
        post: {
            req: {
                tournamentId: number;
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
};
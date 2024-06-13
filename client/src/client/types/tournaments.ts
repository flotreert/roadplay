export type HTTPValidationError = {
    detail?: Array<ValidationError>;
};

/**
 * Tournament model
 */
export type Tournament = {
    id: number;
    organizer_id: number;
    created_at: string;
    updated_at: string;
    is_full?: boolean;
    name: string;
    sex: string;
    start_date: string;
    end_date: string;
    location: string;
    sport: string;
    age_group: Array<(number)>;
    category: string;
    fees: number;
    number_of_teams: number;
    participants: Array<(number)>;
    description: string;
};

/**
 * Tournament display model, lighter version of Tournament model
 */
export type TournamentDisplay = {
    name: string;
    sex: string;
    start_date: string;
    end_date: string;
    location: string;
    sport: string;
    age_group: Array<(number)>;
    category: string;
    fees: number;
    number_of_teams: number;
    description: string;
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
                200: Array<Tournament>;
            };
        };
        post: {
            req: {
                requestBody: TournamentDisplay;
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
                200: Tournament;
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
    };
    '/tournaments/{tournament_id}/remove_team': {
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
    };
};
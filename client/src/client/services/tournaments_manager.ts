// This file is auto-generated by @hey-api/openapi-ts

import type { CancelablePromise } from '../core/CancelablePromise';
import { ClientApi } from '../core/ClientApi';
import { request as __request } from '../core/request';
import type { $OpenApiTs } from '../types/tournaments';

const client = new ClientApi();
client.setBase('http://localhost:8080/api/tournaments');
client.setToken(window.localStorage.getItem('user') || '');

export class TournamentsService {
    /**
     * Read Root
     * @returns unknown Successful Response
     * @throws ApiError
     */
    public static readRootGet(): CancelablePromise<$OpenApiTs['/']['get']['res'][200]> {
        return __request(client, {
            method: 'GET',
            url: '/'
        });
    }
    
    /**
     * Get Tournaments
     * @returns Tournament Successful Response
     * @throws ApiError
     */
    public static getTournamentsTournamentsGet(): CancelablePromise<$OpenApiTs['/tournaments']['get']['res'][200]> {
        return __request(client, {
            method: 'GET',
            url: '/tournaments'
        });
    }
    
    /**
     * Create Tournament
     * @param data The data for the request.
     * @param data.requestBody
     * @returns unknown Successful Response
     * @throws ApiError
     */
    public static createTournamentTournamentsPost(data: $OpenApiTs['/tournaments']['post']['req']): CancelablePromise<$OpenApiTs['/tournaments']['post']['res'][200]> {
        return __request(client, {
            method: 'POST',
            url: '/tournaments',
            body: data.requestBody,
            mediaType: 'application/json',
            errors: {
                422: 'Validation Error',
                401: 'Unauthorized'
            }
        });
    }
    
    /**
     * Get Tournament
     * @param data The data for the request.
     * @param data.tournamentId
     * @returns Tournament Successful Response
     * @throws ApiError
     */
    public static getTournamentTournamentsTournamentIdGet(data: $OpenApiTs['/tournaments/{tournament_id}']['get']['req']): CancelablePromise<$OpenApiTs['/tournaments/{tournament_id}']['get']['res'][200]> {
        return __request(client, {
            method: 'GET',
            url: '/tournaments/{tournament_id}',
            path: {
                tournament_id: data.tournamentId
            },
            errors: {
                422: 'Validation Error'
            }
        });
    }
    
    /**
     * Update Tournament
     * Update a tournament
     * Args:
     * tournament_id (int): Tournament ID
     * db (orm.Session): Database session
     * @param data The data for the request.
     * @param data.tournamentId
     * @param data.requestBody
     * @returns unknown Successful Response
     * @throws ApiError
     */
    public static updateTournamentTournamentsTournamentIdPatch(data: $OpenApiTs['/tournaments/{tournament_id}']['patch']['req']): CancelablePromise<$OpenApiTs['/tournaments/{tournament_id}']['patch']['res'][200]> {
        return __request(client, {
            method: 'PATCH',
            url: '/tournaments/{tournament_id}',
            path: {
                tournament_id: data.tournamentId
            },
            body: data.requestBody,
            mediaType: 'application/json',
            errors: {
                422: 'Validation Error'
            }
        });
    }
    
    /**
     * Delete Tournament
     * @param data The data for the request.
     * @param data.tournamentId
     * @returns unknown Successful Response
     * @throws ApiError
     */
    public static deleteTournamentTournamentsTournamentIdDelete(data: $OpenApiTs['/tournaments/{tournament_id}']['delete']['req']): CancelablePromise<$OpenApiTs['/tournaments/{tournament_id}']['delete']['res'][200]> {
        return __request(client, {
            method: 'DELETE',
            url: '/tournaments/{tournament_id}',
            path: {
                tournament_id: data.tournamentId
            },
            errors: {
                422: 'Validation Error'
            }
        });
    }
    
    /**
     * Fill Tournament
     * @param data The data for the request.
     * @param data.tournamentId
     * @returns unknown Successful Response
     * @throws ApiError
     */
    public static fillTournamentTournamentsTournamentIdFillPut(data: $OpenApiTs['/tournaments/{tournament_id}/fill']['put']['req']): CancelablePromise<$OpenApiTs['/tournaments/{tournament_id}/fill']['put']['res'][200]> {
        return __request(client, {
            method: 'PUT',
            url: '/tournaments/{tournament_id}/fill',
            path: {
                tournament_id: data.tournamentId
            },
            errors: {
                422: 'Validation Error'
            }
        });
    }
    
    /**
     * Remove Team
     * @param data The data for the request.
     * @param data.tournamentId
     * @returns unknown Successful Response
     * @throws ApiError
     */
    public static removeTeamTournamentsTournamentIdRemoveTeamPut(data: $OpenApiTs['/tournaments/{tournament_id}/remove_team']['put']['req']): CancelablePromise<$OpenApiTs['/tournaments/{tournament_id}/remove_team']['put']['res'][200]> {
        return __request(client, {
            method: 'PUT',
            url: '/tournaments/{tournament_id}/remove_team',
            path: {
                tournament_id: data.tournamentId
            },
            errors: {
                422: 'Validation Error'
            }
        });
    }
    
}
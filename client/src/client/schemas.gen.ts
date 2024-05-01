// This file is auto-generated by @hey-api/openapi-ts

export const $HTTPValidationError = {
    properties: {
        detail: {
            items: {
                '$ref': '#/components/schemas/ValidationError'
            },
            type: 'array',
            title: 'Detail'
        }
    },
    type: 'object',
    title: 'HTTPValidationError'
} as const;

export const $Tournament = {
    properties: {
        id: {
            type: 'integer',
            title: 'Id'
        },
        organizer_id: {
            type: 'integer',
            title: 'Organizer Id'
        },
        created_at: {
            type: 'string',
            format: 'date-time',
            title: 'Created At'
        },
        updated_at: {
            type: 'string',
            format: 'date-time',
            title: 'Updated At'
        },
        is_full: {
            type: 'boolean',
            title: 'Is Full',
            default: false
        },
        name: {
            type: 'string',
            title: 'Name'
        },
        sex: {
            type: 'string',
            title: 'Sex'
        },
        start_date: {
            type: 'string',
            title: 'Start Date'
        },
        end_date: {
            type: 'string',
            title: 'End Date'
        },
        location: {
            type: 'string',
            title: 'Location'
        },
        sport: {
            type: 'string',
            title: 'Sport'
        },
        age_group: {
            items: {
                type: 'string'
            },
            type: 'array',
            title: 'Age Group'
        },
        category: {
            type: 'string',
            title: 'Category'
        },
        fees: {
            type: 'integer',
            title: 'Fees'
        },
        number_of_teams: {
            type: 'integer',
            title: 'Number Of Teams'
        },
        current_teams: {
            type: 'integer',
            title: 'Current Teams'
        },
        description: {
            type: 'string',
            title: 'Description'
        }
    },
    type: 'object',
    required: ['id', 'organizer_id', 'created_at', 'updated_at', 'name', 'sex', 'start_date', 'end_date', 'location', 'sport', 'age_group', 'category', 'fees', 'number_of_teams', 'current_teams', 'description'],
    title: 'Tournament',
    description: 'Tournament model'
} as const;

export const $TournamentDisplay = {
    properties: {
        name: {
            type: 'string',
            title: 'Name'
        },
        sex: {
            type: 'string',
            title: 'Sex'
        },
        start_date: {
            type: 'string',
            title: 'Start Date'
        },
        end_date: {
            type: 'string',
            title: 'End Date'
        },
        location: {
            type: 'string',
            title: 'Location'
        },
        sport: {
            type: 'string',
            title: 'Sport'
        },
        age_group: {
            items: {
                type: 'string'
            },
            type: 'array',
            title: 'Age Group'
        },
        category: {
            type: 'string',
            title: 'Category'
        },
        fees: {
            type: 'integer',
            title: 'Fees'
        },
        number_of_teams: {
            type: 'integer',
            title: 'Number Of Teams'
        },
        description: {
            type: 'string',
            title: 'Description'
        }
    },
    type: 'object',
    required: ['name', 'sex', 'start_date', 'end_date', 'location', 'sport', 'age_group', 'category', 'fees', 'number_of_teams', 'description'],
    title: 'TournamentDisplay',
    description: 'Tournament display model, lighter version of Tournament model'
} as const;

export const $ValidationError = {
    properties: {
        loc: {
            items: {
                anyOf: [
                    {
                        type: 'string'
                    },
                    {
                        type: 'integer'
                    }
                ]
            },
            type: 'array',
            title: 'Location'
        },
        msg: {
            type: 'string',
            title: 'Message'
        },
        type: {
            type: 'string',
            title: 'Error Type'
        }
    },
    type: 'object',
    required: ['loc', 'msg', 'type'],
    title: 'ValidationError'
} as const;
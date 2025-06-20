

export type AuxtaIndexMode = 'ram' | 'disk' | 'hybrid';




export const AuxtaIndexErrorCodes = {
    INVALID_CONFIG: 'AuxtaIndexError.invalidConfig',
    INVALID_INDEX_NAME: 'AuxtaIndexError.invalidIndexName'
} as const;
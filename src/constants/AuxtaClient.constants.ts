

/**
 * Constants for Auxta Client
 * Describes the structure and sizes of the headers used in Auxta client requests.
 */
export const AUXTA_CLIENT_HEADER_SIZES = {
    action: 65,
    version: 8,
    token: 256,
    client: 64,
    headerTotal: 393, // sum of all above
} as const;


/**
 * Actions that are used by the Auxta server to handle client requests.
 * These actions represent the different operations that can be performed by the server.
 * Each action corresponds to a specific command (or set of commands) that the server can execute.
 */
export enum AuxtaServerAction {
    CONNECT = 'CONNECT',
    COMMAND = 'COMMAND',
    STATUS = 'STATUS',
    SYNC = 'SYNC',
    DISCONNECT = 'DISCONNECT',
    PING = 'PING',
    PONG = 'PONG',
    ERROR = 'ERROR',
}
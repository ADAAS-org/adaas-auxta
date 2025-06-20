


export interface IAuxtaConstructorConfig {

    /**
     * The name of the client using the Auxta server.
     * This is used for logging and identification purposes.
     */
    client: string;
    /**
     * The host of the Auxta server.
     */
    host: string;
    /**
     * The port of the Auxta server.
     */
    port: number;
    /**
     * The token for authentication with the Auxta server.
     */
    token: string;
    /**
     * Log level for the Auxta server.
     * Options are 'debug', 'info', 'warn', 'error', and 'silent'.
     */
    logs: 'debug' | 'info' | 'warn' | 'error' | 'silent';
    /**
     * The timeout for acquiring a connection from the pool in milliseconds.
     * Default is 5000 ms.
     */
    poolTimeout: number;
    /**
     * The size of the connection pool.
     */
    poolSize: number;

    /**
     * Allows automatic synchronize local setup with Auxta DB server.
     * If set to true, it will automatically synchronize the local setup with the Auxta DB server.
     */
    sync?: boolean;
}
import { ConnectionPool } from "@auxta/api/AuxtaConnectionPool.class";
import { GLOBAL_CONSTANTS } from "@auxta/constants/Global.constants";
import { AuxtaError } from "@auxta/errors/AuxtaError.class";
import { AuxtaBaseCommand } from "@auxta/lib/AuxtaBaseCommand.class";
import { IAuxtaConstructorConfig } from "@auxta/types/Auxta.types";
import { version } from '../../package.json';
import { AuxtaVector } from "./AuxtaVector";
import { AuxtaDefineCommand } from "@auxta/lib/commands/AuxtaDefine.command";
import { AUXTA_INDEXES } from "@auxta/decorators/Index.decorator";
import { AuxtaGetCommand } from "@auxta/lib/commands/AuxtaGet.command";
import { AuxtaAddCommand } from "@auxta/lib/commands/AuxtaAdd.command";
import { AuxtaServerResponse } from "@auxta/types/AuxtaClient.types";
import { AuxtaDropCommand } from "@auxta/lib/commands/AuxtaDrop.command";
import { AuxtaLogger } from "@auxta/utils/Logger.service";
import { AuxtaServerAction } from "@auxta/constants/AuxtaClient.constants";
import { AuxtaIndex } from "./AuxtaIndex";


export class Auxta {


    readonly ready!: Promise<void>;
    private config: IAuxtaConstructorConfig; // Configuration object for Auxta
    private pool!: ConnectionPool; // Placeholder for the connection pool, replace with actual type
    private vectors: Array<typeof AuxtaVector<any>> = []; // Array to hold vectors for synchronization
    private indexes: Array<AuxtaIndex> = []; // Array to hold indexes for synchronization

    /**
     * Auxta is a class that represents the main interface to interact with the Auxta database.
     * It provides methods to execute commands and manage connections to the Auxta server.
     * - The constructor can take a configuration object to set up the connection parameters.
     * - The `execute` method is used to send commands to the Auxta server.
     * 
     * [!] Please make sure that madatory parameters are set 
     * - in the configuration object. 
     * - OR via env variables 
     * - OR via .env file.
     * 
     * @param config 
     */
    constructor(
        config?: Partial<IAuxtaConstructorConfig>
    ) {
        if (!GLOBAL_CONSTANTS.SERVER.TOKEN && !config?.token) {
            throw AuxtaError.accessTokenNotSet(
                'Please provide a valid token in the configuration object or set it via environment variables.'
            );
        }

        this.config = {
            port: GLOBAL_CONSTANTS.SERVER.PORT,
            host: GLOBAL_CONSTANTS.SERVER.HOST,
            poolSize: GLOBAL_CONSTANTS.CONNECTION_POOL.SIZE,
            poolTimeout: GLOBAL_CONSTANTS.CONNECTION_POOL.TIMEOUT,
            logs: GLOBAL_CONSTANTS.LOGGING.LEVEL,
            token: config?.token || GLOBAL_CONSTANTS.SERVER.TOKEN,
            client: config?.client || GLOBAL_CONSTANTS.SERVER.CLIENT,
            sync: config?.sync || GLOBAL_CONSTANTS.DB.SYNC,
            ...(config || {}),
        };

        this.pool = new ConnectionPool({
            host: this.config.host,
            port: this.config.port,
            size: this.config.poolSize,
        })

        this.ready = this.init()
    }



    /**
     * Executes a command against the Auxta server.
     * This method takes an instance of `AuxtaBaseCommand` or its subclasses,
     * compiles it into a query, and sends it to the Auxta DB server.  
     * 
     * @param command 
     * @returns 
     */
    async query<T extends AuxtaVector<any> = any>(
        command: AuxtaDropCommand
    ): Promise<void>
    async query<T extends AuxtaVector<any> = any>(
        command: AuxtaAddCommand
    ): Promise<void>
    async query<T extends AuxtaVector<any> = any>(
        command: AuxtaGetCommand
    ): Promise<AuxtaVector<T>>
    async query(
        command: AuxtaBaseCommand
    ): Promise<any> {
        try {
            await this.ready;

            const result = await this.call(AuxtaServerAction.COMMAND, command);

            return this.mapResult(result);

        } catch (error) {
            throw AuxtaError.executionFailed(
                `Failed to execute command: ${error instanceof Error ? error.message : 'Unknown error'}`,
                error
            );
        }
    }



    private mapResult(response: AuxtaServerResponse) {
        if (response.data && Array.isArray(response.data)) {
            // If the result is an array, we assume it's a list of vectors
            return response.data.map((item: any) => {
                const targetConstructor = this.vectors.find(vector => vector.name === item.name);
                if (!targetConstructor) {
                    throw AuxtaError.executionFailed(
                        `Vector ${item.name} not found in the registered vectors.`
                    );
                }
                return new targetConstructor(item);
            });
        }
    }


    /**
     * Destroys the Auxta instance and closes the connection pool.
     * This method should be called when the Auxta instance is no longer needed.
     */
    async destroy() {
        if (this.pool) {
            await this.pool.shutdown();
        }
    }


    /**
     * Initializes the Auxta instance by setting up the connection pool and synchronizing with the server.
     * This method is called automatically when the Auxta instance is created.
     * 
     * [!] This method should not be called directly.
     */
    private async init() {
        try {
            //  Pool // Initialize the connection pool

            await this.pool.init();


            const indexes = Array.from(AUXTA_INDEXES.entries()).map(([name, index]) => {
                return index;
            });

            this.indexes = indexes;

            AuxtaLogger.info(`Auxta initialized with ${this.indexes.length} indexes.`);

            //  Syncronization // Synchronize the Auxta instance with the server

            if (this.config.sync && this.indexes && this.indexes.length) {
                await this.call(
                    AuxtaServerAction.SYNC,
                    new AuxtaDefineCommand().index(...this.indexes)
                );
            }

        } catch (error) {
            AuxtaLogger.error(error);

            throw AuxtaError.initializationError(
                `Failed to initialize Auxta instance: ${error instanceof Error ? error.message : 'Unknown error'}`,
                error
            );
        }

    }


    /**
     * Method to call a command directly. 
     * 
     * [!] This method is used internally and should not be called directly.
     * It omits error handling and connection management,
     * 
     * @param command 
     * @returns 
     */
    private async call(
        action: AuxtaServerAction,
        command: AuxtaBaseCommand
    ) {
        const client = await this.pool.acquire();

        const result = await client.send({
            headers: {
                token: this.config.token,
                version: version,
                client: GLOBAL_CONSTANTS.SERVER.CLIENT,
                action,
            },
            commands: command.build(),
        });

        this.pool.release(client);

        return result;
    }

}
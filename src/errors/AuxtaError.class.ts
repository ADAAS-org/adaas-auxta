import { AuxtaErrorCodes } from "@auxta/constants/Auxta.constants";


export class AuxtaError extends Error {

    /**
     * Error code for the Auxta error.
     */
    code!: string;

    /**
     * Custom error class for Auxta errors.
     * This class extends the built-in Error class to provide a custom error type for Auxta.
     * It can be used to throw errors with a specific code and message.
     */
    constructor(
        code: string = 'AuxtaError',
        message: string
    ) {
        super(message);
        this.code = code;
    }


    static methodNotImplemented(methodName: string): AuxtaError {
        return new AuxtaError(
            AuxtaErrorCodes.METHOD_NOT_IMPLEMENTED,
            `The method '${methodName}' is not implemented in the command class.`
        );
    }

    static accessTokenNotSet(message: string): AuxtaError {
        return new AuxtaError(
            AuxtaErrorCodes.INVALID_CONFIG,
            `Access Token Not Found. ${message}`
        );
    }

    static executionFailed(message: string, error?: Error | AuxtaError | unknown): AuxtaError {
        if (error instanceof AuxtaError) {
            return error
        }
        if (error instanceof Error) {
            return new AuxtaError(
                AuxtaErrorCodes.COMMAND_EXECUTION_FAILED,
                `Command execution failed: ${message}. Error: ${error.message}`
            );
        }
        return new AuxtaError(
            AuxtaErrorCodes.COMMAND_EXECUTION_FAILED,
            `Command execution failed: ${message}. Error: Unknown error`
        );
    }


    static synchronizationError(message: string, error?: Error | AuxtaError | unknown): AuxtaError {
        switch (true) {
            case !error:
                return new AuxtaError(
                    AuxtaErrorCodes.SYNCHRONIZATION_ERROR,
                    `Synchronization error: ${message}. Error: Unknown error`
                );
            case !!error && error instanceof AuxtaError:
                return error;

            case !!error && error instanceof Error:
                return new AuxtaError(
                    AuxtaErrorCodes.SYNCHRONIZATION_ERROR,
                    `Synchronization error: ${message}. Error: ${error.message}`
                );

            default:
                return new AuxtaError(
                    AuxtaErrorCodes.SYNCHRONIZATION_ERROR,
                    `Synchronization error: ${message}. Error: Unknown error`
                );
        }

    }


    static initializationError(message: string, error?: Error | AuxtaError | unknown): AuxtaError {
        switch (true) {
            case !error:
                return new AuxtaError(
                    AuxtaErrorCodes.INITIALIZATION_ERROR,
                    `Initialization error: ${message}. Error: Unknown error`
                );
            case !!error && error instanceof AuxtaError:
                return error;

            case !!error && error instanceof Error:
                return new AuxtaError(
                    AuxtaErrorCodes.INITIALIZATION_ERROR,
                    `Initialization error: ${message}. Error: ${error.message}`
                );

            default:
                return new AuxtaError(
                    AuxtaErrorCodes.INITIALIZATION_ERROR,
                    `Initialization error: ${message}. Error: Unknown error`
                );
        }
    }

    static ECONNREFUSED(message: string, host: string, port: number): AuxtaError {
        return new AuxtaError(
            AuxtaErrorCodes.ECONNREFUSED,
            `Connection refused: ${message}. Host: ${host}, Port: ${port}`
        );
    }

}
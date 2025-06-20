import { AuxtaIndexErrorCodes } from "@auxta/constants/AuxtaIndex.constants";
import { AuxtaError } from "./AuxtaError.class";


export class AuxtaIndexError extends AuxtaError {


    /**
     * Custom error class for Auxta command errors.
     * This class extends the AuxtaError class to provide a specific error type for command-related issues.
     * It can be used to throw errors with a specific code and message related to command execution.
     */
    constructor(
        code: string = 'AuxtaIndexError',
        message: string
    ) {
        super(code, message);
    }



    static invalidConfig(message: string): AuxtaIndexError {
        return new AuxtaIndexError(
            AuxtaIndexErrorCodes.INVALID_CONFIG,
            `Index validation error: ${message}`
        );
    }

}
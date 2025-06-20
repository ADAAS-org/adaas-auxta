import { AuxtaVectorErrorCodes } from "@auxta/constants/AuxtaVector.constants";
import { AuxtaError } from "./AuxtaError.class";


export class AuxtaVectorError extends AuxtaError {


    /**
     * Custom error class for Auxta command errors.
     * This class extends the AuxtaError class to provide a specific error type for command-related issues.
     * It can be used to throw errors with a specific code and message related to command execution.
     */
    constructor(
        code: string = 'AuxtaVectorError',
        message: string
    ) {
        super(code, message);
    }



    static invalidConfig(message: string): AuxtaVectorError {
        return new AuxtaVectorError(
            AuxtaVectorErrorCodes.INVALID_CONFIG,
            `Vector validation error: ${message}`
        );
    }

    static vectorIndexNotDefinedError(message: string): AuxtaVectorError {
        return new AuxtaVectorError(
            AuxtaVectorErrorCodes.INDEX_NOT_DEFINED,
            `Vector index not defined: ${message}`
        );
    }

}
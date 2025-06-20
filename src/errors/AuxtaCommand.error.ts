import { AuxtaCommandErrorCodes } from "@auxta/constants/AuxtaCommand.constants";
import { AuxtaError } from "./AuxtaError.class";


export class AuxtaCommandError extends AuxtaError {


    /**
     * Custom error class for Auxta command errors.
     * This class extends the AuxtaError class to provide a specific error type for command-related issues.
     * It can be used to throw errors with a specific code and message related to command execution.
     */
    constructor(
        code: string = 'AuxtaCommandError',
        message: string
    ) {
        super(code, message);
    }



    static commandValidationError(message: string): AuxtaCommandError {
        return new AuxtaCommandError(
            AuxtaCommandErrorCodes.COMMAND_INVALID,
            `Command validation error: ${message}`
        );
    }

}
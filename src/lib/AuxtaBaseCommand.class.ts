import { AuxtaCommandError } from "@auxta/errors/AuxtaCommand.error";
import { AuxtaBaseRawCommand, AuxtaDbOperations, AuxtaRawCommand } from "@auxta/types/AuxtaCommand.types";


export class AuxtaBaseCommand {


    protected _index?: string; // The index to which the command applies
    protected _operation!: AuxtaDbOperations; // The operation to be performed

    private _rawCommands: Array<AuxtaRawCommand> = []; // Optional raw command object

    constructor(index?: string) {
        this._index = index;
    }


    /**
     * Allows manually setting the command as a raw JSON object.
     * 
     * @param command 
     * @returns 
     */
    raw(command: AuxtaRawCommand): AuxtaBaseCommand {

        if (!command.operation && !this._index) {
            throw AuxtaCommandError.commandValidationError(
                'The command must have an command defined.'
            );
        }



        this._operation = command.operation || this._operation;

        this._rawCommands.push(command);

        return this;
    }


    /**
     * Compiles the command into a JSON object.
     * This method is intended to be overridden by subclasses to provide specific command details.
     */
    build(): AuxtaBaseRawCommand[] {
        if (!this._operation) {
            throw AuxtaCommandError.commandValidationError(
                'The command must have an command defined.'
            );
        }

        return this._rawCommands;
    }
}
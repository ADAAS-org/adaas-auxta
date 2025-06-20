import { AuxtaGetRawCommand } from "@auxta/types/AuxtaCommand.types";
import { AuxtaBaseCommand } from "../AuxtaBaseCommand.class";
import { AuxtaCommandError } from "@auxta/errors/AuxtaCommand.error";
import { AuxtaVector } from "@auxta/core/AuxtaVector";






export class AuxtaGetCommand extends AuxtaBaseCommand {

    protected _operation: 'GET' = 'GET'; // The command type for this command
    private _id: string = '';
    private entity: 'vector' = 'vector'; // The entity type for this command, used for validation

    /**
     * Creates an instance of AuxtaGetCommand.
     * The GET command is used to retrieve a vector by its ID from the Auxta database.
     *
     * @param index - The index from which the vector will be retrieved.
     * @param id - The ID of the vector to be retrieved.
     */
    constructor(index?: string, id?: string) {
        super(index);
        if (id) {
            this._id = id;
        }
    }

    /**
     * Sets the ID of the vector to be retrieved.
     * @param id - The ID of the vector to be retrieved.
     * @returns The current instance of AuxtaGetCommand for method chaining.
     */
    vector(vector: AuxtaVector<any>): AuxtaGetCommand
    vector(id: string): AuxtaGetCommand
    vector(param: string | AuxtaVector<any>): AuxtaGetCommand {
        if (typeof param === 'object' && param instanceof AuxtaVector) {
            if (!param.id) {
                throw AuxtaCommandError.commandValidationError(
                    'The vector must have an ID defined.'
                );
            }
            if (!param.index) {
                throw AuxtaCommandError.commandValidationError(
                    'The vector must have an index defined.'
                );
            }
            this._id = param.id;
            this._index = param.index.name;
        }
        if (typeof param === 'string') {
            if (param.trim() === '') {
                throw AuxtaCommandError.commandValidationError(
                    'The ID cannot be an empty string.'
                );
            }
            this._id = param;
            if (!this._index) {
                throw AuxtaCommandError.commandValidationError(
                    'The index must be set before getting a vector.'
                );
            }
        }
        return this;
    }

    /**
     * Builds the GET query object.
     * @returns The GET query object containing the command type, index, and ID.
     */
    build(): AuxtaGetRawCommand[] {
        if (!this._id) {
            throw AuxtaCommandError.commandValidationError(
                'The command must have an ID defined.'
            );
        }
        if (!this._index) {
            throw AuxtaCommandError.commandValidationError(
                'The command must have an index defined.'
            );
        }

        return [{
            entity: this.entity,
            operation: this._operation,
            index: this._index,
            id: this._id
        }];
    }
}
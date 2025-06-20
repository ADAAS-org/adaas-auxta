import { Vector } from "@auxta/classes/Vector.class";
import { AuxtaBaseCommand } from "../AuxtaBaseCommand.class";
import { AuxtaCommandError } from "@auxta/errors/AuxtaCommand.error";
import { AuxtaVector } from "@auxta/core/AuxtaVector";
import { AuxtaAddRawCommand } from "@auxta/types/AuxtaCommand.types";



export class AuxtaAddCommand extends AuxtaBaseCommand {

    private _vectors: Array<AuxtaAddRawCommand> = [];
    protected _operation: 'ADD' = 'ADD'; // The operation type for this operation


    /**
     * Creates an instance of AuxtaAddCommand.
     * Add commands are used to add vectors to a specific index in the Auxta database.
     * 
     * @param index - The index to which the vectors will be added.
     */
    constructor(index?: string) {
        super(index);
    }



    /**
     * Adds one or more vectors to the ADD command.
     * @param vectors - The vectors to be added.
     * @returns The current instance of AuxtaAddCommand for method chaining.
     */
    add(...vectors: AuxtaVector<any>[]): AuxtaAddCommand {
        this._vectors.push(...vectors.map(v => <AuxtaAddRawCommand>({
            operation: this._operation, // The command type
            entity: 'vector',
            vector: v.toJSON() // The vector data to be added
        })));
        return this;
    }


    /**
     * Sets the index for the ADD command.
     * @param index - The index to which the vectors will be added.
     * @returns The current instance of AuxtaAddCommand for method chaining.
     */
    build(): Array<AuxtaAddRawCommand> {
        if (this._vectors.length === 0) {
            throw AuxtaCommandError.commandValidationError(
                'At least one vector must be added to the ADD command.'
            );
        }
        if (!this._index) {
            throw AuxtaCommandError.commandValidationError(
                'The command must have an index defined.'
            );
        }


        return this._vectors
    }
}
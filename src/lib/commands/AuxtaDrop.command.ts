import { AuxtaVector } from "@auxta/core/AuxtaVector";
import { AuxtaBaseCommand } from "../AuxtaBaseCommand.class";
import { AuxtaCommandError } from "@auxta/errors/AuxtaCommand.error";
import { AuxtaDBEntity, AuxtaDropDimensionRawCommand, AuxtaDropIndexRawCommand, AuxtaDropRawCommand, AuxtaDropVectorRawCommand } from "@auxta/types/AuxtaCommand.types";
import { AuxtaIndex } from "@auxta/core/AuxtaIndex";
import { AuxtaDimension } from "@auxta/core/AuxtaDimension";



export class AuxtaDropCommand extends AuxtaBaseCommand {

    /**
     * All items to be dropped.
     * This is an array of objects containing the entity and its ID.
     */
    private _indexesDropCommands: Array<AuxtaDropIndexRawCommand> = [];
    /**
     * All dimensions to be dropped.
     * This is an array of objects containing the entity and its ID.
     */
    private _dimensionsDropCommands: Array<AuxtaDropDimensionRawCommand> = [];
    /**
     * All vectors to be dropped.
     * This is an array of objects containing the entity and its ID.
     */
    private _vectorsDropCommands: Array<AuxtaDropVectorRawCommand> = [];

    /**
     * The command type for this command.
     * This is used to identify the type of command being executed.
     */
    protected _operation: 'DROP' = 'DROP'; // The command type for this command


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
     * Allows dropping one or more indexes by their names or instances.
     * 
     * @param names 
     */
    index(...params: Array<AuxtaIndex | string | typeof AuxtaVector>): AuxtaDropCommand {
        if (params.length === 0) {
            throw AuxtaCommandError.commandValidationError(
                'The command must have at least one index to drop.'
            );
        }

        this._indexesDropCommands = params.map(param => {

            if (typeof param === 'string') {
                return <AuxtaDropIndexRawCommand>{
                    operation: this._operation,
                    entity: 'index',
                    index: param
                };
            } else if (param instanceof AuxtaIndex) {
                return <AuxtaDropIndexRawCommand>{
                    operation: this._operation,
                    entity: 'index',
                    index: param.name
                };
            }
            else if (typeof param === 'function' && (param as typeof AuxtaVector).index?.name) {
                return <AuxtaDropIndexRawCommand>{
                    operation: this._operation,
                    entity: 'index',
                    index: param.index.name
                };
            }


            throw AuxtaCommandError.commandValidationError(
                'The index must be a string or an instance of AuxtaIndex.'
            );
        });

        return this;
    }



    /**
     * Allows dropping one or more dimensions by their IDs or instances.
     * 
     * @param dimensions 
     * @returns 
     */
    dimension(...dimensions: AuxtaDimension[]): AuxtaDropCommand {
        if (dimensions.length === 0) {
            throw AuxtaCommandError.commandValidationError(
                'The command must have at least one dimension to drop.'
            );

        }
        this._dimensionsDropCommands = dimensions.map(dim => {
            return <AuxtaDropDimensionRawCommand>{
                operation: this._operation,
                entity: 'dimension',
                index: dim.index || this._index!,
                id: dim.id
            };
        });

        return this;
    }


    /**
     * 
     * Allows dropping one or more vectors by their IDs or instances.
     * 
     * @param vector 
     */
    vector(...vector: AuxtaVector<any>[]): AuxtaDropCommand
    vector(...ids: string[]): AuxtaDropCommand
    vector(...params: string[] | AuxtaVector<any>[]): AuxtaDropCommand {
        if (params.length === 0) {
            throw AuxtaCommandError.commandValidationError(
                'The command must have at least one vector to drop.'
            );
        }
        this._vectorsDropCommands = params.map(param => {
            if (typeof param === 'string') {
                if (!this._index)
                    throw AuxtaCommandError.commandValidationError(
                        'The index must be set before dropping a vector.'
                    );

                return <AuxtaDropVectorRawCommand>{
                    operation: this._operation,
                    entity: 'vector',
                    index: this._index!,
                    id: param
                };

            } else if (param instanceof AuxtaVector) {
                if (!param.index && !this._index)
                    throw AuxtaCommandError.commandValidationError(
                        'The vector must have an index defined before dropping it.'
                    );

                return <AuxtaDropVectorRawCommand>{
                    operation: this._operation,
                    entity: 'vector',
                    index: param.index?.name || this._index!,
                    id: param.id
                };
            }
            throw AuxtaCommandError.commandValidationError(
                'The vector must be a string or an instance of AuxtaVector.'
            );
        });


        return this;
    }



    /**
     * Sets the index for the ADD command.
     * @param index - The index to which the vectors will be added.
     * @returns The current instance of AuxtaAddCommand for method chaining.
     */
    build(): Array<AuxtaDropRawCommand> {
        if (!this._indexesDropCommands.length && !this._vectorsDropCommands.length) {
            throw AuxtaCommandError.commandValidationError(
                'The command must have at least one index or vector to drop.'
            );
        }


        return [
            ...this._indexesDropCommands,
            ...this._vectorsDropCommands
        ];
    }
}
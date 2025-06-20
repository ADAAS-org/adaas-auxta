import { AuxtaDefineRawCommand, } from "@auxta/types/AuxtaCommand.types";
import { AuxtaBaseCommand } from "../AuxtaBaseCommand.class";
import { AuxtaCommandError } from "@auxta/errors/AuxtaCommand.error";
import { AuxtaDimension } from "@auxta/core/AuxtaDimension";
import { AuxtaDimensionDefinition } from "@auxta/types/AuxtaDimension.types";
import { AuxtaIndexDefinition } from "@auxta/types/AuxtaIndex.types";
import { AuxtaIndex } from "@auxta/core/AuxtaIndex";
import { AuxtaVector } from "@auxta/core/AuxtaVector";



export class AuxtaDefineCommand extends AuxtaBaseCommand {

    private _defineCommands: Array<AuxtaDefineRawCommand> = []; // Array to hold the define commands
    protected _operation: 'DEFINE' = 'DEFINE'; // The command type for this command

    /**
     * Creates an instance of AuxtaDefineCommand.
     * The DEFINE command is used to define dimensions for an index in the Auxta database.
     * 
     * @param index 
     */
    constructor(index?: string) {
        super(index);
    }



    index(...index: Array<AuxtaIndex>): AuxtaDefineCommand
    index(...raw: Array<AuxtaIndexDefinition>): AuxtaDefineCommand
    index(...params: Array<AuxtaIndex | AuxtaIndexDefinition>): AuxtaDefineCommand {

        if (params.length === 0) {
            throw AuxtaCommandError.commandValidationError(
                'At least one index definition must be provided.'
            );
        }
        for (const param of params) {

            if (typeof param === 'object' && param instanceof AuxtaIndex) {
                //  Add only if the index is not already defined
                if (!this._defineCommands.some(cmd => cmd.entity === 'index' && cmd.operation === this._operation && cmd.definition.name === param.name))
                    this._defineCommands.push({
                        entity: 'index',
                        index: param.name,
                        operation: this._operation,
                        definition: param.toDefinition()
                    });
            }
            else if (typeof param === 'object' && 'name' in param) {

                //  Add only if the index is not already defined
                if (!this._defineCommands.some(cmd => cmd.entity === 'index' && cmd.operation === this._operation && cmd.definition.name === (param as AuxtaIndexDefinition).name))
                    // Assuming param is an AuxtaIndexDefinition
                    this._defineCommands.push({
                        entity: 'index',
                        index: param.name,
                        operation: this._operation,
                        definition: param as AuxtaIndexDefinition
                    });
            } else {
                throw AuxtaCommandError.commandValidationError(
                    'Invalid index definition provided. It must be an instance of AuxtaIndex or an object with a name property.'
                );
            }
        }

        return this;
    }


    /**
     * Allows to define one or more vectors for the DEFINE command.
     * It's the same as Define Index, but it takes indexes from vectors  
     * 
     * @param vectors 
     * @returns 
     */
    vector(...vectors: Array<typeof AuxtaVector<any>>): AuxtaDefineCommand {
        if (vectors.length === 0) {
            throw AuxtaCommandError.commandValidationError(
                'At least one vector must be defined.'
            );
        }
        this.index(...vectors.map(v => v.index));

        return this;
    }


    /**
     * 
     * 
     * 
     * @param dimensions 
     * @returns 
     */
    dimension(...raw: Array<AuxtaDimensionDefinition>): AuxtaDefineCommand
    dimension(...dimension: Array<AuxtaDimension>): AuxtaDefineCommand
    dimension(...param1: Array<AuxtaDimensionDefinition | AuxtaDimension>): AuxtaDefineCommand {
        if (param1.length === 0) {
            throw AuxtaCommandError.commandValidationError(
                'At least one dimension must be defined.'
            );
        }

        if (!this._index) {
            throw AuxtaCommandError.commandValidationError(
                'The index must be set before defining dimensions.'
            );
        }


        for (const param of param1) {
            if (typeof param === 'object' && param instanceof AuxtaDimension) {

                if (!this._defineCommands.some(cmd => cmd.entity === 'dimension' && cmd.operation === this._operation && cmd.definition.name === param.name))
                    this._defineCommands.push({
                        entity: 'dimension',
                        index: this._index || param.index, // Use the index from the dimension if not set
                        operation: this._operation,
                        definition: param.toDefinition()
                    });
            } else if (typeof param === 'object' && 'name' in param) {
                // Assuming param is an AuxtaDimensionDefinition
                if (!this._defineCommands.some(cmd => cmd.entity === 'dimension' && cmd.operation === this._operation && cmd.definition.name === (param as AuxtaDimensionDefinition).name))
                    //  Add only if the dimension is not already defined
                    this._defineCommands.push({
                        entity: 'dimension',
                        index: this._index || param.index,
                        operation: this._operation,
                        definition: param as AuxtaDimensionDefinition
                    });
            } else {
                throw AuxtaCommandError.commandValidationError(
                    'Invalid dimension definition provided. It must be an instance of AuxtaDimension or an object with a name property.'
                );
            }
        }

        return this;

    }


    build(): AuxtaDefineRawCommand[] {
        return [...this._defineCommands];
    }
}
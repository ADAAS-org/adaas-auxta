import { AuxtaCommandError } from "@auxta/errors/AuxtaCommand.error";
import { AuxtaAddCommand } from "./commands/AuxtaAdd.command";
import { AuxtaDefineCommand } from "./commands/AuxtaDefine.command";
import { AuxtaBaseCommand } from "./AuxtaBaseCommand.class";
import { AuxtaVector } from "@auxta/core/AuxtaVector";
import { AuxtaDropCommand } from "./commands/AuxtaDrop.command";
import { AuxtaGetCommand } from "./commands/AuxtaGet.command";
import { AuxtaRawCommand } from "@auxta/types/AuxtaCommand.types";
import { AuxtaSearchCommand } from "./commands/AuxtaSearch.command";


export class AuxtaCommand {


    protected _index?: string; // The index to which the command applies
    protected _operation: string = ''; // The command to be performed
    protected _baseCommand: AuxtaBaseCommand; // The base command instance for common commands

    /**
     * Constructs a new AuxtaCommand instance.
     * 
     * @param index 
     */
    constructor(index?: string) {
        this._index = index;
        this._baseCommand = new AuxtaBaseCommand(this._index);
    }


    get(id: AuxtaVector<any>): AuxtaGetCommand
    get(id: string): AuxtaGetCommand
    get(param1: string | AuxtaVector<any>): AuxtaGetCommand {

        switch (typeof param1) {

            case 'string':
                if (!this._index) {
                    throw AuxtaCommandError.commandValidationError(
                        'The index must be set before getting a vector.'
                    );
                }
                if (param1.trim() === '') {
                    throw AuxtaCommandError.commandValidationError(
                        'The ID cannot be an empty string.'
                    );
                }
                return new AuxtaGetCommand(this._index, param1);

            case 'object':
                if (param1 instanceof AuxtaVector) {
                    if (!this._index && !param1.index) {
                        throw AuxtaCommandError.commandValidationError(
                            'The index must be set before getting a vector.'
                        );
                    }

                    return new AuxtaGetCommand(param1.index?.name || this._index, param1.id);
                }
                throw AuxtaCommandError.commandValidationError(
                    'The parameter must be a string or an instance of AuxtaVector.'
                );
            default:
                throw AuxtaCommandError.commandValidationError(
                    'The parameter must be a string or an instance of AuxtaVector.'
                );

        }
    }


    /**
     * Adds one or more vectors to the ADD command.
     * 
     * @param vectors 
     * @returns 
     */
    add(...vectors: AuxtaVector<any>[]): AuxtaAddCommand {

        if (!this._index && vectors.some(v => !v.index)) {
            throw AuxtaCommandError.commandValidationError(
                'The index must be set before adding vectors.'
            );
        }
        if (vectors.length === 0) {
            throw AuxtaCommandError.commandValidationError(
                'At least one vector must be added to the ADD command.'
            );
        }

        const command = new AuxtaAddCommand(vectors[0].index?.name || this._index);
        command.add(...vectors);

        return command;
    }


    /**
     * Drops one or more entities from the DROP command.
     * 
     * By Default Drops index entities, but can also drop vectors by providing their names.
     * 
     * 
     * @param names 
     * @returns 
     */
    drop(name?: string): AuxtaDropCommand
    drop(names: string[]): AuxtaDropCommand
    drop(param1?: string[] | string): AuxtaDropCommand {
        if (!this._index) {
            throw AuxtaCommandError.commandValidationError(
                'The index must be set before dropping entities.'
            );
        }

        let targetName;

        if (!param1) {
            targetName = [this._index]
        }
        else if (Array.isArray(param1)) {
            targetName = param1;
        } else {
            targetName = [param1];
        }

        const command = new AuxtaDropCommand(this._index);
        command.index(targetName);

        return command;
    }


    /**
     * Defines one or more dimensions for the DEFINE command.
     * 
     * @param dimensions 
     * @returns 
     */
    define<T extends object>(): AuxtaDefineCommand
    define<T extends object>(vectors: typeof AuxtaVector<T>): AuxtaDefineCommand
    define<T extends object>(...vectors: typeof AuxtaVector<T>[]): AuxtaDefineCommand {

        const command = new AuxtaDefineCommand(this._index);

        if (vectors.length !== 0)
            command.vector(...vectors);

        return command;
    }


    search<T extends Record<string, any>>(vector: typeof AuxtaVector<T>): AuxtaSearchCommand<T> {
        if (!(vector && vector.index)) {
            throw AuxtaCommandError.commandValidationError(
                'The vector must be defined with an index before performing a search.'
            );
        }

        return new AuxtaSearchCommand<T>(vector);
    }


    /**
     * Allows manually setting the command as a raw JSON object.
     * 
     * @param command 
     * @returns 
     */
    raw(command: AuxtaRawCommand): AuxtaBaseCommand {
        if (!command.operation && !this._operation) {
            throw AuxtaCommandError.commandValidationError(
                'The command must have an command defined.'
            );
        }

        this._operation = command.operation || this._operation;
        this._index = command.operation || this._index;

        return this._baseCommand.raw(command);
    }


    /**
     * Compiles the command into a JSON object.
     * 
     * @returns 
     */
    build(): AuxtaRawCommand[] {
        return this._baseCommand.build();
    }
}
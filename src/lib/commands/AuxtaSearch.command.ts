import { AuxtaConditionWrapper, AuxtaLogicalGroup, AuxtaSearchRawCommand } from "@auxta/types/AuxtaCommand.types";
import { AuxtaBaseCommand } from "../AuxtaBaseCommand.class";
import { AuxtaConditionBuilder } from "../AuxtaConditionBuilder.class";
import { AuxtaDimension } from "@auxta/core/AuxtaDimension";
import { AuxtaVector } from "@auxta/core/AuxtaVector";
import { AuxtaVectorConstructorProps } from "@auxta/types/AuxtaVector.types";



export class AuxtaSearchCommand<T extends Record<string, any> = any> extends AuxtaBaseCommand {

    protected _operation: 'SEARCH' = 'SEARCH'; // The operation type for this operation
    private _pick: number = 100;
    private _conditions: Record<string, AuxtaLogicalGroup | AuxtaConditionWrapper> = {};


    /**
     * Creates an instance of AuxtaSearchCommand.
     * The SEARCH operation is used to search for vectors in the Auxta database.
     * 
     * @param index - The index in which to perform the search.
     */
    constructor(vector: typeof AuxtaVector<T>) {
        super(vector.index.name);
    }


    /**
     * Sets the number of results to pick from the search.
     * 
     * @param n 
     * @returns 
     */
    pick(n: number) {
        this._pick = n;
        return this;
    }


    /**
     * Adds a condition to the search query for a specific dimension.
     * 
     * @param dim - The dimension to which the condition applies.
     * @param builderFn - A function that builds the condition using a ConditionBuilder.
     * @returns The current instance of AuxtaSearchCommand for method chaining.
     */
    where(dim: keyof AuxtaVectorConstructorProps<T>, builderFn: (cb: AuxtaConditionBuilder) => AuxtaConditionBuilder):AuxtaSearchCommand<T>
    where(dim: AuxtaDimension | keyof AuxtaVectorConstructorProps<T>, builderFn: (cb: AuxtaConditionBuilder) => AuxtaConditionBuilder):AuxtaSearchCommand<T>
    
    {
        const builder = builderFn(new AuxtaConditionBuilder());
        this._conditions[typeof dim === 'object' ? dim.name : String(dim)] = builder.build();
        return this;
    }


    /**
     * Compiles the command into a JSON object.
     * 
     * @returns An array of AuxtaRawCommand objects representing the search command.
     */
    build(): AuxtaSearchRawCommand[] {

        return [{
            entity: 'index',
            operation: this._operation,
            index: this._index,
            pick: this._pick,
            conditions: this._conditions
        }];
    }
}


import { AuxtaIndexMode } from "@auxta/constants/AuxtaIndex.constants";
import {
    AuxtaDynamicDimensionAggregatedTypes,
    AuxtaDimensionScope,
    AuxtaDimensionValueType,
    AuxtaDynamicDimensionBehaviors
} from "@auxta/constants/Dimension.constants";



/**
 * AuxtaDimensionConstructorConfig defines the configuration for creating a dimension in the Auxta database.
 * It includes properties such as name, type, value, scope, size, priority, index, and vector.
 * 
 * @template T - The type of the dimension value.
 */
export type DimensionConstructorBaseConfig<T extends any = any> = {
    /**
     * The name of the dimension, which should be unique within the context of its scope.
     */
    name: string;

    /**
     * The type of the dimension value, e.g., 'string', 'number', 'boolean', etc.
     */
    type?: AuxtaDimensionValueType;

    /**
     * Value of the dimension, which can be any type from allowed types.
     */
    value?: T;

    /**
     * Size of the dimension in bytes, used for memory management and optimization.
     * Number corresponds to the size that will be allocated in the storage for this dimension.
     * 
     * It helps in cases when default types are too big, or when we need to limit the size of the dimension.
     */
    size?: number;

    /**
     * Allows to specify an order of Index build, it should describe the order of Dimension Retrieval.
     * This is useful for optimization purposes, especially when dealing with large datasets.
     * 
     * [!] if Not presented Auxta DB will decide the priority automatically.
     */
    priority?: number;

    /**
     * Depending on the isloation level of the dimension, it can be used to define the index to which this dimension belongs.
     * It useful for isolation levels such as 'index' and 'vector' where dimensions are specific to an index.
     * 
     */
    index?: string; // Identifier of the index to which this dimension belongs, if applicable.

    /**
     * The name of particular vector (vector type) to which this dimension belongs.
     * it useful for isolation levels such as 'vector' where dimensions are specific to a vector.
     */
    vector?: string; // Identifier of the vector to which this dimension belongs, if applicable.

}



export type StaticDimensionConstructorConfig<T extends any = any> = DimensionConstructorBaseConfig<T> & {

    /**
     * Depending on the isloation level of the dimension, it can be used to define the index to which this dimension belongs.
     * It useful for isolation levels such as 'index' and 'vector' where dimensions are specific to an index.
     * 
     */
    index: string; // Identifier of the index to which this dimension belongs, if applicable.

    /**
     * The name of particular vector (vector type) to which this dimension belongs.
     * it useful for isolation levels such as 'vector' where dimensions are specific to a vector.
     */
    vector: string; // Identifier of the vector to which this dimension belongs, if applicable.
}




export type ComputedDimensionConstructorConfig<T extends any = any> = DimensionConstructorBaseConfig<T> & {
    /**
     * The formula for the computed dimension, which can be a string representing the calculation.
     * e.g. `"value1 + value2"` or `value1 / value2`.
     */
    formula: string;
}






export type DynamicDimensionConstructorBaseConfig<T extends any = any> = DimensionConstructorBaseConfig<T> & {

    /**
     * The mode of the storage could be used RAM or Disk.
     * it allwos to define 
     */
    mode?: AuxtaIndexMode
    /**
     * Allows to define a behavior of the dynamic dimension.
     */
    behavior: AuxtaDynamicDimensionBehaviors

    /**
     * Dimension Scope, it impacts isolation level and visibility of the dimension.
     *  - Vector - the dimension is available only on Specified Vector level 
     *  - Index - the dimension is available only on Specified Index level
     *  - Global - the dimension is available from any Index.
     */
    scope?: AuxtaDimensionScope

    /**
     * Depending on the isloation level of the dimension, it can be used to define the index to which this dimension belongs.
     * It useful for isolation levels such as 'index' and 'vector' where dimensions are specific to an index.
     * 
     */
    index?: string; // Identifier of the index to which this dimension belongs, if applicable.

    /**
     * The name of particular vector (vector type) to which this dimension belongs.
     * it useful for isolation levels such as 'vector' where dimensions are specific to a vector.
     */
    vector?: string; // Identifier of the vector to which this dimension belongs, if applicable.

}



/**
 * Describes the configuration for a Dynamic Dimension with aggregated behavior.
 */
export type DynamicDimensionAggregatedConstructorConfig<T extends any = any> = DynamicDimensionConstructorBaseConfig<T> & {
    behavior: 'aggregated'
    type: AuxtaDynamicDimensionAggregatedTypes
}

/**
 * Describes the configuration for a Dynamic Dimension with latest behavior.
 * This type of dimension retrieves the most recent value.
 */
export type DynamicDimensionLatestConstructorConfig<T extends any = any> = DynamicDimensionConstructorBaseConfig<T> & {
    behavior: 'latest'
}


export type DynamicDimensionConstructorConfig<T extends any = any> =
    DynamicDimensionLatestConstructorConfig<T>
    | DynamicDimensionAggregatedConstructorConfig<T>;




export type AuxtaDimensionConfig<T extends any = any> =
    DimensionConstructorBaseConfig<T>
    | StaticDimensionConstructorConfig
    | ComputedDimensionConstructorConfig<T>
    | DynamicDimensionConstructorConfig<T>
    | DynamicDimensionAggregatedConstructorConfig<T>
    | DynamicDimensionLatestConstructorConfig<T>;


export type AuxtaBaseDimensionDefinition<T extends any =any> = {
    id: string; // Unique identifier for the dimension, typically a hash.
    name: string;
    type: AuxtaDimensionValueType;
    size?: number;
    value?: T; // Optional value of the dimension, which can be any type from allowed types.
    priority?: number;
    index?: string; // Identifier of the index to which this dimension belongs, if applicable.
    vector?: string; // Identifier of the vector to which this dimension belongs, if applicable.
}

export type AuxtaStaticDimensionDefinition<T extends any =any> = AuxtaBaseDimensionDefinition<T> & {
    index: string; // Identifier of the index to which this dimension belongs, if applicable.
    vector: string; // Identifier of the vector to which this dimension belongs, if applicable.
}

export type AuxtaComputedDimensionDefinition<T extends any =any> = AuxtaBaseDimensionDefinition<T> & {
    formula: string; // The formula for the computed dimension, which can be a string representing the calculation.
    defaultValue?: any; // Optional default value for the computed dimension, if applicable.
}

export type AuxtaDynamicDimensionDefinition<T extends any =any> = AuxtaBaseDimensionDefinition<T> & {
    behavior: AuxtaDynamicDimensionBehaviors; // Behavior of the dynamic dimension
    mode?: AuxtaIndexMode; // Mode of the storage, could be RAM or Disk
    scope?: AuxtaDimensionScope; // Scope of the dimension, impacts isolation level and visibility
    index?: string; // Identifier of the index to which this dimension belongs, if applicable.
    vector?: string; // Identifier of the vector to which this dimension belongs, if applicable.
    defaultValue?: any; // Optional default value for the computed dimension, if applicable.
}

export type AuxtaDimensionDefinition<T extends any =any> =
    AuxtaBaseDimensionDefinition<T>
    | AuxtaStaticDimensionDefinition<T>
    | AuxtaComputedDimensionDefinition<T>
    | AuxtaDynamicDimensionDefinition<T>;



export interface IDimension<T = any> {

    /**
     * Unique identifier for the dimension, typically a hash.
     */
    id: string;

    /**
     * The name of the dimension.
     */
    name: string;
    /**
     * The type of the dimension value, e.g., 'string', 'number', 'boolean', etc.
     */
    type: AuxtaDimensionValueType;


}
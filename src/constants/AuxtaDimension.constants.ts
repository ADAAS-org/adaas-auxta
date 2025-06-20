/**
 * A list of base Typescript types that can be used as dimensions in Auxta.
 */
export type DimensionBaseTypes = 'string' | 'number' | 'boolean' | 'object' | 'array' | 'date' | 'function';



/**
 * Dynamic Dimension Read Modes defines the behavior of a dimension extraction.
 * For example it can be aggregated or Last read
 */
export type AuxtaDynamicDimensionBehaviors = 'aggregated' | 'latest';



/**
 * Aggreagted Read Mode only supports a limited set of types.
 * These types are used for aggregating data in a dynamic dimension.
 */
export type AuxtaDynamicDimensionAggregatedTypes =
    | 'number'
    | 'int8'
    | 'int16'
    | 'int32'
    | 'float32'
    | 'float64';



/**
 * A list of types with more concrete definitions that can be used as dimensions in Auxta.
 * These types are optimized for storage and performance. 
 */
export type DimensionOptimizedTypes =
    // bytes: 1
    'int8'
    // bytes: 2
    | 'int16'
    // bytes: 4
    | 'int32'
    // bytes: 8
    | 'float32'
    // bytes: 8
    | 'float64'
    // bytes: 128
    | 'varchar128'
    // bytes: 256
    | 'varchar256'
    // bytes: 512
    | 'varchar512'
    // bytes: 1
    | 'bit'
    // bytes: 8
    | 'dateWithTimestamp';


/**
 *  DimensionValueType is a union type that includes both base types and optimized types.
 */
export type AuxtaDimensionValueType = DimensionBaseTypes | DimensionOptimizedTypes;


/**
 * Mapping between type and its size in bytes.
 */
export const AuxtaDimensionTypeSizeMap: Record<DimensionOptimizedTypes | DimensionBaseTypes, number> = {
    int8: 1,
    int16: 2,
    int32: 4,
    float32: 4,
    float64: 8,
    varchar128: 128,
    varchar256: 256,
    varchar512: 512,
    bit: 1,
    dateWithTimestamp: 8,

    string: 256, // Default size for string, can be adjusted
    number: 8, // Default size for number, can be adjusted
    boolean: 1, // 1 byte for boolean
    object: 256, // Default size for object, can be adjusted
    array: 256, // Default size for array, can be adjusted
    date: 8, // 8 bytes for date
    function: 256, // Default size for function, can be adjusted
};


export type AuxtaDimensionScope = 'global' | 'index' | 'vector';

// =====================================================================================
/**
 * Error codes for Auxta Dimension operations.
 * This enum defines the error codes that can be used in dimension operations.
 * It helps to identify specific errors that can occur during dimension operations.
 */
// =====================================================================================

export enum AuxtaDimensionErrorCode {
    METHOD_NOT_IMPLEMENTED = 'METHOD_NOT_IMPLEMENTED',
    VALUE_DOES_NOT_MATCH_TYPE = 'VALUE_DOES_NOT_MATCH_TYPE',
    UNSUPPORTED_TYPE = 'UNSUPPORTED_TYPE',
    ERROR_DURING_TYPES_CONVERSION = 'ERROR_DURING_TYPES_CONVERSION',
    INVALID_CONFIG = 'INVALID_CONFIG',
    INVALID_SERIALIZED_VALUE = 'INVALID_SERIALIZED_VALUE',
    INVALID_CONSTRUCTOR = 'INVALID_CONSTRUCTOR',
}
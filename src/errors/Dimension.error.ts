import { AuxtaError } from "./AuxtaError.class";
import { AuxtaDimensionErrorCode } from "@auxta/constants/Dimension.constants";


export class DimensionError extends AuxtaError {

    constructor(
        code: string,
        message: string
    ) {
        super(code, message);
        this.name = 'DimensionError';
    }

    static methodNotImplemented(method: string): DimensionError {
        return new DimensionError(AuxtaDimensionErrorCode.METHOD_NOT_IMPLEMENTED, `Method ${method} is not implemented.`);
    }

    static valueDoesNotMatchType(value: any, type: string): DimensionError {
        return new DimensionError(AuxtaDimensionErrorCode.VALUE_DOES_NOT_MATCH_TYPE, `Value ${value} does not match type ${type}.`);
    }

    static unsupportedType(type: string): DimensionError {
        return new DimensionError(AuxtaDimensionErrorCode.UNSUPPORTED_TYPE, `Type ${type} is not supported.`);
    }

    static errorDuringTypesConversion(
        value: any,
        fromType: string,
        toType: string,
        error: any
    ): DimensionError {
        return new DimensionError(
            AuxtaDimensionErrorCode.ERROR_DURING_TYPES_CONVERSION,
            `Error during conversion of value ${value} from type ${fromType} to type ${toType}: ${error.message || error}`
        );
    }

    static invalidConfig(
        config: any,
        message: string = 'Invalid configuration for dimension.'
    ): DimensionError {
        return new DimensionError(
            AuxtaDimensionErrorCode.INVALID_CONFIG,
            `Invalid configuration: ${JSON.stringify(config)}. ${message}`
        );
    }


    static invalidSerializedValue(
        value: any,
        error: any
    ): DimensionError {
        return new DimensionError(
            AuxtaDimensionErrorCode.INVALID_SERIALIZED_VALUE,
            `Invalid serialized value: ${JSON.stringify(value)}. Error: ${error.message || error}`
        );
    }

    static invalidConstructor(
        config: any,
        message: string = 'Invalid constructor configuration for dimension.'
    ): DimensionError {
        return new DimensionError(
            AuxtaDimensionErrorCode.INVALID_CONSTRUCTOR,
            `Invalid constructor configuration: ${JSON.stringify(config)}. ${message}`
        );
    }
}
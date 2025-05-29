export type SupportedType = 'any' | 'string' | 'number' | 'boolean' | 'object' | 'array' | 'date' | 'function';


/**
 * Parameter is the class that describes the parameter of the Vector, So during the matching process
 * each parameter should be provided by the Vector.
 * 
 * 
 * 
 * We have 2 main types of parameters:
 *  - Computed - these are parameters that are computed during the auction process, like Daily Budget, Quality, etc
 *  - Static - these are parameters that are static and provided by the bidder, like Interests, Age Categories, etc
 */
export class Parameter<T extends any = any> {

    readonly id: string = `p--${crypto.randomUUID()}`; //  Unique identifier for the vector, generated using UUID

    protected name: string;
    //  Value can be anything, but we will check it later
    protected value: T | undefined;
    //  Type of the parameter, we will check it later
    protected type: SupportedType = 'any'; //  Default type is any, we will check it later

    constructor(
        name: string,
        value?: T, //  Value can be anything, but we will check it later
    ) {
        this.name = name;
        this.value = value
        this.type = this.inferType(value); //  Infer the type of the value
    }

    GET(): T {
        return this.value as T;
    }

    protected coerceToType(type: SupportedType, value: any): any {
        try {
            switch (type) {
                case 'any':
                    return value;

                case 'string':
                    if (value === null || value === undefined) return '';
                    if (typeof value === 'object') return JSON.stringify(value);
                    return String(value);

                case 'number':
                    const num = Number(value);
                    if (isNaN(num)) throw new Error('Invalid number');
                    return num;

                case 'boolean':
                    if (typeof value === 'boolean') return value;
                    if (typeof value === 'string') return value.toLowerCase() === 'true';
                    return Boolean(value);

                case 'object':
                    if (typeof value === 'object' && value !== null && !Array.isArray(value)) return value;
                    if (typeof value === 'string') return JSON.parse(value);
                    throw new Error('Invalid object');

                case 'array':
                    if (Array.isArray(value)) return value;
                    if (typeof value === 'string') return JSON.parse(value);
                    throw new Error('Invalid array');

                case 'date':
                    if (value instanceof Date) return value;
                    const date = new Date(value);
                    if (isNaN(date.getTime())) throw new Error('Invalid date');
                    return date;

                case 'function':
                    if (typeof value === 'function') return value;
                    throw new Error('Invalid function');

                default:
                    throw new Error(`Unsupported type: ${type}`);
            }
        } catch (err) {
            throw new Error(`Failed to coerce value to ${type}: ${(err as Error).message}`);
        }
    }

    protected inferType(value: any): 'any' | 'string' | 'number' | 'boolean' | 'object' | 'array' | 'date' | 'function' {
        if (value === null || value === undefined) return 'any';

        const rawType = typeof value;

        if (rawType === 'string') return 'string';
        if (rawType === 'number') return 'number';
        if (rawType === 'boolean') return 'boolean';
        if (rawType === 'function') return 'function';

        if (value instanceof Date) return 'date';
        if (Array.isArray(value)) return 'array';
        if (rawType === 'object') return 'object';

        return 'any';
    }



    withValue<M extends any = any>(value: M): Parameter<M> {
        //  Here we can set the value of the parameter, but we need to check if the value is valid for the parameter
        //  For example, if the parameter is a vector, we need to check if the value is an array
        //  If the parameter is a number, we need to check if the value is a number
        //  If the parameter is a string, we need to check if the value is a string
        //  If the parameter is an object, we need to check if the value is an object
        return new Parameter<M>(this.name, value);
    }


    toString(): string {

        switch (this.type) {
            case 'string':
                return String(this.value);
            case 'number':
                return String(this.value);
            case 'boolean':
                return String(this.value);
            case 'object':
                return JSON.stringify(this.value);
            case 'array':
                return JSON.stringify(this.value);
            case 'date':
                return this.value instanceof Date ? this.value.toISOString() : String(this.value);
            case 'function':
                return this.value instanceof Function ? this.value.toString() : String(this.value);
            default:
                return String(this.value);

        }
    }
}
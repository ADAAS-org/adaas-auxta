


export class Operator {


    static apply(
        value: Array<string | number | boolean | Date>,
        search: Array<string | number | boolean | Date>
    ): boolean;
    static apply(
        value: Date,
        search: Date
    ): boolean;
    static apply(
        value: number,
        search: number
    ): boolean;
    static apply(
        value: boolean,
        search: boolean
    ): boolean;
    static apply(
        value: string,
        search: string
    ): boolean;
    static apply(
        value: Array<string | number | boolean | Date> | string | Date | number | boolean,
        search: Array<string | number | boolean | Date> | string | Date | number | boolean
    ): boolean {

        return false; // Default implementation, should be overridden by subclasses
    }

}
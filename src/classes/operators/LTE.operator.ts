import { Operator } from "../Operator.class";



export class LTE extends Operator {

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

        if (Array.isArray(value) && Array.isArray(search)) {
            return value.length === search.length && value.every((item, index) => item <= search[index]);
        } else if (typeof value === 'string' && typeof search === 'string') {
            return value <= search;
        } else if (value instanceof Date && search instanceof Date) {
            return value.getTime() <= search.getTime();
        } else if (typeof value === 'number' && typeof search === 'number') {
            return value <= search;
        } else if (typeof value === 'boolean' && typeof search === 'boolean') {
            return value === false || search === true; // boolean comparison
        } else {
            throw new Error("Invalid types for LTE operator");
        }
    }
}
import { Parameter } from "../Parameter.class";


export class DynamicParameter<T extends any = any> extends Parameter<T> {


    constructor(
        name: string,
        // Default value that will be used if no value is set
        defaultValue?: T
    ) {
        super(name, defaultValue);

    }


    SET(
        value: T
    ) {
        this.value = value;
    }


    INCR(
        value: T
    ) {
        if (this.type === 'number') {
            this.value = (this.value as number)! + (Number(value) || 1) as T
        } else {
            throw new Error("Value is not a number");
        }
    }

    DECR(
        value: T
    ) {
        if (typeof this.value === 'number' || this.type === 'number') {
            this.value = (this.value as number)! - (Number(value) || 1) as T
        } else {
            throw new Error("Value is not a number");
        }
    }



    withDefault<M extends any = any>(value: M): DynamicParameter<M> {
        //  Here we can set the default value of the parameter, but we need to check if the value is valid for the parameter
        //  For example, if the parameter is a vector, we need to check if the value is an array
        //  If the parameter is a number, we need to check if the value is a number
        //  If the parameter is a string, we need to check if the value is a string
        //  If the parameter is an object, we need to check if the value is an object
        return new DynamicParameter<M>(this.name, value);
    }
    withValue<M extends any = any>(value: M): DynamicParameter<M> {
        //  Here we can set the value of the parameter, but we need to check if the value is valid for the parameter
        //  For example, if the parameter is a vector, we need to check if the value is an array
        //  If the parameter is a number, we need to check if the value is a number
        //  If the parameter is a string, we need to check if the value is a string
        //  If the parameter is an object, we need to check if the value is an object
        return new DynamicParameter<M>(this.name, value);
    }





}
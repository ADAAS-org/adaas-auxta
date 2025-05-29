import { Parameter } from "../Parameter.class";


/**
 * By default all static parameters are indexable and can be used in the auction process.
 * 
 * So after static parameter is created, it can be used in the auction process.
 * 
 * 
 */
export class StaticParameter<T extends any =any> extends Parameter<T> {
}
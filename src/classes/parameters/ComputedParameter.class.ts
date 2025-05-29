import { Parameter } from "../Parameter.class";
import { Vector } from "../Vector.class";


export class ComputedParameter<T extends any= any> extends Parameter<T> {

    protected formula: string; //  The formula used to compute the value of the parameter


    constructor(
        /**
         * The name of the computed parameter.
         */
        name: string,
        /**
         * The formula used to compute the value of the parameter.
         * The formula should be a valid JavaScript expression that can be evaluated to compute the value.
         */
        formula: string | ((vec: Vector) => void), //  The formula can be a string or a function that takes a Vector and returns the computed value

        /**
         * The type of the computed parameter, either 'function' or 'string'.
         * This is used to determine how to evaluate the formula.
         */
        fallback?: T //  Optional fallback value if the formula cannot be computed
    ) {
        super(name, fallback); //  Computed parameters do not have a value initially, it will be computed later
        //  Store the formula for computing the parameter
        this.formula = formula instanceof Function ? formula.toString() : formula;
        //  store type for further conversion
        this.type = formula instanceof Function ? 'function' : 'string'; //  The type is either 'function' or 'string' based on the formula type
    }


    compute(vec: Vector): T {
        return this.type === 'function'

            //  If the formula is a function, we execute it with the vector
            ? new Function('vec', `return ${this.formula}`)(vec)
            //  If the formula is a string, we evaluate it as a JavaScript expression  
            : new Function(`return ${this.formula}`)();
    }



    withFallback<M extends any = any>(value: M): ComputedParameter<M> {
        //  Here we can set the fallback value of the parameter, but we need to check if the value is valid for the parameter
        //  For example, if the parameter is a vector, we need to check if the value is an array
        //  If the parameter is a number, we need to check if the value is a number
        //  If the parameter is a string, we need to check if the value is a string
        //  If the parameter is an object, we need to check if the value is an object
        return new ComputedParameter<M>(this.name, this.formula, value);
    }


}
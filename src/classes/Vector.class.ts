import { Parameter } from "./Parameter.class";
import crypto from 'crypto';
import { StaticParameter } from "./parameters/StaticParameter.class";
import { ComputedParameter } from "./parameters/ComputedParameter.class";
import { DynamicParameter } from "./parameters/DynamicParameter.class";


class A {

}



class AA extends A {
    doSomething() {

    }
}



class AB extends A {
    doAnother() {

    }

}


const t: Array<A> = [];



const filtered = (): Array<AA> => {
    return t.filter(item => item instanceof AA)
}

/**
 * This class provides a custom structure for the Vectors that are used in auction process. 
 * Each vector Describes entity participating in the auction.
 * 
 *  
 * 
 */
export class Vector<T extends Array<Parameter> = Array<Parameter>> {

    readonly id: string = `v--${crypto.randomUUID()}`; //  Unique identifier for the vector, generated using UUID

    protected params: T;

    constructor(
        params: T  //  Default value is an empty array, but it can be any array of parameters
    ) {
        this.params = params;
    }


    index(): string {
        return crypto
            .createHash('sha256')
            .update(this.staticParams.map(p => p.toString()).join(';'))
            .digest('hex');
    }


    get staticParams(): Array<StaticParameter> {
        return this.params.filter(param => param instanceof StaticParameter);
    }

    get computedParams(): Array<ComputedParameter> {
        return this.params.filter(param => param instanceof ComputedParameter);
    }

    get dynamicParams(): Array<DynamicParameter> {
        return this.params.filter(param => param instanceof DynamicParameter);
    }



    toString(): string {
        return ``;
    }


    toJSON(): any {
        return {

        };
    }
}
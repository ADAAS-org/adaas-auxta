import { AuxtaDimensionDefinition } from "./AuxtaDimension.types";



/**
 * This is a helper object that allows to create a new AuxtaVector instance excluding
 * the `id` and `size` properties, which are automatically generated.
 * 
 */
export type AuxtaVectorConstructorProps<T extends object = any> = {
    [K in keyof T as (
        T[K] extends Function ? never :
        K extends 'id' | 'size' | 'index' | 'dimensions' | 'name' ? never : K
    )]: T[K];
};



export type AuxtaSerializedVector<T extends object = any> = T & {
    id: string;
    name: string;
    index: string;
    size: number;
}



export type AuxtaVectorDefinition = {
    id: string;

    /**
     * The name of the vector.
     */
    name: string;

    /**
     * Index to which this vector belongs.
     */
    index?: string;

    /**
     * The dimensions of the vector.
     */
    dimensions: Array<AuxtaDimensionDefinition>;
};
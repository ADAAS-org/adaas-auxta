import { AuxtaIndexMode } from "@auxta/constants/AuxtaIndex.constants";
import { AuxtaDimensionDefinition } from "./AuxtaDimension.types";
import { AuxtaVectorDefinition } from "./AuxtaVector.types";


export interface IAuxtaIndexConstructorConfig {
    /**
     * The name of the index.
     */
    name: string;

    /**
     * The type of the index, e.g., 'disk', 'ram', or 'hybrid'.
     * 
     * Defaults to 'disk'.
     */
    mode?: AuxtaIndexMode;

}



export type AuxtaIndexDefinition = {
    /**
     * The name of the index.
     */
    name: string;
    /**
     * The type of the index, e.g., 'disk', 'ram', or 'hybrid'.
     * 
     * Defaults to 'disk'.
     */
    mode: AuxtaIndexMode;
    /**
     * The vectors in the index.
     */
    vectors: AuxtaVectorDefinition[]; // The vectors in the index
} 
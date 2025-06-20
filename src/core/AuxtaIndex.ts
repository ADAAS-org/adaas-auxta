import { AuxtaIndexError } from "@auxta/errors/AuxtaIndex.error";
import { AuxtaIndexDefinition, IAuxtaIndexConstructorConfig } from "@auxta/types/AuxtaIndex.types";
import { AuxtaDimension } from "./AuxtaDimension";
import { AuxtaStaticDimension } from "./dimensions/AuxtaStaticDimension.class";
import { AuxtaDynamicDimension } from "./dimensions/AuxtaDynamicDimension.class";
import { AuxtaComputedDimension } from "./dimensions/AuxtaComputedDimension.class";
import { AUXTA_DIMENSION_INDEX_METADATA_KEY } from "@auxta/metadata/Dimensions.meta";
import { AuxtaVector } from "./AuxtaVector";



export class AuxtaIndex {

    /**
     * The name of the index.
     */
    readonly name: string;

    protected config: IAuxtaIndexConstructorConfig;
    protected _vectors: Array<typeof AuxtaVector<any>> = [];
    protected _dimensions: AuxtaDimension[] = [];


    /**
     * Index class represents Auxta DB index 
     * Index allows to organize vectors in a way that allows to query them by dimensions very fast.
     * 
     * @param config 
     */
    constructor(config: IAuxtaIndexConstructorConfig) {

        if (!config || !config.name) {
            throw AuxtaIndexError.invalidConfig(
                'Index configuration must include a name.'
            );
        }

        this.config = config;
        this.name = config.name;
        this.config.mode = this.config.mode || 'disk'; // Default to 'disk' if not provided
    }

    /**
     * Returns all Static dimensions of the index.
     */
    get staticDimensions(): ReadonlyArray<AuxtaStaticDimension> {
        return Object.freeze(this._dimensions.filter(dim => dim instanceof AuxtaStaticDimension));
    }
    /**
     * Returns all Dynamic dimensions of the index.
     */
    get dynamicDimensions(): ReadonlyArray<AuxtaDynamicDimension> {
        return Object.freeze(this._dimensions.filter(dim => dim instanceof AuxtaDynamicDimension));
    }
    /**
     * Returns all Computed dimensions of the index.
     */
    get computedDimensions(): ReadonlyArray<AuxtaComputedDimension> {
        return Object.freeze(this._dimensions.filter(dim => dim instanceof AuxtaComputedDimension));
    }

    get dimensions(): ReadonlyArray<AuxtaDimension> {
        return Object.freeze(this._dimensions);
    }


    /**
     * Allows define locally index dimensions.
     * 
     * @param dimension 
     */
    add(...vectors: typeof AuxtaVector<any>[]): void {

        if (vectors.length === 0) {
            throw AuxtaIndexError.invalidConfig(
                'At least one vector must be defined for the index.'
            );
        }

        for (const vector of vectors) {
            const dimension: AuxtaDimension[] = vector.dimensions;
            if (!this._vectors.some(v => v.name === vector.name)) {
                this._vectors.push(vector);
            }

            if (dimension.length === 0) {
                throw AuxtaIndexError.invalidConfig(
                    'At least one dimension must be defined for the index.'
                );
            }

            const filtered = dimension.filter(dim => !this._dimensions.some(d => d.id === dim.id))

            for (const dim of filtered) {
                if (!(dim instanceof AuxtaDimension)) {
                    throw AuxtaIndexError.invalidConfig(
                        `Invalid dimension type: ${typeof dim}. Expected an instance of AuxtaDimension.`
                    );
                }

                dim[AUXTA_DIMENSION_INDEX_METADATA_KEY] = this;

                this._dimensions.push(dim);
            }
        }



    }




    /**
     * Returns the index definition.
     * Definition includes the name, mode, and dimensions of the index.
     * And Uses the `toDefinition` method of each dimension to get its definition.
     * 
     * @returns 
     */
    toDefinition(): AuxtaIndexDefinition {
        return {
            name: this.name,
            mode: this.config.mode!,
            vectors: this._vectors.map(v => v.toDefinition()),
        };
    }
} 

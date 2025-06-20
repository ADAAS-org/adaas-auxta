import { AuxtaDimension } from "@auxta/core/AuxtaDimension";
import { AuxtaComputedDimension } from "@auxta/core/dimensions/AuxtaComputedDimension.class";
import { AuxtaDynamicDimension } from "@auxta/core/dimensions/AuxtaDynamicDimension.class";
import { AuxtaStaticDimension } from "@auxta/core/dimensions/AuxtaStaticDimension.class";
import { AUXTA_INDEX_METADATA_KEY } from "./Index.decorator";
import { ComputedDimensionConstructorConfig, DimensionConstructorBaseConfig, DynamicDimensionAggregatedConstructorConfig, DynamicDimensionConstructorBaseConfig, DynamicDimensionConstructorConfig, DynamicDimensionLatestConstructorConfig, StaticDimensionConstructorConfig } from "@auxta/types/AuxtaDimension.types";
import { AUXTA_DIMENSION_INDEX_METADATA_KEY, AUXTA_DIMENSION_VECTOR_METADATA_KEY, AUXTA_VECTOR_METADATA_KEY } from "@auxta/metadata/Dimensions.meta";



export function registerDimension(target: any, dimension: AuxtaDimension) {
    if (!target.constructor[AUXTA_VECTOR_METADATA_KEY]) {
        target.constructor[AUXTA_VECTOR_METADATA_KEY] = [];
    }
    target.constructor[AUXTA_VECTOR_METADATA_KEY].push(dimension);
}

export function Static(config: Partial<StaticDimensionConstructorConfig>)
export function Static()
export function Static(config?: Partial<StaticDimensionConstructorConfig>) {

    return (target: any, propertyKey: string) => {

        const newDimension = new AuxtaStaticDimension({
            ...(config || {}),
            name: propertyKey,
            index: '',
            vector: ''
        });

        newDimension[AUXTA_DIMENSION_VECTOR_METADATA_KEY] = target.constructor;
        newDimension[AUXTA_DIMENSION_INDEX_METADATA_KEY] = target.constructor[AUXTA_INDEX_METADATA_KEY];

        registerDimension(target, newDimension);

    };
}

/**
 * DynamicDimension decorator is used to define a dynamic dimension in the Auxta DB.
 * It allows you to specify a default value or a configuration object for the dimension.
 * 
 * @param config 
 */
export function Dynamic<T extends any = any>(config: Partial<DynamicDimensionConstructorConfig<T>>)
export function Dynamic<T extends any = any>(dimension: AuxtaDynamicDimension)
export function Dynamic<T extends any = any>(defaultValue: string | number)
export function Dynamic<T extends any = any>()
export function Dynamic<T extends any = any>(param1?: Partial<DynamicDimensionConstructorConfig<T>> | AuxtaDynamicDimension | string | number) {
    return (target: any, propertyKey: string) => {
        let newDimension;

        if (param1 instanceof AuxtaDynamicDimension) {
            newDimension = param1;
        }
        else {
            newDimension = new AuxtaDynamicDimension<T>({
                behavior: 'aggregated',
                type: 'number',
                mode: 'disk', // Default mode for aggregated dimensions
                scope: 'vector', // Default scope for aggregated dimensions
                ...(typeof param1 !== 'object' ? {
                    value: param1,
                } : param1 as any),
                name: propertyKey,
            })

            newDimension[AUXTA_DIMENSION_VECTOR_METADATA_KEY] = target.constructor;
            newDimension[AUXTA_DIMENSION_INDEX_METADATA_KEY] = target.constructor[AUXTA_INDEX_METADATA_KEY];
        }

        registerDimension(target, newDimension);
    }
}


/**
 * Aggregated decorator is used to define an aggregated dynamic dimension in the Auxta DB.
 * It allows to specify Dynamic Dimensions that has a readMode set to 'aggregated'.
 * That means that the value of the dimension is calculated on the fly.
 * 
 * @param config 
 */
export function Aggregated<T extends number = number>(config: Partial<DynamicDimensionAggregatedConstructorConfig<T>>)
export function Aggregated<T extends number = number>()
export function Aggregated<T extends number = number>(defaultValue: T)
export function Aggregated<T extends number = number>(config?: Partial<DynamicDimensionAggregatedConstructorConfig<T>> | number | T) {
    return (target: any, propertyKey: string) => {

        const newDimension = new AuxtaDynamicDimension<T>({
            behavior: 'aggregated',
            type: 'number', // Default type for aggregated dimensions
            mode: 'disk', // Default mode for aggregated dimensions
            scope: 'vector', // Default scope for aggregated dimensions
            ...(typeof config === 'number' ? <DynamicDimensionAggregatedConstructorConfig>{
                value: config,
            } : config) as any,
            name: propertyKey,
        })


        newDimension[AUXTA_DIMENSION_VECTOR_METADATA_KEY] = target.constructor;
        newDimension[AUXTA_DIMENSION_INDEX_METADATA_KEY] = target.constructor[AUXTA_INDEX_METADATA_KEY];

        registerDimension(target, newDimension);
    }
}


/**
 * Latest decorator is used to define a dynamic dimension in the Auxta DB.
 * It allows to specify Dynamic Dimensions that has a readMode set to 'latest'.
 * It means that the value of the dimensions is always latest recorded value.
 * 
 * 
 * @param config 
 */
export function Latest<T extends any = any>(config: Partial<DynamicDimensionLatestConstructorConfig<T>>)
export function Latest<T extends any = any>()
export function Latest<T extends any = any>(defaultValue: T)
export function Latest<T extends any = any>(config?: Partial<DynamicDimensionLatestConstructorConfig<T>> | string | T) {
    return (target: any, propertyKey: string) => {

        const newDimension = new AuxtaDynamicDimension<T>({
            behavior: 'latest',
            mode: 'disk', // Default mode for latest dimensions
            scope: 'global', // Default scope for latest dimensions
            ...(typeof config === 'string' ? <DynamicDimensionLatestConstructorConfig<T>>{
                value: config,
            } : config as any),
            name: propertyKey,
        })

        newDimension[AUXTA_DIMENSION_VECTOR_METADATA_KEY] = target.constructor;
        newDimension[AUXTA_DIMENSION_INDEX_METADATA_KEY] = target.constructor[AUXTA_INDEX_METADATA_KEY];

        registerDimension(target, newDimension);
    }
}


/**
 * Computed decorator is used to define a computed dimension in the Auxta DB.
 * It allows you to specify a formula for the dimension value.
 * The formula can be a string that represents the calculation to be performed.
 * 
 * e.g. `"value1 + value2"` or `value1 / value2`.
 * 
 * !!! Note: Ensure that the values are presented as another dimensions on Index level or Global level.
 * 
 * @param config 
 */
export function Computed(config: Partial<ComputedDimensionConstructorConfig>)
export function Computed()
export function Computed(formula: string)
export function Computed(config?: Partial<ComputedDimensionConstructorConfig> | string) {
    return (target: any, propertyKey: string) => {

        if (typeof config === 'string' && !config.trim()) {
            throw new Error(`Computed dimension formula cannot be empty for the vector ${target.constructor.name}. Please provide a valid formula.`);
        }
        if (typeof config === 'object' && !config.formula) {
            throw new Error(`Computed dimension configuration must include a formula for the vector ${target.constructor.name}. Please provide a valid formula.`);
        }

        const newDimension = new AuxtaComputedDimension({
            type: 'number',
            formula: '',
            ...(typeof config === 'string' ? {
                formula: config!,
            } : config),
            name: propertyKey,
        })

        newDimension[AUXTA_DIMENSION_VECTOR_METADATA_KEY] = target.constructor;
        newDimension[AUXTA_DIMENSION_INDEX_METADATA_KEY] = target.constructor[AUXTA_INDEX_METADATA_KEY];

        registerDimension(target, newDimension);
    }
}

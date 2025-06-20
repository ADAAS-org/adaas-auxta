import { AuxtaIndex } from '@auxta/core/AuxtaIndex';
import { AuxtaVector } from '@auxta/core/AuxtaVector';
import { IAuxtaIndexConstructorConfig } from '@auxta/types/AuxtaIndex.types';

export const AUXTA_INDEX_METADATA_KEY = Symbol('auxta:index');

export const AUXTA_INDEXES: Map<string, AuxtaIndex> = new Map<string, AuxtaIndex>();
export const AUXTA_VECTORS: Map<string, typeof AuxtaVector<any>> = new Map<string, typeof AuxtaVector<any>>();

export function Index(config: IAuxtaIndexConstructorConfig): <T extends (typeof AuxtaVector<any>) = any>(target: T) => void
export function Index(index: AuxtaIndex): <T extends (typeof AuxtaVector<any>) = any>(target: T) => void
export function Index(name: string): <T extends (typeof AuxtaVector<any>) = any>(target: T) => void
export function Index(param1: IAuxtaIndexConstructorConfig | AuxtaIndex | string): <T extends (typeof AuxtaVector<any>) = any>(target: T) => void {

    return <T extends (typeof AuxtaVector<any>) = any>(target: T) => {

        let index = AUXTA_INDEXES.get(typeof param1 === 'string' ? param1 : param1.name);

        if (!AUXTA_VECTORS.get(target.name)) {
            AUXTA_VECTORS.set(target.name, target);
        }

        if (!index) {

            switch (true) {
                case typeof param1 === 'string':
                    index = new AuxtaIndex({ name: param1 });
                    break;
                case param1 instanceof AuxtaIndex:
                    index = param1;
                    break;
                case typeof param1 === 'object':
                    index = new AuxtaIndex(param1 as IAuxtaIndexConstructorConfig);
                    break;
                default:
                    throw new Error('Invalid parameter type for Index decorator. Expected string, AuxtaIndex, or IAuxtaIndexConstructorConfig.');
            }

            AUXTA_INDEXES.set(index.name, index);
        }

        index.add(target);

        target[AUXTA_INDEX_METADATA_KEY] = index;

    }
}



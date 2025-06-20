import { EnvUtil } from '@auxta/utils/Env.util';
EnvUtil.load();
import { AuxtaVector } from '@auxta/core/AuxtaVector';
import { AuxtaIndex as AuxIndex } from '@auxta/core/AuxtaIndex';
import { Static } from '@auxta/decorators/Dimension.decorator';
import { AUXTA_INDEX_METADATA_KEY, Index } from '@auxta/decorators/Index.decorator';


jest.retryTimes(0);

describe('Auxta Classes Initialization', () => {

    it('It should be possible to define new index', async () => {

        @Index('main')
        class AdVector extends AuxtaVector<AdVector> {
            @Static({
                name: 'AgeCategory',
            }) AgeCategory!: string;
        }



        expect(AdVector).toBeDefined();
        expect(AdVector[AUXTA_INDEX_METADATA_KEY]).toBeDefined();
        expect(AdVector[AUXTA_INDEX_METADATA_KEY]).toBeInstanceOf(AuxIndex);
        expect(AdVector[AUXTA_INDEX_METADATA_KEY].name).toBe('main');
    });

    it('It should be possible to define multiple indexes', async () => {

        @Index('custom_index')
        class CustomVector extends AuxtaVector<CustomVector> {
            @Static({
                name: 'CustomField',
            }) CustomField!: string;
        }

        @Index('custom_index_2')
        class CustomVector2 extends AuxtaVector<CustomVector> {
            @Static({
                name: 'CustomField',
            }) CustomField!: string;
        }

        expect(CustomVector).toBeDefined();
        expect(CustomVector[AUXTA_INDEX_METADATA_KEY]).toBeDefined();
        expect(CustomVector[AUXTA_INDEX_METADATA_KEY]).toBeInstanceOf(AuxIndex);
        expect(CustomVector[AUXTA_INDEX_METADATA_KEY].name).toBe('custom_index');


        expect(CustomVector2).toBeDefined();
        expect(CustomVector2[AUXTA_INDEX_METADATA_KEY]).toBeDefined();
        expect(CustomVector2[AUXTA_INDEX_METADATA_KEY]).toBeInstanceOf(AuxIndex);
        expect(CustomVector2[AUXTA_INDEX_METADATA_KEY].name).toBe('custom_index_2');
    });

    it('It should be possible to define multiple Vectors under the same Index', async () => {

        @Index('multi_index')
        class MultiVector extends AuxtaVector<MultiVector> {
            @Static() Dimension1!: string;
            @Static() Dimension2!: number;
        }


        @Index('multi_index')
        class MultiVector2 extends AuxtaVector<MultiVector2> {
            @Static() Dimension3!: boolean;
            @Static() Dimension4!: string[];
        }

        expect(MultiVector).toBeDefined();
        expect(MultiVector[AUXTA_INDEX_METADATA_KEY]).toBeDefined();
        expect(MultiVector[AUXTA_INDEX_METADATA_KEY]).toBeInstanceOf(AuxIndex);
        expect(MultiVector[AUXTA_INDEX_METADATA_KEY].name).toBe('multi_index');

        expect(MultiVector2).toBeDefined();
        expect(MultiVector2[AUXTA_INDEX_METADATA_KEY]).toBeDefined();
        expect(MultiVector2[AUXTA_INDEX_METADATA_KEY]).toBeInstanceOf(AuxIndex);
        expect(MultiVector2[AUXTA_INDEX_METADATA_KEY].name).toBe(MultiVector[AUXTA_INDEX_METADATA_KEY].name);
        expect(MultiVector[AUXTA_INDEX_METADATA_KEY].name).toBe(MultiVector2[AUXTA_INDEX_METADATA_KEY].name);


    });


});
import { EnvUtil } from '@auxta/utils/Env.util';
EnvUtil.load();
import { AuxtaVector } from '@auxta/core/AuxtaVector';
import { Aggregated, Computed, Dynamic, Latest, Static } from '@auxta/decorators/Dimension.decorator';
import { AuxtaComputedDimensionDefinition } from '@auxta/types/AuxtaDimension.types';
import { Index } from '@auxta/decorators/Index.decorator';

jest.retryTimes(0);

describe('Auxta Vector Tests', () => {

    it('It Should be possible to define a vector', async () => {

        class AdVector extends AuxtaVector<AdVector> {}

        expect(AdVector).toBeDefined();
    });

    it('It Should be possible to define a vector with dimensions', async () => {


        @Index('ad_index')
        class AdVector extends AuxtaVector<AdVector> {
            @Static({
                name: 'AgeCategory',
            }) AgeCategory!: string;
            @Static() Country!: string;
            @Static() CustomGroup!: string;
            @Static() BudgetLevel!: string;
            @Static() CPM!: number;
            @Static() Groups!: number[];

            @Aggregated() DailyBudget?: number;
            @Aggregated() TotalBudget?: number;
            @Aggregated() Quality?: number;
            @Aggregated() Clicks?: number;

            @Latest() lastAction?: number;

            @Computed('Clicks / DailyBudget') CTR?: number;
        }

        const vector = new AdVector({
            Country: 'US',
            AgeCategory: '18-24',
            CustomGroup: 'Group1',
            BudgetLevel: 'High',
            CPM: 20,
            Groups: [1, 2, 3],
        });

        expect(vector).toBeDefined();
        expect(vector).toBeInstanceOf(AuxtaVector);
        expect(vector.AgeCategory).toBe('18-24');
        expect(vector.Country).toBe('US');
        expect(vector.CustomGroup).toBe('Group1');
        expect(vector.BudgetLevel).toBe('High');
        expect(vector.CPM).toBe(20);
        expect(vector.DailyBudget).toBeUndefined();
        expect(vector.TotalBudget).toBeUndefined();
        expect(vector.Quality).toBeUndefined();
        expect(vector.Clicks).toBeUndefined();
        expect(vector.CTR).toBeUndefined();
        expect(vector.lastAction).toBeUndefined();

    });

    it('It Should be possible to get vector JSON value', async () => {

        @Index('ad_index')
        class AdVector extends AuxtaVector<AdVector> {
            @Static({
                name: 'AgeCategory',
            }) AgeCategory!: string;
            @Static() Country!: string;
            @Static() CustomGroup!: string;
            @Static() BudgetLevel!: string;
            @Static() CPM!: number;
            @Static() Groups!: number[];

            @Aggregated() DailyBudget?: number;
            @Aggregated() TotalBudget?: number;
            @Aggregated() Quality?: number;
            @Aggregated() Clicks?: number;

            @Latest() lastAction?: number;

            @Computed('Clicks / DailyBudget') CTR?: number;
        }

        const vector = new AdVector({
            Country: 'US',
            AgeCategory: '18-24',
            CustomGroup: 'Group1',
            BudgetLevel: 'High',
            CPM: 20,
            Groups: [1, 2, 3],
        });

        const json = vector.toJSON();

        expect(json).toBeDefined();
        expect(json.AgeCategory).toBe('18-24');
        expect(json.Country).toBe('US');
        expect(json.CustomGroup).toBe('Group1');
        expect(json.BudgetLevel).toBe('High');
        expect(json.CPM).toBe(20);
        expect(json.Groups).toEqual([1, 2, 3]);
        expect(json.DailyBudget).toBeUndefined();
        expect(json.TotalBudget).toBeUndefined();
        expect(json.Quality).toBeUndefined();
        expect(json.Clicks).toBeUndefined();
        expect(json.CTR).toBeUndefined();
        expect(json.lastAction).toBeUndefined();
    });

    it('It Should be possible to get Vector Definition', async () => {

        @Index('ad_index')
        class AdVector extends AuxtaVector<AdVector> {

            @Static() AgeCategory!: string;
            @Static() Country!: string;
            @Static() CustomGroup!: string;
            @Static({
                type: 'varchar128',
            }) BudgetLevel!: string;
            @Static({
                type: 'number',
            }) CPM!: number;
            @Static({
                type: 'array',
            }) Groups!: number[];

            @Aggregated({
                type: 'number',
            }) DailyBudget?: number;
            @Aggregated({
                type: 'int32',
            }) TotalBudget?: number;
            @Aggregated({
                type: 'number',
            }) Quality?: number;
            @Aggregated({
                type: 'number',
                scope: 'global',
            }) Clicks?: number;

            @Latest({
                type: 'string',
            }) lastAction?: string;

            @Computed('Clicks / DailyBudget') CTR?: number;
        }

        const definition = AdVector.toDefinition();

        expect(definition).toBeDefined();
        expect(definition.name).toBe('AdVector');
        expect(definition.dimensions).toBeDefined();
        expect(definition.dimensions.length).toBe(12);

        expect(definition.dimensions[0].name).toBe('AgeCategory');
        expect(definition.dimensions[0].type).toBe('string');

        expect(definition.dimensions[1].name).toBe('Country');
        expect(definition.dimensions[1].type).toBe('string');

        expect(definition.dimensions[2].name).toBe('CustomGroup');
        expect(definition.dimensions[2].type).toBe('string');

        expect(definition.dimensions[3].name).toBe('BudgetLevel');
        expect(definition.dimensions[3].type).toBe('varchar128');

        expect(definition.dimensions[4].name).toBe('CPM');
        expect(definition.dimensions[4].type).toBe('number');

        expect(definition.dimensions[5].name).toBe('Groups');
        expect(definition.dimensions[5].type).toBe('array');

        expect(definition.dimensions[6].name).toBe('DailyBudget');
        expect(definition.dimensions[6].type).toBe('number');

        expect(definition.dimensions[7].name).toBe('TotalBudget');
        expect(definition.dimensions[7].type).toBe('int32');

        expect(definition.dimensions[8].name).toBe('Quality');
        expect(definition.dimensions[8].type).toBe('number');

        expect(definition.dimensions[9].name).toBe('Clicks');
        expect(definition.dimensions[9].type).toBe('number');

        expect(definition.dimensions[10].name).toBe('lastAction');
        expect(definition.dimensions[10].type).toBe('string');

        expect(definition.dimensions[11].name).toBe('CTR');
        expect(definition.dimensions[11].type).toBe('number');
        expect((definition.dimensions[11] as AuxtaComputedDimensionDefinition).formula).toBe('Clicks / DailyBudget');

    });

});
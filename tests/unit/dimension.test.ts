import { EnvUtil } from '@auxta/utils/Env.util';
EnvUtil.load();
import { AuxtaCommand } from '@auxta/lib/AuxtaCommand.class';
import { AuxtaDimension } from '@auxta/core/AuxtaDimension';
import { AuxtaDynamicDimension } from '@auxta/core/dimensions/AuxtaDynamicDimension.class';
import { AuxtaComputedDimension } from '@auxta/core/dimensions/AuxtaComputedDimension.class';
import { AuxtaVector } from '@auxta/core/AuxtaVector';
import { Aggregated, Computed, Dynamic, Latest, Static } from '@auxta/decorators/Dimension.decorator';

jest.retryTimes(0);

describe('Auxta Default Object Tests', () => {

    it('It Should be possible to define Static Dimension', async () => {

        const InterestCategory = new AuxtaDimension({
            name: 'InterestCategory',
            type: 'varchar128'
        });

        expect(InterestCategory).toBeDefined();
        expect(InterestCategory).toBeInstanceOf(AuxtaDimension);
    });

    it('It Should be possible to define Dynamic Dimension', async () => {
        const DailyBudget = new AuxtaDynamicDimension({
            name: 'DailyBudget',
            type: 'number',
            behavior: 'latest',
        });
        expect(DailyBudget).toBeDefined();
        expect(DailyBudget).toBeInstanceOf(AuxtaDynamicDimension);
    });

    it('It Should be possible to define Computed Dimension', async () => {

        const Test = new AuxtaComputedDimension({
            name: 'Test',
            type: 'number',
            formula: 'A / B', //  CTR is computed as Clicks divided by Daily Budget
        });

        expect(Test).toBeDefined();
        expect(Test).toBeInstanceOf(AuxtaComputedDimension);
        expect(Test.name).toBe('Test');
        expect(Test.type).toBe('number');
        expect(Test.formula).toBe('A / B');
    });
});
import { AuxtaCommand } from '@auxta/lib/AuxtaCommand.class';
import { RunningTrailVector } from './db/vectors/Trail.vector';
import { auxta } from './db/auxta';
import { AuxtaVector } from '@auxta/core/AuxtaVector';
import { Static } from '@auxta/decorators/Dimension.decorator';
import { Index } from '@auxta/decorators/Index.decorator';
import './db.setup';


describe('Database Integration Test', () => {

    it('Should add new vectors to Auxta ', async () => {

        const testVector = new RunningTrailVector({
            distance: 2222,
            averageTime: 50,
            complexity: 'uphill',
            views: ['rocks', 'mud', 'grass', 'sand'],
            features: ['water', 'trees', 'mountains'],
        });

        const insertCommand = new AuxtaCommand().add(testVector);

        await auxta.query(insertCommand);

        const getCommand = new AuxtaCommand().get(testVector);

        const getResult = await auxta.query<RunningTrailVector>(getCommand);

        expect(getResult).toBeDefined();

        expect(getResult).toBeInstanceOf(RunningTrailVector);

    });
    it('Should define a new Index manually', async () => {

        @Index('countries')
        class Countries extends AuxtaVector<Countries> {
            @Static() foo!: string;
        }

        const defineResult = new AuxtaCommand()
            .define(Countries);
    });

    it('Should find matched vectors', () => {
        // const searchResult = new SearchOperation()
        //     .index('countries')
        //     .pick(20)
        //     .where(Age, age => age.gte(5).and().lte(25))
        //     .where(Country, country => country.in(['USA', 'Canada']))
        //     .build();
    });
});
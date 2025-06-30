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

        console.log('getResult', getResult);

        expect(getResult).toBeDefined();
        expect(getResult.length).toBe(1);
        expect(getResult[0]).toBeInstanceOf(RunningTrailVector);
        expect(getResult[0].id).toBe(testVector.id);
        expect(getResult[0].averageTime).toBe(testVector.averageTime);
        expect(getResult[0].distance).toBe(testVector.distance);
        expect(getResult[0].complexity).toBe(testVector.complexity);

        return Promise.resolve();

    });

    it('Should search for vector with match operator', async () => {

        const testVector = new RunningTrailVector({
            distance: 2222,
            averageTime: 50,
            complexity: 'text5',
            views: ['rocks', 'mud', 'grass', 'sand'],
            features: ['water', 'trees', 'mountains'],
        });

        const insertCommand = new AuxtaCommand().add(testVector);

        await auxta.query(insertCommand);

        const searchCommand = new AuxtaCommand()
            .search(RunningTrailVector)
            .where('complexity', complexity => complexity.match('text5'))

        const getResult = await auxta.query<RunningTrailVector>(searchCommand);
        expect(getResult).toBeDefined();
        expect(getResult[0]).toBeInstanceOf(RunningTrailVector);
        expect(getResult[0].id).toBe(testVector.id);
        expect(getResult[0].complexity).toBe(testVector.complexity);

        return Promise.resolve();

    });

     it('Should search for vector with multiple operators', async () => {

        const searchCommand = new AuxtaCommand()
            .search(RunningTrailVector)
            .where('distance', distance => distance.gte(1000).and().lte(3000))
            .where('views', views => views.in(['flat', 'uphill']).or().in(['water', 'trees']))

        const getResult = await auxta.query<RunningTrailVector>(searchCommand);

        expect(getResult).toBeDefined();
        expect(getResult.length).toBe(3);

        return Promise.resolve();
    });



    // it('Should define a new Index manually', async () => {

    //     @Index('countries')
    //     class Countries extends AuxtaVector<Countries> {
    //         @Static() foo!: string;
    //     }

    //     const defineResult = new AuxtaCommand()
    //         .define(Countries);





    //     expect(defineResult).toBeDefined();
    // });


});
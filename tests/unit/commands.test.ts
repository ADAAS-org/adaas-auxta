import { EnvUtil } from '@auxta/utils/Env.util';
EnvUtil.load();
import { AuxtaCommand } from '@auxta/lib/AuxtaCommand.class';
import { AuxtaVector } from '@auxta/core/AuxtaVector';
import { Static } from '@auxta/decorators/Dimension.decorator';
import { Index } from '@auxta/decorators/Index.decorator';

jest.retryTimes(0);

describe('Auxta Classes Initialization', () => {

    it('It create a base command', async () => {
        const command = new AuxtaCommand('test_index');
        expect(command).toBeDefined();
        expect(command).toBeInstanceOf(AuxtaCommand);

        const buildCommand = command
            .raw({
                index: 'test_index',
                entity: 'vector',
                operation: 'ADD',
                vector: {}
            })
            .build();


        expect(buildCommand).toBeDefined();
        expect(buildCommand).toBeInstanceOf(Array);

        expect(buildCommand.length).toBe(1);

        const compiledCommand = buildCommand[0];

        expect(compiledCommand).toBeDefined();
        expect(compiledCommand.index).toBe('test_index');
        expect(compiledCommand.entity).toBe('vector');
        expect(compiledCommand.operation).toBe('ADD');

    });

    it('It should create a Define Command', async () => {

        @Index('advector')
        class AdVector extends AuxtaVector<AdVector> {
            @Static({
            }) test!: string;

        }

        expect(AdVector).toBeDefined();
        expect(AdVector.dimensions).toBeDefined();
        expect(AdVector.dimensions.length).toBe(1);
        expect(AdVector.dimensions[0]).toBeDefined();
        expect(AdVector.dimensions[0].name).toBe('test');


        const command = new AuxtaCommand();

        const buildCommand = command
            .define(AdVector)
            .build();

        expect(buildCommand).toBeDefined();
        expect(buildCommand).toBeInstanceOf(Array);
        expect(buildCommand.length).toBe(1);

        const compiledCommand = buildCommand[0];

        console.log('Compiled Command:', compiledCommand);

        expect(compiledCommand).toBeDefined();
        expect(compiledCommand.index).toBe('advector');
        expect(compiledCommand.entity).toBe('index');
        expect(compiledCommand.operation).toBe('DEFINE');

    });

    it('It should create a Search command', async () => {

        @Index('TestTrail')
        class TestTrail extends AuxtaVector<TestTrail> {
            @Static({
                type: 'number',
            })
            // e.g. 1000, 2000, 3000 in meters
            distance!: number;

            @Static({
                type: 'number',
            })
            // e.g. 30, 45, 60 in minutes
            averageTime!: number;

            @Static({
                type: 'string',
            })
            // e.g. 'flat', 'uphill', 'downhill'
            complexity!: string;

            @Static({
                type: 'array',
            })
            //  e.g. ['rocks', 'mud', 'grass', 'sand']
            views!: string[]

            @Static({
                type: 'array',
            })
            // e.g. ['water', 'trees', 'mountains']
            features!: string[];
        }


        const command = new AuxtaCommand()
            .search(TestTrail)
            .where('distance', distance => distance.gte(1000).and().lte(5000))
            .where('complexity', complexity => complexity.in(['flat', 'uphill']))
            .where('views', views => views.in(['flat', 'uphill']).or().in(['water', 'trees']))
            .build();
        expect(command).toBeDefined();
        expect(command).toBeInstanceOf(Array);
        expect(command.length).toBe(1);

        const compiledCommand = command[0];
        console.log('Compiled Command:', JSON.stringify(compiledCommand, null, 2));

        expect(compiledCommand).toBeDefined();
        expect(compiledCommand.index).toBe('TestTrail');
        expect(compiledCommand.entity).toBe('index');
        expect(compiledCommand.operation).toBe('SEARCH');
        expect(compiledCommand.conditions).toBeDefined();
        expect(compiledCommand.conditions).toBeInstanceOf(Object);
        expect(Object.keys(compiledCommand.conditions).length).toBe(3);

    });

});
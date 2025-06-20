import { AuxtaVector } from "@auxta/core/AuxtaVector";
import { Aggregated, Computed, Static } from "@auxta/decorators/Dimension.decorator";
import { Index } from "@auxta/decorators/Index.decorator";
import { RunningTrailIndex } from "../indexes/RunningTrail.index";


@Index(RunningTrailIndex)
export class RunningTrailVector<T = any> extends AuxtaVector<T extends RunningTrailVector ? T : RunningTrailVector> {

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


    /**
     * [!] This is a dynamic dimension that can be used to track the number of people on the road.
     * 
     * It is defined as a dynamic dimension with an aggregated read mode.
     */
    @Aggregated({
        type: 'number',
        scope: 'vector'
    })
    peopleOnTheRoad?: number;


    /**
     * [!] For Computed Dimensions it is important to indicate that it is not required to be defined in the constructor.
     * 
     * This is a computed dimension that calculates the average speed based on distance and average time.
     */
    @Computed('distance / averageTime')
    averageSpeed?: number;
}
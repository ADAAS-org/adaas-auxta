import { Dynamic, Static } from "@auxta/decorators/Dimension.decorator";
import { RunningTrailVector } from "./Trail.vector";
import { Index } from "@auxta/decorators/Index.decorator";
import { Temperature } from "../dimesions/temperature.dim";

/**
 * This class illustrates a more complex vector for a running trail.
 * It extends the RunningTrailVector and adds additional dimensions
 * 
 * Using inheritance it is possible to extend the same base vector but split it into different classes or types. 
 * This approach may simplify the code and make it more readable.
 * 
 * [!] However indx definition is still mandatory. 
 * And here it's possible to define the same index for different vectors. 
 * OR 
 * Define different indexes for the extended vector.
 */
@Index('hard_running_trail')
export class HardTrail extends RunningTrailVector<HardTrail> {

    @Static({
        type: 'string',
    })
    difficulty!: string;

    @Static({
        type: 'boolean',
    })
    isAdvanced!: boolean;

    @Static({
        type: 'array',
    })
    //  e.g. ['rocks', 'mud', 'grass', 'sand']
    hazards!: string[];


    @Dynamic(Temperature)
    temperature?: number;
}
import { config } from 'dotenv';
config();
import { StaticParameter } from '../src/classes/parameters/StaticParameter.class';
import { DynamicParameter } from '../src/classes/parameters/DynamicParameter.class';
import { ComputedParameter } from '../src/classes/parameters/ComputedParameter.class';
import { Vector } from '../src/classes/Vector.class';
import { Auction } from '../src/engine/auction';

jest.retryTimes(0);

describe('Polyfill Tests', () => {

    it('It Should return fs', async () => {



    });
    it('It Should return crypto', async () => {

    });

    it('Crypto should calculate Hash', async () => {


        //  Step 1. Define Parameters for the campaigns, these are the parameters that will be used in the auction process.

        // 1.1.  Define static parameters
        const InterestCategory = new StaticParameter('InterestCategory');
        const AgeCategory = new StaticParameter('AgeCategory');
        const Country = new StaticParameter('Country');
        const CustomGroup = new StaticParameter('CustomGroup');
        const BudgetLevel = new StaticParameter('BudgetLevel');
        const CPM = new StaticParameter('CPM');

        // 1.2.  Define computed parameters
        const DailyBudget = new DynamicParameter('DailyBudget');
        const TotalBudget = new DynamicParameter('TotalBudget');
        const Quality = new DynamicParameter('Quality');
        const Clicks = new DynamicParameter('Clicks');

        // 1.3. Define computed parameters
        const CTR = new ComputedParameter('CTR', 'Clicks / DailyBudget'); //  CTR is computed as Clicks divided by Daily Budget




        //  Step 2. Define Campaigns, these are the campaigns that will be used in the auction process.
        const campaignA = [
            //  Define static parameters
            InterestCategory.withValue([1, 2]),
            AgeCategory.withValue([1, 2]),
            Country.withValue([1]),
            CustomGroup.withValue([1, 2]),
            BudgetLevel.withValue([1, 2]),
            CPM.withValue(20),
            // ....... and so on and so forth for the static parameters

            //  Define computed parameters
            DailyBudget.withDefault(100), //  For testing purposes, we set DailyBudget to a static value
            TotalBudget.withDefault(1000), //  For testing purposes, we set TotalBudget to a static value
            Quality.withDefault(50), //  For testing purposes, we set Quality to a static value
            Clicks.withDefault(0), //  For testing purposes, we set Clicks to a static value
            // Define computed parameters
            CTR,
        ];



        const campaignB = [
            //  Define static parameters
            InterestCategory.withValue([2]),
            AgeCategory.withValue([2]),
            Country.withValue([2]),
            CustomGroup.withValue([1, 2]),
            BudgetLevel.withValue([1, 2]),
            CPM.withValue(20),
            // ....... and so on and so forth for the static parameters
            //  Define computed parameters
            DailyBudget,
            TotalBudget,
            Quality,
            CTR,
        ];


        //  Step 3. add participants to the auction, these are the participants that will be used in the auction process.

        Auction.add(new Vector(campaignA));
        Auction.add(new Vector(campaignB));


        //  Step 4. run the auction, this is the auction process that will be used to determine the winner.

        Auction.run(
            qb => qb
                .where(InterestCategory, 'IN', [1, 2])
                .where(AgeCategory, 'IN', [1, 2])
                .where(Country, 'IN', [1])
                .where(CustomGroup, 'IN', [1, 2])
                .where(BudgetLevel, 'IN', [1, 2])
                .where(CPM, '>', 10)
                .where(DailyBudget, '>', 0)
                .where(TotalBudget, '>', 0)
                .where(Quality, '>', 0)
                .where(CTR, '>', 0)
        );


    });

});
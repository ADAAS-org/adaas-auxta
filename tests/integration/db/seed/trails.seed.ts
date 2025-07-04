import { HardTrail } from "../vectors/HardTrail.vector";
import { RunningTrailVector } from "../vectors/Trail.vector";


export const DEFAULT_RUNNING_TRAILS = {
    Default: [
        new RunningTrailVector({
            distance: 1000,
            averageTime: 30,
            complexity: 'flat',
            views: ['grass', 'sand'],
            features: ['water', 'trees', 'mountains'],
        }),
        new RunningTrailVector({
            distance: 2000,
            averageTime: 45,
            complexity: 'uphill',
            views: ['rocks', 'mud', 'grass', 'sand'],
            features: ['water', 'trees', 'mountains'],
        }),
        new RunningTrailVector({
            distance: 3000,
            averageTime: 60,
            complexity: 'downhill',
            views: ['rocks',  'grass', 'sand'],
            features: ['water', 'trees', 'mountains'],
        }),
        new RunningTrailVector({
            distance: 1500,
            averageTime: 35,
            complexity: 'flat',
            views: ['rocks', 'mud', 'grass', ],
            features: ['water', 'trees', 'mountains'],
        }),
        new RunningTrailVector({
            distance: 2500,
            averageTime: 50,
            complexity: 'uphill',
            views: ['rocks', 'mud', 'grass', 'sand'],
            features: ['water', 'trees', 'mountains'],
        }),
    ],

    Hard: [
        new HardTrail({
            distance: 5000,
            averageTime: 120,
            complexity: 'advanced', // e.g. 'advanced', 'expert'
            views: ['rocks', 'mud', 'grass', 'sand'],
            features: ['water', 'trees'],
            difficulty: 'yellow', // e.g. 'yellow', 'red', 'black'
            isAdvanced: true,
            hazards: ['rocks', 'mud', 'steep slopes'],
        }),
        new HardTrail({
            distance: 7000,
            averageTime: 150,
            complexity: 'expert',
            views: ['rocks', 'mud', 'grass', 'sand'],
            features: ['water', 'trees', 'mountains'],
            difficulty: 'red',
            isAdvanced: true,
            hazards: ['rocks', 'mud', 'steep slopes'],
        }),
        new HardTrail({
            distance: 6000,
            averageTime: 140,
            complexity: 'advanced',
            views: ['rocks', 'mud', 'grass', 'sand'],
            features: ['water', 'trees', 'mountains'],
            difficulty: 'yellow',
            isAdvanced: true,
            hazards: ['rocks', 'mud', 'steep slopes'],
        }),
        new HardTrail({
            distance: 8000,
            averageTime: 180,
            complexity: 'expert',
            views: ['rocks', 'grass', 'sand'],
            features: ['water', 'trees', 'mountains'],
            difficulty: 'black', // e.g. 'yellow', 'red', 'black'   
            isAdvanced: true,
            hazards: ['steep slopes'],
        }),
        new HardTrail({
            distance: 9000,
            averageTime: 200,
            complexity: 'advanced',
            views: ['rocks', 'grass', 'sand'],
            features: ['water', 'trees', 'mountains'],
            difficulty: 'yellow',
            isAdvanced: true,
            hazards: ['rocks', 'mud', 'steep slopes'],
        }),
    ]
}
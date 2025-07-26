import { AuxtaDimensionDefinition } from "./AuxtaDimension.types";
import { AuxtaIndexDefinition } from "./AuxtaIndex.types";
import { AuxtaSerializedVector, AuxtaVectorDefinition } from "./AuxtaVector.types";

/**
 * Describes all commands that can be performed on the database.
 */
export type AuxtaLogicalGroup = {
    AND?: AuxtaConditionWrapper[];
    OR?: AuxtaConditionWrapper[];
    NOT?: AuxtaConditionWrapper | AuxtaLogicalGroup;
};

/**
 * Represents a wrapper for a condition that can be part of a logical group.
 * This allows for nesting conditions within logical operators.
 */
export type AuxtaConditionWrapper = {
    value: AuxtaCondition;
};

/**
 * Represents a single dimension with its value.
 */
export type AuxtaCondition = {
    [key in AuxtaOperatorType]?: any;
};


/**
 * Describes all commands that can be performed on the database.
 */
export type AuxtaDbOperations =
    // Search returns all vectors with match conditions by dimensions
    'SEARCH'
    // Drop command is used to drop an existing Index
    | 'DROP'
    // Define command is used to define a new Index with its dimensions 
    | 'DEFINE'
    // Get command is used to get a vector by its ID
    | 'GET'
    // Add command is used to add a new vector to the Index
    | 'ADD'
    // Update command is used to update an existing vector in the Index
    | 'UPDATE'
    // Delete command is used to delete a vector from the Index
    | 'DELETE';
/**
 * Describes all commands that can be performed on the database.
 */
export type AuxtaDBEntity =
    // Drop command is used to drop an existing Index
    'index'
    // Drop command is used to drop an existing Vector
    | 'vector'
    // Drop command is used to drop an existing Dimension
    | 'dimension';


/**
 * Describes all operators that can be applied for the search conditions on Dimensions.
 * 
 */
export type AuxtaOperatorType =
    //  Uses as >=
    'gte'
    // Uses as <=
    | 'lte'
    // Uses as >
    | 'gt'
    // Uses as <
    | 'lt'
    // Uses as in e.g.  'a' OR 'b' OR 'c'
    | 'in'
    // Uses as not in e.g. 'a' AND 'b' AND 'c'
    | 'notIn'
    // Uses as match e.g. 'abc' OR 'def'
    | 'match';



/**
 * Describes all logical operators that can be used to combine conditions in the search query.
 */
export type AuxtaLogicalOperator =
    //  base logical operator And
    'AND'
    // // base logical operator Or
    | 'OR';



// ==============================================================================================
// ===================================COMMANDS INTERFACES=========================================
// ==============================================================================================

/**
 * Describes the base query structure for all commands in Auxta.
 */
export type AuxtaBaseRawCommand = {
    operation: AuxtaDbOperations;
    entity: AuxtaDBEntity;
    index?: string; // The index to which the command applies, if applicable
}

/**
 * Describes the query to get a vector by its ID.
 */
export type AuxtaGetRawCommand = AuxtaBaseRawCommand & {
    operation: 'GET'; // The command type
    index: string;
    id: string;
}



// --------------------------------------------------------------------------
// --------------------------DEFINE COMMANDS --------------------------------
// --------------------------------------------------------------------------

export type AuxtaDefineIndexRawCommand = AuxtaBaseRawCommand & {
    operation: 'DEFINE'; // The command type
    entity: 'index';
    index: string; // The name of the index to be defined
    definition: AuxtaIndexDefinition
}

export type AuxtaDefineDimensionRawCommand = AuxtaBaseRawCommand & {
    operation: 'DEFINE'; // The command type
    entity: 'dimension';
    definition: AuxtaDimensionDefinition
}

/**
 * Describes the query to search for vectors based on conditions.
 */
export type AuxtaDefineRawCommand =
    AuxtaDefineIndexRawCommand
    | AuxtaDefineDimensionRawCommand;



// --------------------------------------------------------------------------
// ----------------------------ADD COMMANDS --------------------------------
// --------------------------------------------------------------------------

export type AuxtaAddVectorRawCommand = AuxtaBaseRawCommand & {
    operation: 'ADD'; // The command type
    entity: 'vector';
    index: string;
    vector: AuxtaSerializedVector; // The vector data to be added
}


/**
 * Describes the query to search for vectors based on conditions.
 */
export type AuxtaAddRawCommand = AuxtaAddVectorRawCommand;



// --------------------------------------------------------------------------
// ----------------------------DROP COMMANDS --------------------------------
// --------------------------------------------------------------------------

export type AuxtaDropIndexRawCommand = AuxtaBaseRawCommand & {
    operation: 'DROP'; // The command type
    entity: 'index'
    index: string;
}

export type AuxtaDropDimensionRawCommand = AuxtaBaseRawCommand & {
    operation: 'DROP'; // The command type
    entity: 'dimension';
    index: string;
    id: string;
}

export type AuxtaDropVectorRawCommand = AuxtaBaseRawCommand & {
    operation: 'DROP'; // The command type
    entity: 'vector';
    index: string;
    id: string;
}

/**
 * Describes the query to search for vectors based on conditions.
 */
export type AuxtaDropRawCommand =
    AuxtaDropIndexRawCommand
    | AuxtaDropDimensionRawCommand
    | AuxtaDropVectorRawCommand;



/**
 * Describes the query to update a vector by its ID.
 */
export type AuxtaUpdateRawCommand = AuxtaBaseRawCommand & {
    id: string;
    vector: any;
}


export type AuxtaSearchRawCommand = AuxtaBaseRawCommand & {
    operation: 'SEARCH'; // The command type
    pick?: number;
    conditions: Record<string, AuxtaConditionWrapper | AuxtaLogicalGroup>;
}


/**
 * 
 * 
 * 
 *  Command Example: 
 *  
 *  {
 *    command: 'SEARCH',
 *    index: 'myIndex',
 *    pick: 20
 *    conditions {
 *       Dimension1: {
 *         AND: [ { value: { gte: 5 } }, { value: { lte: 25 } } ]
 *       },
 *       Dimension2: {
 *         OR: [ { value: { In: [1, 2, 3] } }, { value: { In: [4, 5, 6] } } ]
 *       },
 *       Dimension3: {
 *         NOT: { value: { In: [7, 8, 9] } }
 *       },
 *       Dimension4: {
 *         NOT: {
 *           AND: [
 *             { value: { gte: 5 } },
 *             { value: { lte: 25 } }
 *           ]
 *         }
 *       }
 *     }
 *  }
 */
export type AuxtaRawCommand =
    AuxtaBaseRawCommand
    | AuxtaGetRawCommand
    | AuxtaDefineRawCommand
    | AuxtaAddRawCommand
    | AuxtaUpdateRawCommand
    | AuxtaSearchRawCommand
    | AuxtaDropRawCommand;





//=================================================================================================
// ===============================COMMANDS RESPONSES START=========================================
//================================================================================================= 

export type AuxtaCommandBaseResponse = {
    operation: AuxtaDbOperations;
    entity: AuxtaDBEntity;
    index?: string; // The index to which the command applies, if applicable
}






export type AuxtaGetResponse = AuxtaCommandBaseResponse & {
    operation: 'GET'; // The command type
    index: string;
    definition?: AuxtaVectorDefinition | undefined; // The vector data retrieved
    entry?: AuxtaSerializedVector | undefined; // The vector data retrieved
}

export type AuxtaDefineIndexResponse = AuxtaCommandBaseResponse & {
    operation: 'DEFINE'; // The command type
    entity: 'index';
    index: string; // The name of the index defined
    definition: AuxtaIndexDefinition; // The index definition
}


export type AuxtaDefineDimensionResponse = AuxtaCommandBaseResponse & {
    operation: 'DEFINE'; // The command type
    entity: 'dimension';
    definition: AuxtaDimensionDefinition; // The dimension definition
}


export type AuxtaDefineResponse =
    AuxtaDefineIndexResponse
    | AuxtaDefineDimensionResponse;


export type AuxtaAddVectorResponse = AuxtaCommandBaseResponse & {
    operation: 'ADD'; // The command type
    entity: 'vector';
    index: string;
    definition?: AuxtaVectorDefinition; // The vector data added
    entry?: AuxtaSerializedVector; // The updated vector data
}
export type AuxtaAddResponse = AuxtaAddVectorResponse;

export type AuxtaDropIndexResponse = AuxtaCommandBaseResponse & {
    operation: 'DROP'; // The command type
    entity: 'index';
    index: string; // The name of the index dropped
}

export type AuxtaDropDimensionResponse = AuxtaCommandBaseResponse & {
    operation: 'DROP'; // The command type
    entity: 'dimension';
    index: string;
    id: string; // The ID of the dimension dropped
}

export type AuxtaDropVectorResponse = AuxtaCommandBaseResponse & {
    operation: 'DROP'; // The command type
    entity: 'vector';
    index: string;
    id: string; // The ID of the vector dropped
}

export type AuxtaDropResponse =
    AuxtaDropIndexResponse
    | AuxtaDropDimensionResponse
    | AuxtaDropVectorResponse;


export type AuxtaUpdateResponse = AuxtaCommandBaseResponse & {
    operation: 'UPDATE'; // The command type
    definition?: AuxtaVectorDefinition; // The updated vector data
    entry?: AuxtaSerializedVector; // The updated vector data
}

export type AuxtaSearchResponse = AuxtaCommandBaseResponse & {
    operation: 'SEARCH'; // The command type
    pick: number; // The number of vectors to pick
    definitions?: AuxtaVectorDefinition[]; // The search results
    entries?: AuxtaSerializedVector; // The updated vector data
}

export type AuxtaRawCommandResponse =
    AuxtaGetResponse
    | AuxtaDefineResponse
    | AuxtaAddResponse
    | AuxtaUpdateResponse
    | AuxtaSearchResponse
    | AuxtaDropResponse;

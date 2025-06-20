export * from './src/api/AuxtaClient.class';
export * from './src/api/AuxtaConnectionPool.class';
export * from './src/api/MessageCodec';

/**
 * Core Components
 * Provides the core classes for Auxta, including Auxta, AuxtaVector, and AuxtaDimension.
 * These classes are essential for defining and managing vectors, dimensions, and indexes in the Auxta
 */
export * from './src/core/Auxta';
export * from './src/core/AuxtaDimension';
export * from './src/core/AuxtaVector';
export * from './src/core/AuxtaIndex';
export * from './src/core/dimensions/AuxtaComputedDimension.class';
export * from './src/core/dimensions/AuxtaDynamicDimension.class';
export * from './src/core/dimensions/AuxtaStaticDimension.class';



/**
 * Constants
 * Provides global constants used throughout the Auxta library, including server settings and logging levels.
 */
export * from './src/constants/Global.constants';
export * from './src/constants/AuxtaClient.constants';
export * from './src/constants/AuxtaCommand.constants';
export * from './src/constants/AuxtaDimension.constants';
export * from './src/constants/AuxtaIndex.constants';
export * from './src/constants/AuxtaVector.constants';


/**
 * Decorators
 * Provides decorators for defining dimensions and indexes in Auxta vectors.
 */
export * from './src/decorators/Dimension.decorator';
export * from './src/decorators/Index.decorator';


/**
 * Lib Components 
 * Provides a set of base classes and utilities for building Auxta commands and conditions.
 * 
 */
export * from './src/lib/AuxtaBaseCommand.class';
export * from './src/lib/AuxtaCommand.class';
export * from './src/lib/AuxtaConditionBuilder.class';


/**
 * Commands
 * Provides a set of commands for interacting with the Auxta database, including adding, defining,
 * dropping, and searching vectors.
 */
export * from './src/lib/commands/AuxtaAdd.command';
export * from './src/lib/commands/AuxtaDefine.command';
export * from './src/lib/commands/AuxtaDrop.command';
export * from './src/lib/commands/AuxtaGet.command';
export * from './src/lib/commands/AuxtaSearch.command';
// export * from './src/lib/commands/AuxtaUpdate.command';



/**
 * Types
 * Provides TypeScript types and interfaces for Auxta components, including commands, vectors, dimensions,
 */
export * from './src/types/Auxta.types';
export * from './src/types/AuxtaClient.types';
export * from './src/types/AuxtaCommand.types';
export * from './src/types/AuxtaDimension.types';
export * from './src/types/AuxtaIndex.types';
export * from './src/types/AuxtaVector.types';      


/**
 * Errors 
 * Provides custom error classes for handling errors in Auxta operations.
 * These errors help in identifying issues related to commands, indexes, vectors, and dimensions.
 */
export * from './src/errors/AuxtaError.class';
export * from './src/errors/AuxtaCommand.error';
export * from './src/errors/AuxtaIndex.error';
export * from './src/errors/AuxtaVector.error';
export * from './src/errors/AuxtaDimension.error'; 


/**
 * Utils
 */
export * from './src/utils/Env.util';
export * from './src/utils/Logger.service';






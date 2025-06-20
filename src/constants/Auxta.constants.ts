

export const AuxtaErrorCodes = {
    METHOD_NOT_IMPLEMENTED: 'AuxtaError.methodNotImplemented',
    INVALID_CONFIG: 'AuxtaError.invalidConfig',
    COMMAND_NOT_IMPLEMENTED: 'AuxtaError.commandNotImplemented',
    COMMAND_INVALID: 'AuxtaError.commandInvalid',
    COMMAND_EXECUTION_FAILED: 'AuxtaError.commandExecutionFailed',
    SYNCHRONIZATION_ERROR: 'AuxtaError.synchronizationError',
    INITIALIZATION_ERROR: 'AuxtaError.initializationError',
    ECONNREFUSED: 'AuxtaError.econnrefused',
} as const;
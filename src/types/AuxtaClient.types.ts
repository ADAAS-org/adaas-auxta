import { AuxtaServerAction } from "@auxta/constants/AuxtaClient.constants";
import { AuxtaRawCommandResponse } from "./AuxtaCommand.types";

/**
 * Represents a request to the Auxta server.
 */
export interface AuxtaServerRequest {

    headers: {
        /**
         * The action being requested.
         * This is a string that specifies the action to be performed by the server.
         */
        action: AuxtaServerAction;
        /**
         * The authentication token for the request.
         * This token is used to authenticate the client with the Auxta server.
         */
        token: string;
        /**
         * The version of the Auxta client making the request.
         * This helps the server understand which version of the client is being used.
         */
        version: string;
        /**
         * The client making the request.
         * This can be a string representing the name of the client application.
         */
        client: string;
    }

    /**
     * The command to be executed.
     * This is an object that contains the details of the command to be performed by the server.
     */
    commands: Array<object>;
}


/**
 * Represents the response from the Auxta server.
 */
export interface AuxtaServerResponse {
    version: string;
    client: string;
    data: AuxtaRawCommandResponse[] | AuxtaRawCommandResponse;
    action: string;
}
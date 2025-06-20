import { GLOBAL_CONSTANTS } from "@auxta/constants/Global.constants";

export class AuxtaLogger {


    private static getTimestamp(): string {
        return new Date().toISOString();
    }

    private static shouldLog(level: string): boolean {
        return level === 'info' && GLOBAL_CONSTANTS.LOGGING.LEVEL === 'info' ||
            level === 'warn' && (GLOBAL_CONSTANTS.LOGGING.LEVEL === 'info' || GLOBAL_CONSTANTS.LOGGING.LEVEL === 'warn') ||
            level === 'error' && (GLOBAL_CONSTANTS.LOGGING.LEVEL === 'info' || GLOBAL_CONSTANTS.LOGGING.LEVEL === 'warn' || GLOBAL_CONSTANTS.LOGGING.LEVEL === 'error');
    }

    private static formatOutput(level: string, color: string, ...args: any[]) {
        if (!AuxtaLogger.shouldLog(level)) return;

        const RESET = '\x1b[0m';
        const timestamp = AuxtaLogger.getTimestamp();
        const prefix = `${color}[${timestamp}] [${level.toUpperCase()}]${RESET}`;
        console.log(prefix, ...args);
    }

    static info(...args: any[]) {
        AuxtaLogger.formatOutput('info', '\x1b[36m', ...args); // Cyan
    }

    static warn(...args: any[]) {
        AuxtaLogger.formatOutput('warn', '\x1b[33m', ...args); // Yellow
    }

    static error(...args: any[]) {
        AuxtaLogger.formatOutput('error', '\x1b[31m', ...args); // Red
    }

    static startupBanner({
        name,
        version,
        port,
        host,
    }: {
        name: string;
        version: string;
        port: number;
        host: string;
    }) {

        const RESET = '\x1b[0m';
        const BRIGHT = '\x1b[1m';
        const CYAN = '\x1b[36m';
        const MAGENTA = '\x1b[35m';
        const GREEN = '\x1b[32m';
        const YELLOW = '\x1b[33m';
        const BLUE = '\x1b[34m';
        const WHITE = '\x1b[37m';

        const border = `${MAGENTA}|==============================================${RESET}`;
        const url = `http://${host}:${port}`;

        console.log(border);
        console.log(`${MAGENTA}||  `);
        console.log(`${MAGENTA}||  ${CYAN}${BRIGHT}🚀 ${name}${RESET}`);
        console.log(`${MAGENTA}||  ${YELLOW}   Version: ${GREEN}${version}${RESET}`);
        console.log(`${MAGENTA}||  ${YELLOW}   Listening on port: ${GREEN}${port}${RESET}`);
        console.log(`${MAGENTA}||  ${BLUE}   Host: ${WHITE}${host}${RESET}`);
        console.log(`${MAGENTA}||  ${BLUE}   Open in browser: ${WHITE}${url}${RESET}`);
        console.log(`${MAGENTA}||  ${WHITE}   Started at: ${GREEN}${AuxtaLogger.getTimestamp()}${RESET}`);
        console.log(`${MAGENTA}||  `);
        console.log(`${MAGENTA}||  ${BRIGHT}${GREEN}Welcome to the ${name} TCP Server!${RESET}`);
        console.log(`${MAGENTA}||  ${WHITE}Ready to accept Auxta connections...${RESET}`);
        console.log(`${MAGENTA}||  `);
        console.log(border);
    }
}

import * as fs from 'fs';
import * as path from 'path';
import { AuxtaLogger } from './Logger.service';

export class EnvUtil {
    static load(envPath: string = '.env') {
        const absolutePath = path.resolve(process.cwd(), envPath);

        if (!fs.existsSync(absolutePath)) {
            AuxtaLogger.warn(`[env-loader] No .env file found at ${absolutePath}`);
            return;
        }

        const content = fs.readFileSync(absolutePath, 'utf-8');

        content.split('\n').forEach((line) => {
            const trimmed = line.trim();

            if (!trimmed || trimmed.startsWith('#')) return;

            const eqIndex = trimmed.indexOf('=');
            if (eqIndex === -1) return;

            const key = trimmed.slice(0, eqIndex).trim();
            const value = trimmed.slice(eqIndex + 1).trim().replace(/^['"]|['"]$/g, '');

            if (!process.env.hasOwnProperty(key)) {
                process.env[key] = value;
            }
        });
    }
}

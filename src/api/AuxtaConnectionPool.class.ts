import { TCPClient } from './AuxtaClient.class';

interface PoolOptions {
    size: number;
    host: string;
    port: number;
}

export class ConnectionPool {
    private pool: TCPClient[] = [];
    private inUse: Set<TCPClient> = new Set();
    private queue: ((client: TCPClient) => void)[] = [];

    constructor(private options: PoolOptions) { }

    async init() {
        for (let i = 0; i < this.options.size; i++) {
            const client = new TCPClient(this.options.host, this.options.port);
            await client.connect();
            this.pool.push(client);
        }
    }

    async acquire(): Promise<TCPClient> {
        const available = this.pool.find(c => !this.inUse.has(c) && c.isConnected());
        if (available) {
            this.inUse.add(available);
            return available;
        }

        return new Promise(resolve => {
            this.queue.push((client) => {
                this.inUse.add(client);
                resolve(client);
            });
        });
    }

    release(client: TCPClient) {
        if (this.inUse.has(client)) {
            this.inUse.delete(client);
            if (this.queue.length > 0) {
                const next = this.queue.shift();
                if (next) next(client);
            }
        }
    }

    async shutdown() {
        for (const client of this.pool) {
            client.disconnect();
        }
    }
}

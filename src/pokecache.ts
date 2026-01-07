export type CacheEntry<T> = {
    createdAt: number;
    val: T;
}

export class Cache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    constructor(interval: number) {
        this.#interval = interval;
        this.#startReapLoop();
    }

    add<T>(key:string, val: T) {
        this.#cache.set(key, {
            createdAt: Date.now(),
            val: val,
        });
    }

    get<T>(key: string) {
        return this.#cache.get(key) as CacheEntry<T> | undefined;
    }
  
    #reap() {
        this.#cache.forEach((entry, key) => {
            if (entry.createdAt + this.#interval < Date.now()) {
                this.#cache.delete(key);
            }
        });
    }

    #startReapLoop() {
        this.#reapIntervalId = setInterval(() => {
            this.#reap();
        }, this.#interval);
    }

    stopReapLoop() {
        if (this.#reapIntervalId) {
            clearInterval(this.#reapIntervalId);
            this.#reapIntervalId = undefined;
        };
    }
  }
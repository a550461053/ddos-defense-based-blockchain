/// <reference types="node" />
import { AsyncKeyValueROTransaction, AsyncKeyValueRWTransaction, AsyncKeyValueStore, AsyncKeyValueFileSystem } from '../generic/key_value_filesystem';
import { ApiError } from '../core/api_error';
export declare class IndexedDBROTransaction implements AsyncKeyValueROTransaction {
    tx: IDBTransaction;
    store: IDBObjectStore;
    constructor(tx: IDBTransaction, store: IDBObjectStore);
    get(key: string, cb: (e: ApiError, data?: Buffer) => void): void;
}
export declare class IndexedDBRWTransaction extends IndexedDBROTransaction implements AsyncKeyValueRWTransaction, AsyncKeyValueROTransaction {
    constructor(tx: IDBTransaction, store: IDBObjectStore);
    put(key: string, data: Buffer, overwrite: boolean, cb: (e: ApiError, committed?: boolean) => void): void;
    del(key: string, cb: (e?: ApiError) => void): void;
    commit(cb: (e?: ApiError) => void): void;
    abort(cb: (e?: ApiError) => void): void;
}
export declare class IndexedDBStore implements AsyncKeyValueStore {
    private storeName;
    private db;
    /**
     * Constructs an IndexedDB file system.
     * @param cb Called once the database is instantiated and ready for use.
     *   Passes an error if there was an issue instantiating the database.
     * @param objectStoreName The name of this file system. You can have
     *   multiple IndexedDB file systems operating at once, but each must have
     *   a different name.
     */
    constructor(cb: (e: ApiError, store?: IndexedDBStore) => void, storeName?: string);
    name(): string;
    clear(cb: (e?: ApiError) => void): void;
    beginTransaction(type: 'readonly'): AsyncKeyValueROTransaction;
    beginTransaction(type: 'readwrite'): AsyncKeyValueRWTransaction;
}
/**
 * A file system that uses the IndexedDB key value file system.
 */
export default class IndexedDBFileSystem extends AsyncKeyValueFileSystem {
    static isAvailable(): boolean;
    constructor(cb: (e: ApiError, fs?: IndexedDBFileSystem) => void, storeName?: string);
}

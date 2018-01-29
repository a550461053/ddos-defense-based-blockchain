/**
 * Non-recursive mutex
 */
export default class Mutex {
    private _locked;
    private _waiters;
    lock(cb: Function): void;
    unlock(): void;
    tryLock(): boolean;
    isLocked(): boolean;
}

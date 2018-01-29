/// <reference types="filesystem" />
/// <reference types="node" />
import PreloadFile from '../generic/preload_file';
import { BaseFileSystem, FileSystem as IFileSystem } from '../core/file_system';
import { ApiError } from '../core/api_error';
import { FileFlag } from '../core/file_flag';
import { default as Stats } from '../core/node_fs_stats';
import { File as IFile } from '../core/file';
export declare class HTML5FSFile extends PreloadFile<HTML5FS> implements IFile {
    private _entry;
    constructor(fs: HTML5FS, entry: FileEntry, path: string, flag: FileFlag, stat: Stats, contents?: Buffer);
    sync(cb: (e?: ApiError) => void): void;
    close(cb: (e?: ApiError) => void): void;
}
export default class HTML5FS extends BaseFileSystem implements IFileSystem {
    static isAvailable(): boolean;
    fs: FileSystem;
    private size;
    private type;
    /**
     * Arguments:
     *   - type: PERSISTENT or TEMPORARY
     *   - size: storage quota to request, in megabytes. Allocated value may be less.
     */
    constructor(size?: number, type?: number);
    getName(): string;
    isReadOnly(): boolean;
    supportsSymlinks(): boolean;
    supportsProps(): boolean;
    supportsSynch(): boolean;
    /**
     * Nonstandard
     * Requests a storage quota from the browser to back this FS.
     */
    allocate(cb?: (e?: ApiError) => void): void;
    /**
     * Nonstandard
     * Deletes everything in the FS. Used for testing.
     * Karma clears the storage after you quit it but not between runs of the test
     * suite, and the tests expect an empty FS every time.
     */
    empty(mainCb: (e?: ApiError) => void): void;
    rename(oldPath: string, newPath: string, cb: (e?: ApiError) => void): void;
    stat(path: string, isLstat: boolean, cb: (err: ApiError, stat?: Stats) => void): void;
    open(p: string, flags: FileFlag, mode: number, cb: (err: ApiError, fd?: IFile) => any): void;
    unlink(path: string, cb: (e?: ApiError) => void): void;
    rmdir(path: string, cb: (e?: ApiError) => void): void;
    mkdir(path: string, mode: number, cb: (e?: ApiError) => void): void;
    /**
     * Map _readdir's list of `FileEntry`s to their names and return that.
     */
    readdir(path: string, cb: (err: ApiError, files?: string[]) => void): void;
    /**
     * Returns a BrowserFS object representing a File, created from the data
     * returned by calls to the Dropbox API.
     */
    private _makeFile(path, entry, flag, stat, data?);
    /**
     * Returns an array of `FileEntry`s. Used internally by empty and readdir.
     */
    private _readdir(path, cb);
    /**
     * Delete a file or directory from the file system
     * isFile should reflect which call was made to remove the it (`unlink` or
     * `rmdir`). If this doesn't match what's actually at `path`, an error will be
     * returned
     */
    private _remove(path, cb, isFile);
}

/// <reference types="node" />
/// <reference types="dropboxjs" />
import PreloadFile from '../generic/preload_file';
import { BaseFileSystem, FileSystem } from '../core/file_system';
import { FileFlag } from '../core/file_flag';
import { default as Stats, FileType } from '../core/node_fs_stats';
import { ApiError } from '../core/api_error';
import { File } from '../core/file';
export declare class DropboxFile extends PreloadFile<DropboxFileSystem> implements File {
    constructor(_fs: DropboxFileSystem, _path: string, _flag: FileFlag, _stat: Stats, contents?: Buffer);
    sync(cb: (e?: ApiError) => void): void;
    close(cb: (e?: ApiError) => void): void;
}
export default class DropboxFileSystem extends BaseFileSystem implements FileSystem {
    static isAvailable(): boolean;
    private _client;
    /**
     * Arguments: an authenticated Dropbox.js client
     */
    constructor(client: Dropbox.Client);
    getName(): string;
    isReadOnly(): boolean;
    supportsSymlinks(): boolean;
    supportsProps(): boolean;
    supportsSynch(): boolean;
    empty(mainCb: (e?: ApiError) => void): void;
    rename(oldPath: string, newPath: string, cb: (e?: ApiError) => void): void;
    stat(path: string, isLstat: boolean, cb: (err: ApiError, stat?: Stats) => void): void;
    open(path: string, flags: FileFlag, mode: number, cb: (err: ApiError, fd?: File) => any): void;
    _writeFileStrict(p: string, data: ArrayBuffer, cb: (e: ApiError, stat?: Dropbox.File.Stat) => void): void;
    /**
     * Private
     * Returns a BrowserFS object representing the type of a Dropbox.js stat object
     */
    _statType(stat: Dropbox.File.Stat): FileType;
    /**
     * Private
     * Returns a BrowserFS object representing a File, created from the data
     * returned by calls to the Dropbox API.
     */
    _makeFile(path: string, flag: FileFlag, stat: Dropbox.File.Stat, buffer: Buffer): DropboxFile;
    /**
     * Private
     * Delete a file or directory from Dropbox
     * isFile should reflect which call was made to remove the it (`unlink` or
     * `rmdir`). If this doesn't match what's actually at `path`, an error will be
     * returned
     */
    _remove(path: string, cb: (e?: ApiError) => void, isFile: boolean): void;
    /**
     * Delete a file
     */
    unlink(path: string, cb: (e?: ApiError) => void): void;
    /**
     * Delete a directory
     */
    rmdir(path: string, cb: (e?: ApiError) => void): void;
    /**
     * Create a directory
     */
    mkdir(p: string, mode: number, cb: (e?: ApiError) => void): void;
    /**
     * Get the names of the files in a directory
     */
    readdir(path: string, cb: (err: ApiError, files?: string[]) => void): void;
    /**
     * Converts a Dropbox-JS error into a BFS error.
     */
    convert(err: Dropbox.ApiError, path?: string): ApiError;
}

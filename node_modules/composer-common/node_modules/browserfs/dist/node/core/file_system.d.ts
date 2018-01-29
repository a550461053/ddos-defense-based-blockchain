/// <reference types="node" />
import { ApiError } from './api_error';
import Stats from './node_fs_stats';
import { File, BaseFile } from './file';
import { FileFlag } from './file_flag';
/**
 * Interface for a filesystem. **All** BrowserFS FileSystems should implement
 * this interface.
 *
 * Below, we denote each API method as **Core**, **Supplemental**, or
 * **Optional**.
 *
 * ### Core Methods
 *
 * **Core** API methods *need* to be implemented for basic read/write
 * functionality.
 *
 * Note that read-only FileSystems can choose to not implement core methods
 * that mutate files or metadata. The default implementation will pass a
 * NOT_SUPPORTED error to the callback.
 *
 * ### Supplemental Methods
 *
 * **Supplemental** API methods do not need to be implemented by a filesystem.
 * The default implementation implements all of the supplemental API methods in
 * terms of the **core** API methods.
 *
 * Note that a file system may choose to implement supplemental methods for
 * efficiency reasons.
 *
 * The code for some supplemental methods was adapted directly from NodeJS's
 * fs.js source code.
 *
 * ### Optional Methods
 *
 * **Optional** API methods provide functionality that may not be available in
 * all filesystems. For example, all symlink/hardlink-related API methods fall
 * under this category.
 *
 * The default implementation will pass a NOT_SUPPORTED error to the callback.
 *
 * ### Argument Assumptions
 *
 * You can assume the following about arguments passed to each API method:
 *
 * * **Every path is an absolute path.** Meaning, `.`, `..`, and other items
 *   are resolved into an absolute form.
 * * **All arguments are present.** Any optional arguments at the Node API level
 *   have been passed in with their default values.
 * * **The callback will reset the stack depth.** When your filesystem calls the
 *   callback with the requested information, it will use `setImmediate` to
 *   reset the JavaScript stack depth before calling the user-supplied callback.
 * @class FileSystem
 */
export interface FileSystem {
    /**
     * **Optional**: Returns the name of the file system.
     * @method FileSystem#getName
     * @return {string}
     */
    getName(): string;
    /**
     * **Optional**: Passes the following information to the callback:
     *
     * * Total number of bytes available on this file system.
     * * number of free bytes available on this file system.
     *
     * @method FileSystem#diskSpace
     * @todo This info is not available through the Node API. Perhaps we could do a
     *   polyfill of diskspace.js, or add a new Node API function.
     * @param {string} path The path to the location that is being queried. Only
     *   useful for filesystems that support mount points.
     * @param {FileSystem~diskSpaceCallback} cb
     */
    diskSpace(p: string, cb: (total: number, free: number) => any): void;
    /**
     * **Core**: Is this filesystem read-only?
     * @method FileSystem#isReadOnly
     * @return {boolean} True if this FileSystem is inherently read-only.
     */
    isReadOnly(): boolean;
    /**
     * **Core**: Does the filesystem support optional symlink/hardlink-related
     *   commands?
     * @method FileSystem#supportsLinks
     * @return {boolean} True if the FileSystem supports the optional
     *   symlink/hardlink-related commands.
     */
    supportsLinks(): boolean;
    /**
     * **Core**: Does the filesystem support optional property-related commands?
     * @method FileSystem#supportsProps
     * @return {boolean} True if the FileSystem supports the optional
     *   property-related commands (permissions, utimes, etc).
     */
    supportsProps(): boolean;
    /**
     * **Core**: Does the filesystem support the optional synchronous interface?
     * @method FileSystem#supportsSynch
     * @return {boolean} True if the FileSystem supports synchronous operations.
     */
    supportsSynch(): boolean;
    /**
     * **Core**: Asynchronous rename. No arguments other than a possible exception
     * are given to the completion callback.
     * @method FileSystem#rename
     * @param {string} oldPath
     * @param {string} newPath
     * @param {FileSystem~nodeCallback} cb
     */
    rename(oldPath: string, newPath: string, cb: (err?: ApiError) => void): void;
    /**
     * **Core**: Synchronous rename.
     * @method FileSystem#renameSync
     * @param {string} oldPath
     * @param {string} newPath
     */
    renameSync(oldPath: string, newPath: string): void;
    /**
     * **Core**: Asynchronous `stat` or `lstat`.
     * @method FileSystem#stat
     * @param {string} path
     * @param {boolean} isLstat True if this is `lstat`, false if this is regular
     *   `stat`.
     * @param {FileSystem~nodeStatsCallback} cb
     */
    stat(p: string, isLstat: boolean, cb: (err: ApiError, stat?: Stats) => void): void;
    /**
     * **Core**: Synchronous `stat` or `lstat`.
     * @method FileSystem#statSync
     * @param {string} path
     * @param {boolean} isLstat True if this is `lstat`, false if this is regular
     *   `stat`.
     * @return {BrowserFS.node.fs.Stats}
     */
    statSync(p: string, isLstat: boolean): Stats;
    /**
     * **Core**: Asynchronous file open.
     * @see http://www.manpagez.com/man/2/open/
     * @method FileSystem#open
     * @param {string} path
     * @param {BrowserFS.FileMode} flags Handles the complexity of the various file
     *   modes. See its API for more details.
     * @param {number} mode Mode to use to open the file. Can be ignored if the
     *   filesystem doesn't support permissions.
     * @param {FileSystem~fileCallback} cb
     */
    open(p: string, flag: FileFlag, mode: number, cb: (err: ApiError, fd?: File) => any): void;
    /**
     * **Core**: Synchronous file open.
     * @see http://www.manpagez.com/man/2/open/
     * @method FileSystem#openSync
     * @param {string} path
     * @param {BrowserFS.FileMode} flags Handles the complexity of the various file
     *   modes. See its API for more details.
     * @param {number} mode Mode to use to open the file. Can be ignored if the
     *   filesystem doesn't support permissions.
     * @return {BrowserFS.File}
     */
    openSync(p: string, flag: FileFlag, mode: number): File;
    /**
     * **Core**: Asynchronous `unlink`.
     * @method FileSystem#unlink
     * @param [string] path
     * @param [FileSystem~nodeCallback] cb
     */
    unlink(p: string, cb: (e?: ApiError) => void): void;
    /**
     * **Core**: Synchronous `unlink`.
     * @method FileSystem#unlinkSync
     * @param {string} path
     */
    unlinkSync(p: string): void;
    /**
     * **Core**: Asynchronous `rmdir`.
     * @method FileSystem#rmdir
     * @param {string} path
     * @param {FileSystem~nodeCallback} cb
     */
    rmdir(p: string, cb: (e?: ApiError) => void): void;
    /**
     * **Core**: Synchronous `rmdir`.
     * @method FileSystem#rmdirSync
     * @param {string} path
     */
    rmdirSync(p: string): void;
    /**
     * **Core**: Asynchronous `mkdir`.
     * @method FileSystem#mkdir
     * @param {string} path
     * @param {number?} mode Mode to make the directory using. Can be ignored if
     *   the filesystem doesn't support permissions.
     * @param {FileSystem~nodeCallback} cb
     */
    mkdir(p: string, mode: number, cb: (e?: ApiError) => void): void;
    /**
     * **Core**: Synchronous `mkdir`.
     * @method FileSystem#mkdirSync
     * @param {string} path
     * @param {number} mode Mode to make the directory using. Can be ignored if
     *   the filesystem doesn't support permissions.
     */
    mkdirSync(p: string, mode: number): void;
    /**
     * **Core**: Asynchronous `readdir`. Reads the contents of a directory.
     *
     * The callback gets two arguments `(err, files)` where `files` is an array of
     * the names of the files in the directory excluding `'.'` and `'..'`.
     * @method FileSystem#readdir
     * @param {string} path
     * @param {FileSystem~readdirCallback} cb
     */
    readdir(p: string, cb: (err: ApiError, files?: string[]) => void): void;
    /**
     * **Core**: Synchronous `readdir`. Reads the contents of a directory.
     * @method FileSystem#readdirSync
     * @param {string} path
     * @return {string[]}
     */
    readdirSync(p: string): string[];
    /**
     * **Supplemental**: Test whether or not the given path exists by checking with
     * the file system. Then call the callback argument with either true or false.
     * @method FileSystem#exists
     * @param {string} path
     * @param {FileSystem~existsCallback} cb
     */
    exists(p: string, cb: (exists: boolean) => void): void;
    /**
     * **Supplemental**: Test whether or not the given path exists by checking with
     * the file system.
     * @method FileSystem#existsSync
     * @param {string} path
     * @return {boolean}
     */
    existsSync(p: string): boolean;
    /**
     * **Supplemental**: Asynchronous `realpath`. The callback gets two arguments
     * `(err, resolvedPath)`.
     *
     * Note that the Node API will resolve `path` to an absolute path.
     * @method FileSystem#realpath
     * @param {string} path
     * @param {Object} cache An object literal of mapped paths that can be used to
     *   force a specific path resolution or avoid additional `fs.stat` calls for
     *   known real paths. If not supplied by the user, it'll be an empty object.
     * @param {FileSystem~pathCallback} cb
     */
    realpath(p: string, cache: {
        [path: string]: string;
    }, cb: (err: ApiError, resolvedPath?: string) => any): void;
    /**
     * **Supplemental**: Synchronous `realpath`.
     *
     * Note that the Node API will resolve `path` to an absolute path.
     * @method FileSystem#realpathSync
     * @param {string} path
     * @param {Object} cache An object literal of mapped paths that can be used to
     *   force a specific path resolution or avoid additional `fs.stat` calls for
     *   known real paths. If not supplied by the user, it'll be an empty object.
     * @return {string}
     */
    realpathSync(p: string, cache: {
        [path: string]: string;
    }): string;
    /**
     *
     * **Supplemental**: Asynchronous `truncate`.
     * @method FileSystem#truncate
     * @param {string} path
     * @param {number} len
     * @param {FileSystem~nodeCallback} cb
     */
    truncate(p: string, len: number, cb: (e?: ApiError) => void): void;
    /**
     * **Supplemental**: Synchronous `truncate`.
     * @method FileSystem#truncateSync
     * @param {string} path
     * @param {number} len
     */
    truncateSync(p: string, len: number): void;
    /**
     * **Supplemental**: Asynchronously reads the entire contents of a file.
     * @method FileSystem#readFile
     * @param {string} filename
     * @param {string} encoding If non-null, the file's contents should be decoded
     *   into a string using that encoding. Otherwise, if encoding is null, fetch
     *   the file's contents as a Buffer.
     * @param {BrowserFS.FileMode} flag
     * @param {FileSystem~readCallback} cb If no encoding is specified, then the
     *   raw buffer is returned.
     */
    readFile(fname: string, encoding: string | null, flag: FileFlag, cb: (err: ApiError, data?: any) => void): void;
    /**
     * **Supplemental**: Synchronously reads the entire contents of a file.
     * @method FileSystem#readFileSync
     * @param {string} filename
     * @param {string} encoding If non-null, the file's contents should be decoded
     *   into a string using that encoding. Otherwise, if encoding is null, fetch
     *   the file's contents as a Buffer.
     * @param {BrowserFS.FileMode} flag
     * @return {(string|BrowserFS.Buffer)}
     */
    readFileSync(fname: string, encoding: string, flag: FileFlag): any;
    /**
     * **Supplemental**: Asynchronously writes data to a file, replacing the file
     * if it already exists.
     *
     * The encoding option is ignored if data is a buffer.
     * @method FileSystem#writeFile
     * @param {string} filename
     * @param {(string | BrowserFS.node.Buffer)} data
     * @param {string} encoding
     * @param {BrowserFS.FileMode} flag
     * @param {number} mode
     * @param {FileSystem~nodeCallback} cb
     */
    writeFile(fname: string, data: any, encoding: string, flag: FileFlag, mode: number, cb: (err: ApiError) => void): void;
    /**
     * **Supplemental**: Synchronously writes data to a file, replacing the file
     * if it already exists.
     *
     * The encoding option is ignored if data is a buffer.
     * @method FileSystem#writeFileSync
     * @param {string} filename
     * @param {(string | BrowserFS.node.Buffer)} data
     * @param {string} encoding
     * @param {BrowserFS.FileMode} flag
     * @param {number} mode
     */
    writeFileSync(fname: string, data: string | Buffer, encoding: string | null, flag: FileFlag, mode: number): void;
    /**
     * **Supplemental**: Asynchronously append data to a file, creating the file if
     * it not yet exists.
     * @method FileSystem#appendFile
     * @param {string} filename
     * @param {(string | BrowserFS.node.Buffer)} data
     * @param {string} encoding
     * @param {BrowserFS.FileMode} flag
     * @param {number} mode
     * @param {FileSystem~nodeCallback} cb
     */
    appendFile(fname: string, data: string | Buffer, encoding: string | null, flag: FileFlag, mode: number, cb: (err: ApiError) => void): void;
    /**
     * **Supplemental**: Synchronously append data to a file, creating the file if
     * it not yet exists.
     * @method FileSystem#appendFileSync
     * @param {string} filename
     * @param {(string | BrowserFS.node.Buffer)} data
     * @param {string} encoding
     * @param {BrowserFS.FileMode} flag
     * @param {number} mode
     */
    appendFileSync(fname: string, data: string | Buffer, encoding: string | null, flag: FileFlag, mode: number): void;
    /**
     * **Optional**: Asynchronous `chmod` or `lchmod`.
     * @method FileSystem#chmod
     * @param {string} path
     * @param {boolean} isLchmod `True` if `lchmod`, false if `chmod`. Has no
     *   bearing on result if links aren't supported.
     * @param {number} mode
     * @param {FileSystem~nodeCallback} cb
     */
    chmod(p: string, isLchmod: boolean, mode: number, cb: (e?: ApiError) => void): void;
    /**
     * **Optional**: Synchronous `chmod` or `lchmod`.
     * @method FileSystem#chmodSync
     * @param {string} path
     * @param {boolean} isLchmod `True` if `lchmod`, false if `chmod`. Has no
     *   bearing on result if links aren't supported.
     * @param {number} mode
     */
    chmodSync(p: string, isLchmod: boolean, mode: number): void;
    /**
     * **Optional**: Asynchronous `chown` or `lchown`.
     * @method FileSystem#chown
     * @param {string} path
     * @param {boolean} isLchown `True` if `lchown`, false if `chown`. Has no
     *   bearing on result if links aren't supported.
     * @param {number} uid
     * @param {number} gid
     * @param {FileSystem~nodeCallback} cb
     */
    chown(p: string, isLchown: boolean, uid: number, gid: number, cb: (e?: ApiError) => void): void;
    /**
     * **Optional**: Synchronous `chown` or `lchown`.
     * @method FileSystem#chownSync
     * @param {string} path
     * @param {boolean} isLchown `True` if `lchown`, false if `chown`. Has no
     *   bearing on result if links aren't supported.
     * @param {number} uid
     * @param {number} gid
     */
    chownSync(p: string, isLchown: boolean, uid: number, gid: number): void;
    /**
     * **Optional**: Change file timestamps of the file referenced by the supplied
     * path.
     * @method FileSystem#utimes
     * @param {string} path
     * @param {Date} atime
     * @param {Date} mtime
     * @param {FileSystem~nodeCallback} cb
     */
    utimes(p: string, atime: Date, mtime: Date, cb: (e?: ApiError) => void): void;
    /**
     * **Optional**: Change file timestamps of the file referenced by the supplied
     * path.
     * @method FileSystem#utimesSync
     * @param {string} path
     * @param {Date} atime
     * @param {Date} mtime
     */
    utimesSync(p: string, atime: Date, mtime: Date): void;
    /**
     * **Optional**: Asynchronous `link`.
     * @method FileSystem#link
     * @param {string} srcpath
     * @param {string} dstpath
     * @param {FileSystem~nodeCallback} cb
     */
    link(srcpath: string, dstpath: string, cb: (e?: ApiError) => void): void;
    /**
     * **Optional**: Synchronous `link`.
     * @method FileSystem#linkSync
     * @param {string} srcpath
     * @param {string} dstpath
     */
    linkSync(srcpath: string, dstpath: string): void;
    /**
     * **Optional**: Asynchronous `symlink`.
     * @method FileSystem#symlink
     * @param {string} srcpath
     * @param {string} dstpath
     * @param {string} type can be either `'dir'` or `'file'`
     * @param {FileSystem~nodeCallback} cb
     */
    symlink(srcpath: string, dstpath: string, type: string, cb: (e?: ApiError) => void): void;
    /**
     * **Optional**: Synchronous `symlink`.
     * @method FileSystem#symlinkSync
     * @param {string} srcpath
     * @param {string} dstpath
     * @param {string} type can be either `'dir'` or `'file'`
     */
    symlinkSync(srcpath: string, dstpath: string, type: string): void;
    /**
     * **Optional**: Asynchronous readlink.
     * @method FileSystem#readlink
     * @param {string} path
     * @param {FileSystem~pathCallback} callback
     */
    readlink(p: string, cb: (e: ApiError, p?: string) => void): void;
    /**
     * **Optional**: Synchronous readlink.
     * @method FileSystem#readlinkSync
     * @param {string} path
     */
    readlinkSync(p: string): string;
}
/**
 * Contains typings for static functions on the file system constructor.
 */
export interface FileSystemConstructor {
    /**
     * **Core**: Returns 'true' if this filesystem is available in the current
     * environment. For example, a `localStorage`-backed filesystem will return
     * 'false' if the browser does not support that API.
     *
     * Defaults to 'false', as the FileSystem base class isn't usable alone.
     * @method FileSystem.isAvailable
     * @return {boolean}
     */
    isAvailable(): boolean;
}
/**
 * Basic filesystem class. Most filesystems should extend this class, as it
 * provides default implementations for a handful of methods.
 */
export declare class BaseFileSystem {
    supportsLinks(): boolean;
    diskSpace(p: string, cb: (total: number, free: number) => any): void;
    /**
     * Opens the file at path p with the given flag. The file must exist.
     * @param p The path to open.
     * @param flag The flag to use when opening the file.
     */
    openFile(p: string, flag: FileFlag, cb: (e: ApiError, file?: File) => void): void;
    /**
     * Create the file at path p with the given mode. Then, open it with the given
     * flag.
     */
    createFile(p: string, flag: FileFlag, mode: number, cb: (e: ApiError, file?: File) => void): void;
    open(p: string, flag: FileFlag, mode: number, cb: (err: ApiError, fd?: BaseFile) => any): void;
    rename(oldPath: string, newPath: string, cb: (err?: ApiError) => void): void;
    renameSync(oldPath: string, newPath: string): void;
    stat(p: string, isLstat: boolean, cb: (err: ApiError, stat?: Stats) => void): void;
    statSync(p: string, isLstat: boolean): Stats;
    /**
     * Opens the file at path p with the given flag. The file must exist.
     * @param p The path to open.
     * @param flag The flag to use when opening the file.
     * @return A File object corresponding to the opened file.
     */
    openFileSync(p: string, flag: FileFlag, mode: number): File;
    /**
     * Create the file at path p with the given mode. Then, open it with the given
     * flag.
     */
    createFileSync(p: string, flag: FileFlag, mode: number): File;
    openSync(p: string, flag: FileFlag, mode: number): File;
    unlink(p: string, cb: Function): void;
    unlinkSync(p: string): void;
    rmdir(p: string, cb: Function): void;
    rmdirSync(p: string): void;
    mkdir(p: string, mode: number, cb: Function): void;
    mkdirSync(p: string, mode: number): void;
    readdir(p: string, cb: (err: ApiError, files?: string[]) => void): void;
    readdirSync(p: string): string[];
    exists(p: string, cb: (exists: boolean) => void): void;
    existsSync(p: string): boolean;
    realpath(p: string, cache: {
        [path: string]: string;
    }, cb: (err: ApiError, resolvedPath?: string) => any): void;
    realpathSync(p: string, cache: {
        [path: string]: string;
    }): string;
    truncate(p: string, len: number, cb: Function): void;
    truncateSync(p: string, len: number): void;
    readFile(fname: string, encoding: string, flag: FileFlag, cb: (err: ApiError, data?: any) => void): void;
    readFileSync(fname: string, encoding: string, flag: FileFlag): any;
    writeFile(fname: string, data: any, encoding: string, flag: FileFlag, mode: number, cb: (err: ApiError) => void): void;
    writeFileSync(fname: string, data: any, encoding: string, flag: FileFlag, mode: number): void;
    appendFile(fname: string, data: any, encoding: string, flag: FileFlag, mode: number, cb: (err: ApiError) => void): void;
    appendFileSync(fname: string, data: any, encoding: string, flag: FileFlag, mode: number): void;
    chmod(p: string, isLchmod: boolean, mode: number, cb: Function): void;
    chmodSync(p: string, isLchmod: boolean, mode: number): void;
    chown(p: string, isLchown: boolean, uid: number, gid: number, cb: Function): void;
    chownSync(p: string, isLchown: boolean, uid: number, gid: number): void;
    utimes(p: string, atime: Date, mtime: Date, cb: Function): void;
    utimesSync(p: string, atime: Date, mtime: Date): void;
    link(srcpath: string, dstpath: string, cb: Function): void;
    linkSync(srcpath: string, dstpath: string): void;
    symlink(srcpath: string, dstpath: string, type: string, cb: Function): void;
    symlinkSync(srcpath: string, dstpath: string, type: string): void;
    readlink(p: string, cb: Function): void;
    readlinkSync(p: string): string;
}
/**
 * Implements the asynchronous API in terms of the synchronous API.
 * @class SynchronousFileSystem
 */
export declare class SynchronousFileSystem extends BaseFileSystem {
    supportsSynch(): boolean;
    rename(oldPath: string, newPath: string, cb: Function): void;
    stat(p: string, isLstat: boolean, cb: Function): void;
    open(p: string, flags: FileFlag, mode: number, cb: Function): void;
    unlink(p: string, cb: Function): void;
    rmdir(p: string, cb: Function): void;
    mkdir(p: string, mode: number, cb: Function): void;
    readdir(p: string, cb: Function): void;
    chmod(p: string, isLchmod: boolean, mode: number, cb: Function): void;
    chown(p: string, isLchown: boolean, uid: number, gid: number, cb: Function): void;
    utimes(p: string, atime: Date, mtime: Date, cb: Function): void;
    link(srcpath: string, dstpath: string, cb: Function): void;
    symlink(srcpath: string, dstpath: string, type: string, cb: Function): void;
    readlink(p: string, cb: Function): void;
}

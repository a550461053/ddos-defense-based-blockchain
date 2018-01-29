/// <reference types="node" />
import { ApiError } from './api_error';
import { FileSystem } from './file_system';
import Stats from './node_fs_stats';
import * as _fs from 'fs';
/**
 * The node frontend to all filesystems.
 * This layer handles:
 *
 * * Sanity checking inputs.
 * * Normalizing paths.
 * * Resetting stack depth for asynchronous operations which may not go through
 *   the browser by wrapping all input callbacks using `setImmediate`.
 * * Performing the requested operation through the filesystem or the file
 *   descriptor, as appropriate.
 * * Handling optional arguments and setting default arguments.
 * @see http://nodejs.org/api/fs.html
 * @class
 */
export default class FS {
    static Stats: typeof Stats;
    F_OK: number;
    R_OK: number;
    W_OK: number;
    X_OK: number;
    private root;
    private fdMap;
    private nextFd;
    initialize(rootFS: FileSystem): FileSystem;
    /**
     * converts Date or number to a fractional UNIX timestamp
     * Grabbed from NodeJS sources (lib/fs.js)
     */
    _toUnixTimestamp(time: Date | number): number;
    /**
     * **NONSTANDARD**: Grab the FileSystem instance that backs this API.
     * @return [BrowserFS.FileSystem | null] Returns null if the file system has
     *   not been initialized.
     */
    getRootFS(): FileSystem;
    /**
     * Asynchronous rename. No arguments other than a possible exception are given
     * to the completion callback.
     * @param [String] oldPath
     * @param [String] newPath
     * @param [Function(BrowserFS.ApiError)] callback
     */
    rename(oldPath: string, newPath: string, cb?: (err?: ApiError) => void): void;
    /**
     * Synchronous rename.
     * @param [String] oldPath
     * @param [String] newPath
     */
    renameSync(oldPath: string, newPath: string): void;
    /**
     * Test whether or not the given path exists by checking with the file system.
     * Then call the callback argument with either true or false.
     * @example Sample invocation
     *   fs.exists('/etc/passwd', function (exists) {
     *     util.debug(exists ? "it's there" : "no passwd!");
     *   });
     * @param [String] path
     * @param [Function(Boolean)] callback
     */
    exists(path: string, cb?: (exists: boolean) => void): void;
    /**
     * Test whether or not the given path exists by checking with the file system.
     * @param [String] path
     * @return [boolean]
     */
    existsSync(path: string): boolean;
    /**
     * Asynchronous `stat`.
     * @param [String] path
     * @param [Function(BrowserFS.ApiError, BrowserFS.node.fs.Stats)] callback
     */
    stat(path: string, cb?: (err: ApiError, stats?: Stats) => any): void;
    /**
     * Synchronous `stat`.
     * @param [String] path
     * @return [BrowserFS.node.fs.Stats]
     */
    statSync(path: string): Stats;
    /**
     * Asynchronous `lstat`.
     * `lstat()` is identical to `stat()`, except that if path is a symbolic link,
     * then the link itself is stat-ed, not the file that it refers to.
     * @param [String] path
     * @param [Function(BrowserFS.ApiError, BrowserFS.node.fs.Stats)] callback
     */
    lstat(path: string, cb?: (err: ApiError, stats?: Stats) => any): void;
    /**
     * Synchronous `lstat`.
     * `lstat()` is identical to `stat()`, except that if path is a symbolic link,
     * then the link itself is stat-ed, not the file that it refers to.
     * @param [String] path
     * @return [BrowserFS.node.fs.Stats]
     */
    lstatSync(path: string): Stats;
    /**
     * Asynchronous `truncate`.
     * @param [String] path
     * @param [Number] len
     * @param [Function(BrowserFS.ApiError)] callback
     */
    truncate(path: string, cb?: (err?: ApiError) => void): void;
    truncate(path: string, len: number, cb?: (err?: ApiError) => void): void;
    /**
     * Synchronous `truncate`.
     * @param [String] path
     * @param [Number] len
     */
    truncateSync(path: string, len?: number): void;
    /**
     * Asynchronous `unlink`.
     * @param [String] path
     * @param [Function(BrowserFS.ApiError)] callback
     */
    unlink(path: string, cb?: (err?: ApiError) => void): void;
    /**
     * Synchronous `unlink`.
     * @param [String] path
     */
    unlinkSync(path: string): void;
    /**
     * Asynchronous file open.
     * Exclusive mode ensures that path is newly created.
     *
     * `flags` can be:
     *
     * * `'r'` - Open file for reading. An exception occurs if the file does not exist.
     * * `'r+'` - Open file for reading and writing. An exception occurs if the file does not exist.
     * * `'rs'` - Open file for reading in synchronous mode. Instructs the filesystem to not cache writes.
     * * `'rs+'` - Open file for reading and writing, and opens the file in synchronous mode.
     * * `'w'` - Open file for writing. The file is created (if it does not exist) or truncated (if it exists).
     * * `'wx'` - Like 'w' but opens the file in exclusive mode.
     * * `'w+'` - Open file for reading and writing. The file is created (if it does not exist) or truncated (if it exists).
     * * `'wx+'` - Like 'w+' but opens the file in exclusive mode.
     * * `'a'` - Open file for appending. The file is created if it does not exist.
     * * `'ax'` - Like 'a' but opens the file in exclusive mode.
     * * `'a+'` - Open file for reading and appending. The file is created if it does not exist.
     * * `'ax+'` - Like 'a+' but opens the file in exclusive mode.
     *
     * @see http://www.manpagez.com/man/2/open/
     * @param [String] path
     * @param [String] flags
     * @param [Number?] mode defaults to `0644`
     * @param [Function(BrowserFS.ApiError, BrowserFS.File)] callback
     */
    open(path: string, flag: string, cb?: (err: ApiError, fd?: number) => any): void;
    open(path: string, flag: string, mode: number | string, cb?: (err: ApiError, fd?: number) => any): void;
    /**
     * Synchronous file open.
     * @see http://www.manpagez.com/man/2/open/
     * @param [String] path
     * @param [String] flags
     * @param [Number?] mode defaults to `0644`
     * @return [BrowserFS.File]
     */
    openSync(path: string, flag: string, mode?: number | string): number;
    /**
     * Asynchronously reads the entire contents of a file.
     * @example Usage example
     *   fs.readFile('/etc/passwd', function (err, data) {
     *     if (err) throw err;
     *     console.log(data);
     *   });
     * @param [String] filename
     * @param [Object?] options
     * @option options [String] encoding The string encoding for the file contents. Defaults to `null`.
     * @option options [String] flag Defaults to `'r'`.
     * @param [Function(BrowserFS.ApiError, String | BrowserFS.node.Buffer)] callback If no encoding is specified, then the raw buffer is returned.
     */
    readFile(filename: string, cb: (err: ApiError, data?: Buffer) => void): void;
    readFile(filename: string, options: {
        flag?: string;
    }, callback: (err: ApiError, data: Buffer) => void): void;
    readFile(filename: string, options: {
        encoding: string;
        flag?: string;
    }, callback: (err: ApiError, data: string) => void): void;
    readFile(filename: string, encoding: string, cb?: (err: ApiError, data?: string) => void): void;
    /**
     * Synchronously reads the entire contents of a file.
     * @param [String] filename
     * @param [Object?] options
     * @option options [String] encoding The string encoding for the file contents. Defaults to `null`.
     * @option options [String] flag Defaults to `'r'`.
     * @return [String | BrowserFS.node.Buffer]
     */
    readFileSync(filename: string, options?: {
        flag?: string;
    }): Buffer;
    readFileSync(filename: string, options: {
        encoding: string;
        flag?: string;
    }): string;
    readFileSync(filename: string, encoding: string): string;
    /**
     * Asynchronously writes data to a file, replacing the file if it already
     * exists.
     *
     * The encoding option is ignored if data is a buffer.
     *
     * @example Usage example
     *   fs.writeFile('message.txt', 'Hello Node', function (err) {
     *     if (err) throw err;
     *     console.log('It\'s saved!');
     *   });
     * @param [String] filename
     * @param [String | BrowserFS.node.Buffer] data
     * @param [Object?] options
     * @option options [String] encoding Defaults to `'utf8'`.
     * @option options [Number] mode Defaults to `0644`.
     * @option options [String] flag Defaults to `'w'`.
     * @param [Function(BrowserFS.ApiError)] callback
     */
    writeFile(filename: string, data: any, cb?: (err?: ApiError) => void): void;
    writeFile(filename: string, data: any, encoding?: string, cb?: (err?: ApiError) => void): void;
    writeFile(filename: string, data: any, options?: {
        encoding?: string;
        mode?: string | number;
        flag?: string;
    }, cb?: (err?: ApiError) => void): void;
    /**
     * Synchronously writes data to a file, replacing the file if it already
     * exists.
     *
     * The encoding option is ignored if data is a buffer.
     * @param [String] filename
     * @param [String | BrowserFS.node.Buffer] data
     * @param [Object?] options
     * @option options [String] encoding Defaults to `'utf8'`.
     * @option options [Number] mode Defaults to `0644`.
     * @option options [String] flag Defaults to `'w'`.
     */
    writeFileSync(filename: string, data: any, options?: {
        encoding?: string;
        mode?: number | string;
        flag?: string;
    }): void;
    writeFileSync(filename: string, data: any, encoding?: string): void;
    /**
     * Asynchronously append data to a file, creating the file if it not yet
     * exists.
     *
     * @example Usage example
     *   fs.appendFile('message.txt', 'data to append', function (err) {
     *     if (err) throw err;
     *     console.log('The "data to append" was appended to file!');
     *   });
     * @param [String] filename
     * @param [String | BrowserFS.node.Buffer] data
     * @param [Object?] options
     * @option options [String] encoding Defaults to `'utf8'`.
     * @option options [Number] mode Defaults to `0644`.
     * @option options [String] flag Defaults to `'a'`.
     * @param [Function(BrowserFS.ApiError)] callback
     */
    appendFile(filename: string, data: any, cb?: (err: ApiError) => void): void;
    appendFile(filename: string, data: any, options?: {
        encoding?: string;
        mode?: number | string;
        flag?: string;
    }, cb?: (err: ApiError) => void): void;
    appendFile(filename: string, data: any, encoding?: string, cb?: (err: ApiError) => void): void;
    /**
     * Asynchronously append data to a file, creating the file if it not yet
     * exists.
     *
     * @example Usage example
     *   fs.appendFile('message.txt', 'data to append', function (err) {
     *     if (err) throw err;
     *     console.log('The "data to append" was appended to file!');
     *   });
     * @param [String] filename
     * @param [String | BrowserFS.node.Buffer] data
     * @param [Object?] options
     * @option options [String] encoding Defaults to `'utf8'`.
     * @option options [Number] mode Defaults to `0644`.
     * @option options [String] flag Defaults to `'a'`.
     */
    appendFileSync(filename: string, data: any, options?: {
        encoding?: string;
        mode?: number | string;
        flag?: string;
    }): void;
    appendFileSync(filename: string, data: any, encoding?: string): void;
    /**
     * Asynchronous `fstat`.
     * `fstat()` is identical to `stat()`, except that the file to be stat-ed is
     * specified by the file descriptor `fd`.
     * @param [BrowserFS.File] fd
     * @param [Function(BrowserFS.ApiError, BrowserFS.node.fs.Stats)] callback
     */
    fstat(fd: number, cb?: (err: ApiError, stats?: Stats) => any): void;
    /**
     * Synchronous `fstat`.
     * `fstat()` is identical to `stat()`, except that the file to be stat-ed is
     * specified by the file descriptor `fd`.
     * @param [BrowserFS.File] fd
     * @return [BrowserFS.node.fs.Stats]
     */
    fstatSync(fd: number): Stats;
    /**
     * Asynchronous close.
     * @param [BrowserFS.File] fd
     * @param [Function(BrowserFS.ApiError)] callback
     */
    close(fd: number, cb?: (e?: ApiError) => void): void;
    /**
     * Synchronous close.
     * @param [BrowserFS.File] fd
     */
    closeSync(fd: number): void;
    /**
     * Asynchronous ftruncate.
     * @param [BrowserFS.File] fd
     * @param [Number] len
     * @param [Function(BrowserFS.ApiError)] callback
     */
    ftruncate(fd: number, cb?: (err?: ApiError) => void): void;
    ftruncate(fd: number, len?: number, cb?: (err?: ApiError) => void): void;
    /**
     * Synchronous ftruncate.
     * @param [BrowserFS.File] fd
     * @param [Number] len
     */
    ftruncateSync(fd: number, len?: number): void;
    /**
     * Asynchronous fsync.
     * @param [BrowserFS.File] fd
     * @param [Function(BrowserFS.ApiError)] callback
     */
    fsync(fd: number, cb?: (err?: ApiError) => void): void;
    /**
     * Synchronous fsync.
     * @param [BrowserFS.File] fd
     */
    fsyncSync(fd: number): void;
    /**
     * Asynchronous fdatasync.
     * @param [BrowserFS.File] fd
     * @param [Function(BrowserFS.ApiError)] callback
     */
    fdatasync(fd: number, cb?: (err?: ApiError) => void): void;
    /**
     * Synchronous fdatasync.
     * @param [BrowserFS.File] fd
     */
    fdatasyncSync(fd: number): void;
    /**
     * Write buffer to the file specified by `fd`.
     * Note that it is unsafe to use fs.write multiple times on the same file
     * without waiting for the callback.
     * @param [BrowserFS.File] fd
     * @param [BrowserFS.node.Buffer] buffer Buffer containing the data to write to
     *   the file.
     * @param [Number] offset Offset in the buffer to start reading data from.
     * @param [Number] length The amount of bytes to write to the file.
     * @param [Number] position Offset from the beginning of the file where this
     *   data should be written. If position is null, the data will be written at
     *   the current position.
     * @param [Function(BrowserFS.ApiError, Number, BrowserFS.node.Buffer)]
     *   callback The number specifies the number of bytes written into the file.
     */
    write(fd: number, buffer: Buffer, offset: number, length: number, cb?: (err: ApiError, written: number, buffer: Buffer) => void): void;
    write(fd: number, buffer: Buffer, offset: number, length: number, position: number, cb?: (err: ApiError, written: number, buffer: Buffer) => void): void;
    write(fd: number, data: any, cb?: (err: ApiError, written: number, str: string) => any): void;
    write(fd: number, data: any, position: number, cb?: (err: ApiError, written: number, str: string) => any): void;
    write(fd: number, data: any, position: number, encoding: string, cb?: (err: ApiError, written: number, str: string) => void): void;
    /**
     * Write buffer to the file specified by `fd`.
     * Note that it is unsafe to use fs.write multiple times on the same file
     * without waiting for it to return.
     * @param [BrowserFS.File] fd
     * @param [BrowserFS.node.Buffer] buffer Buffer containing the data to write to
     *   the file.
     * @param [Number] offset Offset in the buffer to start reading data from.
     * @param [Number] length The amount of bytes to write to the file.
     * @param [Number] position Offset from the beginning of the file where this
     *   data should be written. If position is null, the data will be written at
     *   the current position.
     * @return [Number]
     */
    writeSync(fd: number, buffer: Buffer, offset: number, length: number, position?: number): number;
    writeSync(fd: number, data: string, position?: number, encoding?: string): number;
    /**
     * Read data from the file specified by `fd`.
     * @param [BrowserFS.File] fd
     * @param [BrowserFS.node.Buffer] buffer The buffer that the data will be
     *   written to.
     * @param [Number] offset The offset within the buffer where writing will
     *   start.
     * @param [Number] length An integer specifying the number of bytes to read.
     * @param [Number] position An integer specifying where to begin reading from
     *   in the file. If position is null, data will be read from the current file
     *   position.
     * @param [Function(BrowserFS.ApiError, Number, BrowserFS.node.Buffer)]
     *   callback The number is the number of bytes read
     */
    read(fd: number, length: number, position: number, encoding: string, cb?: (err: ApiError, data?: string, bytesRead?: number) => void): void;
    read(fd: number, buffer: Buffer, offset: number, length: number, position: number, cb?: (err: ApiError, bytesRead?: number, buffer?: Buffer) => void): void;
    /**
     * Read data from the file specified by `fd`.
     * @param [BrowserFS.File] fd
     * @param [BrowserFS.node.Buffer] buffer The buffer that the data will be
     *   written to.
     * @param [Number] offset The offset within the buffer where writing will
     *   start.
     * @param [Number] length An integer specifying the number of bytes to read.
     * @param [Number] position An integer specifying where to begin reading from
     *   in the file. If position is null, data will be read from the current file
     *   position.
     * @return [Number]
     */
    readSync(fd: number, length: number, position: number, encoding: string): string;
    readSync(fd: number, buffer: Buffer, offset: number, length: number, position: number): number;
    /**
     * Asynchronous `fchown`.
     * @param [BrowserFS.File] fd
     * @param [Number] uid
     * @param [Number] gid
     * @param [Function(BrowserFS.ApiError)] callback
     */
    fchown(fd: number, uid: number, gid: number, callback?: (e?: ApiError) => void): void;
    /**
     * Synchronous `fchown`.
     * @param [BrowserFS.File] fd
     * @param [Number] uid
     * @param [Number] gid
     */
    fchownSync(fd: number, uid: number, gid: number): void;
    /**
     * Asynchronous `fchmod`.
     * @param [BrowserFS.File] fd
     * @param [Number] mode
     * @param [Function(BrowserFS.ApiError)] callback
     */
    fchmod(fd: number, mode: string | number, cb?: (e?: ApiError) => void): void;
    /**
     * Synchronous `fchmod`.
     * @param [BrowserFS.File] fd
     * @param [Number] mode
     */
    fchmodSync(fd: number, mode: number | string): void;
    /**
     * Change the file timestamps of a file referenced by the supplied file
     * descriptor.
     * @param [BrowserFS.File] fd
     * @param [Date] atime
     * @param [Date] mtime
     * @param [Function(BrowserFS.ApiError)] callback
     */
    futimes(fd: number, atime: number | Date, mtime: number | Date, cb?: (e?: ApiError) => void): void;
    /**
     * Change the file timestamps of a file referenced by the supplied file
     * descriptor.
     * @param [BrowserFS.File] fd
     * @param [Date] atime
     * @param [Date] mtime
     */
    futimesSync(fd: number, atime: number | Date, mtime: number | Date): void;
    /**
     * Asynchronous `rmdir`.
     * @param [String] path
     * @param [Function(BrowserFS.ApiError)] callback
     */
    rmdir(path: string, cb?: (e?: ApiError) => void): void;
    /**
     * Synchronous `rmdir`.
     * @param [String] path
     */
    rmdirSync(path: string): void;
    /**
     * Asynchronous `mkdir`.
     * @param [String] path
     * @param [Number?] mode defaults to `0777`
     * @param [Function(BrowserFS.ApiError)] callback
     */
    mkdir(path: string, mode?: any, cb?: (e?: ApiError) => void): void;
    /**
     * Synchronous `mkdir`.
     * @param [String] path
     * @param [Number?] mode defaults to `0777`
     */
    mkdirSync(path: string, mode?: number | string): void;
    /**
     * Asynchronous `readdir`. Reads the contents of a directory.
     * The callback gets two arguments `(err, files)` where `files` is an array of
     * the names of the files in the directory excluding `'.'` and `'..'`.
     * @param [String] path
     * @param [Function(BrowserFS.ApiError, String[])] callback
     */
    readdir(path: string, cb?: (err: ApiError, files?: string[]) => void): void;
    /**
     * Synchronous `readdir`. Reads the contents of a directory.
     * @param [String] path
     * @return [String[]]
     */
    readdirSync(path: string): string[];
    /**
     * Asynchronous `link`.
     * @param [String] srcpath
     * @param [String] dstpath
     * @param [Function(BrowserFS.ApiError)] callback
     */
    link(srcpath: string, dstpath: string, cb?: (e?: ApiError) => void): void;
    /**
     * Synchronous `link`.
     * @param [String] srcpath
     * @param [String] dstpath
     */
    linkSync(srcpath: string, dstpath: string): void;
    /**
     * Asynchronous `symlink`.
     * @param [String] srcpath
     * @param [String] dstpath
     * @param [String?] type can be either `'dir'` or `'file'` (default is `'file'`)
     * @param [Function(BrowserFS.ApiError)] callback
     */
    symlink(srcpath: string, dstpath: string, cb?: (e?: ApiError) => void): void;
    symlink(srcpath: string, dstpath: string, type?: string, cb?: (e?: ApiError) => void): void;
    /**
     * Synchronous `symlink`.
     * @param [String] srcpath
     * @param [String] dstpath
     * @param [String?] type can be either `'dir'` or `'file'` (default is `'file'`)
     */
    symlinkSync(srcpath: string, dstpath: string, type?: string): void;
    /**
     * Asynchronous readlink.
     * @param [String] path
     * @param [Function(BrowserFS.ApiError, String)] callback
     */
    readlink(path: string, cb?: (err: ApiError, linkString?: string) => any): void;
    /**
     * Synchronous readlink.
     * @param [String] path
     * @return [String]
     */
    readlinkSync(path: string): string;
    /**
     * Asynchronous `chown`.
     * @param [String] path
     * @param [Number] uid
     * @param [Number] gid
     * @param [Function(BrowserFS.ApiError)] callback
     */
    chown(path: string, uid: number, gid: number, cb?: (e?: ApiError) => void): void;
    /**
     * Synchronous `chown`.
     * @param [String] path
     * @param [Number] uid
     * @param [Number] gid
     */
    chownSync(path: string, uid: number, gid: number): void;
    /**
     * Asynchronous `lchown`.
     * @param [String] path
     * @param [Number] uid
     * @param [Number] gid
     * @param [Function(BrowserFS.ApiError)] callback
     */
    lchown(path: string, uid: number, gid: number, cb?: (e?: ApiError) => void): void;
    /**
     * Synchronous `lchown`.
     * @param [String] path
     * @param [Number] uid
     * @param [Number] gid
     */
    lchownSync(path: string, uid: number, gid: number): void;
    /**
     * Asynchronous `chmod`.
     * @param [String] path
     * @param [Number] mode
     * @param [Function(BrowserFS.ApiError)] callback
     */
    chmod(path: string, mode: number | string, cb?: (e?: ApiError) => void): void;
    /**
     * Synchronous `chmod`.
     * @param [String] path
     * @param [Number] mode
     */
    chmodSync(path: string, mode: string | number): void;
    /**
     * Asynchronous `lchmod`.
     * @param [String] path
     * @param [Number] mode
     * @param [Function(BrowserFS.ApiError)] callback
     */
    lchmod(path: string, mode: number | string, cb?: (e?: ApiError) => void): void;
    /**
     * Synchronous `lchmod`.
     * @param [String] path
     * @param [Number] mode
     */
    lchmodSync(path: string, mode: number | string): void;
    /**
     * Change file timestamps of the file referenced by the supplied path.
     * @param [String] path
     * @param [Date] atime
     * @param [Date] mtime
     * @param [Function(BrowserFS.ApiError)] callback
     */
    utimes(path: string, atime: number | Date, mtime: number | Date, cb?: (e?: ApiError) => void): void;
    /**
     * Change file timestamps of the file referenced by the supplied path.
     * @param [String] path
     * @param [Date] atime
     * @param [Date] mtime
     */
    utimesSync(path: string, atime: number | Date, mtime: number | Date): void;
    /**
     * Asynchronous `realpath`. The callback gets two arguments
     * `(err, resolvedPath)`. May use `process.cwd` to resolve relative paths.
     *
     * @example Usage example
     *   let cache = {'/etc':'/private/etc'};
     *   fs.realpath('/etc/passwd', cache, function (err, resolvedPath) {
     *     if (err) throw err;
     *     console.log(resolvedPath);
     *   });
     *
     * @param [String] path
     * @param [Object?] cache An object literal of mapped paths that can be used to
     *   force a specific path resolution or avoid additional `fs.stat` calls for
     *   known real paths.
     * @param [Function(BrowserFS.ApiError, String)] callback
     */
    realpath(path: string, cb?: (err: ApiError, resolvedPath?: string) => any): void;
    realpath(path: string, cache: {
        [path: string]: string;
    }, cb: (err: ApiError, resolvedPath?: string) => any): void;
    /**
     * Synchronous `realpath`.
     * @param [String] path
     * @param [Object?] cache An object literal of mapped paths that can be used to
     *   force a specific path resolution or avoid additional `fs.stat` calls for
     *   known real paths.
     * @return [String]
     */
    realpathSync(path: string, cache?: {
        [path: string]: string;
    }): string;
    watchFile(filename: string, listener: (curr: Stats, prev: Stats) => void): void;
    watchFile(filename: string, options: {
        persistent?: boolean;
        interval?: number;
    }, listener: (curr: Stats, prev: Stats) => void): void;
    unwatchFile(filename: string, listener?: (curr: Stats, prev: Stats) => void): void;
    watch(filename: string, listener?: (event: string, filename: string) => any): _fs.FSWatcher;
    watch(filename: string, options: {
        persistent?: boolean;
    }, listener?: (event: string, filename: string) => any): _fs.FSWatcher;
    access(path: string, callback: (err: ApiError) => void): void;
    access(path: string, mode: number, callback: (err: ApiError) => void): void;
    accessSync(path: string, mode?: number): void;
    createReadStream(path: string, options?: {
        flags?: string;
        encoding?: string;
        fd?: number;
        mode?: number;
        autoClose?: boolean;
    }): _fs.ReadStream;
    createWriteStream(path: string, options?: {
        flags?: string;
        encoding?: string;
        fd?: number;
        mode?: number;
    }): _fs.WriteStream;
    /**
     * For unit testing. Passes all incoming callbacks to cbWrapper for wrapping.
     */
    wrapCallbacks(cbWrapper: (cb: Function, args: number) => Function): void;
    private getFdForFile(file);
    private fd2file(fd);
    private closeFd(fd);
}
export interface FSModule extends FS {
    /**
     * The FS constructor.
     */
    FS: typeof FS;
    /**
     * Retrieve the FS object backing the fs module.
     */
    getFSModule(): FS;
    /**
     * Set the FS object backing the fs module.
     */
    changeFSModule(newFs: FS): void;
}

import { FileSystem } from '../core/file_system';
import { ApiError } from '../core/api_error';
import { FileFlag } from '../core/file_flag';
import { default as Stats } from '../core/node_fs_stats';
import { File } from '../core/file';
/**
 * This class serializes access to an underlying async filesystem.
 * For example, on an OverlayFS instance with an async lower
 * directory operations like rename and rmdir may involve multiple
 * requests involving both the upper and lower filesystems -- they
 * are not executed in a single atomic step.  OverlayFS uses this
 * LockedFS to avoid having to reason about the correctness of
 * multiple requests interleaving.
 */
export default class LockedFS<T extends FileSystem> implements FileSystem {
    private _fs;
    private _mu;
    constructor(fs: T);
    getName(): string;
    getFSUnlocked(): T;
    initialize(cb: (err?: ApiError) => void): void;
    diskSpace(p: string, cb: (total: number, free: number) => any): void;
    isReadOnly(): boolean;
    supportsLinks(): boolean;
    supportsProps(): boolean;
    supportsSynch(): boolean;
    rename(oldPath: string, newPath: string, cb: (err?: ApiError) => void): void;
    renameSync(oldPath: string, newPath: string): void;
    stat(p: string, isLstat: boolean, cb: (err: ApiError, stat?: Stats) => void): void;
    statSync(p: string, isLstat: boolean): Stats;
    open(p: string, flag: FileFlag, mode: number, cb: (err: ApiError, fd?: File) => any): void;
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

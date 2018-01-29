/// <reference types="node" />
import { SynchronousFileSystem } from '../core/file_system';
import { default as Stats } from '../core/node_fs_stats';
import { FileFlag } from '../core/file_flag';
import { BaseFile, File } from '../core/file';
import { ApiError } from '../core/api_error';
export declare class EmscriptenFile extends BaseFile implements File {
    private _fs;
    private _FS;
    private _path;
    private _stream;
    constructor(_fs: EmscriptenFileSystem, _FS: any, _path: string, _stream: any);
    getPos(): number;
    close(cb: (err?: ApiError) => void): void;
    closeSync(): void;
    stat(cb: (err: ApiError, stats?: Stats) => any): void;
    statSync(): Stats;
    truncate(len: number, cb: (err?: ApiError) => void): void;
    truncateSync(len: number): void;
    write(buffer: NodeBuffer, offset: number, length: number, position: number, cb: (err: ApiError, written?: number, buffer?: NodeBuffer) => any): void;
    writeSync(buffer: NodeBuffer, offset: number, length: number, position: number): number;
    read(buffer: NodeBuffer, offset: number, length: number, position: number, cb: (err: ApiError, bytesRead?: number, buffer?: NodeBuffer) => void): void;
    readSync(buffer: NodeBuffer, offset: number, length: number, position: number): number;
    sync(cb: (e?: ApiError) => void): void;
    syncSync(): void;
    chown(uid: number, gid: number, cb: (e?: ApiError) => void): void;
    chownSync(uid: number, gid: number): void;
    chmod(mode: number, cb: (e?: ApiError) => void): void;
    chmodSync(mode: number): void;
    utimes(atime: Date, mtime: Date, cb: (e?: ApiError) => void): void;
    utimesSync(atime: Date, mtime: Date): void;
}
/**
 * A simple in-memory file system backed by an InMemoryStore.
 */
export default class EmscriptenFileSystem extends SynchronousFileSystem {
    static isAvailable(): boolean;
    private _FS;
    constructor(_FS: any);
    getName(): string;
    isReadOnly(): boolean;
    supportsLinks(): boolean;
    supportsProps(): boolean;
    supportsSynch(): boolean;
    renameSync(oldPath: string, newPath: string): void;
    statSync(p: string, isLstat: boolean): Stats;
    openSync(p: string, flag: FileFlag, mode: number): EmscriptenFile;
    unlinkSync(p: string): void;
    rmdirSync(p: string): void;
    mkdirSync(p: string, mode: number): void;
    readdirSync(p: string): string[];
    truncateSync(p: string, len: number): void;
    readFileSync(p: string, encoding: string, flag: FileFlag): any;
    writeFileSync(p: string, data: any, encoding: string, flag: FileFlag, mode: number): void;
    chmodSync(p: string, isLchmod: boolean, mode: number): void;
    chownSync(p: string, isLchown: boolean, uid: number, gid: number): void;
    symlinkSync(srcpath: string, dstpath: string, type: string): void;
    readlinkSync(p: string): string;
    utimesSync(p: string, atime: Date, mtime: Date): void;
    private modeToFileType(mode);
}

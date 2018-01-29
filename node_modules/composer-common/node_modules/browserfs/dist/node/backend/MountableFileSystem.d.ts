/// <reference types="node" />
import { FileSystem, BaseFileSystem } from '../core/file_system';
import { ApiError } from '../core/api_error';
/**
 * The MountableFileSystem allows you to mount multiple backend types or
 * multiple instantiations of the same backend into a single file system tree.
 * The file systems do not need to know about each other; all interactions are
 * automatically facilitated through this interface.
 *
 * For example, if a file system is mounted at /mnt/blah, and a request came in
 * for /mnt/blah/foo.txt, the file system would see a request for /foo.txt.
 */
export default class MountableFileSystem extends BaseFileSystem implements FileSystem {
    static isAvailable(): boolean;
    private mntMap;
    private mountList;
    private rootFs;
    constructor();
    /**
     * Mounts the file system at the given mount point.
     */
    mount(mountPoint: string, fs: FileSystem): void;
    umount(mountPoint: string): void;
    /**
     * Returns the file system that the path points to.
     */
    _getFs(path: string): {
        fs: FileSystem;
        path: string;
    };
    getName(): string;
    diskSpace(path: string, cb: (total: number, free: number) => void): void;
    isReadOnly(): boolean;
    supportsLinks(): boolean;
    supportsProps(): boolean;
    supportsSynch(): boolean;
    /**
     * Fixes up error messages so they mention the mounted file location relative
     * to the MFS root, not to the particular FS's root.
     * Mutates the input error, and returns it.
     */
    standardizeError(err: ApiError, path: string, realPath: string): ApiError;
    rename(oldPath: string, newPath: string, cb: (e?: ApiError) => void): void;
    renameSync(oldPath: string, newPath: string): void;
    readdirSync(p: string): string[];
    readdir(p: string, cb: (err: NodeJS.ErrnoException, listing?: string[]) => any): void;
    rmdirSync(p: string): void;
    rmdir(p: string, cb: (err?: NodeJS.ErrnoException) => any): void;
    /**
     * Returns true if the given path contains a mount point.
     */
    private _containsMountPt(p);
}

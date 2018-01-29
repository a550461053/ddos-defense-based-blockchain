import { BaseFileSystem, FileSystem } from '../core/file_system';
import { ApiError } from '../core/api_error';
/**
 * The FolderAdapter file system wraps a file system, and scopes all interactions to a subfolder of that file system.
 */
export default class FolderAdapter extends BaseFileSystem implements FileSystem {
    static isAvailable(): boolean;
    _wrapped: FileSystem;
    _folder: string;
    constructor(folder: string, wrapped: FileSystem);
    /**
     * Initialize the file system. Ensures that the wrapped file system
     * has the given folder.
     */
    initialize(cb: (e?: ApiError) => void): void;
    getName(): string;
    isReadOnly(): boolean;
    supportsProps(): boolean;
    supportsSynch(): boolean;
    supportsLinks(): boolean;
}

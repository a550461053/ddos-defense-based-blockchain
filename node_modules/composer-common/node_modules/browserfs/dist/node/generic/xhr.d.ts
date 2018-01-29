/// <reference types="node" />
import { ApiError } from '../core/api_error';
/**
 * Asynchronously download a file as a buffer or a JSON object.
 * Note that the third function signature with a non-specialized type is
 * invalid, but TypeScript requires it when you specialize string arguments to
 * constants.
 */
export declare let asyncDownloadFile: {
    (p: string, type: 'buffer', cb: (err: ApiError, data?: Buffer) => void): void;
    (p: string, type: 'json', cb: (err: ApiError, data?: any) => void): void;
    (p: string, type: string, cb: (err: ApiError, data?: any) => void): void;
};
/**
 * Synchronously download a file as a buffer or a JSON object.
 * Note that the third function signature with a non-specialized type is
 * invalid, but TypeScript requires it when you specialize string arguments to
 * constants.
 */
export declare let syncDownloadFile: {
    (p: string, type: 'buffer'): Buffer;
    (p: string, type: 'json'): any;
    (p: string, type: string): any;
};
/**
 * Synchronously retrieves the size of the given file in bytes.
 */
export declare function getFileSizeSync(p: string): number;
/**
 * Asynchronously retrieves the size of the given file in bytes.
 */
export declare function getFileSizeAsync(p: string, cb: (err: ApiError, size?: number) => void): void;

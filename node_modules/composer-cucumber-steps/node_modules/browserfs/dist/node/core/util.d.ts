/// <reference types="node" />
/**
 * Grab bag of utility functions used across the code.
 */
import { FileSystem } from './file_system';
/**
 * Checks for any IE version, including IE11 which removed MSIE from the
 * userAgent string.
 */
export declare const isIE: boolean;
/**å
 * Check if we're in a web worker.
 */
export declare const isWebWorker: boolean;
export interface Arrayish<T> {
    [idx: number]: T;
    length: number;
}
/**
 * Synchronous recursive makedir.
 */
export declare function mkdirpSync(p: string, mode: number, fs: FileSystem): void;
/**
 * Converts a buffer into an array buffer. Attempts to do so in a
 * zero-copy manner, e.g. the array references the same memory.
 */
export declare function buffer2ArrayBuffer(buff: Buffer): ArrayBuffer;
/**
 * Converts a buffer into a Uint8Array. Attempts to do so in a
 * zero-copy manner, e.g. the array references the same memory.
 */
export declare function buffer2Uint8array(buff: Buffer): Uint8Array;
/**
 * Converts the given arrayish object into a Buffer. Attempts to
 * be zero-copy.
 */
export declare function arrayish2Buffer(arr: Arrayish<number>): Buffer;
/**
 * Converts the given Uint8Array into a Buffer. Attempts to be zero-copy.
 */
export declare function uint8Array2Buffer(u8: Uint8Array): Buffer;
/**
 * Converts the given array buffer into a Buffer. Attempts to be
 * zero-copy.
 */
export declare function arrayBuffer2Buffer(ab: ArrayBuffer): Buffer;
/**
 * Copies a slice of the given buffer
 */
export declare function copyingSlice(buff: Buffer, start?: number, end?: number): Buffer;

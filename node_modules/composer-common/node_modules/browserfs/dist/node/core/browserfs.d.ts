/// <reference types="node" />
/**
 * BrowserFS's main module. This is exposed in the browser via the BrowserFS global.
 */
import * as buffer from 'buffer';
import fs from './node_fs';
import * as path from 'path';
import { FileSystemConstructor, FileSystem } from './file_system';
import EmscriptenFS from '../generic/emscripten_fs';
import Backends from './backends';
import * as BFSUtils from './util';
import * as Errors from './api_error';
/**
 * Installs BrowserFS onto the given object.
 * We recommend that you run install with the 'window' object to make things
 * global, as in Node.
 *
 * Properties installed:
 *
 * * Buffer
 * * process
 * * require (we monkey-patch it)
 *
 * This allows you to write code as if you were running inside Node.
 * @param {object} obj - The object to install things onto (e.g. window)
 */
export declare function install(obj: any): void;
export declare function registerFileSystem(name: string, fs: FileSystemConstructor): void;
export declare function BFSRequire(module: 'fs'): typeof fs;
export declare function BFSRequire(module: 'path'): typeof path;
export declare function BFSRequire(module: 'buffer'): typeof buffer;
export declare function BFSRequire(module: 'process'): typeof process;
export declare function BFSRequire(module: 'bfs_utils'): typeof BFSUtils;
export declare function BFSRequire(module: string): any;
/**
 * You must call this function with a properly-instantiated root file system
 * before using any file system API method.
 * @param {BrowserFS.FileSystem} rootFS - The root filesystem to use for the
 *   entire BrowserFS file system.
 */
export declare function initialize(rootfs: FileSystem): FileSystem;
export { EmscriptenFS, Backends as FileSystem, Errors };

/**
 * BrowserFS's main module. This is exposed in the browser via the BrowserFS global.
 */
var buffer = require('buffer');
var node_fs_1 = require('./node_fs');
var path = require('path');
var emscripten_fs_1 = require('../generic/emscripten_fs');
exports.EmscriptenFS = emscripten_fs_1["default"];
var backends_1 = require('./backends');
exports.FileSystem = backends_1["default"];
var BFSUtils = require('./util');
var Errors = require('./api_error');
exports.Errors = Errors;
if (process['initializeTTYs']) {
    process['initializeTTYs']();
}
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
function install(obj) {
    obj.Buffer = Buffer;
    obj.process = process;
    var oldRequire = obj.require ? obj.require : null;
    // Monkey-patch require for Node-style code.
    obj.require = function (arg) {
        var rv = BFSRequire(arg);
        if (!rv) {
            return oldRequire.apply(null, Array.prototype.slice.call(arguments, 0));
        }
        else {
            return rv;
        }
    };
}
exports.install = install;
function registerFileSystem(name, fs) {
    backends_1["default"][name] = fs;
}
exports.registerFileSystem = registerFileSystem;
function BFSRequire(module) {
    switch (module) {
        case 'fs':
            return node_fs_1["default"];
        case 'path':
            return path;
        case 'buffer':
            // The 'buffer' module has 'Buffer' as a property.
            return buffer;
        case 'process':
            return process;
        case 'bfs_utils':
            return BFSUtils;
        default:
            return backends_1["default"][module];
    }
}
exports.BFSRequire = BFSRequire;
/**
 * You must call this function with a properly-instantiated root file system
 * before using any file system API method.
 * @param {BrowserFS.FileSystem} rootFS - The root filesystem to use for the
 *   entire BrowserFS file system.
 */
function initialize(rootfs) {
    return node_fs_1["default"].initialize(rootfs);
}
exports.initialize = initialize;
//# sourceMappingURL=browserfs.js.map
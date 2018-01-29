var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var key_value_filesystem_1 = require('../generic/key_value_filesystem');
var api_error_1 = require('../core/api_error');
var global_1 = require('../core/global');
// Some versions of FF and all versions of IE do not support the full range of
// 16-bit numbers encoded as characters, as they enforce UTF-16 restrictions.
// http://stackoverflow.com/questions/11170716/are-there-any-characters-that-are-not-allowed-in-localstorage/11173673#11173673
var supportsBinaryString = false, binaryEncoding;
try {
    global_1["default"].localStorage.setItem("__test__", String.fromCharCode(0xD800));
    supportsBinaryString = global_1["default"].localStorage.getItem("__test__") === String.fromCharCode(0xD800);
}
catch (e) {
    // IE throws an exception.
    supportsBinaryString = false;
}
binaryEncoding = supportsBinaryString ? 'binary_string' : 'binary_string_ie';
if (!Buffer.isEncoding(binaryEncoding)) {
    // Fallback for non BrowserFS implementations of buffer that lack a
    // binary_string format.
    binaryEncoding = "base64";
}
/**
 * A synchronous key-value store backed by localStorage.
 */
var LocalStorageStore = (function () {
    function LocalStorageStore() {
    }
    LocalStorageStore.prototype.name = function () {
        return 'LocalStorage';
    };
    LocalStorageStore.prototype.clear = function () {
        global_1["default"].localStorage.clear();
    };
    LocalStorageStore.prototype.beginTransaction = function (type) {
        // No need to differentiate.
        return new key_value_filesystem_1.SimpleSyncRWTransaction(this);
    };
    LocalStorageStore.prototype.get = function (key) {
        try {
            var data = global_1["default"].localStorage.getItem(key);
            if (data !== null) {
                return new Buffer(data, binaryEncoding);
            }
        }
        catch (e) {
        }
        // Key doesn't exist, or a failure occurred.
        return undefined;
    };
    LocalStorageStore.prototype.put = function (key, data, overwrite) {
        try {
            if (!overwrite && global_1["default"].localStorage.getItem(key) !== null) {
                // Don't want to overwrite the key!
                return false;
            }
            global_1["default"].localStorage.setItem(key, data.toString(binaryEncoding));
            return true;
        }
        catch (e) {
            throw new api_error_1.ApiError(api_error_1.ErrorCode.ENOSPC, "LocalStorage is full.");
        }
    };
    LocalStorageStore.prototype.del = function (key) {
        try {
            global_1["default"].localStorage.removeItem(key);
        }
        catch (e) {
            throw new api_error_1.ApiError(api_error_1.ErrorCode.EIO, "Unable to delete key " + key + ": " + e);
        }
    };
    return LocalStorageStore;
}());
exports.LocalStorageStore = LocalStorageStore;
/**
 * A synchronous file system backed by localStorage. Connects our
 * LocalStorageStore to our SyncKeyValueFileSystem.
 */
var LocalStorageFileSystem = (function (_super) {
    __extends(LocalStorageFileSystem, _super);
    function LocalStorageFileSystem() {
        _super.call(this, { store: new LocalStorageStore() });
    }
    LocalStorageFileSystem.isAvailable = function () {
        return typeof global_1["default"].localStorage !== 'undefined';
    };
    return LocalStorageFileSystem;
}(key_value_filesystem_1.SyncKeyValueFileSystem));
exports.__esModule = true;
exports["default"] = LocalStorageFileSystem;
//# sourceMappingURL=LocalStorage.js.map
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
/**
 * BrowserFS's main entry point.
 * It installs all of the needed polyfills, and requires() the main module.
 */
var global_1 = require('./core/global');
// IE substr does not support negative indices
if ('ab'.substr(-1) !== 'b') {
    String.prototype.substr = function (substr) {
        return function (start, length) {
            // did we get a negative start, calculate how much it is from the
            // beginning of the string
            if (start < 0) {
                start = this.length + start;
            }
            // call the original function
            return substr.call(this, start, length);
        };
    }(String.prototype.substr);
}
// Only IE10 has setImmediate.
if (typeof setImmediate === 'undefined') {
    var gScope_1 = global_1["default"];
    var timeouts_1 = [];
    var messageName_1 = "zero-timeout-message";
    var canUsePostMessage = function () {
        if (typeof gScope_1.importScripts !== 'undefined' || !gScope_1.postMessage) {
            return false;
        }
        var postMessageIsAsync = true;
        var oldOnMessage = gScope_1.onmessage;
        gScope_1.onmessage = function () {
            postMessageIsAsync = false;
        };
        gScope_1.postMessage('', '*');
        gScope_1.onmessage = oldOnMessage;
        return postMessageIsAsync;
    };
    if (canUsePostMessage()) {
        gScope_1.setImmediate = function (fn) {
            timeouts_1.push(fn);
            gScope_1.postMessage(messageName_1, "*");
        };
        var handleMessage = function (event) {
            if (event.source === self && event.data === messageName_1) {
                if (event.stopPropagation) {
                    event.stopPropagation();
                }
                else {
                    event.cancelBubble = true;
                }
                if (timeouts_1.length > 0) {
                    var fn = timeouts_1.shift();
                    return fn();
                }
            }
        };
        if (gScope_1.addEventListener) {
            gScope_1.addEventListener('message', handleMessage, true);
        }
        else {
            gScope_1.attachEvent('onmessage', handleMessage);
        }
    }
    else if (gScope_1.MessageChannel) {
        // WebWorker MessageChannel
        var channel_1 = new gScope_1.MessageChannel();
        channel_1.port1.onmessage = function (event) {
            if (timeouts_1.length > 0) {
                return timeouts_1.shift()();
            }
        };
        gScope_1.setImmediate = function (fn) {
            timeouts_1.push(fn);
            channel_1.port2.postMessage('');
        };
    }
    else {
        gScope_1.setImmediate = function (fn) {
            return setTimeout(fn, 0);
        };
    }
}
// Polyfill for Uint8Array.prototype.slice.
// Safari and some other browsers do not define it.
if (typeof (ArrayBuffer) !== 'undefined' && typeof (Uint8Array) !== 'undefined') {
    if (!Uint8Array.prototype['slice']) {
        Uint8Array.prototype.slice = function (start, end) {
            if (start === void 0) { start = 0; }
            if (end === void 0) { end = this.length; }
            var self = this;
            if (start < 0) {
                start = this.length + start;
                if (start < 0) {
                    start = 0;
                }
            }
            if (end < 0) {
                end = this.length + end;
                if (end < 0) {
                    end = 0;
                }
            }
            if (end < start) {
                end = start;
            }
            return new Uint8Array(self.buffer, self.byteOffset + start, end - start);
        };
    }
}
__export(require('./core/browserfs'));
//# sourceMappingURL=index.js.map
'use strict';
var fs = require('fs'),
	es = require('event-stream'),
	File = require('gulp-util').File,
	gutil = require('gulp-util'),
	through = require('through2');

/**
 * gulp-license-check plugin, support buffer and stream.
 *
 * @param {string} path - The license header template file path.
 * @param {boolean} [true] blocking - Enable the plugin to block the build in case of error .
 * @param {boolean} [true] logInfo - Enable info log .
 * @param {boolean} [true] logError - Enable errors log.

 * @returns {object} Gulp extension in the pipline.
 */
module.exports = function (opts) {

	opts = opts || {};

	var HEADER_NOT_PRESENT = 'Header not present';
	var HEADER_PRESENT = 'Header present';

	var isInfoLogActive = opts.logInfo === undefined ? true : opts.logInfo,
		isErrorLogActive = opts.logError === undefined ? true : opts.logError,
		isErrorBlocking = opts.blocking === undefined ? true : opts.blocking,
		licenseFilePath = opts.path;

	var licenseFileUtf8;

	return through.obj(function (file, encoding, callback) {
		if (file.isNull()) {
			return callback(null, file);
		}

		try {
			if (file.isStream()) {
				checkHeaderFromStream(file, this);
			} else {
				checkHeaderFromBuffer(file, this);
			}
		} catch (error) {
			callback(error, null);
			return;
		}

		callback(null, file);
	});

	/**
	 * Check header from stream.
	 *
	 * @param {object} file - current file from stream.
	 * @param {object} ctx - context.
	 *
	 * @returns {string[]} file in string[] format.
	 */
	function checkHeaderFromStream(file, ctx) {
		file.contents.pipe(es.wait(function (err, data) {
			if (err) {
				throw err;
			}

			var bufferFile = new File({
				path: file.path,
				contents: data
			});

			checkHeaderFromBuffer(bufferFile, ctx);
		}));
	}

	/**
	 * Check header from buffer.
	 *
	 * @param {object} file - current file from buffer.
	 * @param {object} ctx - context.
	 */
	function checkHeaderFromBuffer(file, ctx) {
		if (isLicenseHeaderPresent(file)) {
			log(file.path, ctx);
		} else {
			error(file.path, ctx);
		}
	}

	/**
	 * Read current file.
	 *
	 * @param {object} file - current file.
	 *
	 * @returns {string[]} file in string[] format.
	 */
	function readCurrentFile(file) {
		return file.contents.toString('utf8').split(/\r?\n/);
	}

	/**
	 * Read the file header path.
	 *
	 * @returns {string[]} The license header template in sting[] format.
	 */
	function readLicenseHeaderFile() {
		if (licenseFileUtf8) {
			return licenseFileUtf8;
		}

		if (fs.existsSync(licenseFilePath)) {
			return fs.readFileSync(licenseFilePath, 'utf8').split(/\r?\n/);
		}

		throw new gutil.PluginError('gulp-license-check', new Error('The license header file doesn`t exist ' + licenseFilePath));
	}

	/**
	 * Log util.
	 *
	 * @param {string} filePath - file Path.
	 * @param {object} ctx - context.
	 */
	function log(filePath, ctx) {
		if (isInfoLogActive) {
			ctx.emit('log', {
				msg: HEADER_PRESENT,
				path: filePath
			});
			gutil.log(gutil.colors.green(HEADER_PRESENT), filePath);
		}
	}

	/**
	 * Manage error in case the header is not present.
	 *
	 * @param {string} filePath - file Path.
	 * @param {object} ctx - context.
	 */
	function error(filePath, ctx) {
		if (isErrorBlocking) {
			throw new gutil.PluginError('gulp-license-check', new Error('The following file doesn`t contain the license header ' + filePath));
		} else {
			logError(filePath, ctx);
		}
	}

	/**
	 * Log error.
	 *
	 * @param {string} filePath - file Path.
	 * @param {object} ctx - context.
	 */
	function logError(filePath, ctx) {
		if (isErrorLogActive) {
			ctx.emit('log', {
				msg: HEADER_NOT_PRESENT,
				path: filePath
			});
			gutil.log(gutil.colors.red(HEADER_NOT_PRESENT), filePath);
		}
	}

	/**
	 * Check if header is present.
	 *
	 * @param {object} currentFile - file in string[] format.
	 *
	 * @returns {boolean} dose match.
	 */
	function isLicenseHeaderPresent(currentFile) {
		if (!isFileEmpty(currentFile.contents)) {
			var currentFileUtf8 = readCurrentFile(currentFile),
				licenseFileUtf8 = readLicenseHeaderFile(),
				skipStrict = 0;

			if(currentFileUtf8[0] === '"use strict";' ) {
				skipStrict = 1;
			}

			for (var i = skipStrict; i < licenseFileUtf8.length; i++) {
				if (currentFileUtf8[i + skipStrict] !== licenseFileUtf8[i]) {
					return false;
				}
			}
		}
		return true;
	}

	/**
	 * Check if a file is empty.
	 *
	 * @param {string} file - file contents in string format.
	 *
	 * @returns {boolean}.
	 */
	function isFileEmpty(fileContents) {
		return fileContents.toString('utf8').trim() === '';
	}
};

/**
 * Created by mromano on 27/04/2016.
 */
var path = require('path'),
	vfs = require('vinyl-fs'),
	license = require('gulp-license-check'),
	gutil = require('gulp-util');

/**
 * license-check plugin, check the presence of a specific header in all the files of a project.
 *
 * @type {config} config - configuration object.
 *        @typedef config
 *        @type {object}
 *              @param {string[]} ['** / *'] src - Path of the files you want to be checked by the plugin.
 *            @param {string} path - The license header template file path.
 *            @param {boolean} [true] blocking - Enable the plugin to block the build in case of error .
 *            @param {boolean} [true] logInfo - Enable info log .
 *            @param {boolean} [true] logError - Enable errors log.
 *
 * @returns {object} extension to check the header.
 */
module.exports.check = function (config) {

	var mainFolder = process.cwd() || __dirname;

	/**
	 * Main execution function
	 *
	 * @returns {object} return the stream to make possible append pipe or listen on channel such on('data') on('error) .
	 */
	function start(config) {
		if (!isConfigurationParametersDefinedCorrectly(config)) {
			throw new Error('license-check - Configuration error');
		}

		var folders = [];
		if (config.src) {
			folders = getFoldersToCheck(config.src);
		}

		if (folders.length === 0) {
			gutil.log('license-check', gutil.colors.red('{src} not defined or empty, the plugin will run with the default configuration: **/*'));
			folders = getDefaultFolders();
		}

		var src = vfs.src(folders);
		src.pipe(license(config));
		return src;
	}

	/**
	 * Return all the folders that the plugin have to check. Because the plugin is inside the node_modules
	 * folder, we prepended to all the path the absolute path of the main context of execution.
	 *
	 * @param {object} src - Path of the files you want to be checked by the plugin.
	 *
	 * @returns {string[]} Path of the files you want to be checked by the plugin with the absolute path of the context prepended.
	 */
	function getFoldersToCheck(src) {
		var folders = [];
		src.forEach(function (entry) {
			if (entry.charAt(0) === '!') {
				folders.push(path.join('!' + mainFolder, entry.substring(1, entry.length)));
			} else {
				if (entry.charAt(0) === '/') {
					folders.push(entry);
				} else {
					folders.push(path.join(mainFolder, entry));
				}
			}
		});

		return folders;
	}

	/**
	 * Return the default folders to check in case no folder is set.
	 *
	 * @param {string[]} folders - Folders of the files you want to be checked by the plugin.
	 *
	 * @returns {string[]} return the default folders.
	 */
	function getDefaultFolders() {
		return [path.join(mainFolder, '**/*'),
			path.join('!' + mainFolder, '/node_modules/**/*')];
	}

	/**
	 * Check that the configuration parameter are setted correctly.
	 *
	 * @param {object} config - plugin configurations.
	 *
	 * @returns {boolean} return true if the parameters are set correctly.
	 */
	function isConfigurationParametersDefinedCorrectly(config) {
		if (!config) {
			gutil.log('license-check', gutil.colors.red('Config must be defined to run the plugin'));
			return false;
		}

		if (!config.path) {
			gutil.log('license-check', gutil.colors.red('License header property {path} must be defined to run the plugin'));
			return false;
		}

		return true;
	}

	return start(config);
};


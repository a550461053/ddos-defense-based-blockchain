#! /usr/bin/env node
/**
 * Created by mromano on 27/04/2016.
 */
var pkgConf = require('pkg-conf'),
	license = require('../index');

/**
 * Get configuration options
 *
 * @returns {object} configuration options from main package.json.
 */
var getConfigFromMainPackageJson = function () {
	return pkgConf.sync('license-check-config', process.cwd());
};

/**
 * Execute the plugin passing the config options.
 *
 * @returns {string[]} file in string[] format.
 */
var init = function () {
	var config = getConfigFromMainPackageJson();
	license.check(config);
};

init();


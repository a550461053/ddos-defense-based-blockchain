'use strict';
/* global describe, it */

var assert = require('assert'),
	license = require('../');

require('mocha');

describe('license-check', function () {

	describe('behaviour tests', function () {

		it('should execute without errors', function (done) {
			var stream = license.check({
				src: [
					'**/*',
					'!./node_modules/**/*'
				],
				path: 'test/fixture/header.txt',
				blocking: false,
				logInfo: false,
				logError: false
			});

			stream.on('end', function () {
				done();
			});
		});

		it('should check defualt folder if no src folder is provided', function (done) {
			var stream = license.check({
				path: 'test/fixture/header.txt',
				blocking: false,
				logInfo: false,
				logError: false
			});

			stream.on('end', function () {
				done();
			});
		});

		it('should throw an error when {path} is empty', function (done) {
			var shouldthrowError = function () {
				license.check({
					src: [
						'**/*',
						'/usr/lib',
						'!./node_modules/**/*'
					],
					path: '',
					blocking: false,
					logInfo: false,
					logError: false
				});
			};

			assert.throws(shouldthrowError, Error, 'license-check - Configuration error');

			done();
		});

		it('should throw an error when {path} is undefined', function (done) {
			var shouldthrowError = function () {
				license.check({
					src: [
						'**/*',
						'/usr/lib',
						'!./node_modules/**/*'
					],
					blocking: false,
					logInfo: false,
					logError: true
				});
			};

			assert.throws(shouldthrowError, Error, 'license-check - Configuration error');

			done();
		});

		it('should throw an error if no config is provided', function (done) {
			assert.throws(license.check, Error, 'license-check - Configuration error');

			done();
		});
	});
});

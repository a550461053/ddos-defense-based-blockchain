# license-check

<p>
  <a title='Build Status' href='https://travis-ci.org/magemello/license-check'>
    <img src='https://travis-ci.org/magemello/license-check.svg?branch=master' alt='travis Status' />
  </a>
  <a href='https://coveralls.io/github/magemello/icense-check?branch=master'>
    <img src='https://coveralls.io/repos/github/magemello/license-check/badge.svg?branch=master' alt='Coverage Status' />
  </a>
  <a href='https://www.npmjs.com/package/license-check'>
    <img src='https://img.shields.io/npm/dm/license-check.svg' alt='npm downloads' />
  </a>
  <a href='https://raw.githubusercontent.com/magemello/license-check/master/license'>
     <img src='https://img.shields.io/badge/license-MIT-blue.svg' alt='license' />
  </a>
  <a href='https://www.youtube.com/watch?v=9auOCbH5Ns4'>
     <img src='https://img.shields.io/badge/unicorn-approved-ff69b4.svg' alt='unicorn' />
  </a>
  <a href='http://magemello.github.io/blog.html'>
     <img src='https://img.shields.io/badge/style-blog-blue.svg?label=my' alt='my blog' />
  </a>
  <a href='http://magemello.github.io'>
     <img src='https://img.shields.io/badge/style-portfolio-orange.svg?label=my' alt='my portfolio' />
  </a>
</p>

> license-check is a npm plugin to check the presence of a specific header in all the files of a project, and give to you a log of all the files where the header is missing. Never miss again a license header in a file.

>If you want to run this plugin from gulp you can use [gulp-license-check](https://github.com/magemello/gulp-license-check).

## Install

```
$ npm install --save-dev license-check
```

## Usage

You can use this plugin in two ways:
- [Run it from npm](#run-it-from-npm)
- [Including it in your node app](#include-it-in-your-node-app)

#### Run it from npm

Add the following lines to your package.json :
```json
"scripts": {
    "licensecheck": "license-check",
},
"license-check-config": {
    "src": [
      "test/**/*",,
      "src/**/*.js",
      "/usr/lib",
      "index.js",
      "!./node_modules/**/*"
    ],
    "path": "assets/header.txt",
    "blocking": false,
    "logInfo": false,
    "logError": true
  }
```

Then run from the terminal :
```
$ npm run licensecheck
```

The license-check-config section is mandatory, without this section the plugin will not work.

#### Include it in your node app

```javascript
var license = require('license-check');

license.check({
	src: [
		'**/*',
		'/usr/lib',
		'!./node_modules/**/*'
	],
	path: "assets/header.txt",
	blocking: false,
	logInfo: false,
	logError: true
});
```

#### Options

**src**: {string[]} (optional) default ['**/\*', '!node_modules/\**/\*']  . Path of the files you want to be checked by the plugin.<br />
**path**: {string} (mandatory). Path of your header file, this is the header that has to match in all the files of the project.<br />
**blocking**: {boolean} (optional) default true. If it's true, in case of missing header will block the build.<br />
**logInfo**: {boolean} (optional) default true. If it's false the plugin doesn't show the info log.<br />
**logError**: {boolean} (optional) default true. If it's false the plugin doesn't show the error log.<br />

## License

MIT © [Mario Romano](http://magemello.github.io/)

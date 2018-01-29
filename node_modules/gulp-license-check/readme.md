# gulp-license-check

<p>
  <a title='Build Status' href='https://travis-ci.org/magemello/gulp-license-check'>
    <img src='https://travis-ci.org/magemello/gulp-license-check.svg?branch=master' alt='travis Status' />
  </a>
  <a href='https://coveralls.io/github/magemello/gulp-license-check?branch=master'>
    <img src='https://coveralls.io/repos/github/magemello/gulp-license-check/badge.svg?branch=master' alt='Coverage Status' />
  </a>
  <a href='https://www.npmjs.com/package/gulp-license-check'>
    <img src='https://img.shields.io/npm/dm/gulp-license-check.svg' alt='npm downloads' />
  </a>
  <a href='https://raw.githubusercontent.com/magemello/gulp-license-check/master/license'>
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

> gulp-license-check is a Gulp extension to check the presence of a specific header in all the files of a project, and give to you a log of all the files where the header is missing. Never miss again a license header in a file.

> If you want to run this plugin from npm without using gulp you can use [license-check](https://github.com/magemello/license-check).
## Install

```
$ npm install --save-dev gulp-license-check
```

## Usage

```js
const license = require('gulp-license-check');

gulp.task('license', function () {
    return gulp.src('./app/**/*.ts')
        .pipe(license({
            path: 'app/license_header.txt',
            blocking: false,
            logInfo: false,
            logError: true
        }));
});
```

#### Options

**path**: {string} . Path of your header file, this is the header that has to match in all the files of the project.<br />
**blocking**: {boolean} default true. If it's true, in case of missing header will block the build.<br />
**logInfo**: {boolean} default true. If it's false the plugin doesn't show the info log.<br />
**logError**: {boolean} default true. If it's false the plugin doesn't show the error log.<br />

## License

MIT © [Mario Romano](http://magemello.github.io/)

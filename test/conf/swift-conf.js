// Karma configuration
// Generated on Sat Apr 27 2013 22:46:19 GMT+0800 (中国标准时间)


// base path, that will be used to resolve files and exclude
basePath = '';


// list of files / patterns to load in the browser
files = [
  JASMINE,
  JASMINE_ADAPTER,
  '../../lib/jquery-1.7.1.min.js',
  '../../lib/jquery-ui.min.js',
  '../../lib/bootstrap.js',
  '../../lib/angular/angular.js',
  '../../lib/angular/angular-loader.js',
  '../../lib/angular/angular-mocks.js',
  '../../lib/angular-ui.js',
  '../../lib/ng-grid/ng-grid.min.js',
  '../../lib/select2.js',

  // 'lib/angular/angular-scenario.js',
  '../../js/*.js',
  '../../test/unit/directive-swiftlist.js'
];


// list of files to exclude
exclude = [
  
];


// test results reporter to use
// possible values: 'dots', 'progress', 'junit'
reporters = ['progress'];


// web server port
port = 9876;


// cli runner port
runnerPort = 9100;


// enable / disable colors in the output (reporters and logs)
colors = true;


// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
logLevel = LOG_DEBUG;


// enable / disable watching file and executing tests whenever any file changes
autoWatch = true;


// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari (only Mac)
// - PhantomJS
// - IE (only Windows)
browsers = ['Chrome'];


// If browser does not capture in given timeout [ms], kill it
captureTimeout = 60000;


// Continuous Integration mode
// if true, it capture browsers, run tests and exit
singleRun = false;

basePath = './';

files = [
  JASMINE,
  JASMINE_ADAPTER,

  // 3rd party
  'components/angular/angular.js',
  'components/angular-mocks/angular-mocks.js',
  'components/jquery/jquery.js',
  'components/sugar/release/sugar-full.development.js',
  'test/lib/Trello.js',

  // app code
  'app/script/app.js',
  'app/script/service/*.js',
  'app/script/controller/*.js',

  // unit tests
  'test/unit/**/*.js'
];

autoWatch = true;
logLevel = LOG_INFO;
logColors = true;
browsers = ['Chrome'];
reporters = ['dots', 'junit', 'coverage'];
browsers = ['PhantomJS'];

preprocessors = {
  'app/script/**/*.js': 'coverage'
};

coverageReporter = {
  type : 'html',
  dir : 'test/test_reports/coverage/'
};

junitReporter = {
  outputFile: 'test/test_reports/docs.xml'
};



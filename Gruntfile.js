var util = require('./test/lib/karma-util.js');
module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      server: {
        options: {
          port: 8000,
          hostname: '0.0.0.0',
          base: 'chrome-extension/',
          keepalive: true
        }
      }
    }, test: {
      unit: 'karma.unit.conf.js'
    },
    autotest: {
      unit: 'karma.unit.conf.js'
    },
    copy: {
      chromeExtHtml: {
        files :[
          {src: 'app/index.html', dest: 'chrome-extension/index.html"},
          {src: 'app/callback.html', dest: 'chrome-extension/callback.html"}
        ]
      }
    },
    concat: {
      chromeExtJs: {
        dest: 'chrome-extension/application.js',
        src: [ 'app/**/*.js' ]
      }
    },
    watch: {
      scripts: {
        files: ['app/**/*'],
        tasks: ['copy', 'concat'],
        options: {
          nospawn: true
        }
      }
    }
  });

  grunt.registerMultiTask('test', 'Run the unit tests with Karma', function () {
    util.startKarma.call(util, this.data, true, this.async());
  });


  grunt.registerMultiTask('autotest', 'Run and watch the unit tests with Karma', function () {
    util.startKarma.call(util, this.data, false, this.async());
  });

  grunt.registerTask('server', ['concat', 'connect:server']);
  grunt.registerTask('all', ['test', 'copy', 'concat']);
};

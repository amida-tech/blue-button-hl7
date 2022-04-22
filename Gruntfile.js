/*global module*/

module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jsbeautifier');
  grunt.loadNpmTasks('grunt-run');

  // Project configuration.
  grunt.initConfig({
    jshint: {
      files: ['*.js', './lib/*.js', './test/*.js'],
      options: {
        browser: true,
        smarttabs: true,
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: false,
        boss: true,
        eqnull: true,
        node: true,
        expr: true,
        globals: {
          'it': true,
          'xit': true,
          'describe': true,
          'expect': true,
          'before': true,
          'after': true,
          'done': true
        }
      }
    },
    watch: {
      all: {
        files: ['./lib/*.js', '*.js', './test/*.js'],
        tasks: ['default']
      }
    },
    jsbeautifier: {
      beautify: {
        src: ['Gruntfile.js', '*.js', 'lib/*.js', 'lib/**/*.js', 'test/*.js', 'test/**/*.js'],
        options: {
          config: '.jsbeautifyrc'
        }
      },
      check: {
        src: ['Gruntfile.js', '*.js', 'lib/*.js', 'lib/**/*.js', 'test/*.js', 'test/**/*.js'],
        options: {
          mode: 'VERIFY_ONLY',
          config: '.jsbeautifyrc'
        }
      }
    },
    run: {
      test: {
        exec: 'npx jest'
      },
      coverage: {
        exec: 'npx jest --coverage'
      }
    }
  });

  // Default task.
  grunt.registerTask('default', ['beautify', 'jshint', 'test']);
  //Express omitted for travis build.
  grunt.registerTask('commit', ['jshint', 'test']);
  grunt.registerTask('test', ['run:test']);
  grunt.registerTask('coverage', ['run:coverage']);
  grunt.registerTask('timestamp', function () {
    grunt.log.subhead(Date());
  });

  //JS beautifier
  grunt.registerTask('beautify', ['jsbeautifier:beautify']);

};

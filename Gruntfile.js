module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            build: ["build"],
            release: {
                options: {
                    force: true
                },
                src: ['release']
            }
        },
        jshint: {
            options: {
                undef: false,
                unused: false,
                nonbsp: true,
                reporter: require('jshint-stylish')
            },
            files: ['src/main/javascript/**/*.js']
        },
        jslint: {
            javascript: {
                options: {
                    edition: 'latest',
                    errorsOnly: true,
                    failOnError: false
                },
                src: ['src/main/javascript/**/*.js']
            }
        },
        copy: {
            build: {
                files: [{expand: true, src: ['src/main/javascript/*.js', 'src/main/javascript/*.d.ts'], dest: 'build/', filter: 'isFile'}]
            },
            release: {
                files: [
                    {
                        expand: true,
                        src: [
                            'build/<%= pkg.name %>.min.js',
                            'build/<%= pkg.name %>.js',
                            'build/src/main/javascript/*.js',
                            'build/src/main/javascript/*.d.ts'
                        ],
                        dest: 'release/',
                        filter: 'isFile',
                        flatten: true
                    }
                ]
            }
        },
        uglify: {
            build_min: {
                options: {
                    mangle: true
                },
                files: {
                    'build/<%= pkg.name %>.min.js': ['build/src/main/javascript/software.bytepushers.*.js']
                }
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            build: {
                src: ['build/src/main/javascript/software.bytepushers.*.js'],
                dest: 'build/<%= pkg.name %>.js'
            }
        },
        bump: {
            options: {
                files: ['package.json'],
                updateConfigs: ['pkg'],
                commit: true,
                commitMessage: 'Release v%VERSION%',
                commitFiles: ['-a'],
                createTag: true,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: true,
                pushTo: 'origin',
                gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
                globalReplace: false,
                prereleaseName: false,
                metadata: '',
                regExp: false
            }
        },
        'npm-publish': {
            options: {
                // list of tasks that are required before publishing
                //requires: ['build'],
                // if the workspace is dirty, abort publishing (to avoid publishing local changes)
                abortIfDirty: true,
                // can also be a function that returns NPM tag (eg. to determine canary/latest tag based on the version)
                tag: 'latest'
            }
        },
        // Configure a mochaTest task
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    captureFile: 'target/results.txt', // Optionally capture the reporter output to a file
                    quiet: false, // Optionally suppress output to standard out (defaults to false)
                    clearRequireCache: false, // Optionally clear the require cache before running tests (defaults to false)
                    clearCacheFilter: (key) => true, // Optionally defines which files should keep in cache
                    noFail: false // Optionally set to not fail on failed tests (will still fail on other errors)
                },
                src: ['src/test/**/*.js']
            }
        }
    });
    
    

    var build = grunt.option('target') || 'build';
    var release = grunt.option('target') || 'release';

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-npm');
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.registerTask('test', 'mochaTest');
    grunt.registerTask('default', ['build']);
    grunt.registerTask('validate', ['jshint', 'jslint']);
    grunt.registerTask('package', ['copy:' + build, 'uglify', 'concat']);
    grunt.registerTask('build', ['clean:' + build, 'validate', 'test', 'package']);
    grunt.registerTask('release', function (target) {
        target = (target === null) ? "patch" : target;

        grunt.task.run("clean:release");
        grunt.task.run("build");
        grunt.task.run("copy:release");
        grunt.task.run("bump:"+target);
        grunt.task.run("npm-publish");
    });
};
var mountFolder;

mountFolder = function(connect, dir) {
    return connect["static"](require('path').resolve(dir));
};
module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            options: {
                sourceMap: true
            }
        },
        connect: {
            server: {
                options: {
                    port: 4000,
                    middleware: function(connect) {
                        return [mountFolder(connect, '_site')];
                    }
                }
            }
        },
         copy: {
            combine: {
                expand: true,
                cwd: 'default/',
                src: '**',
                dest: 'default/',   //把html拷贝到当前的项目的文件夹
                flatten: true,
                filter: 'isFile'
            }
        },
        uglify: {
          files: {
            'javascript/comm.min.js': ['javascript/comm.js']   //压缩comm.js
          }
        },
        jekyll: {
            build: {
                options: {
                    config: '_config.yml'
                }
            }
        },
        watch: {
            site: {
                files: ['source/default/**', 'source/_includes/**', 'source/_layouts/**', 'source/_sass/**'], //监视jekyll站点文件
                tasks: ['jekyll']
            },
            css: {
                files: ['_sass/*.scss'], //监视sass文件
                tasks: ['sass']
            },
            pkgjson: {
                files: ['Gruntfile.js'],
                tasks: ['copy:combine', 'jekyll', 'connect', 'watch']
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-jekyll');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', ['jekyll', 'connect', 'watch']);
   // grunt.registerTask('build', ['sass', 'jekyll', 'connect', 'watch']); //目前运行的插件及路径,注意顺序
    grunt.registerTask('release', ['uglify']); //目前运行的插件及路径,注意顺序

};

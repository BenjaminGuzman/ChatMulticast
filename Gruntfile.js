module.exports = function(grunt) {
    grunt.initConfig({
        uglify: {
            build: {
                files: [{
                    expand: true,
                    src: "./public/js/not_min/*.js",
                    dest: "../"
                }]
            },
            chat: {
                files: {
                    "./public/js/chat.js": ["./public/js/chat.js"]
                }
            },
            beautify: {
                options: {
                    beautify: true
                },
                files: [{
                    expand: true,
                    src: "./public/js/*.js",
                    dest: "public/js/not_min"
                }]
            }
        }
    });
    grunt.loadNpmTasks("grunt-contrib-uglify-es");
    grunt.registerTask("chat", ["uglify:chat"]);
    grunt.registerTask("beautify", ["uglify:beautify"]);
    grunt.registerTask("build", ["uglify:build"]);
};
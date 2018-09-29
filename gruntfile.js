module.exports = function (grunt) {

	/* Files loading order - Modules, Services, Models, Controllers, Directives, app.js */
	var _appJsFiles = [
		'src/**/*module.js',
		'src/**/services/*.js',
		'src/**/models/*.js',
		'src/**/directives/*.js',
		'src/**/controllers/*.js',
		'src/app-module.js',
		'src/app.js'
	];

	var _vendorJsFiles = [
		'node_modules/angular/angular.min.js'
	];

	var _appCssFiles = [
		'assets/css/app.css',
		'assets/css/search-box.css',
		'assets/css/user.css'
	];

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
				sourceMap: true,
				stripBanners: true,
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			concatAppJS: {
				src: _appJsFiles,
				dest: 'dist/js/<%= pkg.name %>.js'
			},
			concatVendorJS: {
				src: _vendorJsFiles,
				dest: 'dist/js/vendor.min.js'
			},
			concatAppCSS: {
				src: _appCssFiles,
				dest: 'dist/css/<%= pkg.name %>.css'
			}
		},
		uglify: {
			options: {
				sourceMap: true,
				sourceMapIn: 'dist/js/locus.js.map',
				sourceMapIncludeSources: true,
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */'
			},
			minifyAppJS: {
				src: 'dist/js/<%= pkg.name %>.js',
				dest: 'dist/js/<%= pkg.name %>.min.js'
			}
		},
		cssmin: {
			options: {
				sourceMap: true,
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			minifyCSS: {
				src: 'dist/css/<%= pkg.name %>.css',
				dest: 'dist/css/<%= pkg.name %>.min.css'
			}
		},
		processhtml: {
			processIndex: {
				src: 'index.html',
				dest: 'dist/index.html'
			}
		},
		htmlmin: {
			options: {
		        removeComments: true,
		        collapseWhitespace: true
			},
			minifyHtml: {
				expand: true,
				src: ['!node_modules', 'src/**/*.html'],
				dest: 'dist/'
			},
			minifyIndex: {
				src: 'dist/index.html',
				dest: 'dist/index.html'
			}
		},
		copy: {
			copyResources: {
				expand: true,
				src: ['!node_modules', 'assets/**/*.png', 'assets/**/*.ico', 'assets/**/*.json'],
				dest: 'dist/'
			}
		}
	});

	// Load the plugin that provides the "concatination" task.
	grunt.loadNpmTasks('grunt-contrib-concat');

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// Load the plugin that provides the "cssmin" task.
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	// Load the plugin that provides the "copy" task.
	grunt.loadNpmTasks('grunt-contrib-copy');

	// Load the plugin that provides the "htmlmin" task.
	grunt.loadNpmTasks('grunt-contrib-htmlmin');

	// Load the plugin that provides the "processhtml" task.
	grunt.loadNpmTasks('grunt-processhtml');

	// Default task(s).
	grunt.registerTask('default', ['concat', 'uglify', 'cssmin', 'processhtml', 'htmlmin', 'copy']);
};
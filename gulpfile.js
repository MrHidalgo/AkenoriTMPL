'use strict';


/* NPM PACKAGE */
var gulp        =   require('gulp'),
    browserSync =   require('browser-sync').create(),
    reload      =   browserSync.reload,
    del         =   require('del'),
	watch       =   require('gulp-watch');


/* OBJECT GULP PATH [module] */
var command     =   require('./gulpTemplate/gulp-command.js'),
	task        =   require('./gulpTemplate/gulp-task.js'),
	config      =   require('./gulpTemplate/gulp-config.js');



task.jadeMainTask(command.buildJade);

task.styleMainTask(command.buildScss);

task.mainScriptTask(command.buildScript);

task.imageSprites(command.sprites);

task.mainImageTask(command.buildImg);



/* WATCH FILES FOR RELOAD ---> 'gulp watch'*/
gulp.task(command.watch, function() {

    var srcWatchSCSS = ['./src/scss/**.scss', './src/scss/**/**.scss'];
    var srcWatchJADE = ['./src/jade/**.jade', './src/jade/**/**.jade'];
    var srcWatchJSON = ['./src/_data/*.json'];
    var srcWatchJS   = ['./src/js/**.js'];
    var srcWatchICON = ['./src/icons/**.png'];
    var srcWatchIMG  = ['./src/image/*'];


    watch(srcWatchSCSS, function() {
        gulp.start(command.buildScss)
    });
    watch(srcWatchJADE, function() {
        gulp.start(command.buildJade)
    });
    watch(srcWatchJS, function() {
        gulp.start(command.buildScript)
    });
    watch(srcWatchJSON, function() {
        gulp.start(command.buildJade)
    });
    watch(srcWatchICON, function() {
        gulp.start(command.sprites)
    });
    watch(srcWatchIMG, function() {
        gulp.start(command.buildImg);
    });
});


gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        },
        online      : true,
        notify      : true,
        port        : 1234,
        logPrefix   : 'FrontEnd Server'
    });
});


{
	gulp.task(command.build,
        config.mainConfig.build.arr
	);
}

{
    gulp.task(command.cleanImage, function() {
        del.sync('./src/image/*');
    });
}
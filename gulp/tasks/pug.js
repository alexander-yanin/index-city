module.exports = function() {
    $.gulp.task('pug', ()=>  {
        return $.gulp.src('./dev/pug/pages/*.pug')
            .pipe($.gp.pug({
                locals : {
                    nav: JSON.parse($.fs.readFileSync('./data/navigation.json', 'utf8')),
                    content: JSON.parse($.fs.readFileSync('./data/content.json', 'utf8')),
                    indexBanner: JSON.parse($.fs.readFileSync('./data/index/banner.json', 'utf8')),
                    filter: JSON.parse($.fs.readFileSync('./data/index/filter.json', 'utf8')),
                    axiom: JSON.parse($.fs.readFileSync('./data/housing_content/axiom_cart.json', 'utf8')),
                },
                pretty: true
            }))
            .on('error', $.gp.notify.onError(function(error) {
                return {
                    title: 'Pug',
                    message: error.message
                };
            }))
            .pipe($.gulp.dest('./build/'))
            .on('end', $.browserSync.reload);
    });
};

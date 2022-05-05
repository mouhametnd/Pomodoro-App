import g from 'gulp';
import gConcat from 'gulp-concat';
import gPostcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import htmlmin from 'gulp-htmlmin';

// css task
const postcssPlugins = [autoprefixer(), cssnano()];
g.task('css', () => g.src('./src/css/*.css').pipe(gConcat('styles-min.css')).pipe(gPostcss(postcssPlugins)).pipe(g.dest('./public')));

// html task
g.task('html', () => {
  return g
    .src('./src/index.html')
    .pipe(
      htmlmin({
        removeComments: true,
        // collapseWhitespace: true,
      })
    )
    .pipe(g.dest('./public'));
});

g.task('default', () => {
  g.watch('./src/css/styles.css', g.series('css'));
  g.watch('./src/index.html', g.series('html'));
});

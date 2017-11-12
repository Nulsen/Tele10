import babel from 'gulp-babel-simple-transpile';
import concat from 'gulp-concat';
import convertEncoding from 'gulp-convert-encoding';
import duration from 'gulp-duration';
import gulp from 'gulp';
import handlebars from 'gulp-compile-handlebars';
import htmlmin from 'gulp-html-minifier';
import rename from 'gulp-rename';
import sass from 'gulp-sass';
import order from 'gulp-order';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';
import yargs from 'yargs';

const argv = yargs.argv;

gulp.task('default', async function(done) {
	await buildJs();
	await buildScss();
	await buildHtml();

	if (argv.w) {
		console.log('\nWatching HTML...');
		gulp.watch('./html/**/*.handlebars', async() => {
			await buildHtml();
		});

		console.log('Watching JS...');
		gulp.watch('./js/**/*.js', async() => {
			await buildJs();
		});

		console.log('Watching SCSS...');
		gulp.watch('./scss/**/*.scss', async() => {
			await buildScss();
		});

	} else {
		done();
		process.exit();
	}
});

async function buildHtml(ext) {
	console.log('\nBuilding HTML...');

	await new Promise((resolve, reject) => {
		gulp.src('./html/*.handlebars')
			.pipe(htmlmin({
				collapseWhitespace: true,
				preserveLineBreaks: false,
				minifyCSS: true,
				minifyJS: true,
				ignoreCustomFragments: [/[\{]{2,3}(.*?)[\}]{2,3}/]
			}))
			.pipe(handlebars({}, {
				batch: ['./html/partials']
			}))
			.pipe(rename({
				extname: '.php'
			}))
			.pipe(gulp.dest('./dist'))
			.on('end', resolve);
	});

	console.log('HTML successfully built.');
}

async function buildJs(ext) {
	console.log(`\nBuilding script.js...`);

	await new Promise((resolve, reject) => {
		gulp.src('./js/**/*.js')
			.pipe(sourcemaps.init({ loadMaps: true }))
			.pipe(order([
				'vendor/jquery-3.2.1.min.js',
				'vendor/**/*.js',
				'modules/**/*.js',
			]))
			.pipe(babel({
				sourceMaps: true,
				presets: [
					['es2015', { modules: false }],
					'es2016',
				],
			}))
			.pipe(concat(`script.js`))
			.pipe(uglify())
			.pipe(sourcemaps.write())
			.pipe(duration(`script.js`))
			.pipe(gulp.dest('./dist/script'))
			.on('end', resolve);
	});

	console.log(`script.js succesfully built.`);
};

async function buildScss(ext) {
	console.log(`\nBuilding style.css...`);

	await new Promise((resolve, reject) => {
		gulp.src('./scss/style.scss')
			.pipe(sourcemaps.init())
			.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
			.pipe(rename(`style.css`))
			.pipe(sourcemaps.write())
			.pipe(duration(`style.css`))
			.pipe(gulp.dest('./dist/css'))
			.on('end', resolve);
	});

	console.log(`style.css succesfully built.`);
};
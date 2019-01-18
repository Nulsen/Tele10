const babel = require('gulp-babel');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const handlebars = require('gulp-compile-handlebars');
const order = require('gulp-order');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const { src, dest, parallel } = require('gulp');

sass.compiler = require('node-sass');

function html() {
	return src('src/html/*.hbs')
		.pipe(
			handlebars(
				{},
				{
					batch: ['./src/html/partials'],
				}
			)
		)
		.pipe(
			rename({
				extname: '.php',
			})
		)
		.pipe(dest('dist/html'));
}

function css() {
	return src('src/styles/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(cleanCSS({ compatibility: 'ie10' }))
		.pipe(rename('style.min.css'))
		.pipe(dest('dist/styles'));
}

function js() {
	return src('src/scripts/**/*.js', { sourcemaps: true })
		.pipe(order(['vendor/jquery-3.2.1.min.js', 'vendor/*.js', 'modules/*.js']))
		.pipe(
			babel({
				presets: ['@babel/env'],
			})
		)
		.pipe(concat('script.min.js'))
		.pipe(uglify())
		.pipe(dest('dist/scripts', { sourcemaps: true }));
}

exports.js = js;
exports.css = css;
exports.html = html;
exports.default = parallel(html, css, js);

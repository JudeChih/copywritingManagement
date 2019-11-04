const { mix } = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/assets/js/app.js', 'public/js')
   .js('resources/assets/js/bbinquestion.js', 'public/js')
   .js('resources/assets/js/bbosquestion.js', 'public/js')
   .js('resources/assets/js/language.js', 'public/js')
   .js('resources/assets/js/message.js', 'public/js')
   .js('resources/assets/js/field.js', 'public/js')
   .js('resources/assets/js/transaction.js', 'public/js')
   .js('resources/assets/js/batchimport.js', 'public/js')
   .js('resources/assets/js/user.js', 'public/js')
   .extract(['lodash','jquery','axios','vue'])
   .sass('resources/assets/sass/app.scss', 'public/css')
   .sass('resources/assets/sass/pages/bbinquestion.scss', 'public/css')
   .sass('resources/assets/sass/pages/bbosquestion.scss', 'public/css')
   .sass('resources/assets/sass/pages/language.scss', 'public/css')
   .sass('resources/assets/sass/pages/message.scss', 'public/css')
   .sass('resources/assets/sass/pages/field.scss', 'public/css')
   .sass('resources/assets/sass/pages/transaction.scss', 'public/css')
   .sass('resources/assets/sass/pages/user.scss', 'public/css')
   .sass('resources/assets/sass/pages/batchimport.scss', 'public/css')
   .sass('resources/assets/sass/base/style.scss', 'public/css');

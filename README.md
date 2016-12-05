Django Slick Admin Login
=========================

Custom-Branded Login Theme for [django-slick-admin](https://github.com/palmbeach-interactive/django-slick-admin)

Installation
-------------
Using this GitHub repository:

    pip install -e "git://github.com/palmbeach-interactive/django-slick-admin-login.git#egg=django-slick-admin-login"


Then add `django_slick_admin_login` to `INSTALLED_APPS`, after `django_slick_admin`. and before `django.contrib.admin`.


Customization
-------------

#### Template Adjustments
- Change Structure [login.html](https://github.com/palmbeach-interactive/django-slick-admin-login/blob/master/django_slick_admin_login/templates/admin/login.html) in your project template folder
- Replace static content [Brand Images](https://github.com/palmbeach-interactive/django-slick-admin-login/tree/master/django_slick_admin_login/static/django_slick_admin_login/img)


### Stylesheets

The stylesheets are based on *Sass* and are located in the [sass](https://github.com/palmbeach-interactive/django-slick-admin-login/tree/master/django_slick_admin_login/sass) folder of the repository.

The stylesheets defaults are based on the defaults of [django-slick-admin-styles](https://github.com/palmbeach-interactive/django-slick-admin-styles) and are needed as include path for compilation.

#### Quick & dirty way to compile stylesheets with adjusted settings

Install required npm modules:

    npm install -D https://github.com/palmbeach-interactive/django-slick-admin-styles
    npm install -D node-sass


Create a sass file - e.g. `custom-admin-login.sass` to override some defaults and import *django-slick-admin-styles*.
See [\_defaults.sass](https://github.com/palmbeach-interactive/django-slick-admin-styles/blob/master/sass/settings/_defaults.sass) for vailable settings.


    // custom-admin-styles.sass
    @charset "UTF-8"

    $login-background-gradient: linear-gradient(to top right,#e6f49f 10%, #8ceebe 65%, #69ebca 125%)
    $branding-links-color: #000


Run sass compiler (adjust output path according to your setup):

    ./node_modules/node-sass/bin/node-sass \
    --include-path ./node_modules/django-slick-admin-styles/sass \
    custom-admin-login.sass  \
    ./site-static/django_slick_admin_login/css/django-slick-admin-login.css


#### Integrate via Gulp tasks

Intall all needed npm packages:

    npm install

gulpfile.js:
See [gulpfile.js](https://github.com/palmbeach-interactive/django-slick-admin-login/blob/master/gulpfile.js) for reference.

    gulp.task('admin-styles', function () {
        return gulp.src([
                './sass/admin/custom.sass'
            ])
            .pipe(sass({
                includePaths: './node_modules/django-slick-admin-styles/sass/',
                outputStyle: 'expanded',
                precision: 10
            }))
            .pipe(autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
            .pipe(concat('django-slick-admin-login.css'))
            .pipe(gulp.dest('website/site-static/django_slick_admin_login/css/'))
    });


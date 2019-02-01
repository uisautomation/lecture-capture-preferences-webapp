import os
import sys

#: Base directory containing the project. Build paths inside the project via
#: ``os.path.join(BASE_DIR, ...)``.
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


#: The Django secret key is by default set from the environment. If omitted, a system check will
#: complain.
SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY')

#: SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

#: By default, no hosts are allowed.
ALLOWED_HOSTS = []

#: Installed applications
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'whitenoise.runserver_nostatic',  # use whitenoise even in development
    'django.contrib.staticfiles',

    'automationcommon',
    'ucamwebauth',
    'django_filters',
    'drf_yasg',
    'rest_framework',
    'rest_framework.authtoken',
    'ucamlookup',

    'preferences',
    'ui',
]

#: Installed middleware
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

#: Root URL patterns
ROOT_URLCONF = 'project.urls'

# Serve the frontend files from the application root.
FRONTEND_APP_BUILD_DIR = os.environ.get(
    'DJANGO_FRONTEND_APP_BUILD_DIR',
    os.path.abspath(os.path.join(BASE_DIR, 'ui', 'frontend', 'build'))
)

#: Template loading
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [FRONTEND_APP_BUILD_DIR],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

#: WSGI
WSGI_APPLICATION = 'project.wsgi.application'


#: Database configuration. The default settings allow configuration of the database from
#: environment variables. An environment variable named ``DJANGO_DB_<key>`` will override the
#: ``DATABASES['default'][<key>]`` setting.
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}


_db_envvar_prefix = 'DJANGO_DB_'
for name, value in os.environ.items():
    # Only look at variables which start with the prefix we expect
    if not name.startswith(_db_envvar_prefix):
        continue

    # Remove prefix
    name = name[len(_db_envvar_prefix):]

    # Set value
    DATABASES['default'][name] = value


#: Password validation
#:
#: .. seealso:: https://docs.djangoproject.com/en/2.0/ref/settings/#auth-password-validators
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


#: Internationalization
#:
#: .. seealso:: https://docs.djangoproject.com/en/2.0/topics/i18n/
LANGUAGE_CODE = 'en-gb'

#: Internationalization
TIME_ZONE = 'UTC'

#: Internationalization
USE_I18N = True

#: Internationalization
USE_L10N = True

#: Internationalization
USE_TZ = True

#: Static files (CSS, JavaScript, Images)
#:
#: .. seealso:: https://docs.djangoproject.com/en/2.0/howto/static-files/
STATIC_URL = '/static/'

#: Authentication backends
AUTHENTICATION_BACKENDS = [
    'ucamwebauth.backends.RavenAuthBackend',
    'django.contrib.auth.backends.ModelBackend',
]


# Raven login configuration

#: Allow the autocreation of users who have been successfully authenticated by
#: Raven but do not exist in the local database.
UCAMWEBAUTH_CREATE_USER = True

#: Redirect to this URL on log out
UCAMWEBAUTH_LOGOUT_REDIRECT = '/'

#: Allow members who are not current members to log in?
UCAMWEBAUTH_NOT_CURRENT = False

# Configure DRF to use Django's session authentication to determine the current user
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.TokenAuthentication',
    ],
}

# Allow all origins to access API.
CORS_URLS_REGEX = r'^/api/.*$'
CORS_ORIGIN_ALLOW_ALL = True

# By default we a) redirect all HTTP traffic to HTTPS, b) set the HSTS header to a maximum age
# of 1 year (as per the consensus recommendation from a quick Google search) and c) advertise that
# we are willing to be "preloaded" into Chrome and Firefox's internal list of HTTPS-only sites.
# Set the DANGEROUS_DISABLE_HTTPS_REDIRECT variable to any non-blank value to disable this.
if os.environ.get('DANGEROUS_DISABLE_HTTPS_REDIRECT', '') == '':
    # Exempt the healtch-check endpoint from the HTTP->HTTPS redirect.
    SECURE_REDIRECT_EXEMPT = ['^healthz/?$']

    SECURE_SSL_REDIRECT = True
    SECURE_HSTS_SECONDS = 31536000  # == 1 year
    SECURE_HSTS_PRELOAD = True
else:
    print('Warning: HTTP to HTTPS redirect has been disabled.', file=sys.stderr)

# We also support the X-Forwarded-Proto header to detect if we're behind a load balancer which does
# TLS termination for us. In future this setting might need to be moved to settings.docker or to be
# configured via an environment variable if we want to support a wider range of TLS terminating
# load balancers.
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
STATIC_ROOT = os.environ.get('DJANGO_STATIC_ROOT', os.path.join(BASE_DIR, 'build', 'static'))

# If the build directory for the frontend actually exists, serve files for the root of the
# application from it. Print a warning otherwise.
if os.path.isdir(FRONTEND_APP_BUILD_DIR):
    WHITENOISE_ROOT = FRONTEND_APP_BUILD_DIR
else:
    print('Warning: FRONTEND_APP_BUILD_DIR does not exist. The frontend will not be served',
          file=sys.stderr)

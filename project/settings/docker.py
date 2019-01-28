import os

# Import settings from the base settings file
from .base import *  # noqa: F401, F403

# Ensure that DEBUG is not set
DEBUG = False

# All hosts are allowed to connect to the container by default
ALLOWED_HOSTS = os.environ.get('DJANGO_ALLOWED_HOSTS', '*').split(',')

# Logging
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': ('%(levelname)s %(asctime)s %(pathname)s:%(lineno)d '
                       '%(funcName)s "%(message)s"')
        },
        'simple': {
            'format': '%(levelname)s "%(message)s"'
        },
    },
    'handlers': {
        'console': {
            'level': 'INFO',
            'class': 'logging.StreamHandler',
            'formatter': 'verbose',
        },
    },
    'loggers': {
        '': {
            'handlers': ['console'],
            'propagate': True,
            'level': 'INFO'
        },
    }
}

Django project configuration
============================

The :py:mod:``project`` module contains top-level
configuration and URL routes for the entire web application.

Settings
--------

Django settings for |project|.

.. _settings:

Generic settings
````````````````

.. automodule:: project.settings
    :members:

.. _settings_testsuite:

Test-suite specific settings
````````````````````````````

.. automodule:: project.settings.tox
    :members:

.. _settings_developer:

Developer specific settings
```````````````````````````

.. automodule:: project.settings.developer
    :members:

Custom test suite runner
------------------------

The :any:`test suite settings <settings_testsuite>` overrides the
``TEST_RUNNER`` setting to point to
:py:class:`~project.test.runner.BufferedTextTestRunner`.
This runner captures output to stdout and stderr and only reports the output if
a test fails. This helps make our tests a little less noisy.

.. autoclass:: project.test.runner.BufferedDiscoverRunner

.. autoclass:: project.test.runner.BufferedTextTestRunner

Developer's guide
=================

This section contains information on how to perform various task and an overview
of how our development infrastructure is set up.

Local development
-----------------

These tasks are usually performed on an individual developer's machine.

.. _run-tests:

Run the test suite
``````````````````

The `tox <https://tox.readthedocs.io/>`_ automation tool is used to run tests
inside their own virtualenv. This way we can be sure that we know which packages
are required to run the tests. By default tests are run in a Postgres database
created by docker-compose. Other databases can be used by setting the
``DJANGO_DB_...`` environment variables. See :any:`database-config`.

.. code-block:: bash

    $ ./tox.sh

By default, ``tox`` will run the test suite using the version of Python used
when we deploy and will compile a local version of the documentation. The ``-e``
flag may be used to explicitly specify an environment to run. For example, to
build only the documentation:

.. code-block:: bash

    $ ./tox.sh -e doc

.. _toxenvs:

tox environments
````````````````

The following tox environments are available.

py3
    Run by default. Launch the test suite under Python 3. Generate a
    code-coverage report and display a summary coverage report.

doc
    Run by default. Build documentation and write it to the ``build/doc/``
    directory.

flake8
    Run by default. Check for code-style violations using the `flake8
    <http://flake8.pycqa.org/>`_ linter.

manage
    Run ``manage.py`` management commands.

.. _devserver:

Run the development server
``````````````````````````

Django comes with a development web server which can be run via:

.. code-block:: bash

    $ ./compose.sh development

The server should now be browsable at http://localhost:8000/.

Building the documentation
``````````````````````````

This documentation may be built using the "doc" :any:`tox environment
<toxenvs>`.

Docker images
-------------

The application is deployed using `Docker
<https://docker.com/>`_ containers on the Google Container Engine. Usually one
can just use the :any:`local development server <devserver>` to develop the
application but occasionally one needs to test the container or make use of the
same PostgreSQL database which is used in production.

Cloud infrastructure
--------------------

This section provides a brief outline of cloud infrastructure for development.

Source control
``````````````

The source code is hosted on GitHub at
https://github.com/uisautomation/lecture-capture-preferences-webapp.
The repository has ``master`` set up to be writeable only via pull request. It
is intended that local development happens in personal forks and is merged via
pull request. The main rationale for this is a) it guards against accidentally
``git push``-ing the wrong branch and b) it reduces the number of "dangling"
branches in the main repository.

.. _travisci:

Unit tests
``````````

The project is set up on `Circle CI <https://circleci.com/>`_ to automatically
run unit tests and build documentation on each commit to a branch and on each
pull request.

.. note::

    By logging into Circle CI via GitHub, you can enable Circle CI for your
    personal fork. This is **highly recommended** as you'll get rapid feedback
    via email if you push a commit to a branch which does not pass the test
    suite.

In order to better match production, Travis CI is set up to run unit tests using
the PostgreSQL database and *not* sqlite. If you only run unit tests locally
with sqlite then it is possible that some tests may fail.

Code-coverage
`````````````

Going to `CodeCov <https://codecov.io/>`_, logging in with GitHub and adding the
``preferences`` repository will start code coverage reporting on pull-requests.

Code-style
``````````

The ``tox`` test runner will automatically check the code with `flake8
<http://flake8.pycqa.org/>`_ to ensure PEP8 compliance. Sometimes, however,
rules are made to be broken and so you may find yourself needing to use the
`noqa in-line comment
<http://flake8.pycqa.org/en/latest/user/violations.html#in-line-ignoring-errors>`_
mechanism to silence individual errors.

To run the flake8 tests manually, specify the tox environment:

.. code:: bash

    $ ./tox.sh -e flake8

from __future__ import print_function
from setuptools import setup, find_packages
from setuptools.command.test import test as TestCommand
import io
import os
import sys

here = os.path.abspath(os.path.dirname(__file__))


def read(*filenames, **kwargs):
    encoding = kwargs.get('encoding', 'utf-8')
    sep = kwargs.get('sep', '\n')
    buf = []
    for filename in filenames:
        with io.open(filename, encoding=encoding) as f:
            buf.append(f.read())
    return sep.join(buf)

long_description = read('README.md')


class PyTest(TestCommand):
    def finalize_options(self):
        TestCommand.finalize_options(self)
        self.test_args = []
        self.test_suite = True

    def run_tests(self):
        import pytest
        errcode = pytest.main(self.test_args)
        sys.exit(errcode)

setup(
    name='leaf_recognition',
    version='0.9',
    url='http://github.com/xudshen/leaf_recognition/',
    license='MIT License',
    author='Xudong Shen',
    author_email='xudshen@hotmail.com',
    description='leaf_recognition for paper',
    long_description=long_description,

    platforms='any',
    #tests_require=['pytest'],
    install_requires=['redis>=2.8.6',],
    cmdclass={'test': PyTest},

    packages=find_packages(),
    include_package_data=True,

    #test_suite='sandman.test.test_sandman',
    classifiers = [
        'Programming Language :: Python',
        'Development Status :: 4 - Beta',
        'Natural Language :: English',
        ],
    extras_require={
    #    'testing': ['pytest'],
    }
)
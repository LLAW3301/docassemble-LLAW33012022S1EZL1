import os
import sys
from setuptools import setup, find_packages
from fnmatch import fnmatchcase
from distutils.util import convert_path

standard_exclude = ('*.pyc', '*~', '.*', '*.bak', '*.swp*')
standard_exclude_directories = ('.*', 'CVS', '_darcs', './build', './dist', 'EGG-INFO', '*.egg-info')
def find_package_data(where='.', package='', exclude=standard_exclude, exclude_directories=standard_exclude_directories):
    out = {}
    stack = [(convert_path(where), '', package)]
    while stack:
        where, prefix, package = stack.pop(0)
        for name in os.listdir(where):
            fn = os.path.join(where, name)
            if os.path.isdir(fn):
                bad_name = False
                for pattern in exclude_directories:
                    if (fnmatchcase(name, pattern)
                        or fn.lower() == pattern.lower()):
                        bad_name = True
                        break
                if bad_name:
                    continue
                if os.path.isfile(os.path.join(fn, '__init__.py')):
                    if not package:
                        new_package = name
                    else:
                        new_package = package + '.' + name
                        stack.append((fn, '', new_package))
                else:
                    stack.append((fn, prefix + name + '/', package))
            else:
                bad_name = False
                for pattern in exclude:
                    if (fnmatchcase(name, pattern)
                        or fn.lower() == pattern.lower()):
                        bad_name = True
                        break
                if bad_name:
                    continue
                out.setdefault(package, []).append(prefix+name)
    return out

setup(name='docassemble.LLAW33012022S1EZL1',
      version='0.0.1',
      description=('A client intake app for Ezra Legal'),
      long_description='# EL1 – Client Intake App\r\n\r\n> A smart client intake app for Ezra Legal\r\n\r\n## About\r\n\r\nThis web application streamlines the initial intake process for the legal firm Ezra Legal and their clients. Ezra is able to obtain vital preliminary information and documents prior to the initial face-to-face meeting, and their clients have access to a modern, highly accessible web app that intelligently guides them through questions (in plain and familiar language) to provide information required for identifying the legal issue and providing effective services. \r\n\r\n## Authors\r\n\r\nSirage Tarakji (Lead Developer) - (tara0044@flinders.edu.au)\r\nAislin Gawler\r\nAleyna Aydin\r\nJaskirat Singh\r\nMadeleine Charles\r\nTyson Seedsman\r\n\r\n',
      long_description_content_type='text/markdown',
      author='Sirage Tarakji',
      author_email='tara0044@flinders.edu.au',
      license='The MIT License (MIT)',
      url='https://docassemble.org',
      packages=find_packages(),
      namespace_packages=['docassemble'],
      install_requires=[],
      zip_safe=False,
      package_data=find_package_data(where='docassemble/LLAW33012022S1EZL1/', package='docassemble.LLAW33012022S1EZL1'),
     )


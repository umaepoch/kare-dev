# -*- coding: utf-8 -*-
from setuptools import setup, find_packages

with open('requirements.txt') as f:
	install_requires = f.read().strip().split('\n')

# get version from __version__ variable in kare_dev/__init__.py
from kare_dev import __version__ as version

setup(
	name='kare_dev',
	version=version,
	description='App for managing Articles, Members, Memberships and Transactions for Libraries',
	author='Yashwanth A N',
	author_email='yashwanth@meritsystems.com',
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)

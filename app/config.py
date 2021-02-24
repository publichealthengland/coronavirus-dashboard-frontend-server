#!/usr/bin python3

# Imports
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
# Python:
from dataclasses import dataclass
from os import getenv, path

# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

dir_name = path.dirname(__file__)
templates_dir = path.join(dir_name, "templates")


@dataclass
class Settings:
    TESTING = getenv("IS_DEV", "0") == "1"
    DEBUG = getenv("IS_DEV", "0") == "1"
    template_path = templates_dir


class Config(object):
    TESTING = Settings.TESTING
    DEBUG = Settings.DEBUG
    SECRET_KEY = getenv('FLASK_SECRET_KEY')
    APPLICATION_ROOT = "/"

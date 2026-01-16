import logging
import time

import boto3

from jinja2 import Template


MAX_PAGES = 10
DEFAULT_BASE_URL = 'getthirstie.com'

#!/usr/bin python3

# Imports
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
# Python:
import re
from operator import itemgetter
from typing import List, Dict, Union
from functools import lru_cache

# 3rd party:
from flask import current_app as app

# Internal:
# from ..common.caching import cache_client
from ..common.data.queries import get_last_fortnight, change_by_metric
from ..common.visualisation import plot_thumbnail, get_colour
from ..common.data.variables import DestinationMetrics

# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

postcode_pattern = re.compile(r'(^[a-z]{1,2}\d{1,2}[a-z]?\s?\d{1,2}[a-z]{1,2}$)', re.I)
get_value = itemgetter("value")


@lru_cache(maxsize=256)
def get_validated_postcode(postcode: str) -> Union[str, None]:
    found = postcode_pattern.search(postcode.strip())

    if found is not None:
        extract = found.group(0).replace(" ", "").upper()
        return extract

    return None

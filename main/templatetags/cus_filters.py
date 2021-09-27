"""
Utilities custom filters
"""
from datetime import datetime

import dateutil.parser
from django import template

register = template.Library()


@register.filter
def loop_range(from_val, to_val):
    return range(from_val, to_val + 1)


@register.filter
def get_name(person):
    middle_name = person.get('middle_name', '')
    full_name = "%s %s %s" % (person.get('first_name', ''),
                              middle_name[0] + '.' if middle_name != '' else '',
                              person.get('last_name', ''))
    return full_name.title()


@register.filter
def get_schedule_string(date_from, date_to):
    _from = dateutil.parser.isoparse(date_from)
    _to = dateutil.parser.isoparse(date_to)
    full_schedule = "%s %s-%s" % (
        datetime.strftime(_from, '%B, %d %Y'),
        datetime.strftime(_from, '%I:%M%p'),
        datetime.strftime(_to, '%I:%M%p'),
    )
    return full_schedule

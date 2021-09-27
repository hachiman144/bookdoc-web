"""
Utilities custom tags
"""
from django import template
from django.conf import settings
from django.utils.html import format_html
from django.contrib.humanize.templatetags.humanize import intcomma
import uuid
from django.utils import timezone
from datetime import datetime

register = template.Library()


@register.simple_tag
def site_url():
    """
    Returns site url
    :return:
    """
    return settings.BASE_URL
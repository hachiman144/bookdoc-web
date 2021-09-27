"""
Main Services Views
"""
import requests

from bookdoc_web import settings


def post_appointment(request, data):
    """
    Posting of Expenditure
    :param request:
    :param data:
    :return:
    """
    # headers = get_request_headers(request)

    url = '{}{}'.format(settings.API_URL, 'appointment/')
    response = requests.post(url, data=data)

    return response


def patch_appointment(request, data, appointment_id):
    """
    Updating of appointment
    :param appointment_id:
    :param request:
    :param data:
    :return:
    """
    # headers = get_request_headers(request)

    url = '{}{}'.format(settings.API_URL, 'appointment/%s/' % appointment_id)
    response = requests.patch(url, data=data)

    return response


def delete_appointment(request, data, appointment_id):
    """
    Updating of appointment
    :param appointment_id:
    :param request:
    :param data:
    :return:
    """
    # headers = get_request_headers(request)

    url = '{}{}'.format(settings.API_URL, 'appointment/%s/' % appointment_id)
    response = requests.delete(url, data=data)

    return response


def get_appointment_list(request, params):
    """
    Get list of appointments
    :param params:
    :param request:
    :return:
    """
    # headers = get_request_headers(request)

    url = '{}{}'.format(settings.API_URL, 'appointment/')
    response = requests.get(url, params=params)

    return response


def get_appointment(request, appointment_id):
    """
    Get appointment
    :param params:
    :param request:
    :return:
    """
    # headers = get_request_headers(request)

    url = '{}{}{}'.format(settings.API_URL, 'appointment/', appointment_id)
    response = requests.get(url)

    return response

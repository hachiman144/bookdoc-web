from django.http import JsonResponse

from main.services import post_appointment, patch_appointment, delete_appointment


def ajax_create_appointment(request):
    """
    Ajax request to add appointment
    :param request:
    :return:
    """
    response = dict()
    success = False
    message = 'An error occurred! Please try again later.'

    data = request.POST

    # Assemble Time here
    date_from = "%s %s" % (data.get('date', ''), data.get('time_from', ''))
    date_to = "%s %s" % (data.get('date', ''), data.get('time_to', ''))

    post_data = {
        'first_name': data.get('first_name', ''),
        'middle_name': data.get('middle_name', ''),
        'last_name': data.get('last_name', ''),
        'date_from': date_from,
        'date_to': date_to,
        'comment': data.get('comment', ''),
    }

    response = post_appointment(request, post_data)

    try:
        response_data = response.json()
        if response.status_code in range(200, 299):
            success = True
            message = response_data['message']
        else:
            message = response_data['error']['generic']
    except Exception as e:
        print(e)

    response = {
        'success': success,
        'message': message,
    }
    return JsonResponse(response)


def ajax_update_appointment(request):
    """
     Ajax request to edit appointment
    :param request:
    :return:
    """

    response = dict()
    success = False
    message = 'An error occurred! Please try again later.'

    data = request.POST

    # Assemble Time here
    date_from = "%s %s" % (data.get('date', ''), data.get('time_from', ''))
    date_to = "%s %s" % (data.get('date', ''), data.get('time_to', ''))

    patch_data = {
        'first_name': data.get('first_name', ''),
        'middle_name': data.get('middle_name', ''),
        'last_name': data.get('last_name', ''),
        'date_from': date_from,
        'date_to': date_to,
        'comment': data.get('comment', ''),
    }

    response = patch_appointment(request, patch_data, data.get('id'))

    try:
        response_data = response.json()

        if response.status_code in range(200, 299):
            success = True
            message = response_data['message']
        else:
            message = response_data['error']['generic']
    except Exception as e:
        print(e)

    response = {
        'success': success,
        'message': message,
    }
    return JsonResponse(response)


def ajax_delete_appointment(request):
    """
    Ajax request to delete appointment
    :param request:
    :return:
    """
    response = dict()
    success = True
    message = 'An error occurred! Please try again later.'

    data = request.POST

    post_data = {
        'status': 'archived'
    }

    response = delete_appointment(request, post_data, data.get('appointment_id'))

    try:
        if response.status_code in range(200, 299):
            success = True
            message = "Appointment Successfully deleted!"
        else:
            message = "Appointment not deleted Successfully."
    except Exception as e:
        print(e)

    response = {
        'success': success,
        'message': message,
    }
    return JsonResponse(response)

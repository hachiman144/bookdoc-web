from django.shortcuts import render

from main.services import get_appointment


def modal_create_appointment(request):
    """
    Create Modal
    :param request:
    :return:
    """
    context = dict()

    return render(request, 'modals/modal_create_appointment.html', context)


def modal_update_appointment(request):
    """
    Update Modal
    :param request:
    :return:
    """
    context = dict()
    data = request.GET

    if data.get('id') != '':
        response = get_appointment(request, data.get('id'))

        if response.status_code in range(200, 299):
            response_data = response.json()
            context['data'] = response_data

    return render(request, 'modals/modal_update_appointment.html', context)


def modal_delete_appointment(request):
    """
    Sample Modal
    :param request:
    :return:
    """
    context = dict()

    query_params = request.GET
    context.update({
        "appointment_id": request.GET.get('id'),
    })
    return render(request, 'modals/modal_delete_appointment.html', context)

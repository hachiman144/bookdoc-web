from main.services import get_appointment_list
from django.shortcuts import render


def subpage_appointment_list(request):
    """
    Subpage for expenditure table
    :param request:
    :return:
    """
    template = 'subpages/subpage-appointment-list.html'
    data = request.GET
    success = False
    response_data = None


    params = {
        'page': data.get('page', 1),
        'name': data.get('name', ''),
        'date_from': data.get('date_from', ''),
        'date_to': data.get('date_to', ''),
    }

    response = get_appointment_list(request, params)

    if response.status_code in range(200, 299):
        response_data = response.json()
        success = True

    context = {
        'success': success,
        'data': response_data
    }
    return render(request, template_name=template, context=context)
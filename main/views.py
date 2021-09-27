from django.shortcuts import render


# Create your views here.
def index(request):
    """
    Index Page
    """

    template_name = 'pages/dashboard.html'
    context = {
        'page': 'DASHBOARD',
        'header': 'DASHBOARD',
    }
    return render(request, template_name, context)


from django.conf.urls import url

from main import views, views_subpage, views_modal, views_ajax

app_name = 'main'
urlpatterns = []

urlpatterns += [
    # START OF MAINS
    url(r'^$', views.index, name='dashboard'),

    # START OF SUBPAGES
    url(r'^subpages/appointments/$', views_subpage.subpage_appointment_list,
        name='subpage_appointment_list'),

    # START OF MODALS
    url(r'^modal/create/appointment/$', views_modal.modal_create_appointment, name='modal_create_appointment'),
    url(r'^modal/update/appointment/$', views_modal.modal_update_appointment, name='modal_update_appointment'),
    url(r'^modal/delete/appointment/$', views_modal.modal_delete_appointment, name='modal_delete_appointment'),

    # START OF AJAX
    url(r'^ajax/create/appointment/$', views_ajax.ajax_create_appointment, name='ajax_create_appointment'),
    url(r'^ajax/update/appointment/$', views_ajax.ajax_update_appointment, name='ajax_update_appointment'),
    url(r'^ajax/delete/appointment/$', views_ajax.ajax_delete_appointment, name='ajax_delete_appointment'),
]
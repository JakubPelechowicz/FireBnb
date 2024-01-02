from django.urls import path
from .views import CreateView,IndexView
urlpatterns = [
    path('create/',CreateView.as_view()),
    path('<bnb_id>/',IndexView.as_view())
]

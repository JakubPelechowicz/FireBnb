from django.urls import path
from .views import CreateView,LoginView,MeView,UpdateView,DeleteView
urlpatterns = [
    path('user/create',CreateView.as_view()),
    path('auth/login',LoginView.as_view()),
    path('auth/me',MeView.as_view()),
    path('user/update',UpdateView.as_view()),
    path('user/delete',DeleteView.as_view())
]

from django.urls import path
from .views import CreateView,UpdateView,DeleteView,ListView,IndexView
urlpatterns = [
    path('create',CreateView.as_view()),
    path('update',UpdateView.as_view()),
    path('delete/<id>',DeleteView.as_view()),
    path('list',ListView.as_view()),
    path('<id>',IndexView.as_view()),

]

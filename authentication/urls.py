# from django.contrib import admin
# from django.urls import path, include
# from .import views

# urlpatterns = [
#     path('', views.home,name="home" ),
#     path('Signup', views.Signup,name="Signup" ),
#     path('Signin', views.Signin,name="Signin" ),
#     path('Signout', views.Signout,name="Signout" ),
# ]
from django.urls import path # type: ignore
from django.contrib import admin # type: ignore
from .views import register, login_view, logout_view

urlpatterns = [
  
    path('register/', register, name='register'),
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
     path('submit-review/', submit_review, name='submit-review'),
    path('fetch-reviews/', fetch_reviews, name='fetch-reviews'),
  
]




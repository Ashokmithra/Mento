from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login/", views.login_view, name="login"),
    path("logout/", views.logout_view, name="logout"),
    path("register/", views.register, name="register"),
    path("profile/post/<str:name>", views.profile, name="profile"),
    path("profile/<str:name>", views.profile_post, name="profile_post"),
    path("all_mentor", views.mentor, name="all_mentor"),
    path("update/<int:name>", views.update, name="update"),
    path("to_user/<str:name>", views.request, name="request"),
    path("mentor_reject/<str:name>", views.mentor_reject, name="mentor_reject"),
    path("accept/<int:name>", views.mentor_accept, name="mentor_accept"),
    path("student_list/<int:id>", views.student_display, name="student_display"),
    path("mentor_list/<int:id>", views.mentor_display, name="mentor_display"),
    path("fill", views.post_information, name="post_informations"),
    path("message/<str:message>", views.send_message, name="send_message"),
    path("unique/<int:id>", views.unique_message, name="unique_message")
]

from django.contrib import admin

from .models import User, Profile_mentor, Profile_student, Relationship, Information
# Register your models here.

admin.site.register(User)
admin.site.register(Profile_student)
admin.site.register(Profile_mentor)
admin.site.register(Relationship)
admin.site.register(Information)

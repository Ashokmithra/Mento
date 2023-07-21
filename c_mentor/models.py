from django.core.checks import messages
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.base import Model
from django.db.models.deletion import CASCADE

# Create your models here.


class User(AbstractUser):
    USER_TYPE_CHOICES = (
        ('Null', 'Null'),
        ('Student', 'Student'),
        ('Mentor', 'Mentor')
    )
    user_type = models.CharField(
        max_length=10, choices=USER_TYPE_CHOICES, default=0)
    accept = models.BooleanField(default=False, blank=False)

    def serialize(self):
        return {
            "name": self.username,
            "email": self.email,
            "id": self.id
        }


class Profile_mentor(models.Model):
    user = models.ForeignKey(
        User, on_delete=CASCADE, related_name="musers")
    image_mentor = models.URLField(
        help_text="Post the url of the image", max_length=300)
    qualification = models.CharField(max_length=200, default="Not Defined")
    specilization = models.CharField(
        max_length=300, help_text="Your special talent:Example-Hacker")
    job = models.CharField(max_length=200)
    company_name = models.CharField(max_length=200)
    pay = models.CharField(max_length=50, default=0)
    students = models.ManyToManyField(
        User, related_name='student', blank=True)
    description = models.CharField(max_length=300, default="")

    def stud(self):
        return self.students.all()

    def serialize(self, user):
        return {
            "id": self.user.id,
            "url": self.image_mentor,
            "name": self.user.username,
            "email": self.user.email,
            "qualify": self.qualification,
            "pay": self.pay,
            "special": self.specilization,
            "job": self.job,
            "company": self.company_name,
            "description": self.description,
        }

    def __str__(self):
        return self.user.username


class Profile_student(models.Model):
    s_user = models.ForeignKey(
        User, on_delete=CASCADE, related_name="susers", default=2)
    education = models.CharField(max_length=150)
    image_student = models.URLField(
        help_text="Post the url of the image", max_length=300)
    school = models.CharField(max_length=100)
    mentors = models.ManyToManyField(User, related_name='mentors', blank=True)

    def studies(self, users):
        return self.users.mentors.all()

    def stud(self):
        return self.mentors.all()

    def __str__(self):
        return self.s_user.username


class Relationship(models.Model):
    sender = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='sender_student')
    receiver = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='reciver_mentor')
    STATUS_CHOICE = (
        ('send', 'send'),
        ('accepted', 'accepted')
    )
    status = models.CharField(
        max_length=15, choices=STATUS_CHOICE, default="send")

    def __str__(self):
        return f"{self.sender}-{self.receiver}-{self.status}"

    def serialize(self, user):
        return {
            "sender": self.sender.username,
            "receiver": self.receiver.username,
            "status": self.status,
            "idd": self.sender.id
        }


class Information(models.Model):
    user = models.ForeignKey(
        User, max_length=50, on_delete=models.CASCADE, related_name="info_user")
    sender = models.ForeignKey(
        User, max_length=50, on_delete=models.CASCADE, related_name="info_sender")
    receiver = models.ForeignKey(
        User, max_length=50, on_delete=models.CASCADE, related_name="info_receiver")
    message = models.TextField(default=" ")
    time = models.CharField(max_length=50, default=" ")
    is_seen = models.BooleanField(default=False)

    def serialize(self):
        return {
            "id": self.id,
            "current_user": self.user.username,
            "message": self.message,
            "sender": self.sender.username,
            "receiver": self.receiver.username,
            "seen": self.is_seen,
            "time": self.time
        }

    class Meta:
        ordering = ['-time', ]

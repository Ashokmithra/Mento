from django.core.checks import messages
from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponseRedirect, JsonResponse, HttpResponse
from django.shortcuts import redirect, render
from django.urls import reverse
# from django.views.decorators import csrf
from .models import Relationship, User, Profile_mentor, Profile_student, Information
import json
from datetime import datetime
from django.views.decorators.csrf import csrf_exempt

# Create your views here.


def index(request):
    if request.user.is_authenticated:
        return render(request, "c_mentor/index.html")
    else:
        return HttpResponseRedirect(reverse("login"))


def login_view(request):
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password,)
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "c_mentor/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "c_mentor/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        category = request.POST["user_type"]

        if password != confirmation:
            return render(request, "c_mentor/register.html", {
                "message": "Passwords must match."
            })
        try:
            user = User.objects.create_user(
                username, email, password, user_type=category)
            user.save()
        except IntegrityError:
            return render(request, "c_mentor/register.html", {
                "message": "Username already taken."
            })
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "c_mentor/register.html")


@csrf_exempt
def profile(request, name):
    print(name)
    users = User.objects.get(username=name)
    if request.method != 'POST':
        return JsonResponse({"error": "POST request required."}, status=400)
    if request.method == 'POST':
        deatils = json.loads(request.body)
        print(deatils)
        if (users.user_type == "Mentor"):
            try:
                checks = Profile_mentor.objects.get(user=users)
                print(checks)
                c = True
            except Profile_mentor.DoesNotExist:
                c = False
            if (deatils['url']):
                image_mentor = deatils["url"]
            else:
                image_mentor = "https://britz.mcmaster.ca/images/nouserimage.gif/image"
            if (c):
                pict = checks
                pict.qualification = deatils["qualification"]
                pict.image_mentor = image_mentor
                pict.specilization = deatils["special"]
                pict.job = deatils["job"]
                pict.company_name = deatils["company"]
                pict.pay = deatils["pay"]
                pict.description = deatils["desc"]
            else:
                pict = Profile_mentor(
                    user=request.user,
                    qualification=deatils["qualification"],
                    image_mentor=image_mentor,
                    specilization=deatils["special"],
                    job=deatils["job"],
                    company_name=deatils["company"],
                    pay=deatils["pay"],
                    description=deatils["desc"]
                )
            pict.save()
        else:
            try:
                check1 = Profile_student.objects.get(s_user=users)
                c = True
            except Profile_student.DoesNotExist:
                c = False
            if (deatils['url']):
                image_student = deatils["url"]
            else:
                image_student = "https://britz.mcmaster.ca/images/nouserimage.gif/image"
            if (c):
                pict = check1
                pict.education = deatils["education"]
                pict.school = deatils["school"]
                pict.image_student = image_student
            else:
                pict = Profile_student(
                    s_user=request.user,
                    education=deatils["education"],
                    school=deatils["school"],
                    image_student=image_student
                )
            pict.save()
        return JsonResponse({"message": "Data sent successfully."}, status=201)


@csrf_exempt
def profile_post(request, name):
    user = User.objects.get(username=name)
    req_user = User.objects.get(username=request.user)
    try:
        check = Relationship.objects.get(sender=req_user, receiver=user)
        print(check)
        r = True
    except Relationship.DoesNotExist:
        r = False

    try:
        check = Relationship.objects.get(sender=req_user)
        raw = True
    except Relationship.DoesNotExist:
        raw = False

    if (user.user_type == "Mentor"):
        try:
            user_deatil = Profile_mentor.objects.get(user=user)
            if request.user in user_deatil.students.all() and req_user.accept:
                z = "accepted"
            elif (raw):
                z = "Cant"
            elif (raw == False):
                z = "sending"

            if (r):
                sa = "re"
            else:
                sa = "Cant"

            return JsonResponse({
                'name':  user_deatil.user.username,
                'email': user_deatil.user.email,
                'qualify': user_deatil.qualification,
                'url': user_deatil.image_mentor,
                'company': user_deatil.company_name,
                'special': user_deatil.specilization,
                "job": user_deatil.job,
                "id": user_deatil.id,
                "description": user_deatil.description,
                "pay": user_deatil.pay,
                'logic': '0',
                "user_id": user_deatil.user.id,
                "check": raw,
                "accept": z,
                "const": sa,
                "mentor_add_student": user_deatil.students.count()
            })
        except Profile_mentor.DoesNotExist:
            return JsonResponse({
                "Error": "Fill the form to display profile",
                "logic": "1",
                "name": user.username
            })
    else:
        try:
            user_deatil = Profile_student.objects.get(s_user=user)
            print(user_deatil, " ")
            return JsonResponse({
                "id": user_deatil.id,
                'name': user_deatil.s_user.username,
                'email': user_deatil.s_user.email,
                'education': user_deatil.education,
                'url': user_deatil.image_student,
                'school': user_deatil.school,
                'logic': '0',
                "user_id": user_deatil.s_user.id
            })
        except Profile_student.DoesNotExist:
            return JsonResponse({
                "Error": "Fill  the form to display profile",
                "logic": "1",
                "name": user.username
            })


@csrf_exempt
def mentor(request):
    all_mentor = Profile_mentor.objects.all()
    print(all_mentor)
    return JsonResponse({'mentors': [p.serialize(request.user) for p in all_mentor]})


@csrf_exempt
def update(request, name):
    print(name)
    check = User.objects.get(username=request.user)

    try:

        profile = Profile_mentor.objects.get(user=name)
        wrong = User.objects.get(id=name)
        s_profile = Profile_student.objects.get(s_user=request.user)
    except Profile_student.DoesNotExist or Profile_mentor.DoesNotExist or Relationship.DoesNotExist:
        return JsonResponse({"Error": True})
    try:
        relate = Relationship.objects.get(
            sender=check, receiver=wrong, status="send")
        js = True
    except Relationship.DoesNotExist:
        js = False
    print(check.accept)
    print(profile.user)
    print(s_profile)
    if profile in request.user.student.all():
        new = False
        check.accept = False
        profile.students.remove(request.user)
        s_profile.mentors.remove(profile.user)
        relate = Relationship.objects.filter(
            sender=check, receiver=wrong)
        relate.delete()
        check.save()
        profile.save()
        s_profile.save()
        return JsonResponse({"major": new, "mentor_add_student": profile.students.count(), "minor": True, "Error": False})
    elif js:
        new = False
        relate.delete()
        return JsonResponse({"major": new, "mentor_add_student": profile.students.count(), "minor": False, "Error": False})
    else:
        new = True
        print(check.accept, ",", check.username)
        if (check.accept):
            minor_new = True
            profile.students.add(request.user)
            s_profile.mentors.add(profile.user)
            relate = Relationship.objects.update(
                sender=check, receiver=wrong, status="accepted")
        else:
            try:
                relate = Relationship.objects.get(
                    sender=check, receiver=wrong, status="send")
                relate.delete()
            except Relationship.DoesNotExist:
                relate = Relationship.objects.create(
                    sender=check, receiver=wrong, status="send")
            minor_new = False
        relate.save()
        profile.save()
        s_profile.save()
        return JsonResponse({"major": new, "mentor_add_student": profile.students.count(), "minor": minor_new, "idd": check.id, "Error": False})


@csrf_exempt
def request(request, name):
    print(name)
    use = User.objects.get(username=name)
    fit = Relationship.objects.filter(receiver=use)
    print(fit)
    return JsonResponse({'tolist': [p.serialize(request.user) for p in fit]})


@csrf_exempt
def mentor_reject(request, name):
    print(name)
    use = User.objects.get(username=request.user)
    print(use)
    re_use = User.objects.get(username=name)
    print(re_use)
    sets = Relationship.objects.get(sender=re_use, receiver=use)
    sets.delete()
    return JsonResponse({"message": "Relationship was successfully deleted"}, status=201)


@csrf_exempt
def mentor_accept(request, name):
    use = User.objects.get(id=name)
    use.accept = True
    print(use.id)
    re_use = User.objects.get(username=request.user)
    s_use = Profile_student.objects.get(s_user=name)
    m_use = Profile_mentor.objects.get(user=request.user)
    cat = Relationship.objects.filter(
        sender=use, receiver=re_use, status="send").update(status="accepted")
    sat = Relationship.objects.filter(receiver=re_use, status="send")
    sat.delete()
    # cat = Relationship.objects.update(
    #     sender=use, receiver=re_use, status="accepted")
    s_use.mentors.add(request.user)
    m_use.students.add(use)
    s_use.save()
    m_use.save()
    use.save()

    return JsonResponse({"name": m_use.job})


@csrf_exempt
def student_display(request, id):
    m_use = Profile_mentor.objects.get(user=id)
    ser = m_use.stud()
    return JsonResponse({"student_list": [p.serialize() for p in ser]})


@csrf_exempt
def mentor_display(request, id):
    s_use = Profile_student.objects.get(s_user=id)
    sai = s_use.stud()
    return JsonResponse({"mentor_list": [p.serialize() for p in sai]})


@csrf_exempt
def post_information(request):
    user = request.user
    now = datetime.now()
    time = now.strftime("%d/%m/%Y %H:%M:%S")
    if request.method != "POST":
        return JsonResponse({"error": "Post request required"})
    if request.method == "POST":
        data = json.loads(request.body)
        try:
            use = User.objects.get(username=data["receiver"])
        except User.DoesNotExist:
            return JsonResponse({"message": "Please enter the correct name"})
        user1 = Information(
            user=user,
            sender=request.user,
            receiver=use,
            message=data["content"],
            time=time,
        )
        user1.save()
        user2 = Information(
            user=use,
            sender=request.user,
            receiver=use,
            message=data["content"],
            time=time,
        )
        user2.save()
        return JsonResponse({"message": "Email sent successfully."}, status=201)


@csrf_exempt
def send_message(request, message):
    if (message == "received"):
        filters = Information.objects.filter(
            receiver=request.user, user=request.user)
    elif (message == "sent"):
        filters = Information.objects.filter(
            sender=request.user, user=request.user)
    print(filters)
    return JsonResponse({"all": [info.serialize() for info in filters]})


@csrf_exempt
def unique_message(request, id):
    try:
        message = Information.objects.get(user=request.user, pk=id)
    except Information.DoesNotExist:
        return ({"error": "Message does not exists"})

    if request.method == "GET":
        return JsonResponse(message.serialize())

    elif request.method == "PUT":
        detail = json.loads(request.body)
        if detail["seen"] is not None:
            message.is_seen = detail["seen"]
        message.save()
        return HttpResponse(status=204)
    else:
        return JsonResponse({"message": "GET or PUT request required"})

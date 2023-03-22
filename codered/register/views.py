from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, logout
from django.contrib import messages
from levels.models import Agent
# Create your views here.
def login_user(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            #make Agent object
            if Agent.objects.filter(Agid=username).exists():
                pass
            else:
                a=Agent(Agid=username)
                a.save()
            return redirect('/levels/')
        else:
            messages.info(request, 'Username OR password is incorrect')
            return render(request, 'authenticate/login.html')
    else:
        return render(request, 'authenticate/login.html')

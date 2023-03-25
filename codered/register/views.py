from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, logout
from django.contrib import messages
from levels.models import Agent
from django.contrib.auth.models import User
import csv
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
    
def add_user(request):
    if request.method == 'POST':
        teamname = request.POST.get('teamname')
        password = request.POST.get('password')
        adminpassword = request.POST.get('adminpassword')
        if adminpassword == "AHMOV_OCL_25":
            if User.objects.filter(username=teamname).exists():
                messages.info(request, 'Teamname already exists')
                return render(request, 'authenticate/add_user.html')
            else:
                user = User.objects.create_user(username=teamname, password=password)
                user.save()
                return render(request, 'authenticate/add_user.html')
        else:
            messages.info(request, 'Admin password is incorrect')
            return render(request, 'authenticate/add_user.html')
            
    return render(request, 'authenticate/add_user.html')

def teamsdb(request):
    teams = Agent.objects.all()
    return render(request, 'authenticate/teams_db.html', {'teams':teams})

def add(request):
    if request.method == 'POST':
        #read the data from Team_Name.csv
        with open('register/Team_Names.csv', 'r') as f:
            reader = csv.reader(f)
            for row in reader:
                teamname = row[0]
                password = 'codered_2023'
                if User.objects.filter(username=teamname).exists():
                    pass
                else:
                    user = User.objects.create_user(username=teamname, password=password)
                    user.save()
                    a=Agent(Agid=teamname)
                    a.save()
    return render(request, 'authenticate/add.html')

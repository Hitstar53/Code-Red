from django.shortcuts import render
from django.shortcuts import render
from django.contrib import messages
from django.contrib.auth.models import Group
from django.shortcuts import redirect
from .models import Agent
# Create your views here.
def home(request):
    return render(request, 'levels/home.html')

def level1(request):
    if request.method == 'POST':
        #print({'request':request.POST})
        un=request.POST.get('username')
        check=request.user.username
        print(check,un)
        password = request.POST.get('pswrd')
        print(password)
        if password == 'abc@123' and check==un:
            #user filter by Agid, login, perms
            a=Agent(Agid=un)
            a.save()
            group=Group.objects.get(name='Level 2')
            group.user_set.add(request.user)
            return redirect('prelevel2')
        else:
            print('Incorrect Password')
            messages.info(request, 'Incorrect Password')
    return render(request, 'levels/level1.html')

def level2(request):
    user=request.user.groups.filter(name='Level 2').exists()
    if user:
        print('User is in Level 2')
        if request.method == 'POST':
            group=Group.objects.get(name='Level 3')
            group.user_set.add(request.user)
            return redirect('prelevel3')
        else:
            return render(request, 'levels/level2.html')
    else:
        return redirect('level1')

def level3(request):
    user=request.user.groups.filter(name='Level 3').exists()
    if user:
        if request.method == 'POST':
            x=request.POST.get('x')
            y=request.POST.get('y')
            print(x,y)
            if x=="1" and y=="2":
                group=Group.objects.get(name='Level 4')
                group.user_set.add(request.user)
                return redirect('prelevel4')
            else:
                print('Incorrect Password')
                messages.info(request, 'Incorrect Password')
                return redirect('level3')
            
        else:
            return render(request, 'levels/level3.html')
    else:
        return redirect('level2')

def level4(request, **kwargs):
    user=request.user.groups.filter(name='Level 4').exists()
    if user:
        if request.method == 'POST':
            t1=request.POST.get('form_id')
            if t1=="form1":#check if it is already correct
                train=request.POST.get('train1')
                us = request.user.username
                ag=Agent.objects.get(Agid=us)
                if train=="82901":
                    print("Correct Train 1")
                    #set a to True
                    ag.a=True
                    ag.save()
                    return render(request,'levels/level4.html',{'form1':ag.a, 'form2':ag.b, 'form3':ag.c, 'form4':ag.d})
                else:
                    print("Wrong Train 1")
                    return render(request,'levels/level4.html',{'form1':ag.a, 'form2':ag.b, 'form3':ag.c, 'form4':ag.d})
            elif t1=="form2":
                train=request.POST.get('train2')
                us = request.user.username
                ag=Agent.objects.get(Agid=us)
                if train=="19019":
                    print("Correct Train 2")
                    
                    ag.b=True
                    ag.save()
                    return render(request,'levels/level4.html',{'form1':ag.a, 'form2':ag.b, 'form3':ag.c, 'form4':ag.d})
                else:
                    print("Wrong Train 2")
                    return render(request,'levels/level4.html',{'form1':ag.a, 'form2':ag.b, 'form3':ag.c, 'form4':ag.d})
            elif t1=="form3":
                train=request.POST.get('train3')
                us = request.user.username
                ag=Agent.objects.get(Agid=us)
                if train=="11301":
                    print("Correct Train 3")
                    
                    ag.c=True
                    ag.save()
                    return render(request,'levels/level4.html',{'form1':ag.a, 'form2':ag.b, 'form3':ag.c, 'form4':ag.d})
                else:
                    print("Wrong Train 3")
                    return render(request,'levels/level4.html',{'form1':ag.a, 'form2':ag.b, 'form3':ag.c, 'form4':ag.d})
            elif t1=="form4":
                train=request.POST.get('train4')
                us = request.user.username
                ag=Agent.objects.get(Agid=us)
                if train=="12809":
                    print("Correct Train 4")
                    
                    ag.d=True
                    ag.save()
                    return render(request,'levels/level4.html',{'form1':ag.a, 'form2':ag.b, 'form3':ag.c, 'form4':ag.d})
                else:
                    print("Wrong Train 4")
                    return render(request,'levels/level4.html',{'form1':ag.a, 'form2':ag.b, 'form3':ag.c, 'form4':ag.d})
            
            #change so that user added to group only after all 4 train nos are correct
            group=Group.objects.get(name='Level 5')
            group.user_set.add(request.user)
            return redirect('prelevel5')
        else:
            return render(request, 'levels/level4.html')
    else:
        return redirect('level3')
def level5(request):
    user=request.user.groups.filter(name='Level 5').exists()
    if user:
        if request.method == 'POST':
            group=Group.objects.get(name='Level 6')
            group.user_set.add(request.user)
            return redirect('prelevel6')
            
        else:
            return render(request, 'levels/level5.html')
    else:
        return redirect('level4')

def level6(request):
    user=request.user.groups.filter(name='Level 6').exists()
    if user:
        if request.method == 'POST':
            loc=request.POST.get('team_name')
            if loc=="SPIT":
                group=Group.objects.get(name='Level 7')
                group.user_set.add(request.user)
                return redirect('prelevel7')
            else:
                print("Nope")
            
        else:
            return render(request, 'levels/level6.html')
    else:
        return redirect('level5')

def level7(request):
    user=request.user.groups.filter(name='Level 7').exists()
    if user:
        if request.method == 'POST':
            group=Group.objects.get(name='Level 8')
            group.user_set.add(request.user)
            return redirect('level8')
            
        else:
            return render(request, 'levels/level7.html')
    else:
        return redirect('level6')

#pre levels
def prelevel1(request):
    return render(request, 'levels/pre_level1.html')

def prelevel2(request):
    user=request.user.groups.filter(name='Level 2').exists()
    if user:
        return render(request, 'levels/pre_level2.html')
    else:
        return redirect('level1')
    

def prelevel3(request):
    user=request.user.groups.filter(name='Level 3').exists()
    if user:
        return render(request, 'levels/pre_level3.html')
    else:
        return redirect('level2')

def prelevel4(request):
    user=request.user.groups.filter(name='Level 4').exists()
    if user:
        return render(request, 'levels/pre_level4.html')
    else:
        return redirect('level3')

def prelevel5(request):
    user=request.user.groups.filter(name='Level 5').exists()
    if user:
        return render(request, 'levels/pre_level5.html')
    else:
        return redirect('level4')

def prelevel6(request):
    user=request.user.groups.filter(name='Level 6').exists()
    if user:
        return render(request, 'levels/pre_level6.html')
    else:
        return redirect('level5')

def prelevel7(request):
    user=request.user.groups.filter(name='Level 7').exists()
    if user:
        return render(request, 'levels/pre_level7.html')
    else:
        return redirect('level6')



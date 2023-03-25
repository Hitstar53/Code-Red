from django.shortcuts import render
from django.shortcuts import render
from django.contrib import messages
from django.contrib.auth.models import Group
from django.shortcuts import redirect
from datetime import datetime
from .models import Agent,Position

hrs = 16;
mins = 00;

# Create your views here.
def home(request):
    return render(request, 'levels/home.html')

def level1(request):
    #if current time > 22 45, redirect to youlost
    if datetime.now().hour >= hrs and datetime.now().minute > mins:
        return redirect('youlost')
    hint = "Hidden in plain sight, the key to unlocking my secrets lies within the code written in black and white."
    if request.method == 'POST':
        t1=request.POST.get('form_id')
        if t1=="hint_form":
            return render(request, 'levels/level1.html', {'hints':hint})
        un=request.POST.get('username')
        check=request.user.username
        print(check,un)
        password = request.POST.get('pswrd')
        print(password)
        if password == 'gsdfys76fds7fds' and check==un:
            group=Group.objects.get(name='Level 2')
            group.user_set.add(request.user)
            #get position of user from position table
            pos=Position.objects.get(id=1)
            current_pos=pos.posn+1
            pos.posn=current_pos
            pos.save()
            #update position of user in agent table
            ag = Agent.objects.get(Agid=un)
            ag.level1_pos=current_pos
            ag.level_count=2
            ag.save()
            #print(pos.posn,"Hello Print")
            return redirect('prelevel2')
        else:
            print('Incorrect Password')
            messages.info(request, 'Did you think it would be that easy?')
    return render(request, 'levels/level1.html', {'hints':hint})

def level2(request):
    if datetime.now().hour >= hrs and datetime.now().minute > mins:
        return redirect('youlost')
    hint = "When distance is the game, seek the warmth for the short, but for the long, it's the cold that will bring the gain."
    user=request.user.groups.filter(name='Level 2').exists()
    if user:
        print('User is in Level 2')
        if request.method == 'POST':
            group=Group.objects.get(name='Level 3')
            group.user_set.add(request.user)
            #get position of user from position table
            pos=Position.objects.get(id=1)
            current_pos=pos.posn+1
            pos.posn=current_pos
            pos.save()
            #update position of user in agent table
            ag = Agent.objects.get(Agid=request.user.username)
            ag.level2_pos=current_pos
            ag.level_count=3
            ag.save()
            return redirect('prelevel3')
        else:
            return render(request, 'levels/level2.html', {'hints':hint})
    else:
        return redirect('level1')

def level3(request):
    if datetime.now().hour >= hrs and datetime.now().minute > mins:
        return redirect('youlost')
    hint = "The key lies in the phrase which is in what lies before."
    user=request.user.groups.filter(name='Level 3').exists()
    if user:
        if request.method == 'POST':
            x=(request.POST.get('x'))
            y=(request.POST.get('y'))
            passcode=request.POST.get('passcode')
            print(x,y)
            if '18.9' in x and '72.8' in y and passcode.lower()=="shadows dance in the moonlight":
                group=Group.objects.get(name='Level 4')
                group.user_set.add(request.user)
                pos=Position.objects.get(id=1)
                current_pos=pos.posn+1
                pos.posn=current_pos
                pos.save()
                #update position of user in agent table
                ag = Agent.objects.get(Agid=request.user.username)
                ag.level3_pos=current_pos
                ag.level_count=4
                ag.save()
                return redirect('prelevel4')
            else:
                print('Incorrect Password')
                messages.info(request, 'Incorrect Password')
                return redirect('level3')
            
        else:
            return render(request, 'levels/level3.html', {'hints':hint})
    else:
        return redirect('level2')

def level4(request, **kwargs):
    hint = "1-A1Z26-2-ASCII"
    if datetime.now().hour >= hrs and datetime.now().minute > mins:
        return redirect('youlost')
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
            elif t1=="form2":
                train=request.POST.get('train2')
                us = request.user.username
                ag=Agent.objects.get(Agid=us)
                if train=="12953":
                    print("Correct Train 2")
                    
                    ag.b=True
                    ag.save()
                else:
                    print("Wrong Train 2")
            elif t1=="form3":
                train=request.POST.get('train3')
                us = request.user.username
                ag=Agent.objects.get(Agid=us)
                if train=="11301":
                    print("Correct Train 3")
                    
                    ag.c=True
                    ag.save()
                    
            elif t1=="form4":
                train=request.POST.get('train4')
                us = request.user.username
                ag=Agent.objects.get(Agid=us)
                if train=="12809":
                    print("Correct Train 4")
                    
                    ag.d=True
                    ag.save()
            ca=""
            cb=""
            cc=""
            cd=""
            if ag.a and ag.b and ag.c and ag.d:
                group=Group.objects.get(name='Level 5')
                group.user_set.add(request.user)
                pos=Position.objects.get(id=1)
                current_pos=pos.posn+1
                pos.posn=current_pos
                pos.save()
                #update position of user in agent table
                ag = Agent.objects.get(Agid=request.user.username)
                ag.level4_pos=current_pos
                ag.level_count=5
                ag.save()
                return redirect('prelevel5')
            if ag.a:
                ca="correct flip"
            if ag.b:
                cb="correct flip"
            if ag.c:
                cc="correct flip"
            if ag.d:
                cd="correct flip"
            return render(request,'levels/level4.html',{'form1':ca, 'form2':cb, 'form3':cc, 'form4':cd, 'hints':hint})
            
            #change so that user added to group only after all 4 train nos are correct
        else:
            return render(request, 'levels/level4.html', {'hints':hint})
    else:
        return redirect('level3')
    
def level5(request):
    if datetime.now().hour >= hrs and datetime.now().minute > mins:
        return redirect('youlost')
    hint = "Nokia has the strongest keypad."
    user=request.user.groups.filter(name='Level 5').exists()
    if user:
        if request.method == 'POST':
            group=Group.objects.get(name='Level 6')
            group.user_set.add(request.user)
            pos=Position.objects.get(id=1)
            current_pos=pos.posn+1
            pos.posn=current_pos
            pos.save()
            #update position of user in agent table
            ag = Agent.objects.get(Agid=request.user.username)
            ag.level5_pos=current_pos
            ag.level_count=6
            ag.save()
            return redirect('prelevel6')
            
        else:
            return render(request, 'levels/level5.html', {'hints':hint})
    else:
        return redirect('level4')

def level6(request):
    if datetime.now().hour >= hrs and datetime.now().minute > mins:
        return redirect('youlost')
    hint = "Computer Language."
    user=request.user.groups.filter(name='Level 6').exists()
    if user:
        if request.method == 'POST':
            ans1 = "Wankhede"
            loc=request.POST.get('team_name')
            if ans1.lower() in loc.lower():
                group=Group.objects.get(name='Level 7')
                group.user_set.add(request.user)
                pos=Position.objects.get(id=1)
                current_pos=pos.posn+1
                pos.posn=current_pos
                pos.save()
                #update position of user in agent table
                ag = Agent.objects.get(Agid=request.user.username)
                ag.level6_pos=current_pos
                ag.level_count=7
                ag.save()
                return redirect('prelevel7')
            else:
                print("Nope")
                return redirect('level6')
        else:
            return render(request, 'levels/level6.html', {'hints':hint})
    else:
        return redirect('level5')

def level7(request):
    if datetime.now().hour >= hrs and datetime.now().minute > mins:
        return redirect('youlost')
    user=request.user.groups.filter(name='Level 7').exists()
    if user:
        if request.method == 'POST':
            now = datetime.now()
            now = str(now)
            now = now[11:19]
            print(now)
            color = request.POST.get('strip')
            print(color)
            text = request.POST.get('textstrip')
            print(text)
            return redirect('level6')
            """
            postion code here
            """
        else:
            # ag = Agent.objects.get(Agid=request.user.username)
            # ag.level_count=ag.level_count+1
            return render(request, 'levels/level7.html')
    else:
        return redirect('level6')

def youlost(request):
    return render(request, 'levels/explosion.html')

def youwon(request):
    #it is not locked (doesnt work)
    pos=Position.objects.get(id=1)
    current_pos=pos.posn+1
    pos.posn=current_pos
    pos.save()
    #update position of user in agent table
    ag = Agent.objects.get(Agid=request.user.username)
    ag.level7_pos=current_pos
    ag.save()
    return render(request, 'levels/victory.html')

#pre levels
def prelevel1(request):
    if datetime.now().hour < hrs-2:
        return render(request, 'levels/home.html')
    if datetime.now().hour >= hrs and datetime.now().minute > mins:
        return redirect('youlost')
    return render(request, 'levels/pre_level1.html', )

def prelevel2(request):
    if datetime.now().hour >= hrs and datetime.now().minute > mins:
        return redirect('youlost')
    user=request.user.groups.filter(name='Level 2').exists()
    if user:
        return render(request, 'levels/pre_level2.html')
    else:
        return redirect('level1')
    

def prelevel3(request):
    if datetime.now().hour >= hrs and datetime.now().minute > mins:
        return redirect('youlost')
    user=request.user.groups.filter(name='Level 3').exists()
    if user:
        return render(request, 'levels/pre_level3.html')
    else:
        return redirect('level2')

def prelevel4(request):
    if datetime.now().hour >= hrs and datetime.now().minute > mins:
        return redirect('youlost')
    user=request.user.groups.filter(name='Level 4').exists()
    if user:
        return render(request, 'levels/pre_level4.html')
    else:
        return redirect('level3')

def prelevel5(request):
    if datetime.now().hour >= hrs and datetime.now().minute > mins:
        return redirect('youlost')
    user=request.user.groups.filter(name='Level 5').exists()
    if user:
        return render(request, 'levels/pre_level5.html')
    else:
        return redirect('level4')

def prelevel6(request):
    if datetime.now().hour >= hrs and datetime.now().minute > mins:
        return redirect('youlost')
    user=request.user.groups.filter(name='Level 6').exists()
    if user:
        return render(request, 'levels/pre_level6.html')
    else:
        return redirect('level5')

def prelevel7(request):
    if datetime.now().hour >= hrs and datetime.now().minute > mins:
        return redirect('youlost')
    user=request.user.groups.filter(name='Level 7').exists()
    if user:
        return render(request, 'levels/pre_level7.html')
    else:
        return redirect('level6')



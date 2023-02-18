from django.shortcuts import render

# Create your views here.
def home(request):
    return render(request, 'levels/home.html')

def level1(request):
    return render(request, 'levels/level1.html')

def level2(request):
    return render(request, 'levels/level2.html')

def level3(request):
    return render(request, 'levels/level3.html')

def level4(request):
    return render(request, 'levels/level4.html')

def level5(request):
    return render(request, 'levels/level5.html')

def level6(request):
    return render(request, 'levels/level6.html')

def level7(request):
    return render(request, 'levels/level7.html')

#pre levels
def prelevel1(request):
    return render(request, 'levels/pre_level1.html')

def prelevel2(request):
    return render(request, 'levels/pre_level2.html')

def prelevel3(request):
    return render(request, 'levels/pre_level3.html')

def prelevel4(request):
    return render(request, 'levels/pre_level4.html')

def prelevel5(request):
    return render(request, 'levels/pre_level5.html')

def prelevel6(request):
    return render(request, 'levels/pre_level6.html')

def prelevel7(request):
    return render(request, 'levels/pre_level7.html')



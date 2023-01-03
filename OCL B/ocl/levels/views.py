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
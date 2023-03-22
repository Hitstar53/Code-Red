from django.contrib.auth.models import AbstractUser
from django.utils import timezone
from django.db import models
class Position(models.Model):
    id=models.AutoField(primary_key=True)
    posn=models.IntegerField()
    def __str__(self):
        return str(self.posn)
# User class
class Agent(models.Model):
    # Define the extra fields
    # related to User here
    Agid = models.CharField(blank = True, max_length = 20)        
    a= models.BooleanField(blank=True,default=False)
    b= models.BooleanField(blank=True,default=False)
    c= models.BooleanField(blank=True,default=False)
    d= models.BooleanField(blank=True,default=False)
    level1_pos=models.IntegerField(blank=True, default=0)
    level2_pos=models.IntegerField(blank=True, default=0)  
    level3_pos=models.IntegerField(blank=True, default=0)  
    level4_pos=models.IntegerField(blank=True, default=0)  
    level5_pos=models.IntegerField(blank=True, default=0)  
    level6_pos=models.IntegerField(blank=True, default=0)  
    level7_pos=models.IntegerField(blank=True, default=0)  
    level8_pos=models.IntegerField(blank=True, default=0)    
    def __str__(self):
        return self.Agid

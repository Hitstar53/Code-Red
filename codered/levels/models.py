from django.contrib.auth.models import AbstractUser
from django.utils import timezone
from django.db import models

# User class
class Agent(models.Model):
    # Define the extra fields
    # related to User here
    Agid = models.CharField(blank = True, max_length = 20)                 
        
    def __str__(self):
        return self.Agid

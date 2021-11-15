from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_delete, pre_save
from django.dispatch import receiver



class NkUser(AbstractUser):
    is_admin = models.BooleanField(default=False)
    phone = models.CharField(blank=True, max_length=30)

class ChurchAdmin(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    city = models.CharField(blank=True, null= True, max_length=100)
    state = models.CharField(blank=True, null= True, max_length=100)
    country = models.CharField(blank=True, null= True, max_length=100)

class VisitSchedule(models.Model):
    church = models.ForeignKey(NkUser, on_delete=models.CASCADE)
    day = models.CharField(max_length=50)
    starthour = models.CharField(max_length=10)
    endhour = models.CharField(max_length=10)
    date = models.DateField(auto_now_add=True, blank=True)

class BelieverRegister(models.Model):
    # church = models.ForeignKey(NkUser, on_delete=models.CASCADE)
    fullname = models.CharField(null=True, max_length=150)
    contacte = models.CharField(null=True, max_length=150)
    day = models.CharField(max_length=50)
    hour = models.CharField(max_length=10)

class PreachingVideo(models.Model):
    church = models.ForeignKey(NkUser, on_delete=models.CASCADE)
    title = models.CharField(max_length=500)
    files = models.FileField(upload_to='videos/', null=True, verbose_name="")
    published_date = models.DateField()

    def __str__(self):
        return self.title +":" + str(self.files)

class Preaching(models.Model):
    church = models.ForeignKey(NkUser, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    body = models.TextField()

class Communication(models.Model):
    church = models.ForeignKey(NkUser, on_delete=models.CASCADE)
    date = models.DateField()
    title = models.CharField(max_length=200)
    body = models.TextField()
    posted_date = models.DateField()

class Tith(models.Model):
    church = models.ForeignKey(NkUser, on_delete=models.CASCADE)
    date = models.TimeField()
    designation = models.CharField(max_length=250)
    debit = models.FloatField()
    balance = models.FloatField()

class Giving(models.Model):
    church = models.ForeignKey(NkUser, on_delete=models.CASCADE)
    date = models.TimeField()
    designation = models.CharField(max_length=250)
    debit = models.FloatField()
    balance = models.FloatField()

class CheckOut(models.Model):
    church = models.ForeignKey(NkUser, on_delete=models.CASCADE)
    designation = models.CharField(max_length=200)
    debit = models.FloatField()
    credit = models.FloatField()
    balance = models.FloatField()
    date = models.DateField()


class PostNews(models.Model):
    church = models.ForeignKey(NkUser, on_delete=models.CASCADE)
    title = models.CharField(max_length=255, null=False, blank=False)
    subtitle = models.CharField(max_length=300, null=False, blank=False)
    img = models.FileField(upload_to='images/', null=False, blank=False)
    body = models.TextField()
    posted_date = models.DateField(auto_now_add=True, blank=True)

    def __str__(self):
        return self.title

class PostEvents(models.Model):
    church = models.ForeignKey(NkUser, on_delete=models.CASCADE)
    title = models.CharField(max_length=255, null=False, blank=False)
    img = models.FileField(upload_to='images/', null=False, blank=False)
    body = models.TextField()
    posted_date = models.DateField(auto_now_add=True, blank=True)
    
class BlogPost(models.Model):
    commun = models.ForeignKey(Communication, on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True, blank=False)
    
    
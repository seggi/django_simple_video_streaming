from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.db import transaction


from church.models import NkUser, ChurchAdmin, PostNews

class AdminSignUpForm(UserCreationForm):
    country = forms.CharField(widget=forms.Select(), required=True)
    state = forms.CharField(widget=forms.Select(), required=True)
    city = forms.CharField(widget=forms.Select(), required=True)

    class Meta(UserCreationForm.Meta):
        model = NkUser
        fields = UserCreationForm.Meta.fields + (  
            'password1', 'password2', 'username',
            'first_name', 'email', 'phone', 'country', 'state', 'city',)
        
    
    @transaction.atomic
    def save(self):
        user = super().save(commit=False)
        user.is_admin = True
        user.save()
        admin = ChurchAdmin.objects.create(user=user, country=self.cleaned_data.get('country'),
                    state=self.cleaned_data.get('state'), city=self.cleaned_data.get('city'))
        admin.save()
        return user



# class PostNewsForm(forms.ModelForm):
#     class Meta:
#         model = PostNews
#         fields = [
#             "title", 
#             "subtitle",
#             "body",
#             "img", 
#         ]

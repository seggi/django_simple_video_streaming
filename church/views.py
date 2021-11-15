from django.shortcuts import render, redirect

def churchMainActivity(request):
    if request.user.is_authenticated:
        return redirect('admin:admin_home')
    else:
        return redirect('public:homepage')

    return render(request, 'registration/login.html')




from django.shortcuts import redirect, render
from django.http import JsonResponse
from django.views.generic import TemplateView


from church.nkmodels.publicmodels import PublicData
from church.models import PostNews, BelieverRegister, NkUser


DISPLAY = PublicData()
ERROR = 'No post found!'
SLOGAN = "Le salut par Jesus Christ"


class PublicHome(TemplateView):
    template_name = "church/public/homepage.html"
    def get(self, request):
        context = { 
            'churchprogram': DISPLAY.churchProgram(),
            'commnuns': DISPLAY.displayCommuns(),
            'error': ERROR
        }
        
        return render(request, self.template_name, context)

    def post(self, request):
        return render(request, self.template_name, {})


def PublicPreaching(request):
    context = {}
    template_name = "church/public/preaching.html"
    # context['preaching'] = DISPLAY.postPreaching()
    
    if request.method == 'POST' and 'video_id' in request.POST:
        video_id = request.POST.get("video_id")
        display =  DISPLAY.postPreachingWide(video_id)
        return JsonResponse(display, safe=False)

    elif request.method == 'POST' and 'search_bydate' in request.POST:
        searchdate = request.POST.get('search_bydate')
        if searchdate !='':
            found = DISPLAY.searchPreaching(searchdate)
            if len(found) > 0:
                context['preaching'] = found
                return render(request, template_name, context)
            else: 
                return render(request, template_name, {'error':'Nothing has been posted yet'})
        else:
            return render(request, template_name, {'error':'Nothing selected yet'})
            # return render(request, template_name, context)
    # else:     
    #     return render(request, template_name, context)
    return render(request, template_name, {})

    

class PublicEvents(TemplateView):
    template_name ="church/public/events.html"
    content = {}
    def get(self, request):
        article_posted = PostNews.objects.raw('SELECT * FROM church_postevents')
        self.content = {
            'churchprogram': DISPLAY.churchProgram(),
            'arcticles': article_posted,
            'error': ERROR,
            'church_slogan': SLOGAN,
        }
        return render(request, self.template_name, self.content)

    def post(self, request):
        return render(request, self.template_name, {})


class PublicNews(TemplateView):
    template_name ="church/public/news.html"
    content = {}
    def get(self, request):
        # article_posted = PostNews.objects.raw('SELECT * FROM church_postnews')
        article_posted = PostNews.objects.all()
        self.content = {
            'churchprogram': DISPLAY.churchProgram(), 
            'arcticles': article_posted,
            'error': ERROR,
            'church_slogan': SLOGAN,
        }
        return render(request, self.template_name, self.content)

    def post(self, request):
        if request.method == 'POST' and 'news_session' in request.POST:
            pass
            
        elif request.method == 'POST' and 'people-appoiments' in request.POST:
            names = request.POST.get('names')
            email = request.POST.get('email')
            day = request.POST.get('day')
            hour = request.POST.get('hour')
            
            if names != '' and email != '' and day != '' and hour != '':
                if BelieverRegister.objects.filter(contacte=email).exists():
                    return JsonResponse({'msg': 'You all ready sent a request!'})

                else:
                    if '@' in email:
                        appointment = BelieverRegister(fullname=names, contacte=email, 
                                        day=day, hour=hour) 
                        appointment.save()
                        return JsonResponse({'msg': '''Your request has been sent successfuly!,\n
                                                                    you will recieve a email to be confirmed!'''})

                    else:
                        return JsonResponse({'msg': 'Enter avalid email!'})
            else:
                return JsonResponse({'msg': 'All fields must be filled!'})



        return render(request, self.template_name, {})



class PlublicDisplayMore(TemplateView):
    template_name = template_name ="church/public/extends_news.html"
    context = {}
    def get(self, request, **kwargs):
        getid = kwargs['pk']
        article_posted = PostNews.objects.raw(f'SELECT * FROM church_postnews WHERE id={getid}')
        self.context = {
            'arcticles': article_posted,
        }
        return render(request, self.template_name, self.context)


class AboutUs(TemplateView):
    template_name = template_name ="church/public/about.html"
    context = {}
    def get(self, request, **kwargs):
        return render(request, self.template_name, {})


class Contact(TemplateView):
    template_name = template_name ="church/public/contact.html"
    context = {}
    def get(self, request, **kwargs):
        return render(request, self.template_name, {})
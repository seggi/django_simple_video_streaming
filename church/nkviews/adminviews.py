from django.contrib.auth import login, authenticate
from django.shortcuts import redirect, render
from django.views.generic import CreateView
from django.utils.decorators import method_decorator 
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.core.files.storage import FileSystemStorage

from church.nkcore.decorators import admin_required
from church.nkcore.compute import RecordPayment, RecordCredit
from church.nkforms.adminforms import AdminSignUpForm
from church.models import ChurchAdmin, Tith, Giving, PreachingVideo,\
         PostNews,NkUser, PostEvents, VisitSchedule
from church.nkmodels import defaultdata
from church.nkcore.decorators import admin_required
from church.nkmodels.financemodels import DisplayFinanceContent,\
        ChurchProgrom, PreachingFile, CheckoutManage
from church.nkmodels.checkout import CheckOutDb
from church.nkmodels.publicmodels import PublicData
 




# default data 

OPTIONS = {'church_giving': 'Givings', 'church_tith': 'Tithe'}

PROGRAM_OPTIONS = {'0': 'Rendez-vous', '1': 'program'}

MSG = {'msg': 'You have to select one option first!'}

MSG1 = {'msg': 'No data found!'}

IMAGE = ['.jpg', '.png', '.jpeg']

# Admin signup view and redirect to main page.html

class AdminSignUp(CreateView):
    model = ChurchAdmin
    form_class = AdminSignUpForm
    template_name = 'registration/signup_admin.html'

    def get_context_data(self, **kwargs):
        kwargs['user_type'] = 'admin'
        return super().get_context_data(**kwargs)

    def form_valid(self, form):
        user = form.save()
        login(self.request, user)
        return redirect('admin:admin_home')

# Start session developpement 

def locationData(request):
    location = defaultdata.LocationData()
    if True:
        country = location.countries()
        state = location.states()
        city = location.cities()
        bind = country + state + city

        return JsonResponse(bind, safe=False)
    return JsonResponse({'error': ""})


@login_required
@admin_required
def searchOption(request):
    admin_id = request.user.id
    display_account = DisplayFinanceContent()
    if request.method == "POST" and  "option_hidden" in request.POST :
        select_option  = request.POST.get('select_option')
        print(select_option)
        if select_option != None:
            display = display_account.displayCheckout(admin_id, select_option)
            displayG = display_account.displayGiviging(admin_id, select_option)
            displayT = display_account.displayTithe(admin_id, select_option)

            if len(display) > 0 and len(displayG) > 0 and len(displayT) > 0:
                return JsonResponse([display, displayG, displayT], safe=False)
            else:
                return JsonResponse(MSG1)
        else:
            return JsonResponse(MSG, safe=False)


    elif request.method == "POST" and "search_date_hidden" in request.POST:
        search_date = request.POST.get('search_by_date1')
        search_date1 = request.POST.get('search_by_date2')
        search_date_hidden = request.POST.get("search_date_hidden")

        # print(search_date, search_date1, search_date_hidden)

        if search_date != '' and search_date1 !='' and search_date_hidden != '':
            display = display_account.searchData(admin_id, search_date_hidden, search_date, search_date1)
            if len(display) > 0:
                return JsonResponse(display, safe=False)
            else:
                return JsonResponse(MSG1)
        else:
            return JsonResponse({'msg': 'You have to select first date'})

    elif request.method == 'POST' and 'save_money' in request.POST: 
        option = request.POST.get("option_chosed")
        designation = request.POST.get("designation")
        amount = request.POST.get("amount")

        if option != '' and designation != '' and amount != '':
            saveAmount = RecordPayment(user_id=admin_id, table_name=option, amount=amount, designation=designation)
            saveAmount.amountComputer()
            return JsonResponse({'msg': 'successfuly recoreded!'})
        else:
            return JsonResponse({'msg': 'All field must be filled!'})

    return JsonResponse({'msg':  ''})


@login_required
@admin_required
def optionDeleteEdit(request):
    admin_id = request.user.id 
    display_account = DisplayFinanceContent()
    if request.method == 'POST' and 'delete_money' in request.POST:
        delete = request.POST.get('delete_money')
        table_name = request.POST.get("table_delete_name")
        if delete != '' and table_name != None:
            display = display_account.deleteData(admin_id,table_name, delete)
            if len(display) > 0:
                return JsonResponse(display, safe=False)
            else:
                return JsonResponse({'msg': 'Nothing has been registred yet!'})

    elif request.method == 'POST' and 'get_data' in request.POST:
        getid = request.POST.get('edit_money')
        table_edit_data = request.POST.get('table_edit_data')
        
        if getid != '' and table_edit_data != '':
            get = display_account.deleteGet(admin_id,table_edit_data, getid)
            return JsonResponse(get, safe=False)
        else:
            return JsonResponse({'msg': 'data not found!'})

    elif request.method == 'POST' and 'update_amount' in request.POST:
        editdata = request.POST.get('update_amount')
        table_name = request.POST.get('table_update_data')
        designation = request.POST.get('designation')
        amount = request.POST.get('amount')

        if editdata != '' and table_name != '' and designation != '' and amount != '':
            display = display_account.editData(admin_id, table_name, designation, amount, editdata)
            if len(display) > 0:
                return JsonResponse(display, safe=False)
            else:
                return JsonResponse({'msg': 'Nothing has been registred yet!'})
        
        
    return JsonResponse({'msg': ''})


@login_required
@admin_required
def chuchProgram(request):
    program = ChurchProgrom()
    visited = PublicData()
    admin_id = request.user.id 
    if request.method == "POST" and "save_program" in request.POST:
        title = request.POST.get('title')
        date  =request.POST.get('date')
        save_program  = request.POST.get('textarea-body') 
        group = request.POST.get("group")

        if title != '' and date != '' and save_program != '':
            program.saveProgram(user_id=admin_id, title=title, date=date, text_body=save_program, group=group)
            printprogram = program.displayProgram(admin_id)
            return JsonResponse(printprogram, safe=False)

        else:
            return JsonResponse({'msg': 'All fields must be filled...'})

    elif request.method == 'POST' and "show_program" in request.POST:
        printprogram = program.displayProgram(admin_id)
        if len(printprogram) > 0:
            return JsonResponse(printprogram, safe=False)
        else:
            return JsonResponse({'msg': 'There is nothing to show!, please post a program!'})

    elif  request.method == 'POST' and "get_data_program" in request.POST:
        edit_program  = request.POST.get('edit_program')
        
        if edit_program != '':
            printprogram = program.displayProgram(admin_id, edit_program)
            return JsonResponse(printprogram, safe=False)
        else:
            return JsonResponse({'msg': 'There was a problem!'})
    
    elif request.method == 'POST' and "table_update_program" in request.POST:
        program_title = request.POST.get("program_title")
        program_date = request.POST.get("program_date")
        textarea_body = request.POST.get("textarea_body")
        update_program = request.POST.get("update_program")

        if program_title != '' and program_date != '' and textarea_body != '' and group != '':
            program.updateProgram(admin_id, program_title, program_date, textarea_body, update_program)
            printprogram = program.displayProgram(admin_id)
            if len(printprogram) > 0:
                return JsonResponse(printprogram, safe=False)
            else:
                return JsonResponse({'msg': 'There is nothing to show!, please post a program!'})

        else:
            return JsonResponse({'msg': 'All fields must be filled...'})

    elif request.method == 'POST' and "delete_program" in request.POST:
        delete_program = request.POST.get("delete_program")
        if delete_program != '':
            program.deleteProgram(admin_id, delete_program)
            printprogram = program.displayProgram(admin_id)
            if len(printprogram) > 0:
                return JsonResponse(printprogram, safe=False)
            else:
                return JsonResponse({'msg': 'There is nothing to show!, please post a program!'})

    elif  request.method == 'POST' and 'search_date_hidden_app' in request.POST:
        search_date = request.POST.get('search_by_date1')
        search_date1 = request.POST.get('search_by_date2')
        # search_date_hidden = request.POST.get("search_date_hidden_app")

        # print(search_date, search_date1, search_date_hidden)

        if search_date != '' and search_date1 !='' :
            display = program.searchProgram(admin_id, search_date, search_date1)
            if len(display) > 0:
                return JsonResponse(display, safe=False)
            else:
                return JsonResponse(MSG1)
        else:
            return JsonResponse({'msg': 'You have to select first date'})

    elif request.method == 'POST' and 'hidden-appointment' in request.POST:
        # a = request.POST.get('hidden-appointment')
        if True:
            appointment = program.poepleRendezVous() 
            printprogram = program.displayRendezVous()
            print(printprogram)
            if len(appointment) > 0 and len(printprogram):
                bind = [appointment, printprogram]
                return JsonResponse(bind, safe=False)
            else:
                return JsonResponse({'msg': 'No rendez-vous repported yet!'})
    
    # Save visit ++++++++++++++++++++++++++++++
    elif request.method == 'POST' and 'visit' in request.POST:
        day = request.POST.get("day")
        start = request.POST.get("starting")
        end = request.POST.get("ending")

        if day != '' and start != '' and end !='':
            admin = NkUser.objects.get(id=admin_id)
            if VisitSchedule.objects.filter(day=day, starthour=start, endhour=end).exists():
                return JsonResponse({'msg': 'Visit already posted'})
            else:
                visit = VisitSchedule(day=day, starthour=start, endhour=end, church=admin)
                visit.save()
                show = visited.visitProgramShow(admin_id)
                if len(show) > 0:
                    return JsonResponse(show, safe=False)
                else:
                    return JsonResponse({'msg': 'Nothing has been saved yet!'}, safe=False)

    elif request.method == 'POST' and 'delete_visits' in request.POST:
        delete_visit = request.POST.get("delete_visits")
        if delete_visit != None:
            visited.deleteVisit(admin_id, delete_visit)
            show = visited.visitProgramShow(admin_id)
           
            if len(show) > 0:
                return JsonResponse(show, safe=False)
            else:
                return JsonResponse({'msg': 'Nothing has been saved yet!'}, safe=False)
        else:
            return JsonResponse({'msg': 'Error'})

    elif request.method == "POST" and "show_visits" in request.POST:
        show = visited.visitProgramShow(admin_id)
        if True:
            if len(show) > 0:
                return JsonResponse(show, safe=False)
            else:
                return JsonResponse({'msg': 'Nothing has been saved yet!'}, safe=False)
        else:
            return JsonResponse({'msg': 'Error'})

     # post info 

    elif request.method == 'POST' and "option_hidden_info" in request.POST:
        select_option = request.POST.get("select_option")
        if select_option != '':
            printprogram = visited.displayProgram(select_option)
            if len(printprogram) > 0:
                return JsonResponse(printprogram, safe=False)
            else:
                return JsonResponse({'msg': 'There is nothing to show!, please select from option!'})
    
    elif  request.method == 'POST' and "info_key" in request.POST:
        edit_program  = request.POST.get('edit_program')
        if edit_program != '':
            printprogram = visited.displayProgram(admin_id, edit_program)
            return JsonResponse(printprogram, safe=False)
        else:
            return JsonResponse({'msg': 'There was a problem!'})

    # Post appointment

    elif request.method == "POST" and "delete_info" in request.POST:
        post_info = request.POST.get("delete_info")
        if post_info != None:
            if len(visited.postArticle()) < 1:
                visited.getArticle(post_info)
                # current = visited.getCurrentPost()
                return JsonResponse(visited.getCurrentPost(), safe=False)
            elif len(visited.postArticle()) >= 1:
                return JsonResponse({'msg': 'You can not post more than one post.\nPlease remove one from post.'})
        else:
            return JsonResponse({'msg': 'Server Error!'})

    # Display current appointment post 

    elif request.method == "POST" and "display_current_info" in request.POST:
        current = visited.getCurrentPost()
        if len(current) > 0:
            return JsonResponse(current, safe=False)
        else:
            return JsonResponse({'msg': 'Nothing has been posted yet!'})

    elif request.method == "POST" and "remove_currentpost" in request.POST:
        remove_current_post = request.POST.get("remove_currentpost")
        if remove_current_post != None:
            visited.removeCurrentPost(remove_current_post)
            current = visited.getCurrentPost()
            if len(current) > 0:
                return JsonResponse(current, safe=False)
            else:
                return JsonResponse({'msg': 'Nothing has been posted yet!'})
        else:
            return JsonResponse({'msg': 'Server Error!'})
            


# =====================================================
# =====================================================

    
            
    return JsonResponse({'msg': ''})
            


@login_required
@admin_required
def uploadFile(request):
    admin_id = request.user.id 
    managefile = PreachingFile()
    context = {}
    if request.method == 'POST' and 'save_file' in request.POST:
        title =  request.POST.get("file_title")
        files = request.FILES["files"]

        if title != '' and files != '':
            if PreachingVideo.objects.filter(title=title, files=files):
                return JsonResponse({"msg": "This file already exist!"})
            else:
                managefile.saveFile(admin_id, title, files)
                displayfile =  managefile.displayFiles(admin_id)
                fs = FileSystemStorage()
                name = fs.save(files.name, files)
                context['url'] = fs.url(name)
                if len(displayfile) > 0:
                    return JsonResponse(displayfile, safe=False)
                else:
                    return JsonResponse(MSG1)
        else:
            return JsonResponse({'msg': 'You have to fill all fields'})

    if request.method == 'POST' and 'show_file' in request.POST:
        if True:
            displayfile =  managefile.displayFiles(admin_id)
            if len(displayfile) > 0:
                return JsonResponse(displayfile, safe=False)
            else:
                return JsonResponse(MSG1)
        else:
            return JsonResponse(MSG1)

    elif request.method == 'POST' and 'delete_file' in request.POST:
        delete_file = request.POST.get('delete_file')

        if delete_file != '':
            managefile.deleteFile(admin_id, delete_file)
            displayfile =  managefile.displayFiles(admin_id)
            if len(displayfile) > 0:
                return JsonResponse(displayfile, safe=False)
            else:
                return JsonResponse({'msg': 'There is nothing to show!, please post a program!'})

    elif request.method == 'POST' and 'search_date_hidden_file1' in request.POST:
        search_date = request.POST.get('search_by_date1')
        search_date1 = request.POST.get('search_by_date2')

        if search_date != '' and search_date1 !='' :
            display = managefile.searchFiles(admin_id, search_date, search_date1)
            if len(display) > 0:
                return JsonResponse(display, safe=False)
            else:
                return JsonResponse(MSG1)
        else:
            return JsonResponse({'msg': 'You have to select first date'})

    return JsonResponse({'msg': ''})


@login_required
@admin_required
def checkOut(request):
    admin_id = request.user.id 
    checkout = CheckoutManage()
    repport = CheckOutDb()
    if request.method == 'POST' and 'show_checkout' in request.POST:
        if True:
            display = repport.displayReport(admin_id)
            if len(display) > 0:
                return JsonResponse(display, safe=False)
            else:
                return JsonResponse(MSG1)
        else:
            return JsonResponse({'msg': 'A problem occured!'})

    elif  request.method == 'POST' and 'search_date_hidden_till' in request.POST:
        search_date = request.POST.get('search_by_date1')
        search_date1 = request.POST.get('search_by_date2')

        if search_date != '' and search_date1 !='' :
            display = checkout.searchReport(admin_id, search_date, search_date1)
            displaysum = checkout.searchReportSum(admin_id, search_date, search_date1)
            collection = [display ,displaysum]
            if len(display) > 0:
                return JsonResponse(collection, safe=False)
            else:
                return JsonResponse(MSG1)
        else:
            return JsonResponse({'msg': 'You have to select first date'})

    elif request.method == 'POST' and 'retrieve_money' in request.POST: 
        designation = request.POST.get("designation")
        amount = request.POST.get("amount")

        if designation != '' and amount != '':
            saveAmount = RecordCredit(user_id=admin_id, amount=amount, designation=designation)
            saveAmount.checkBalance()
            display = repport.displayReport(admin_id)
            if len(display) > 0:
                return JsonResponse(display, safe=False)
            else:
                return JsonResponse({'msg': 'Nothing found'})
        else:
            return JsonResponse({'msg': 'All field must be filled!'})
        
    
    return JsonResponse({'msg': ''})


from django.contrib import messages



@login_required
@admin_required
def createPost(request):
    admin_id = request.user.id 
    publicdata = PublicData()
    if request.method == 'POST' and 'news_key' in request.POST:
        title = request.POST.get('title')
        subtitle = request.POST.get('subtitle')
        body = request.POST.get('text_body')
        files = request.FILES['image_news']

        if title != '' and subtitle != '' and body != '' and files != "":
            if PostNews.objects.filter(title=files).exists():
                return JsonResponse({'msg': 'Post allready exist!'})
            else:
                get_user = NkUser.objects.get(id=admin_id)
                post = PostNews(church=get_user, title=title, subtitle=subtitle, body=body, img=files)
                post.save()
                article_posted = publicdata.postedNews(admin_id)
                return JsonResponse(article_posted, safe=False)

        else:
            return JsonResponse({'msg': 'All field must be filled!!!!!!!!!'})
    
    elif request.method == "POST" and 'display_posted_news' in request.POST:
        article_posted = publicdata.postedNews(admin_id)
        if len(article_posted) > 0:
            return JsonResponse(article_posted, safe=False)
        else:
            return JsonResponse({'msg': 'The list is empty!'})

    elif request.method == "POST" and 'delete_blog' in request.POST:
        delete_blog = request.POST.get("delete_blog")
        if delete_blog != '':
            publicdata.deleteBlogPost(admin_id, delete_blog)
            article_posted = publicdata.postedNews(admin_id)
            if len(article_posted) > 0:
                return JsonResponse(article_posted, safe=False)
            else:
                return JsonResponse({'msg': 'The list is empty!'})
        else:
            return JsonResponse({'msg': 'All field must be filled!'})


    # Event session

    elif request.method == 'POST' and 'events_key' in request.POST:
        title = request.POST.get('title')
        subtitle = request.POST.get('subtitle')
        body = request.POST.get('text_body')
        files = request.FILES['image_events']
        if title != '' and subtitle != '' and body != '' and files != "":
            if PostEvents.objects.filter(title=title ,).exists():
                return JsonResponse({'msg': 'Post allready exist!'})
            else:
                get_user = NkUser.objects.get(id=admin_id)
                post = PostEvents(church=get_user, title=title,  body=body, img=files)
                post.save()
                article_posted = publicdata.postedEvents(admin_id)
                return JsonResponse(article_posted, safe=False)
        else:
            return JsonResponse({'msg': 'All field must be filled!'})


    elif request.method == "POST" and 'display_posted_events' in request.POST:
        article_posted = publicdata.postedEvents(admin_id)
        if len(article_posted) > 0:
            return JsonResponse(article_posted, safe=False)
        else:
            return JsonResponse({'msg': 'The list is empty!'})

    elif request.method == "POST" and 'delete_blogevent' in request.POST:
        delete_blogevent = request.POST.get("delete_blogevent")
        if True:
            publicdata.deleteBlogPostEvents(admin_id, delete_blogevent)
            article_posted = publicdata.postedEvents(admin_id)
            if len(article_posted) > 0:
                return JsonResponse(article_posted, safe=False)
            else:
                return JsonResponse({'msg': 'The list is empty!'})
        else:
            return JsonResponse({'msg': 'Error'})


    

    return JsonResponse({'msg': ''})







@login_required
@admin_required
def adminHome(request):
    error = "Nothing is registered yet!"
    admin_username = request.user.username
    admin_id = request.user.id
    template_name ="church/admin/home.html"
    peopleap = ChurchProgrom()
    appointment = ChurchProgrom.displayAppointment(admin_id)
    program = ChurchProgrom.displayChurchProgram(admin_id)
    files = PreachingFile.displayChurchFile(admin_id)
    checkout = CheckoutManage.displaySummary(admin_id)
    checkOutall = CheckoutManage.displayAllSummary(admin_id)
    till = ChurchProgrom.displayChurchTill(admin_id)

    
    contents = {'username': admin_username, 'options': OPTIONS, 'appointment': appointment,
            'program': program, 'files': files, 'checkout': checkout, 'checkoutall': checkOutall,
            'peopleap': peopleap.poepleRendezVous(), 'error': error, 
            'program_options': PROGRAM_OPTIONS, 'till': till,
            }
    return render(request, template_name, contents)


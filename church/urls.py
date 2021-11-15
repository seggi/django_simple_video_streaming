from  django.urls import include, path

from . import views
from church.nkviews import adminviews, publicviews


urlpatterns = [
    path('', views.churchMainActivity, name='adminHome'), 
    
    path('admin/', include(([
        path('', adminviews.adminHome, name='admin_home'),
        path('location/', adminviews.locationData, name='locactionData'),
        path('server/display_account/', adminviews.searchOption, name='account'),
        # path(r'^server/delete_data/(?P<ids>\d+)$',adminviews.optionDeleteEdit, name='deleteEdit'),
        path('server/delete_data/',adminviews.optionDeleteEdit, name='deleteEdit'),
        path('server/program/', adminviews.chuchProgram, name='porstgram'),
        path('server/manage_file/upload_file/', adminviews.uploadFile, name="uploadfile"),
        path('server/report/show/', adminviews.checkOut, name="checkout"),
        path('server/create_post/', adminviews.createPost, name="createpost"),
    
    ], 'church'), namespace='admin')),

    path('public/', include(([
        path('home/', publicviews.PublicHome.as_view(), name='homepage'),
        path('preaching/video/', publicviews.PublicPreaching, name="preaching"),
        # path('preaching/show_video/<int:id>', publicviews.PublicPreaching.as_view(), name="watchvideo"),
        path('events/', publicviews.PublicEvents.as_view(), name='events'),
        path('news/', publicviews.PublicNews.as_view(), name='news'),
        path('news/read_more/<int:pk>/', publicviews.PlublicDisplayMore.as_view(), name="readmore"),
        path('news/aboutus/', publicviews.AboutUs.as_view(), name="aboutus"),
        path('news/contact/', publicviews.Contact.as_view(), name="contactus"),
    ], 'church'), namespace='public')),

   
]

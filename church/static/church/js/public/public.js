//  whatch video 


$(document).on('click', '.btn-watch-public', function() {
    
    $url = $(this).attr('name');
    var video = document.getElementById('public-play-video');
    var title =  document.getElementById('title-video');
    var posted =  document.getElementById('posted-date');
    // video.src = $url;
    // video.play();
    document.getElementById('video_id').value = $url ;
    
    let forms = new FormData(document.getElementById('play_video_form'));
    
    fetch("", {
        method: "POST",
        credentials: "same-origin",
        body: forms,
    }).then(response => response.json())
    .then(result => {
        if (result.msg) {
            alert(result.msg);
        }
        else {
            for(let data in  result){
                video.src = '/media/' + result[data].files;
                title.textContent = 'Title '+ result[data].title;
                posted.textContent = 'Posted on '+ result[data].published_date;
                video.onplay();

            }
        }
        
    }).catch((error) => {
            console.error(error);
    });
    

})


// People register for rendez-vous 


$(document).on('click', '#people-register', function() {
    $url = $(this).attr('name');
    let forms = new FormData(document.getElementById('people-appoiment'));
    let messages = document.getElementById('msgpublick');
    fetch("", {
        method: "POST",
        credentials: "same-origin",
        body: forms,
    }).then(response => response.json())
    .then(result => {
        if (result.msg) {
            messages.textContent = result.msg;
        }
        
    }).catch((error) => {
            console.error(error);
    });
    

})












































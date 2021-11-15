$(document).on('click', '.btn-delete', function() {
    $id = $(this).attr('name');
    // window.location = "/" + $id;
    document.getElementById('f-popup-delete').style.display ="block";
    document.getElementById('delete_money').value = $id; 
    
});

$(document).on('click', '.btn-edit', function() {
    $id = $(this).attr('name');
    document.getElementById('f-popup-edit').style.display ="block";
    document.getElementById('edit_money').value = $id;

    let forms = new FormData(document.getElementById('getdata_form_hidden'));
    

    fetch("/sajec/admin/server/delete_data/", {
        method: "POST",
        credentials: "same-origin",
        body: forms,
    }).then(response => response.json())
    .then(result => {
        if (result.msg) {
            alert(result.msg);
        }
        else{
            for(let data in result[0]) {
                document.getElementById('edit-designation').value = result[0][data].designation;
                document.getElementById('edit-amount').value = result[0][data].debit;
                document.getElementById('updte_money').value = result[0][data].id;
            }

            for(let data in result[1]) {
                document.getElementById('update_in_table').value = result[1].table;
            }
        }
        
    }).catch((error) => {
            console.error(error);
    });

})


// Show More 

$(document).on('click', '.btn-see-ap', function() {
    $body = $(this).attr('name');
    // window.location = "/" + $id;
    document.getElementById('more').style.display ="block";
    document.getElementById('more-title').textContent ='Text posted'; 
    document.getElementById('more-body').textContent = $body;
    
});


// program editing

$(document).on('click', '.btn-edit-ap', function() {
    $id = $(this).attr('name');
    document.getElementById('ap-popup-edit').style.display ="block";
    document.getElementById('edit_program').value = $id;
    

    let forms = new FormData(document.getElementById('getprogram_form_hidden'));
    

    fetch("server/program/", {
        method: "POST",
        credentials: "same-origin",
        body: forms,
    }).then(response => response.json())
    .then(result => {
        if (result.msg) {
            alert(result.msg);
        }
        else{
            for(let data in result) {
                document.getElementById('edit-title').value = result[data].title;
                document.getElementById('program_date').value = result[data].date;
                document.getElementById('textarea-content').value = result[data].body;
                document.getElementById('update_program').value = result[data].id;
            }
        }
        
    }).catch((error) => {
            console.error(error);
    });

})

// Remove post

$(document).on('click', '.btn-delete-ap', function() {
    $id = $(this).attr('name');
    // window.location = "/" + $id;
    document.getElementById('ap-popup-delete').style.display ="block";
    document.getElementById('delete_program').value = $id; 
    
});


// Watch file

$(document).on('click', '.btn-watch', function() {
    $url = $(this).attr('name');
    var video = document.getElementById('play-video');
    video.src = $url;
    // var source = document.createElement('source');

    // source.setAttribute('src', $url)
    // video.appendChild(source);
    video.play();
})

// Remove file 

$(document).on('click', '.btn-file', function() {
    $id = $(this).attr('name');
    document.getElementById('file-popup-delete').style.display ="block";
    document.getElementById('delete_file').value = $id; 

})

// Delete post from public 

$(document).on('click', '.btn-delete-blog', function() {
    $id = $(this).attr('name');
    document.getElementById('blog-popup-delete').style.display ="block";
    document.getElementById('delete_blog').value = $id; 
    
});

// Delete event posted from public 

$(document).on('click', '.btn-delete-blog-e', function() {
    $id = $(this).attr('name');
    document.getElementById('blogevent-popup-delete').style.display ="block";
    document.getElementById('delete_blogevent').value = $id; 
    
});

//  Delete viste hour posted 

$(document).on('click', '.btn-delete-visit', function() {
    $id = $(this).attr('name');
    document.getElementById('delete_visit_posted').value = $id;
    document.getElementById('visit-popup-delete').style.display ="block";
    
    
});

// Info 

$(document).on('click', '.btn-post-info', function() {
    $id = $(this).attr('name');
    document.getElementById("blog-popup-info").style.display = "block"
    document.getElementById('delete_info').value = $id;
});

// Remove current post 

$(document).on('click', '.btn-remove-current', function() {
    $id = $(this).attr('name');
    document.getElementById("blog-currentpost-delete").style.display = "block"
    document.getElementById('remove_currentpost').value = $id;
});


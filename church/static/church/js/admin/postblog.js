// Post events

// document.querySelector("#btn-news-post").onclick = () => {
//     let bindDataIntable = document.querySelector("#postednews");
//     let  forms = new FormData(document.getElementById('form-news'));
//     bindDataIntable.textContent = "Data loading...";

document.querySelector("#btn-news-post").onclick = () => {
    let bindDataIntable = document.querySelector("#postednews");
    const forms = new FormData(document.getElementById("form-news"));
    bindDataIntable.textContent = "Data loading...";
    
    fetch("server/create_post/", {
        method: "POST",
        credentials: "same-origin",
        body: forms,
    }).then(response => response.json())
    .then(result => {
        if (result.msg) {
            alert(result.msg);
        }
        else {
            alert("File Uploaded succesfuly!");
            
            let outputs = `
            <table class="order-table table" style="width: 97%">
            <thead>
                <tr>
                    <th style="width:200px;">Title</th>
                    <th style="width:200px;">Subtitle</th>
                    <th>Dody</th>
                    <th style="width:200px;">body</th>
                </tr>
            </thead>
            <tbody >`;

            for(let datas in result){
                outputs +='<tr>'
                outputs += '<td>'+result[datas].title+'</td>';
                outputs += '<td>'+result[datas].subtitle+'</td>';
                outputs += '<td>'+result[datas].body+'</td>';
                outputs += `<td><img src="${'/media/'+result[datas].img}" style="width: 50px; height: 50px"></td>`;
                outputs += `<td><center><a class="btn-delete-blog" name="${result[datas].id}">Delete</a></center></td>`;
                
                outputs +='</tr>';
                   
                }
                
            outputs +=`
                    </tbody>
                </table>`;
            bindDataIntable.innerHTML = outputs;
        }
        
    }).catch((error) => {
            console.error(error);
    });
    // document.getElementById("file-popup-content").style.display = "none";
    // document.getElementById('postedevents').style.display = "none";
   
}


// Show posted news 


document.querySelector("#btn-show-posted-news-hidden").onclick = () => {
    let bindDataIntable = document.querySelector("#postednews");
    const forms = new FormData(document.getElementById("form-show-posted-news-hidden"));
    bindDataIntable.textContent = "Data loading...";
    
    fetch("server/create_post/", {
        method: "POST",
        credentials: "same-origin",
        body: forms,
    }).then(response => response.json())
    .then(result => {
        if (result.msg) {
            alert(result.msg);
        }
        else {
            let outputs = `
            <table class="order-table table" style="width: 97%">
            <thead>
                <tr>
                    <th style="width:200px;">Title</th>
                    <th style="width:200px;">Subtitle</th>
                    <th>Dody</th>
                    <th style="width:60px;">Images</th>
                    <th style="width:200px;">Actions</th>
                </tr>
            </thead>
            <tbody >`;

            for(let datas in result){
                outputs +='<tr>'
                outputs += '<td>'+result[datas].title+'</td>';
                outputs += '<td>'+result[datas].subtitle+'</td>';
                outputs += '<td>'+result[datas].body+'</td>';
                outputs += `<td><img src="${'/media/'+result[datas].img}" style="width: 50px; height: 50px"></td>`;
                outputs += `<td><center><a class="btn-delete-blog" name="${result[datas].id}">Delete</a></center></td>`;
                
                outputs +='</tr>';
                   
                }
                
            outputs +=`
                    </tbody>
                </table>`;
            bindDataIntable.innerHTML = outputs;
        }
        
    }).catch((error) => {
            console.error(error);
    });

    // document.getElementById("file-popup-content").style.display = "none";
    // document.getElementById('postedevents').style.display = "none";
   
}

// Delete post  from blog 


document.querySelector("#btn-delete-blog-form").onclick = () => {
    let bindDataIntable = document.querySelector("#postednews");
    const forms = new FormData(document.getElementById("delete-blog-form"));
    bindDataIntable.textContent = "Data loading...";
    
    fetch("server/create_post/", {
        method: "POST",
        credentials: "same-origin",
        body: forms,
    }).then(response => response.json())
    .then(result => {
        if (result.msg) {
            alert(result.msg);
        }
        else {
            let outputs = `
            <table class="order-table table" style="width: 97%">
            <thead>
                <tr>
                    <th style="width:200px;">Title</th>
                    <th style="width:200px;">Subtitle</th>
                    <th>Dody</th>
                    <th style="width:60px;">Images</th>
                    <th style="width:200px;">Actions</th>
                </tr>
            </thead>
            <tbody >`;

            for(let datas in result){
                outputs +='<tr>'
                outputs += '<td>'+result[datas].title+'</td>';
                outputs += '<td>'+result[datas].subtitle+'</td>';
                outputs += '<td>'+result[datas].body+'</td>';
                outputs += `<td><img src="${'/media/'+result[datas].img}" style="width: 50px; height: 50px"></td>`;
                outputs += `<td><center><a class="btn-delete-blog" name="${result[datas].id}">Delete</a></center></td>`;
                
                outputs +='</tr>';
                   
                }
                
            outputs +=`
                    </tbody>
                </table>`;
            bindDataIntable.innerHTML = outputs;
        }
        
    }).catch((error) => {
            console.error(error);
    });
    document.getElementById("blog-popup-delete").style.display = "none";
    document.getElementById('postedevents').style.display = "none";
}



//----------------------------------------------------------------
// Events 

document.querySelector("#btn-events-post").onclick = () => {
    document.getElementById("postednews").style.display = 'none';
    document.getElementById("postedevents").style.display = 'block';
    const bindDataIntable = document.querySelector("postedevents");
    const forms = new FormData(document.getElementById("form-events"));
    // bindDataIntable.textContent = "Data loading...";
    
    fetch("server/create_post/", {
        method: "POST",
        credentials: "same-origin",
        body: forms,
    }).then(response => response.json())
    .then(result => {
        if (result.msg) {
            alert(result.msg);
        }
        else {
            
            let outputs = `
            <table class="order-table table" style="width: 100%">
            <thead>
                <tr>
                    <th style="width:200px;">Title</th>
                    <th style="width:200px;">Subtitle</th>
                    <th style="width:200px;">body</th>
                </tr>
            </thead>
            <tbody >`;

            for(let datas in result){
                outputs +='<tr>'
                outputs += '<td>'+result[datas].title+'</td>';
                outputs += '<td>'+result[datas].body+'</td>';
                outputs += `<td><center><a class="btn-file" name="${result[datas].id}">Delete</a>
                            <a class="btn-watch" name="${'/media/files/images/'+result[datas].files}">Watch</a></center></td>`;
                
                outputs +='</tr>';
                   
                }
                
            outputs +=`
                    </tbody>
                </table>`;
            bindDataIntable.innerHTML = outputs;
            alert("File Uploaded succesfuly!");
        }
        
    }).catch((error) => {
            console.error(error);
    });

    document.getElementById("file-popup-content").style.display = "none";
   
}


// Show posted events 


document.querySelector("#btn-show-posted-events-hidden").onclick = () => {
   
    document.getElementById("postednews").style.display = 'none';
    let bindDataIntable = document.querySelector("#postedevents");
    const forms = new FormData(document.getElementById("form-show-posted-events-hidden"));
    bindDataIntable.textContent = "Data loading...";
   
    fetch("server/create_post/", {
        method: "POST",
        credentials: "same-origin",
        body: forms,
    }).then(response => response.json())
    .then(result => {
        if (result.msg) {
            alert(result.msg);
        }
        else {
            let outputs = `
            <table class="order-table table" style="width: 97%">
            <thead>
                <tr>
                    <th style="width:200px;">Title</th>
                    <th style="width:200px;">Subtitle</th>
                    <th style="width:60px;">Images</th>
                    <th style="width:200px;">Actions</th>
                </tr>
            </thead>
            <tbody >`;

            for(let datas in result){
                outputs +='<tr>'
                outputs += '<td>'+result[datas].title+'</td>';
                outputs += '<td>'+result[datas].body+'</td>';
                outputs += `<td><img src="${'/media/'+result[datas].img}" style="width: 50px; height: 50px"></td>`;
                outputs += `<td><center><a class="btn-delete-blog-e" name="${result[datas].id}">Delete</a></center></td>`;
                
                outputs +='</tr>';
                   
                }
                
            outputs +=`
                    </tbody>
                </table>`;
            bindDataIntable.innerHTML = outputs;
        }
        
    }).catch((error) => {
            console.error(error);
    });

    document.getElementById("file-popup-content").style.display = "none";
   
}

// Delete posted event from blog 


document.querySelector("#btn-delete-blogevent-form").onclick = () => {
    // document.getElementById("postednews").style.display = 'none';
    let bindDataIntable = document.querySelector("#postedevents");
    const forms = new FormData(document.getElementById("delete-blogevent-form"));
    bindDataIntable.textContent = "Data loading...";

    fetch("server/create_post/", {
        method: "POST",
        credentials: "same-origin",
        body: forms,
    }).then(response => response.json())
    .then(result => {
        if (result.msg) {
            alert(result.msg);
        }
        else {
            let outputs = `
            <table class="order-table table" style="width: 97%">
            <thead>
                <tr>
                    <th style="width:200px;">Title</th>
                    <th style="width:200px;">Subtitle</th>
                    <th style="width:60px;">Images</th>
                    <th style="width:200px;">Actions</th>
                </tr>
            </thead>
            <tbody >`;

            for(let datas in result){
                outputs +='<tr>'
                outputs += '<td>'+result[datas].title+'</td>';
                outputs += '<td>'+result[datas].body+'</td>';
                outputs += `<td><img src="${'/media/'+result[datas].img}" style="width: 50px; height: 50px"></td>`;
                outputs += `<td><center><a class="btn-delete-blog" name="${result[datas].id}">Delete</a></center></td>`;
                
                outputs +='</tr>';
                   
                }
                
            outputs +=`
                    </tbody>
                </table>`;
            bindDataIntable.innerHTML = outputs;
        }
        
    }).catch((error) => {
            console.error(error);
    });
    document.getElementById("blogevent-popup-delete").style.display = "none";
    document.getElementById('postednews').style.display = "none";
   
}


// post info to blog by selecting category

document.querySelector("#btn-select-category-info").onclick = () => {
    let bindDataIntable = document.querySelector("#postedinfo");
    const forms = new FormData(document.getElementById("select-category-info"));

    bindDataIntable.textContent = "Data loading...";

    fetch("server/program/", {
        method: "POST",
        credentials: "same-origin",
        body: forms,
    }).then(response => response.json())
    .then(result => {
        if (result.msg) {
            alert(result.msg);
        }
        else {
            let outputs = `
            <table class="order-table table" style="width: 100%">
            <thead>
                <tr>
                    <th >Title</th>
                    <th>Date</th>
                    <th>Posted Date</th>
                    <th >Actions</th>
                </tr>
            </thead>
            <tbody >`;

            for(let datas in result){
                outputs +='<tr>'
                outputs += '<td>'+result[datas].title+'</td>';
                outputs += '<td>'+result[datas].date+'</td>';
                outputs += '<td>'+result[datas].posted_date+'</td>';
                outputs += `<td><center><a class="btn-post-info" name="${result[datas].id}" >Post</a>
                                </center></td>`;
                outputs +='</tr>';
                   
                }
                
            outputs +=`
                    </tbody>
                </table>`;
            bindDataIntable.innerHTML = outputs;
        }
    }).catch((error) => {
            console.error(error);
    });

}

// Post article to blog


document.querySelector("#btn-remove-info-form").onclick = () => {
    let bindDataIntable = document.querySelector("#postedinfo");
    const forms = new FormData(document.getElementById("remove-info-form"));
    bindDataIntable.textContent = "Data loading...";

    fetch("server/program/", {
        method: "POST",
        credentials: "same-origin",
        body: forms,
    }).then(response => response.json())
    .then(result => {
        if (result.msg) {
            alert(result.msg);
        }
        else {
            let outputs = `
            <table class="order-table table" style="width: 100%">
            <thead>
                <tr>
                    <th >Title</th>
                    <th>Date</th>
                    <th>Posted Date</th>
                    <th >Actions</th>
                </tr>
            </thead>
            <tbody >`;

            for(let datas in result){
                outputs +='<tr>'
                outputs += '<td>'+result[datas].title+'</td>';
                outputs += '<td>'+result[datas].date+'</td>';
                outputs += '<td>'+result[datas].body+'</td>';
                outputs += `<td><center><a class="btn-remove-current" name="${result[datas].id}" >Remove post</a>
                                </center></td>`;
                outputs +='</tr>';
                   
                }
                
            outputs +=`
                    </tbody>
                </table>`;
            bindDataIntable.innerHTML = outputs;
        }
    }).catch((error) => {
            console.error(error);
    });

}


//  Show current post on public home

document.querySelector("#btn-current-post-hidden").onclick = () => {
    let bindDataIntable = document.querySelector("#postedinfo");
    const forms = new FormData(document.getElementById("select-current-post-info"));
    bindDataIntable.textContent = "Data loading...";

    fetch("server/program/", {
        method: "POST",
        credentials: "same-origin",
        body: forms,
    }).then(response => response.json())
    .then(result => {
        if (result.msg) {
            alert(result.msg);
        }
        else {
            let outputs = `
            <table class="order-table table" style="width: 100%">
            <thead>
                <tr>
                    <th >Title</th>
                    <th>Date</th>
                    <th>Posted Date</th>
                    <th >Actions</th>
                </tr>
            </thead>
            <tbody >`;

            for(let datas in result){
                outputs +='<tr>'
                outputs += '<td>'+result[datas].title+'</td>';
                outputs += '<td>'+result[datas].date+'</td>';
                outputs += '<td>'+result[datas].body+'</td>';
                outputs += `<td><center><a class="btn-remove-current" name="${result[datas].id}" >Remove post</a>
                                </center></td>`;
                outputs +='</tr>';
                   
                }
                
            outputs +=`
                    </tbody>
                </table>`;
            bindDataIntable.innerHTML = outputs;
        }
    }).catch((error) => {
            console.error(error);
    });

}


// Remove current post from list

document.querySelector("#btn-delete-currentpost-form").onclick = () => {
    let bindDataIntable = document.querySelector("#postedinfo");
    const forms = new FormData(document.getElementById("delete-currentpost-form"));
    bindDataIntable.textContent = "Data loading...";

    fetch("server/program/", {
        method: "POST",
        credentials: "same-origin",
        body: forms,
    }).then(response => response.json())
    .then(result => {
        if (result.msg) {
            alert(result.msg);
        }
        
    }).catch((error) => {
            console.error(error);
    });

}

































// Search by date 

document.querySelector("#btn-search-item-file").onclick = () => {
    let bindDataIntable = document.querySelector("#table-data-pr");
    const forms = new FormData(document.getElementById("search-by-date-file"));
    bindDataIntable.textContent = "Data loading...";

    fetch("server/manage_file/upload_file/", {
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
                    <th style="width:200px;">Files</th>
                    <th>Posted Date</th>
                    <th style="width:200px;">Actions</th>
                </tr>
            </thead>
            <tbody >`;

            for(let datas in result){
                outputs +='<tr>'
                outputs += '<td>'+result[datas].title+'</td>';
                outputs += '<td>'+result[datas].files+'</td>';
                outputs += '<td>'+result[datas].published_date+'</td>';
                outputs += `<td><center><a class="btn-file" name="${result[datas].id}">Delete</a>
                            <a class="btn-watch" name="${'/media/'+result[datas].files}">Watch</a></center></td>`;
                
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




// Delete file

document.querySelector("#btn-delete-file-form").onclick = () => {
    let bindDataIntable = document.querySelector("#table-data-pr");
    const forms = new FormData(document.getElementById("delete-file-form"));
    bindDataIntable.textContent = "Data loading...";

    fetch("server/manage_file/upload_file/", {
        method: "POST",
        credentials: "same-origin",
        body: forms,
    }).then(response => response.json())
    .then(result => {
        if (result.msg) {
            alert(result.msg);
        }
        else {
            alert("File Removed succesfuly!");
            
            let outputs = `
            <table class="order-table table" style="width: 100%">
            <thead>
                <tr>
                    <th style="width:200px;">Title</th>
                    <th style="width:200px;">Files</th>
                    <th>Posted Date</th>
                    <th style="width:200px;">Actions</th>
                </tr>
            </thead>
            <tbody >`;

            for(let datas in result){
                outputs +='<tr>'
                outputs += '<td>'+result[datas].title+'</td>';
                outputs += '<td>'+result[datas].files+'</td>';
                outputs += '<td>'+result[datas].published_date+'</td>';
                outputs += `<td><center><a class="btn-file" name="${result[datas].id}">Delete</a>
                            <a class="btn-watch" name="${'/media/'+result[datas].files}">Watch</a></center></td>`;
                
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


// show save files 

document.querySelector("#btn_show_hidden_form_file").onclick = () => {
    let bindDataIntable = document.querySelector("#table-data-pr");
    const forms = new FormData(document.getElementById("hidden_form_show_file"));
    bindDataIntable.textContent = "Data loading...";

    fetch("server/manage_file/upload_file/", {
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
                    <th style="width:200px;">Files</th>
                    <th>Posted Date</th>
                    <th style="width:200px;">Actions</th>
                </tr>
            </thead>
            <tbody >`;

            for(let datas in result){
                outputs +='<tr>'
                outputs += '<td>'+result[datas].title+'</td>';
                outputs += '<td>'+result[datas].files+'</td>';
                outputs += '<td>'+result[datas].published_date+'</td>';
                outputs += `<td><center><a class="btn-file" name="${result[datas].id}">Delete</a>
                            <a class="btn-watch" name="${'/media/'+result[datas].files}">Watch</a></center></td>`;
                
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



// Uploading file

document.querySelector("#btn-file-save-form").onclick = () => {
    let bindDataIntable = document.querySelector("#table-data-pr");
    // var input = document.getElementById('fileUpload').files[0].name;
    const forms = new FormData(document.getElementById("file-post-form"));
    // forms.append('files', input)
    bindDataIntable.textContent = "Data loading...";
    
    fetch("server/manage_file/upload_file/", {
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
            <table class="order-table table" style="width: 100%">
            <thead>
                <tr>
                    <th style="width:200px;">Title</th>
                    <th style="width:200px;">Files</th>
                    <th>Posted Date</th>
                    <th style="width:200px;">Actions</th>
                </tr>
            </thead>
            <tbody >`;

            for(let datas in result){
                outputs +='<tr>'
                outputs += '<td>'+result[datas].title+'</td>';
                outputs += '<td>'+result[datas].files+'</td>';
                outputs += '<td>'+result[datas].published_date+'</td>';
                outputs += `<td><center><a class="btn-file" name="${result[datas].id}">Delete</a>
                            <a class="btn-watch" name="${'/media/'+result[datas].files}">Watch</a></center></td>`;
                
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
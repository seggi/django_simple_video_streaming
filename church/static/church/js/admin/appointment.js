// Search by date

// document.querySelector("#btn-search-item-search").onclick = () => {
//     let bindDataIntable = document.querySelector("#table-data-ap");
//     const forms = new FormData(document.getElementById("search-by-date-program"));
//     bindDataIntable.textContent = "Data loading...";
    
//     fetch("server/program/", {
//         method: "POST",
//         credentials: "same-origin",
//         body: forms,
//     }).then(response => response.json())
//     .then(result => {
//         if (result.msg) {
//             alert(result.msg);
//         }
//         else {
//             let outputs = `
//             <table class="order-table table" style="width: 100%">
//             <thead>
//                 <tr>
//                     <th style="width:200px;">Title</th>
//                     <th>Date</th>
//                     <th>Posted Date</th>
//                     <th style="width:200px;">Actions</th>
//                 </tr>
//             </thead>
//             <tbody >`;

//             for(let datas in result){
//                 outputs +='<tr>'
//                 outputs += '<td>'+result[datas].title+'</td>';
//                 outputs += '<td>'+result[datas].date+'</td>';
//                 outputs += '<td>'+result[datas].posted_date+'</td>';
//                 outputs += `<td><center><a class="btn-delete-ap" name="${result[datas].id}" >Delete</a>
//                                     <a class="btn-edit-ap" name="${result[datas].id}">Edit</a>
//                                     <a class="btn-see-ap" name="${result[datas].body}">More</a></center></td>`;
                
//                 outputs +='</tr>';
                   
//                 }
                
//             outputs +=`
//                     </tbody>
//                 </table>`;
//             bindDataIntable.innerHTML = outputs;
//         }
        
//     }).catch((error) => {
//             console.error(error);
//     });
   
// }



// save visit program

document.querySelector("#btn-save-visit-form").onclick = () => {
    let bindDataIntable = document.querySelector("#table-data-vistit");
    const forms = new FormData(document.getElementById("visit-program-form"));
    document.getElementById('table-data-ap').style.display = 'none';
    document.getElementById("table-data-rend").style.display = "none";
    document.getElementById("table-data-vistit").style.display = 'block';
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
                    <th style="width:200px;">Day</th>
                    <th>Starting Hour</th>
                    <th>Ending Hour</th>
                    <th>Posting Date</th>
                    <th style="width:200px;">Actions</th>
                </tr>
            </thead>
            <tbody >`;

            for(let datas in result){
                outputs +='<tr>'
                outputs += '<td>'+result[datas].day+'</td>';
                outputs += '<td>'+result[datas].starthour+'</td>';
                outputs += '<td>'+result[datas].endhour+'</td>';
                outputs += '<td>'+result[datas].date+'</td>';
                outputs += `<td><center><a class="btn-delete-visit" name="${result[datas].id}" >Delete</a>
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


// delete save visited poste

document.querySelector("#btn-delete-visit-form").onclick = () => {
    let bindDataIntable = document.querySelector("#table-data-vistit");
    const forms = new FormData(document.getElementById("delete-visit-form"));
    document.getElementById('table-data-ap').style.display = 'none';
    document.getElementById("table-data-rend").style.display = "none";
    document.getElementById("table-data-vistit").style.display = 'block';
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
                    <th style="width:200px;">Day</th>
                    <th>Starting Hour</th>
                    <th>Ending Hour</th>
                    <th>Posting Date</th>
                    <th style="width:200px;">Actions</th>
                </tr>
            </thead>
            <tbody >`;

            for(let datas in result){
                outputs +='<tr>'
                outputs += '<td>'+result[datas].day+'</td>';
                outputs += '<td>'+result[datas].starthour+'</td>';
                outputs += '<td>'+result[datas].endhour+'</td>';
                outputs += '<td>'+result[datas].date+'</td>';
                outputs += `<td><center><a class="btn-delete-visit" name="${result[datas].id}" >Delete</a>
                                   </center></td>`;
                
                outputs +='</tr>';
                   
                }
                
            outputs +=`
                    </tbody>
                </table>`;
            bindDataIntable.innerHTML = outputs;
        }
        document.getElementById('visit-popup-delete').style.display ="none";
        
    }).catch((error) => {
            console.error(error);
    });
   
}


// Show vists saved

document.querySelector("#btn_show_hidden_vists_form").onclick = () => {
    let bindDataIntable = document.querySelector("#table-data-vistit");
    const forms = new FormData(document.getElementById("hidden_form_visit"));
    document.getElementById('table-data-ap').style.display = 'none';
    document.getElementById("table-data-rend").style.display = "none";
    document.getElementById("table-data-vistit").style.display = 'block';
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
                    <th style="width:200px;">Day</th>
                    <th>Starting Hour</th>
                    <th>Ending Hour</th>
                    <th>Posting Date</th>
                    <th style="width:200px;">Actions</th>
                </tr>
            </thead>
            <tbody >`;

            for(let datas in result){
                outputs +='<tr>'
                outputs += '<td>'+result[datas].day+'</td>';
                outputs += '<td>'+result[datas].starthour+'</td>';
                outputs += '<td>'+result[datas].endhour+'</td>';
                outputs += '<td>'+result[datas].date+'</td>';
                outputs += `<td><center><a class="btn-delete-visit" name="${result[datas].id}" >Delete</a>
                                   </center></td>`;
                
                outputs +='</tr>';
                   
                }
                
            outputs +=`
                    </tbody>
                </table>`;
            bindDataIntable.innerHTML = outputs;
        }
        document.getElementById('visit-popup-delete').style.display ="none";
        
    }).catch((error) => {
            console.error(error);
    });
   
}





// Rendez-vous asked

document.querySelector("#btn-renvez-vous-show").onclick = () => {
    let bindDataIntable = document.querySelector("#table-data-rend")
    document.getElementById('table-data-ap').style.display = 'none';
    document.getElementById("table-data-rend").style.display = "block";
    document.getElementById("table-data-vistit").style.display = 'none';
    const forms = new FormData(document.getElementById("renvez-vous-show"))
    var appointment = document.getElementById("appointment-asked");
    bindDataIntable.textContent = "Data loading...";
    
    fetch("server/program/", {
        method: "POST",
        credentials: "same-origin",
        body: forms,
    }).then(response => response.json())
    .then(result => {
        if (result.msg) {
            alert(result.msg)
        }
        else {

            for(let datas in result[0]){
                appointment.textContent = 'People '+ result[0][datas].people;
            }
            
            let outputs = `
            <table class="order-table table" style="width: 100%">
            <thead>
                <tr>
                    <th style="width:200px;">Names</th>
                    <th>Contacte</th>
                    <th>Rendez-vous</th>
                    <th>Hour of Rendez-vous</th>
                    <th style="width:200px;">Date of request</th>
                </tr>
            </thead>
            <tbody >`;

            for(let datas in result[1]){
                outputs +='<tr>'
                outputs += '<td>'+result[1][datas].fullname+'</td>';
                outputs += '<td>'+result[1][datas].contacte+'</td>';
                outputs += '<td>'+result[1][datas].day+'</td>';
                outputs += '<td>'+result[1][datas].hour+'</td>';
                outputs += '<td>'+result[1][datas].date+'</td>';
                // outputs += `<td><center><a class="btn-delete-ap" name="${result[datas].id}" >Delete</a>
                //             <a class="btn-edit-ap" name="${result[datas].id}">Edit</a>
                //             <a class="btn-see-ap" name="${result[datas].body}">More</a></center></td>`;
                
                outputs +='</tr>';
                   
                }
                
            outputs +=`
                    </tbody>
                </table>`;
            bindDataIntable.innerHTML = outputs;


        }
    }).catch((error) => {
        console.log(error);

    })
}




//  Record appointment

document.querySelector("#btn-ap-save-form").onclick = () => {
    let bindDataIntable = document.querySelector("#table-data-ap");
    const forms = new FormData(document.getElementById("a-post-form"));
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
                    <th style="width:200px;">Title</th>
                    <th>Date</th>
                    <th>Posted Date</th>
                    <th style="width:200px;">Actions</th>
                </tr>
            </thead>
            <tbody >`;

            for(let datas in result){
                outputs +='<tr>'
                outputs += '<td>'+result[datas].title+'</td>';
                outputs += '<td>'+result[datas].date+'</td>';
                outputs += '<td>'+result[datas].posted_date+'</td>';
                outputs += `<td><center><a class="btn-delete-ap" name="${result[datas].id}" >Delete</a>
                                    <a class="btn-edit-ap" name="${result[datas].id}">Edit</a>
                                    <a class="btn-see-ap" name="${result[datas].body}">More</a></center></td>`;
                
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

// Show btn 

document.querySelector("#btn_show_hidden_form").onclick = () => {
    let bindDataIntable = document.querySelector("#table-data-ap");
    const forms = new FormData(document.getElementById("hidden_form_show"));
    bindDataIntable.textContent = "Data loading...";
    document.getElementById("table-data-rend").style.display = "none";
    document.getElementById('table-data-ap').style.display = 'block';
      document.getElementById("table-data-vistit").style.display = 'none';
    
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
                    <th style="width:200px;">Title</th>
                    <th>Date</th>
                    <th>Posted Date</th>
                    <th style="width:200px;">Actions</th>
                </tr>
            </thead>
            <tbody >`;

            for(let datas in result){
                outputs +='<tr>'
                outputs += '<td>'+result[datas].title+'</td>';
                outputs += '<td>'+result[datas].date+'</td>';
                outputs += '<td>'+result[datas].posted_date+'</td>';
                outputs += `<td><center><a class="btn-delete-ap" name="${result[datas].id}" >Delete</a>
                            <a class="btn-edit-ap" name="${result[datas].id}">Edit</a>
                            <a class="btn-see-ap" name="${result[datas].body}">More</a></center></td>`;
                
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

// Update program 

document.querySelector("#btn-edit-program-form").onclick = () => {
    let bindDataIntable = document.querySelector("#table-data-ap");
    const forms = new FormData(document.getElementById("edit-program-form"));
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
            alert("Post updated succesfuly!");

            let outputs = `
            <table class="order-table table" style="width: 100%">
            <thead>
                <tr>
                    <th style="width:200px;">Title</th>
                    <th>Date</th>
                    <th>Posted Date</th>
                    <th style="width:200px;">Actions</th>
                </tr>
            </thead>
            <tbody >`;

            for(let datas in result){
                outputs +='<tr>'
                outputs += '<td>'+result[datas].title+'</td>';
                outputs += '<td>'+result[datas].date+'</td>';
                outputs += '<td>'+result[datas].posted_date+'</td>';
                outputs += `<td><center><a class="btn-delete-ap" name="${result[datas].id}" >Delete</a>
                            <a class="btn-edit-ap" name="${result[datas].id}">Edit</a>
                            <a class="btn-see-ap" name="${result[datas].body}">More</a></center></td>`;
                
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
    document.getElementById("ap-popup-edit").style.display = "none";
   
}

// Remove post 

document.querySelector("#btn-delete-program-form").onclick = () => {
    let bindDataIntable = document.querySelector("#table-data-ap");
    const forms = new FormData(document.getElementById("delete-program-form"));
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
            alert("Post removed succesfuly!");
            
            let outputs = `
            <table class="order-table table" style="width: 100%">
            <thead>
                <tr>
                    <th style="width:200px;">Title</th>
                    <th>Date</th>
                    <th>Posted Date</th>
                    <th style="width:200px;">Actions</th>
                </tr>
            </thead>
            <tbody >`;

            for(let datas in result){
                outputs +='<tr>'
                outputs += '<td>'+result[datas].title+'</td>';
                outputs += '<td>'+result[datas].date+'</td>';
                outputs += '<td>'+result[datas].posted_date+'</td>';
                outputs += `<td><center><a class="btn-delete-ap" name="${result[datas].id}" >Delete</a>
                            <a class="btn-edit-ap" name="${result[datas].id}">Edit</a>
                            <a class="btn-see-ap" name="${result[datas].body}">More</a></center></td>`;
                
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

    document.getElementById("ap-popup-delete").style.display = "none";
   
}



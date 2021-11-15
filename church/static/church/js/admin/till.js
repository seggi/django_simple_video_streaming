// Credit popup

document.querySelector("#btn-fill-amount-form").onclick = () => {
    let bindDataIntable = document.querySelector("#table-data-till");
    const forms = new FormData(document.getElementById("fill-data-form"));
    bindDataIntable.textContent = "Data loading...";
    
    fetch("server/report/show/", {
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
            <table class="order-table table" style="width: 100%" id="main_classes_t1">
            <thead>
                <tr>
                    <th>Designation</th>
                    <th>Debit</th>
                    <th>Credit</th>
                    
                    <th>Date</th>
                </tr>
            </thead>
            <tbody >`;

            for(let datas in result){
                outputs +='<tr>'
                outputs += '<td>'+result[datas].designation+'</td>';
                outputs += '<td>'+result[datas].debit+'</td>';
                outputs += '<td>'+result[datas].credit+'</td>';
                // outputs += '<td>'+result[datas].balance+'</td>';
                outputs += '<td>'+result[datas].date+'</td>';
                
                outputs +='</tr>';
                   
                }
                
            outputs +=`
                    </tbody>
                </table>`;
            bindDataIntable.innerHTML = outputs;
            addPagerToTables('#main_classes_t1', 10);
        }
        
    }).catch((error) => {
            console.error(error);
    });
   
}

// checkout show

document.querySelector("#btn_show_hidden_form_checkout").onclick = () => {
    let bindDataIntable = document.querySelector("#table-data-till");
    const forms = new FormData(document.getElementById("hidden_form_show_checkout"));
    // bindDataIntable.textContent = "Data loading...";
    
    
    fetch("server/report/show/", {
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
            <table class="order-table table" style="width: 100%" id="main_classes_t1">
            <thead>
                <tr>
                    <th>Designation</th>
                    <th>Debit</th>
                    <th>Credit</th>
                    
                    <th>Date</th>
                </tr>
            </thead>
            <tbody >`;

            for(let datas in result){
                outputs +='<tr>'
                outputs += '<td>'+result[datas].designation+'</td>';
                outputs += '<td>'+result[datas].debit+'</td>';
                outputs += '<td>'+result[datas].credit+'</td>';
                // outputs += '<td>'+result[datas].balance+'</td>';
                outputs += '<td>'+result[datas].date+'</td>';
                
                outputs +='</tr>';
                   
                }
                
            outputs +=`
                    </tbody>
                </table>`;
            bindDataIntable.innerHTML = outputs;
            addPagerToTables('#main_classes_t1', 10);
        }
        
    }).catch((error) => {
            console.error(error);
    });

   
}


// Search report

document.querySelector("#btn-search-item-checkout").onclick = () => {
    let bindDataIntable = document.querySelector("#table-data-till");
    const forms = new FormData(document.getElementById("search-by-date-checkout"));
    bindDataIntable.textContent = "Data loading...";
    
    fetch("server/report/show/", {
        method: "POST",
        credentials: "same-origin",
        body: forms,
    }).then(response => response.json())
    .then(result => {
        if (result.msg) {
            alert(result.msg);
        }
        else {

            let sum = document.createElement('h2');
            let title = document.createElement('h2');

            for(let datas in result[1]){
                document.getElementById("head-balance").innerHTML = '';
                document.getElementById('head-balance').innerHTML = '';
                sum.textContent = '   $ '+ result[1][datas].datesum;
                title.textContent = 'Search Balance';
                document.getElementById('head-balance').appendChild(title);
                document.getElementById("head-balance").appendChild(sum);
                
            }
            // 
             let outputs = `
                <table class="order-table table" style="width: 100%" id="main_classes_t1">
                <thead>
                    <tr>
                        <th>Designation</th>
                        <th>Debit</th>
                        <th>Credit</th>
                        
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody >`;


            for(let datas in result[0]){
                
                outputs +='<tr>'
                outputs += '<td>'+result[0][datas].designation+'</td>';
                outputs += '<td>'+result[0][datas].debit+'</td>';
                outputs += '<td>'+result[0][datas].credit+'</td>';
                // outputs += '<td>'+result[0][datas].balance+'</td>';
                outputs += '<td>'+result[0][datas].date+'</td>';
                
                outputs +='</tr>';
                   
                }
                
            outputs +=`
                    </tbody>
                </table>`;
            bindDataIntable.innerHTML = outputs;
            addPagerToTables('#main_classes_t1', 10);

        }
        
    }).catch((error) => {
            console.error(error);
    });
   
}


//=============================================================
// ============================================================
// outputs += `<td><center><a class="btn-delete-ap" name="${result[datas].id}" >Delete</a>
// <a class="btn-edit-ap" name="${result[datas].id}">Edit</a>
// <a class="btn-see-ap" name="${result[datas].body}">More</a></center></td>`;
// outputs += `<td><center><a class="btn-delete-ap" name="${result[datas].id}" >Delete</a>
// <a class="btn-edit-ap" name="${result[datas].id}">Edit</a>
// <a class="btn-see-ap" name="${result[datas].body}">More</a></center></td>`;
// outputs += `<td><center><a class="btn-delete-ap" name="${result[datas].id}" >Delete</a>
// <a class="btn-edit-ap" name="${result[datas].id}">Edit</a>
// <a class="btn-see-ap" name="${result[datas].body}">More</a></center></td>`;

// document.getElementById('search_sum').appendChild(title);
                // document.getElementById("search_sum").appendChild(sum);
// ============================================================




// ===========================PAGINATION=============================



function addPagerToTables(tables, rowsPerPage = 10) {

    tables = 
        typeof tables == "string"
      ? document.querySelectorAll(tables)
      : tables;

    for (let table of tables) 
        addPagerToTable(table, rowsPerPage);

}

function addPagerToTable(table, rowsPerPage = 10) {

    let tBodyRows = table.querySelectorAll('tBody tr');
    let numPages = Math.ceil(tBodyRows.length/rowsPerPage);

    let colCount = 
    [].slice.call(
        table.querySelector('tr').cells
    )
    .reduce((a,b) => a + parseInt(b.colSpan), 0);

    table
    .createTFoot()
    .insertRow()
    .innerHTML = `<td colspan=${colCount}><div class="nav"></div></td>`;

    if(numPages == 1)
        return;

    for(i = 0;i < numPages;i++) {

        let pageNum = i + 1;

        table.querySelector('.nav')
        .insertAdjacentHTML(
            'beforeend',
            `<a href="#" rel="${i}">${pageNum}</a>`        
        );

    }

    changeToPage(table, 1, rowsPerPage);

    for (let navA of table.querySelectorAll('.nav a'))
        navA.addEventListener(
            'click', 
            e => changeToPage(
                table, 
                parseInt(e.target.innerHTML), 
                rowsPerPage
            )
        );

}

function changeToPage(table, page, rowsPerPage) {

    let startItem = (page - 1) * rowsPerPage;
    let endItem = startItem + rowsPerPage;
    let navAs = table.querySelectorAll('.nav a');
    let tBodyRows = table.querySelectorAll('tBody tr');

    for (let nix = 0; nix < navAs.length; nix++) {

        if (nix == page - 1)
            navAs[nix].classList.add('active');
        else 
            navAs[nix].classList.remove('active');

        for (let trix = 0; trix < tBodyRows.length; trix++) 
            tBodyRows[trix].style.display = 
                (trix >= startItem && trix < endItem)
                ? 'table-row'
                : 'none';  

    }

}
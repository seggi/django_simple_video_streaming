
// Display Option 
let bindDataIntable = document.querySelector("#table-data");
// let printDateIntable = document.querySelector("#page-body");


chooseOptions = (option) => {
    return new option();
}

const displayInTable = chooseOptions(class {
    displayGivings() {
        document.querySelector("#btn-select-category").onclick = () => {
            const forms = new FormData(document.getElementById("select-category"));
            let setoption = document.getElementById("select_option").value;
            var printDateIntable = document.getElementById("printtable");

            document.getElementById("options").value = setoption;
            document.getElementById("delete_in_table").value = setoption;
            document.getElementById('edit_in_table').value = setoption;

            document.getElementById("givings").innerHTML = '';
            document.getElementById('tithes').innerHTML = '';

            let element = document.createElement('h2');
            let element1 = document.createElement('h2');
        
            bindDataIntable.textContent = "Data loading...";

            fetch("/sajec/admin/server/display_account/", {
                method: "POST",
                credentials: "same-origin",
                body: forms,
            }).then(response => response.json())
            .then(result => {
                if (result.msg) {
                    alert(result.msg);
                }
                else {

                    for(let sum in result[1]){
                        element.textContent = '$ '+ result[1][sum].sum;
                        document.getElementById("givings").appendChild(element);
                        document.getElementById('f-givings').textContent = '$ '+ result[1][sum].sum;
                    }

                    for (let sum in result[2]){
                        element1.textContent ='$ '+ result[2][sum].sum;
                        document.getElementById('tithes').appendChild(element1);
                        document.getElementById('f-tithes').textContent = '$ '+ result[2][sum].sum;
                    }

                    let outputs = `
                    <table class="order-table table" cellpadding="3" id="printTable">
                    <thead>
                        <tr>
                            <th>Designation</th>
                            <th>Debit</th>
                            
                            <th>Date & Time</th>
                            <th>Activities</th>
                        </tr>
                    </thead>
                    <tbody >`;
        
                    for(let datas in result[0]){
                        outputs +='<tr>'
                        outputs += '<td>'+result[0][datas].designation+'</td>';
                        outputs += '<td>'+result[0][datas].debit+'</td>';
                        // outputs += '<td>'+result[0][datas].balance+'</td>';
                        outputs += '<td>'+result[0][datas].date+'</td>';
                        outputs += `<td><center><a class="btn-delete" name="${result[0][datas].id}" >Delete</a>
                                    <a class="btn-edit" name=${result[0][datas].id}>Edit</a></center></td>`;
                        
                        outputs +='</tr>';
                           
                        }
                        
                    outputs +=`
                            </tbody>
                        </table>`;
                    bindDataIntable.innerHTML = outputs;

                    // print page
                    let outputs1 = `
                       <table>
                        <thead>
                            <tr>
                                <th>Designation</th>
                                <th>Debit</th>
                                
                                <th>Date & Time</th>
                            </tr>
                        </thead>
                    <tbody>`;
        
                    for(let datas in result[0]){
                        outputs1 +='<tr >'
                        outputs1 += '<td>'+result[0][datas].designation+'</td>';
                        outputs1 += '<td>'+result[0][datas].debit+'</td>';
                        // outputs1 += '<td>'+result[0][datas].balance+'</td>';
                        outputs1 += '<td>'+result[0][datas].date+'</td>';
                        
                        outputs1 +='</tr>';
                       
                        }
                        
                    outputs1 +=`
                            </tbody>
                        </table>`;
                    printDateIntable.innerHTML = outputs1;

                    
                    
                }


            }).catch((error) => {
                    console.error(error);
            });

        }

    }

    

    recordAmount() {
        document.querySelector('#btn-record-amount-form').onclick = () => {
            const forms = new FormData(document.getElementById("record-amount-form"));
            
            bindDataIntable.textContent = "Data loading...";

            fetch("/sajec/admin/server/display_account/", {
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
    }

    deleteData() {
        document.querySelector("#btn-delete-amount-form").onclick = () => {
            const forms = new FormData(document.getElementById("delete-data-form"));
            
            fetch("/sajec/admin/server/delete_data/", {
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
                    <table class="order-table table">
                    <thead>
                        <tr>
                            <th>Designation</th>
                            <th>Debit</th>
                            
                            <th>Date & Time</th>
                            <th>Activities</th>
                        </tr>
                    </thead>
                    <tbody >`;
        
                    for(let datas in result){
                        outputs +='<tr>'
                        outputs += '<td>'+result[datas].designation+'</td>';
                        outputs += '<td>'+result[datas].debit+'</td>';
                        // outputs += '<td>'+result[datas].balance+'</td>';
                        outputs += '<td>'+result[datas].date+'</td>';
                        outputs += `<td><center><a class="btn-delete" name="${result[datas].id}" >Delete</a>
                                    <a class="btn-edit" name=${result[datas].id}>Edit</a></center></td>`;
                        
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
            // document.getElementById('f-popup-delete').style.display ="none";
        }
    }

    editData() {
        document.querySelector("#btn-edit-amount-form").onclick = () => {
            const forms = new FormData(document.getElementById("edit-data-form"));
            
            
            fetch("/sajec/admin/server/delete_data/", {
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
                    <table class="order-table table">
                    <thead>
                        <tr>
                            <th>Designation</th>
                            <th>Debit</th>
                            
                            <th>Date & Time</th>
                            <th>Activities</th>
                        </tr>
                    </thead>
                    <tbody >`;
        
                    for(let datas in result){
                        outputs +='<tr>'
                        outputs += '<td>'+result[datas].designation+'</td>';
                        outputs += '<td>'+result[datas].debit+'</td>';
                        // outputs += '<td>'+result[datas].balance+'</td>';
                        outputs += '<td>'+result[datas].date+'</td>';
                        outputs += `<td><center><a class="btn-delete" name="${result[datas].id}" >Delete</a>
                                    <a class="btn-edit" name=${result[datas].id}>Edit</a></center></td>`;
                        
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
            document.getElementById('f-popup-edit').style.display ="none";
        }
    }

});


displayInTable.displayGivings();
// displayInTable.displayTithe();
displayInTable.recordAmount();
displayInTable.deleteData();
displayInTable.editData();


// ============================= Print table ===================
// =============================================================

function printData()
{
   var divToPrint=document.getElementById("print-table-content");

   var style = "<style>";
   style = style + "table {width: 100%; font: 17px Calibri;}";
   style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
   style = style + "padding: 2px 3px; text-align: center;}";
   style = style + "</style>";
   newWin= window.open("", "", 'height=700,width=700');
   newWin.document.write(style);
   newWin.document.write(divToPrint.innerHTML);
   newWin.print();
   newWin.close();
}

$('#getbutton').on('click',function(){
printData();
})
















































// displayTithe() {
    //     document.querySelector('#btn-search-item-group-search').onclick = () => {
    //         const forms = new FormData(document.getElementById("search-by-date"));
            
    //         bindDataIntable.textContent = "Data loading...";

    //         fetch("/sajec/admin/server/display_account/", {
    //             method: "POST",
    //             credentials: "same-origin",
    //             body: forms,
    //         }).then(response => response.json())
    //         .then(result => {
    //             if (result.msg) {
    //                 alert(result.msg);
    //             }
    //             else {
    //                 let outputs = `
    //                 <table class="order-table table">
    //                 <thead>
    //                     <tr>
    //                         <th>Designation</th>
    //                         <th>Debit</th>
    //                         
    //                         <th>Date & Time</th>
    //                         <th>Activities</th>
    //                     </tr>
    //                 </thead>
    //                 <tbody >`;
        
    //                 for(let datas in result){
    //                     outputs +='<tr>'
    //                     outputs += '<td>'+result[datas].designation+'</td>';
    //                     outputs += '<td>'+result[datas].debit+'</td>';
    //                     outputs += '<td>'+result[datas].balance+'</td>';
    //                     outputs += '<td>'+result[datas].date+'</td>';
    //                     outputs += '<td><a href="#">Delete</a><a href="#">Update</a></td>';
                        
    //                     outputs +='</tr>';
                           
    //                     }
                        
    //                 outputs +=`
    //                         </tbody>
    //                     </table>`;
    //                 bindDataIntable.innerHTML = outputs;
    //             }
    //         }).catch((error) => {
    //                 console.error(error);
    //         });

    //     }
    // }




// function printDiv(id) {
//     var data = document.getElementById(id).innerHTML;
//     var mywindow = window.open('', 'print-table-content', 'height=400, width=600');
//     mywindow.document.write (`
//             <table class="order-table table">
//                 <thead>
//                     <tr>
//                         <th>Designation</th>
//                         <th>Debit</th>
//                         <th>Balance</th>
//                         <th>Date & Time</th>
//                     </tr>
//                 </thead>
//             <tbody >`);
//     mywindow.document.white(data);
//     mywindow.document.write('</tbody></table>');
//     mywindow.document.close();

//     mywindow.onload = function() {
//         mywindow.focus();
//         mywindow.print();
//         mywindow.close();
//     }; 
// }
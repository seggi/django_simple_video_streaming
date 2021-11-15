

// popup screen saving givings and tith

fopenScreen = () => {
    document.getElementById("f-popup-content").style.display = "block";
}

fcloseModal = () => {
    document.getElementById("f-popup-content").style.display = "none";
}

// popup screen delete & Edit data 

fcloseModalDel = () => {
    document.getElementById("f-popup-delete").style.display = "none";
}


fcloseModalEdit = () => {
    document.getElementById("f-popup-edit").style.display = "none";
}

// appointment popup screen 

apopenScreen = () => {
    document.getElementById('a-popup-content').style.display ="block";
}

apcloseModal = () => {
    document.getElementById('a-popup-content').style.display = "none"
}

// More screen 

mcloseScreen = () => {
    document.getElementById('more').style.display = 'none';
}

// popup program 

apcloseModalEdit = () => {
    document.getElementById('ap-popup-edit').style.display = 'none';
}

apcloseModalDel = () => {
    document.getElementById('ap-popup-delete').style.display = 'none';
} 

// popup file screen

fileOpenScreen = () => {
    document.getElementById('file-popup-content').style.display = 'block'
}

filecloseModal = () => {
    document.getElementById('file-popup-content').style.display = 'none';
}

filecloseModalDel = () => {
    document.getElementById('file-popup-delete').style.display = 'none';
} 

// fill session

fillOpenScreen = () => {
    document.getElementById("till-popup-edit").style.display = 'block';
}

fillCloseModal = () => {
    document.getElementById("till-popup-edit").style.display = 'none';
}

// close post news 

openNewscloseModal = () => {
    document.getElementById("post-box-news").style.display = "block";
}

postNewscloseModal = () => {
    document.getElementById("post-box-news").style.display = "none";
}

//  close delete post 

blogcloseModalDel = () => {
    document.getElementById("blog-popup-delete").style.display = "none";
}


// close post event

openEventscloseModal = () => {
    document.getElementById("post-box-events").style.display = "block";
    // document.getElementById("postedevents").style.display = "none";
}

postEventscloseModal = () => {
    document.getElementById("post-box-events").style.display = "none";
}

//  close event modal

blogEventcloseModal = () => {
    document.getElementById("blogevent-popup-delete").style.display = "none";
}

// close & open to save visit program

visitCloseModal = () => {
    document.getElementById("visit-popup").style.display = "none";

}

visitOpenModal = () => {
    document.getElementById("visit-popup").style.display ="block";
}

// delete posted visit

visitCloseModalDel = () => {
    document.getElementById("visit-popup-delete").style.display = "none";

}

// open info post 

openInfoscloseModal = () => {
     document.getElementById("post-box-info").style.display = "block";
}

closeInfoModelPost = () => {
    document.getElementById("blog-popup-info").style.display = "none";
}

// current post remove

currentcloseModalDel  = () => {
    document.getElementById("blog-currentpost-delete").style.display = "none";

}
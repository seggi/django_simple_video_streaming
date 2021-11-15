onfinanceScreen = () => {
    document.getElementById('session-main-content-right1').style.display = "block";
    document.getElementById('session-main-content-right2').style.display ="none";
    document.getElementById('session-main-content-right3').style.display ="none";
    document.getElementById('session-main-content-right4').style.display ="none";
    document.getElementById('session-main-content-right5').style.display ="none";
    document.getElementById('welcom').style.display ="none";

    document.getElementById('open1').style.color ="#fff";
    document.getElementById('open1').style.background ="dodgerblue";
    document.getElementById('open2').style.color ="#333";
    document.getElementById('open2').style.background ="#fff";
    document.getElementById('open3').style.color ="#333";
    document.getElementById('open3').style.background ="#fff";
    document.getElementById('open4').style.color ="#333";
    document.getElementById('open4').style.background ="#fff";
    document.getElementById('open5').style.color ="#333";
    document.getElementById('open5').style.background ="#fff";

    
   
}

onAppointmentScreen = () => {
    document.getElementById('session-main-content-right1').style.display = "none";
    document.getElementById('session-main-content-right2').style.display ="block";
    document.getElementById('session-main-content-right3').style.display ="none";
    document.getElementById('session-main-content-right4').style.display ="none";
    document.getElementById('session-main-content-right5').style.display ="none";
    document.getElementById('welcom').style.display ="none";

    document.getElementById('open2').style.color ="#fff";
    document.getElementById('open2').style.background ="dodgerblue";
    document.getElementById('open1').style.color ="#333";
    document.getElementById('open1').style.background ="#fff";
    document.getElementById('open3').style.color ="#333";
    document.getElementById('open3').style.background ="#fff";
    document.getElementById('open4').style.color ="#333";
    document.getElementById('open4').style.background ="#fff";
    document.getElementById('open5').style.color ="#333";
    document.getElementById('open5').style.background ="#fff";
}

onPreachingScreen = () => {
    document.getElementById('session-main-content-right1').style.display ="none";
    document.getElementById('session-main-content-right2').style.display ="none";
    document.getElementById('session-main-content-right3').style.display ="block";
    document.getElementById('session-main-content-right4').style.display ="none";
    document.getElementById('session-main-content-right5').style.display ="none";
    document.getElementById('welcom').style.display ="none";

    document.getElementById('open3').style.color ="#fff";
    document.getElementById('open3').style.background ="dodgerblue";
    document.getElementById('open1').style.color ="#333";
    document.getElementById('open1').style.background ="#fff";
    document.getElementById('open2').style.color ="#333";
    document.getElementById('open2').style.background ="#fff";
    document.getElementById('open4').style.color ="#333";
    document.getElementById('open4').style.background ="#fff";
    document.getElementById('open5').style.color ="#333";
    document.getElementById('open5').style.background ="#fff";

}

ontillScreen = () => {
    document.getElementById('session-main-content-right1').style.display = "none";
    document.getElementById('session-main-content-right2').style.display ="none";
    document.getElementById('session-main-content-right3').style.display ="none";
    document.getElementById('session-main-content-right4').style.display ="block";
    document.getElementById('session-main-content-right5').style.display ="none";
    document.getElementById('welcom').style.display ="none";

    document.getElementById('open4').style.color ="#fff";
    document.getElementById('open4').style.background ="dodgerblue";
    document.getElementById('open1').style.color ="#333";
    document.getElementById('open1').style.background ="#fff";
    document.getElementById('open3').style.color ="#333";
    document.getElementById('open3').style.background ="#fff";
    document.getElementById('open2').style.color ="#333";
    document.getElementById('open2').style.background ="#fff";
    document.getElementById('open5').style.color ="#333";
    document.getElementById('open5').style.background ="#fff";
}

onBlogScreen = () => {
    document.getElementById('session-main-content-right1').style.display = "none";
    document.getElementById('session-main-content-right2').style.display ="none";
    document.getElementById('session-main-content-right3').style.display ="none";
    document.getElementById('session-main-content-right4').style.display ="none";
    document.getElementById('session-main-content-right5').style.display ="block";
    document.getElementById('welcom').style.display ="none";

    document.getElementById('open5').style.color ="#fff";
    document.getElementById('open5').style.background ="dodgerblue";
    document.getElementById('open1').style.color ="#333";
    document.getElementById('open1').style.background ="#fff";
    document.getElementById('open3').style.color ="#333";
    document.getElementById('open3').style.background ="#fff";
    document.getElementById('open4').style.color ="#333";
    document.getElementById('open4').style.background ="#fff";
    document.getElementById('open2').style.color ="#333";
    document.getElementById('open2').style.background ="#fff";
}


// Switching Finance Screen

showDebit = () => {
    document.getElementById('debit-box').style.display = "block";
    document.getElementById('credit-box').style.display = "none";
}

showCredit = () => {
    document.getElementById('debit-box').style.display = "none";
    document.getElementById('credit-box').style.display = "block";
}

// Switching Blog screen

showNews = () => {
    document.getElementById('show-news-posted').style.display = "block";
    document.getElementById('show-event-posted').style.display = "none";
    document.getElementById('show-info-posted').style.display = "none";
    document.getElementById('postedevents').style.display = "none";
    document.getElementById('postedinfo').style.display = "none";
    document.getElementById('postednews').style.display = "block";
    document.getElementById('welcom').style.display ="none";
}

showEvent = () => {
    document.getElementById('show-news-posted').style.display = "none";
    document.getElementById('show-event-posted').style.display = "block";
    document.getElementById('show-info-posted').style.display = "none";
    document.getElementById('postednews').style.display = "none";
    document.getElementById('postedevents').style.display = "block"; 
    document.getElementById('postedinfo').style.display = "none";
    document.getElementById('welcom').style.display ="none";
}


showInfo = () => {
    document.getElementById('show-info-posted').style.display = "block";
    document.getElementById('show-news-posted').style.display = "none";
    document.getElementById('show-event-posted').style.display = "none";
    document.getElementById('postednews').style.display = "none";
    document.getElementById('postedevents').style.display = "none";
    document.getElementById('postedinfo').style.display = "block";
    document.getElementById('welcom').style.display ="none";
    
}
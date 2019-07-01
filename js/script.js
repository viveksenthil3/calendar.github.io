window.onload = function(){
    
//    document.getElementsByClassName("from-calendar").style.display = "none";
//    document.getElementsByClassName("month").style.display = "none";
    var fr_cal_container = document.getElementsByClassName("from-calendar")[0];
    fr_cal_container.style.display = "none";
    
    var to_cal_container = document.getElementsByClassName("to-calendar")[0];
    to_cal_container.style.display = "none";
    
    fromCalendar(-1, -1);
    toCalendar(-1, -1);
}
    
function fromCalendar(m, y){
    var d = new Date();
    var year = y == -1 ?d.getFullYear() : y;
    var month = m == -1 ?d.getMonth() : m;
    var month_name = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var firstday = new Date(year, month, 1).toDateString();
//    console.log(firstday);
    var lastday = new Date(year, month+1, 0).toDateString();
    var calendar = getFromCalander(firstday.substring(0,3), lastday.substring(8,10), d.getDate(), (year ==d.getFullYear() && month == d.getMonth()) ? true : false);
   
   document.getElementById("year-name").innerHTML = year;
   document.getElementById("month-name").innerHTML =month_name[month];
   if (y==-1 && m==-1)
       document.getElementById("dates").appendChild(calendar);
    else
        document.getElementById("dates").replaceChild(calendar, document.getElementById("tb"));
}

function getFromCalander(firstDay, lastDay, currDay, currMonth){
    
    var table = document.createElement('table');
    table.id="tb";
    var tr = document.createElement('tr');
    var day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var day_no = day.indexOf(firstDay);
    
    for(var i=0; i<7; i++){
        
        var td = document.createElement('td');
        td.innerHTML = day[i];
        tr.appendChild(td);
    }
    table.appendChild(tr);
    
    var tr = document.createElement('tr');
    for(var l=0; l<6; l++){
        if(l==day_no)
            break;
        var td = document.createElement('td');
        td.innerHTML = "";
        tr.appendChild(td);
    }
    
    var day = 1;
    for(var l=day_no; l<7; l++){
        
        var td = document.createElement('td');
        td.innerHTML = day;
        td.className = "current-month-days";
        
        if(day == parseInt(currDay) && currMonth == true) td.id = "today-date";
        
        day+=1;
        tr.appendChild(td);
        
    }
    table.appendChild(tr);

    
    var dateOverflow = false, foundToday = false;
    
    for(var j=0; j<5; j++){
        var tr = document.createElement('tr');
        for(var k=0; k<7; k++){
            var td = document.createElement('td');
            td.innerHTML = day;
            td.className = "current-month-days";
            
            if(day == parseInt(currDay) && foundToday == false && currMonth == true){
                foundToday = true;
                td.id = "today-date";
            } 
            
            day+=1;
            
            if(dateOverflow == true)  
                td.className = "next-month-dates";
            
            if(day>parseInt(lastDay)){
                
                day =  1;
                dateOverflow = true;
            }
            
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    
    var clicked_date_id = null;
    
    table.addEventListener("mouseover", function(e){
        if(e.target !== e.currentTarget && e.target.className == "current-month-days" && e.target.id !== "clicked-date"){
            
            if(e.target.id !== "today-date" || clicked_date_id !== null) {
               
                var td_Id = e.target;          

                td_Id.style.backgroundColor ="rgb(4,39,251,0.4)";
                td_Id.style.borderRadius ="50%";
//                console.log("mouseover");
            }
            
    }
    e.stopPropagation();
    });

    
    table.addEventListener("mouseout", function(e){
        if(e.target !== e.currentTarget && e.target.className == "current-month-days" && e.target.id !== "clicked-date"){
            
            if(e.target.id !== "today-date" || clicked_date_id !== null) {
                
                var td_Id = e.target;          

                td_Id.style.backgroundColor ="";
                td_Id.style.borderRadius ="";
//                console.log("mouseout");
//                console.log((clicked_date_id !== null) ? clicked_date_id.innerHTML : null);
            }
            
    }
    e.stopPropagation();
    });

    
    table.addEventListener("click", function(e){
        
        if(e.target !== e.currentTarget && e.target.className == "current-month-days"){
            var selected_td_id = e.target;
            
            selected_td_id.style.backgroundColor = "rgb(4,39,251,0.4)";
            selected_td_id.style.borderRadius = "50%";
            
            if(clicked_date_id !== null){
                
                clicked_date_id.style.backgroundColor = "";
                clicked_date_id.style.borderRadius = "";   
                clicked_date_id.id = "";
            } 
            
            clicked_date_id = selected_td_id
            selected_td_id.id = "clicked-date";
            
            var today_day_id = document.getElementById("today-date");
            
            if(today_day_id !== null){
                
                today_day_id.style.backgroundColor = "rgb(255,255,255,0)";
                today_day_id.style.borderRadius = "";
            }
            
            var year = document.getElementById("year-name").innerHTML;
            var month = document.getElementById("month-name").innerHTML;
            var day = selected_td_id.innerHTML;
            
            document.getElementById("from-input").value = day+" - "+month+" - "+year;
            
//            console.log(day+"/"+month+"/"+year);
//            console.log("click");
        }
        e.stopPropagation();
//        console.log("hi");
       
    });
    
    
    return table;
}

var fr_ca_img = document.getElementById("from-img");

fr_ca_img.addEventListener("click",function(){

    var fr_cal_container = document.getElementsByClassName("from-calendar")[0];
    var main_grid = document.getElementsByClassName("main-grid")[0];
    var to_cal_container = document.getElementsByClassName("to-calendar")[0];
    
//    console.log("fr_img");
//    console.log(fr_cal_container.style.display);
    
   
    
    if(fr_cal_container.style.display == "none"){
        
        var mar =15;
//        main_grid.style.animationDuration="5s";
        var id_ani = setInterval(frame, 6);

        function frame() {
            if(main_grid.style.marginTop == "12%")
               clearInterval(id_ani);

            else{
                mar-=0.1;
                main_grid.style.marginTop = mar + "%";
            }
        }
        
        fr_cal_container.style.display = "grid";
        to_cal_container.style.display = "none";
//        main_grid.style.marginTop = "12%";
//        console.log("in");
    }
     
    
    else{
        fr_cal_container.style.display = "none";
        
        var mar =12;
//        main_grid.style.animationDuration="5s";
        var id_ani = setInterval(frame, 6);

        function frame() {
            if(main_grid.style.marginTop == "15%")
               clearInterval(id_ani);

            else{
                mar+=0.1;
                main_grid.style.marginTop = mar + "%";
            }
        }
//        main_grid.style.marginTop = "15%";
//        console.log("out");
        }

});

var fr_left_img = document.getElementById("fr-left");

fr_left_img.addEventListener("click",function(){
   
   var month_name = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
   var year = parseInt(document.getElementById("year-name").innerHTML);
   var month = month_name.indexOf(document.getElementById("month-name").innerHTML); 
    
    if(month !== 0){
        month--;
        year = -1;
    }
    
    else if(month == 0){
        month = 11;
        year -= 1;
    }
    
    fromCalendar(month, year);
    
});

var fr_right_img = document.getElementById("fr-right");

fr_right_img.addEventListener("click",function(){
   
   var month_name = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
   var year = parseInt(document.getElementById("year-name").innerHTML);
   var month = month_name.indexOf(document.getElementById("month-name").innerHTML); 
    
    if(month !==11){
        month++;
//        year = -1;
    }
    
    else if(month == 11){
        month = 0;
        year += 1;
    }
    
    fromCalendar(month, year);
    
});

function toCalendar(m, y){
    var d = new Date();
    var year = y == -1 ?d.getFullYear() : y;
    var month = m == -1 ?d.getMonth() : m;
    var month_name = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var firstday = new Date(year, month, 1).toDateString();
    var lastday = new Date(year, month+1, 0).toDateString();
    var calendar = getToCalander(firstday.substring(0,3), lastday.substring(8,10), d.getDate(), (year ==d.getFullYear() && month == d.getMonth()) ? true : false);
   
   document.getElementById("to-year-name").innerHTML = year;
   document.getElementById("to-month-name").innerHTML =month_name[month];
   if (y==-1 && m==-1)
       document.getElementById("to-dates").appendChild(calendar);
    else
        document.getElementById("to-dates").replaceChild(calendar, document.getElementById("to-tb"));
}

function getToCalander(firstDay, lastDay, currDay, currMonth){
    
    var table = document.createElement('table');
    table.id="to-tb";
    var tr = document.createElement('tr');
    var day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var day_no = day.indexOf(firstDay);
    
    for(var i=0; i<7; i++){
        
        var td = document.createElement('td');
        td.innerHTML = day[i];
        tr.appendChild(td);
    }
    table.appendChild(tr);
    
    var tr = document.createElement('tr');
    for(var l=0; l<6; l++){
        if(l==day_no)
            break;
        var td = document.createElement('td');
        td.innerHTML = "";
        tr.appendChild(td);
    }
    
    var day = 1;
    for(var l=day_no; l<7; l++){
        
        var td = document.createElement('td');
        td.innerHTML = day;
        td.className = "current-month-days";
        
        if(day == parseInt(currDay)+1 && currMonth == true) td.id = "to-today-date";
        
        day+=1;
        tr.appendChild(td);
        
    }
    table.appendChild(tr);

    
    var dateOverflow = false, foundToday = false;
    
    for(var j=0; j<5; j++){
        var tr = document.createElement('tr');
        for(var k=0; k<7; k++){
            var td = document.createElement('td');
            td.innerHTML = day;
            td.className = "current-month-days";
            
            if(day == parseInt(currDay)+1 && foundToday == false && currMonth == true){
                foundToday = true;
                td.id = "to-today-date";
            } 
            
            day+=1;
            
            if(dateOverflow == true)  
                td.className = "next-month-dates";
            
            if(day>parseInt(lastDay)){
                
                day =  1;
                dateOverflow = true;
            }
            
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    
    var clicked_date_id = null;
    
    table.addEventListener("mouseover", function(e){
        if(e.target !== e.currentTarget && e.target.className == "current-month-days" && e.target.id !== "to-clicked-date"){
            
            if(e.target.id !== "to-today-date" || clicked_date_id !== null) {
               
                var td_Id = e.target;          

                td_Id.style.backgroundColor ="rgb(4,39,251,0.4)";
                td_Id.style.borderRadius ="50%";
//                console.log("to-mouseover");
            }
            
    }
    e.stopPropagation();
    });

    
    table.addEventListener("mouseout", function(e){
        if(e.target !== e.currentTarget && e.target.className == "current-month-days" && e.target.id !== "to-clicked-date"){
            
            if(e.target.id !== "to-today-date" || clicked_date_id !== null) {
                
                var td_Id = e.target;          

                td_Id.style.backgroundColor ="";
                td_Id.style.borderRadius ="";
//                console.log("to-mouseout");
//                console.log((clicked_date_id !== null) ? clicked_date_id.innerHTML : null);
            }
            
    }
    e.stopPropagation();
    });

    
    table.addEventListener("click", function(e){
        
        if(e.target !== e.currentTarget && e.target.className == "current-month-days"){
            var selected_td_id = e.target;
            
            selected_td_id.style.backgroundColor = "rgb(4,39,251,0.4)";
            selected_td_id.style.borderRadius = "50%";
            
            if(clicked_date_id !== null){
                
                clicked_date_id.style.backgroundColor = "";
                clicked_date_id.style.borderRadius = "";   
                clicked_date_id.id = "";
            } 
            
            clicked_date_id = selected_td_id
            selected_td_id.id = "to-clicked-date";
            
            var today_day_id = document.getElementById("to-today-date");
            
            if(today_day_id !== null){
                
                today_day_id.style.backgroundColor = "rgb(255,255,255,0)";
                today_day_id.style.borderRadius = "";
            }
            
            var year = document.getElementById("to-year-name").innerHTML;
            var month = document.getElementById("to-month-name").innerHTML;
            var day = selected_td_id.innerHTML;
            
            document.getElementById("to-input").value = day+" - "+month+" - "+year;
            
//            console.log("to-click");
        }
        e.stopPropagation();
//        console.log("hi");
       
    });
    
    
    return table;
}

var to_ca_img = document.getElementById("to-img");

to_ca_img.addEventListener("click",function(){

    var to_cal_container = document.getElementsByClassName("to-calendar")[0];
    var main_grid = document.getElementsByClassName("main-grid")[0];
    var fr_cal_container = document.getElementsByClassName("from-calendar")[0];
    
    if(to_cal_container.style.display == "none"){
        
        var mar =15;
        
        var id_ani = setInterval(frame, 6);

        function frame() {
            if(main_grid.style.marginTop == "12%")
               clearInterval(id_ani);

            else{
                mar-=0.1;
                main_grid.style.marginTop = mar + "%";
            }
        }
        
        to_cal_container.style.display = "grid";
//        main_grid.style.marginTop = "12%";
        fr_cal_container.style.display = "none";
    }
     
    
    else{
        to_cal_container.style.display = "none";
//        main_grid.style.marginTop = "15%";
        
        var mar =12;
        
        var id_ani = setInterval(frame, 6);

        function frame() {
            if(main_grid.style.marginTop == "15%")
               clearInterval(id_ani);

            else{
                mar+=0.1;
                main_grid.style.marginTop = mar + "%";
            }
        }
    }

});

var to_left_img = document.getElementById("to-left");

to_left_img.addEventListener("click",function(){
   
   var month_name = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
   var year = parseInt(document.getElementById("to-year-name").innerHTML);
   var month = month_name.indexOf(document.getElementById("to-month-name").innerHTML); 
    
    if(month !== 0){
        month--;
        year = -1;
    }
    
    else if(month == 0){
        month = 11;
        year -= 1;
    }
    
    toCalendar(month, year);
    
});

var to_right_img = document.getElementById("to-right");

to_right_img.addEventListener("click",function(){
   
   var month_name = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
   var year = parseInt(document.getElementById("to-year-name").innerHTML);
   var month = month_name.indexOf(document.getElementById("to-month-name").innerHTML); 
    
    if(month !==11){
        month++;
//        year = -1;
    }
    
    else if(month == 11){
        month = 0;
        year += 1;
    }
    
    toCalendar(month, year);
    
});

document.getElementById("bookNow").onclick = function() {
  document.getElementsByClassName("main-grid")[0].addClass("main-grid-ani");
};
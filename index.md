<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Calendar</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
   <div class="main-grid">
       <div class="container">
           <div class="date-bar">
                From :  
               <input type="text" value="DD-MM-YYYY" id="from-input">
               <span><img 
               id="from-img" src="res/calendar.svg" alt="calendar"></span>
               To :
               <input type="text" value="DD-MM-YYYY" id="to-input">
               <span><img id="to-img" src="res/calendar.svg" alt="calendar"></span>
               <a href="thankYou.html"><button id="bookNow">Book Now</button></a>
           </div>
           
           <div class="from-calendar">
      
               <div class="month">
               <span id="fr-left"><img src="res/left-arrow.svg" alt="previous"></span>
<!--               <div class="month-year">-->
                   <span id="month-name"></span>
                   <span id="year-name"></span>
<!--               </div>-->
               <span id="fr-right"><img src="res/right-arrow.svg" alt="next"></span>
               </div>
               
               <div id="dates">
                   
               </div>
               </div>
               
            <div class="to-calendar">
               
               <div class="to-month">
               <span id="to-left"><img src="res/left-arrow.svg" alt="previous"></span>
               <span id="to-month-name"></span>
               <span id="to-year-name"></span>
               <span id="to-right"><img src="res/right-arrow.svg" alt="next"></span>
               </div>
               
               <div id="to-dates">
                   
               </div>
           </div>
       </div>
   </div>
   </body>
    <script src="js/script.js" type="text/javascript"></script>

</html>

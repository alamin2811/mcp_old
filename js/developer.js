$(function() {
   var maxCookie = $.cookie("maxstore-tnc");
   if(maxCookie) {
       $("#cookie-popup").addClass("d-none");
   } else {
       $("#cookie-popup").removeClass("d-none");
   }
   $(".closeCookie").click(function() {
       $.cookie("maxstore-tnc", 'decliend', { expires : 1 });
       $("#cookie-popup").addClass("d-none");
   });
   
   $(".acceptCookie").click(function() {
       $.cookie("maxstore-tnc", 'accepted', { expires : 30 });
       $("#cookie-popup").addClass("d-none");
   });
});
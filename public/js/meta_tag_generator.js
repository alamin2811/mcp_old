$(document).ready(function(){
        $("#hide").click(function(){
            $('#hideshow').hide();
            $("#hide").hide();
            $("#show").show();
        });
        $("#show").click(function(){
            $('#hideshow').show();
            $("#hide").show();
            $("#show").hide();
        });
    });

     function onSubmit() {
      if(isAuth!=1){
         if(grecaptcha.getResponse().length == 0){
                Lobibox.notify('info', {
                      rounded: false,
                      position: "top right",
                      delay: 5000,
                      delayIndicator: true,
                      msg: "Please confirm you are not a robot."
                  });
             return false;
        }
      }
        document.getElementById("metaTag").submit();
    }
     function resetform(){
        $('#metaTag').find("input[type=text], textarea").val("");
    }
    function CopyToClipboard(){
        if($("#form_content").text() === ''){
            alert("Text is too short to copy");
        }else{
            var copyTextarea = document.querySelector('#form_content');
            copyTextarea.select();
            try {
                var successful = document.execCommand('copy');
            } catch (err) {
                alert('Oops, unable to copy!');
            }
        }
    }
     function conter(){
       var limit = 60;
       var gettext = $("#metatitle").val();
       var textcount = gettext.length;
       var show_c=limit-textcount;
       $("#cc").text(show_c);
       if(parseInt(textcount) > limit){
           $("#cc").text(0);
           vl = gettext.substring(0, 60);
           $("#metatitle").val(vl);
       }
   }
  function conter_desc(){
       var limit = 150;
       var gettext = $("#description").val();
       var textcount = gettext.length;
       var show_c=limit-textcount;
       $("#cc_desc").text(show_c);
       if(parseInt(textcount) > limit){
           $("#cc_desc").text(0);
           vl = gettext.substring(0, 150);
           $("#description").val(vl);
       }
   }
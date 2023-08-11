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
       getCode();
  }
  function getCode() {
      var ridx = getRadioSelected(document.hform.check);
      var domain = document.hform.fdomain.value;
      if(validateDomain(domain))
      {
          if(ridx == 'non-www') {
              rules = getHtSubRules("www", "", domain);        
          } else {
              rules = getHtSubRules("", "www", domain);
          }
          document.getElementById('outBox').value = rules;
          //document.outBox.value = rules;
          var elemOff = $("#result-main").offset().top;
          elemOff = elemOff-100;
          $("html, body").animate({ scrollTop: elemOff }, 700);
      }else{
          document.getElementById('outBox').value = "";
          alert("Invalid domain name. Please check and try again!");
          return false;
      }
  }
  function getRadioSelected(obj) {
    sel = false;
    len = obj.length;
    for (i = 0; i <len; i++) {
        if (obj[i].checked) {
            sel = obj[i].value
        }
    }
    return sel;
  }
  function validateDomain(domain) {
    var v = new RegExp();
    v.compile("^[A-Za-z0-9-_]+\\.[A-Za-z0-9-_%&\?\/.=]+$");
    if (!v.test(domain)) {
        return false;
    }
    else
    {
        return true;
    }
  }
  function getHtSubRules(dsrc,ddest,domain) {
    var rules = "RewriteEngine On\n";
    if(dsrc) {
        dsrc += ".";
    }
    if(ddest) {
        ddest += ".";
    }
    rules += "RewriteCond %{HTTP_HOST"+"} ^"+dsrc+domain+" [NC]\n";
    rules += "RewriteRule ^(.*)$ http://"+ddest+domain+"/$1 [L,R=301]\n";
    return rules;
  }
  $(document).ready(function(){
      $("#copyStr").click(function() {
          var copyTextarea = document.querySelector('#outBox');
          copyTextarea.select();
          
          try {
              var successful = document.execCommand('copy');
              var msg = successful ? 'successful' : 'unsuccessful';
              alert('Text has been copied to clipboard');
          } catch (err) {
              alert('Oops, unable to copy!');
          }
      });
  });
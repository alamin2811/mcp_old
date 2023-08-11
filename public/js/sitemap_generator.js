  function onSubmit(_id) {
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
         var _FormId = '#F_'+_id;
         var data = new FormData();
         var fieldValuePairs = '';
         var fieldValuePairs = $(_FormId).serializeArray();
         $.each(fieldValuePairs, function(index, fieldValuePair) {
             data.append(fieldValuePair.name, fieldValuePair.value);
             //alert("Item " + index + " is [" + fieldValuePair.name + "," + fieldValuePair.value + "]");
         });
         var ___url_ = $(_FormId).attr('action');
         $.ajax({
            type: "post",
            enctype: 'multipart/form-data',
            url: ___url_,
            data: data,
            processData: false,
            contentType: false,
            cache: false,
            timeout: 600000,
            beforeSend: function (){
                   $('.hideshow').show();
            },
            success: function (data) { 
                  $('.hideshow').hide();
                     if (data['reset']) { 
                          //document.getElementById('metaTag').reset();
                      }
                    Lobibox.notify(data['type'], {
                        position: "top right",
                        msg: data['message']
                    });
                    if (data['status_code'] == 200) {
                        if (data['html']) {
                            $("#result").html('');
                            $("#result").html(JSON.parse(data['body']));
                        }
                      if(data['url']){
                        location.href = data['url'];
                      }
                  }
            },
            error: function (e) {  
                 $('.hideshow').hide();
                 var Arry = e.responseText;
                 var error = "";
                 JSON.parse(Arry, (k, v)=>{
                       if(typeof v != 'object'){
                       error +=v+"<br>"
                       }
                     })
                  Lobibox.notify('error', {
                     rounded: false,
                     position: "top right",
                     delay: 5000,
                     delayIndicator: true,
                     msg: error
                 });
            }
        });
  }

    function setOrPush(target, val) {
      var result = val;
      if (target) {
        result = [target];
        result.push(val);
      }
      return result;
    }

    function getFormResults(formElement) {
      var formElements = formElement.elements;
      var formParams = {};
      var i = 0;
      var elem = null;
      for (i = 0; i < formElements.length; i += 1) {
        elem = formElements[i];
        switch (elem.type) {
          case 'submit':
            break;
          case 'radio':
            if (elem.checked) {
              formParams[elem.name] = elem.value;
            }
            break;
          case 'checkbox':
            if (elem.checked) {
              formParams[elem.name] = setOrPush(formParams[elem.name], elem.value);
            }
            break;
          default:
            formParams[elem.name] = setOrPush(formParams[elem.name], elem.value);
        }
      }
      return formParams;
    }

    $(function(){
      $('.input-daterange').datepicker({
          autoclose: true
      });
    }); 
    $("#result").delegate("#refresh", "click", function(){
       $("#genberateMeta").trigger('click');
    });
    jQuery(document).ready(function () {
      DirectFormSubmitWithAjax.init();
    });
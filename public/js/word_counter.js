function onSubmit() {
      if(isAuth!=1){
         if(grecaptcha.getResponse().length == 0){
                Lobibox.notify('error', {
                      rounded: false,
                      position: "top right",
                      delay: 5000,
                      delayIndicator: true,
                      msg: "Please confirm you are not a robot."
                  });
             return false;
        }
      }
         // event.preventDefault();
         var data = new FormData();
         data.append("_token", getMetaContentByName('csrf-token'));
         data.append("word", $('#textbox').val());
         var ___url_ = $('#metaTag').attr('action');
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
                   $("#result").html('');
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
$('#file_upload').change(function(){
    var file_check=$('#file_upload').prop('files')[0];
    if(!file_check){
        return false;
    }else{
        $('#img_name').attr('placeholder',file_check.name);
    }
    $('.hideshow').show();
    file_fetch_content('file_upload','textbox');
});

function file_fetch_content(get_input_id,get_text_id){ 
    var fileSelect =$('#'+get_input_id).prop('files')[0];
    var form_data = new FormData();
    fname = fileSelect.name;
    fextension = fname.substring(fname.lastIndexOf('.')+1);
    if(fileSelect.size > 1000001 || fileSelect.size == undefined){
            $('.hideshow').hide();
            Lobibox.notify('error', {
                position: "top right",
                msg: 'File is too large (Max 10 MB).'
            });
        return false;
    }
    validExtensions = ["txt","doc","docx","odt","rtf","tex"];
    if ($.inArray(fextension, validExtensions) != -1) {
        form_data.append('file_upload',fileSelect);
        form_data.append('_token',getMetaContentByName('csrf-token'));
        $.ajax({
            url:_getCOntentUrl,
            type:'post',
            processData:false,
            contentType:false,
            dataType:'json',
            data:form_data,
            beforeSend:function(){
                $('.hideshow').show();
            },
            success:function(response){
                 $('.hideshow').hide();
                if(response['status_code'] == '200'){
                    if(response['message'].length <= 10){
                        Lobibox.notify('warning', {
                            position: "top right",
                            msg: 'Text is too short.'
                        });
                        return false;
                    }
                    $("#textbox").val(response['message']);
                }else if(response.status_code == '444'){
                    $('#file_upload').val('');
                        Lobibox.notify('error', {
                            position: "top right",
                            msg: 'File not converted into content.'
                        });
                    return false;
                }else{
                        Lobibox.notify('error', {
                            position: "top right",
                            msg: 'File not converted into content.'
                        });
                    return false;
                }
            }
        });
    }else{
         $('.hideshow').hide();
            Lobibox.notify('error', {
                position: "top right",
                msg: 'This File type not allow.'
            });
        return false;
    }
}
    jQuery(document).ready(function () {
      DirectFormSubmitWithAjax.init();
    });
    
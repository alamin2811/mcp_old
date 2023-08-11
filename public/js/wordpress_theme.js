function onSubmit() {
    if (isAuth != 1) {
        if (grecaptcha.getResponse().length == 0) {
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
    data.append("url", $('#url').val());
    var ___url_ = $('#themeForm').attr('action');
    $.ajax({
        type: "post",
        enctype: 'multipart/form-data',
        url: ___url_,
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 600000,
        beforeSend: function () {
            $("#preloader").fadeIn();
        },
        success: function (data) {
            $("#preloader").fadeOut();
            if (data['reset']) {
                //document.getElementById('metaTag').reset();
            }
            Lobibox.notify(data['type'], {
                position: "top right",
                msg: data['message']
            });
            if (data['status_code'] == 200) {
                if (data['html']) {
                    $("#theme-info").html('');
                    $("#theme-info").html(JSON.parse(data['body']));
                }
                if (data['url']) {
                    location.href = data['url'];
                }
            }
        },
        error: function (e) {
            $("#preloader").fadeOut();
            var Arry = e.responseText;
            var error = "";
            JSON.parse(Arry, (k, v) => {
                if (typeof v != 'object') {
                    error += v + "<br>"
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

    
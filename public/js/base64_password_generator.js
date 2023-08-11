function selectText(el){var el=$(el)[0];if(window.getSelection){var s=window.getSelection();if(s.setBaseAndExtent)s.setBaseAndExtent(el,0,el,el.innerText.length-1);else{var r=document.createRange();r.selectNodeContents(el);s.removeAllRanges();s.addRange(r);}}else if(document.getSelection){var s=document.getSelection();var r=document.createRange();r.selectNodeContents(el);s.removeAllRanges();s.addRange(r);}else if(document.selection){var r=document.body.createTextRange();r.moveToElementText(el);r.select();}}
/* Base64 encode/decode from http://www.webtoolkit.info/ */
var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(input){var output="";var chr1,chr2,chr3,enc1,enc2,enc3,enc4;var i=0;input=Base64._utf8_encode(input);while(i<input.length){chr1=input.charCodeAt(i++);chr2=input.charCodeAt(i++);chr3=input.charCodeAt(i++);enc1=chr1>>2;enc2=((chr1&3)<<4)|(chr2>>4);enc3=((chr2&15)<<2)|(chr3>>6);enc4=chr3&63;if(isNaN(chr2)){enc3=enc4=64;}else if(isNaN(chr3)){enc4=64;}output=output+this._keyStr.charAt(enc1)+this._keyStr.charAt(enc2)+this._keyStr.charAt(enc3)+this._keyStr.charAt(enc4);}return output;},decode:function(input){var output="";var chr1,chr2,chr3;var enc1,enc2,enc3,enc4;var i=0;input=input.replace(/[^A-Za-z0-9+/=]/g,"");while(i<input.length){enc1=this._keyStr.indexOf(input.charAt(i++));enc2=this._keyStr.indexOf(input.charAt(i++));enc3=this._keyStr.indexOf(input.charAt(i++));enc4=this._keyStr.indexOf(input.charAt(i++));chr1=(enc1<<2)|(enc2>>4);chr2=((enc2&15)<<4)|(enc3>>2);chr3=((enc3&3)<<6)|enc4;output=output+String.fromCharCode(chr1);if(enc3!=64){output=output+String.fromCharCode(chr2);}if(enc4!=64){output=output+String.fromCharCode(chr3);}}output=Base64._utf8_decode(output);return output;},_utf8_encode:function(string){string=string.replace(/rn/g,"n");var utftext="";for(var n=0;n<string.length;n++){var c=string.charCodeAt(n);if(c<128){utftext+=String.fromCharCode(c);}else if((c>127)&&(c<2048)){utftext+=String.fromCharCode((c>>6)|192);utftext+=String.fromCharCode((c&63)|128);}else{utftext+=String.fromCharCode((c>>12)|224);utftext+=String.fromCharCode(((c>>6)&63)|128);utftext+=String.fromCharCode((c&63)|128);}}return utftext;},_utf8_decode:function(utftext){var string="";var i=0;var c=c1=c2=0;while(i<utftext.length){c=utftext.charCodeAt(i);if(c<128){string+=String.fromCharCode(c);i++;}else if((c>191)&&(c<224)){c2=utftext.charCodeAt(i+1);string+=String.fromCharCode(((c&31)<<6)|(c2&63));i+=2;}else{c2=utftext.charCodeAt(i+1);c3=utftext.charCodeAt(i+2);string+=String.fromCharCode(((c&15)<<12)|((c2&63)<<6)|(c3&63));i+=3;}}return string;}}

$(document).ready(function() {
    var i = $('#string'),
        o = $('#output'),
        e = $('#encode'),
        d = $('#decode'),
        st = $('#select-text'),
        bo = function() {
           if(!isAuth){
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

            if (!o.length) {
                //$('#incoming').after('<div id="outgoing"><p><a href="#" id="select-text">Select output</a> &bull; <a href="#" id="copy-above">&uarr; Copy result to input string</a></p><pre id="output"></pre></div>');
                 $('#incoming').after('<a href="#" id="copy-above">&uarr; Copy result to input string</a></p><pre id="output"></pre><button type="button" class="PGB-copy-btn" id="copy-button"><i class="la la-copy" onclick="copyClipboard()" onmouseout="outFunc()" data-toggle="tooltip" title="Copy" id="toop"></i></button>');
                o = $('#output');
                st = $('#select-text');
            }
        },
        sel = function() {
            selectText(o[0]);
        };
    $(document).on('click', '#copy-above', function(e) {
        e.preventDefault();
        i.val(o.text()).focus().select();
    });
    $(document).on('click', '#select-text', function(e) {
        e.preventDefault();
        sel();
    }); 
    $(document).on('click', '#copy-button', function(e) {
        var $temp = $("<input>");
        $("body").append($temp);
        var html = $("#output").html();
        $temp.val(html).select();
        document.execCommand("copy");
        $temp.remove();
    });
    e.on('click', function(e) {
        e.preventDefault();
        bo();
        o.text(Base64.encode(i.val()));
        sel();
    });
    d.on('click', function(e) {
        e.preventDefault();
        bo();
        o.text(Base64.decode(i.val()));
        sel();
    });
});

function copyClipboard() {
  var copyText = document.getElementById("string");
  copyText.select();

  document.execCommand("Copy");
  $('#toop').attr('title', 'Copied').tooltip('fixTitle').tooltip('show');
}

function outFunc() {
  $('#toop').attr('title', 'Copy').tooltip('fixTitle').tooltip('show');
}

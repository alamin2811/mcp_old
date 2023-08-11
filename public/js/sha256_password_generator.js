
"use strict";class Sha256{static hash(a,b){function m(a){try{return(new TextEncoder).encode(a,"utf-8").reduce((a,b)=>a+String.fromCharCode(b),"")}catch(b){return unescape(encodeURIComponent(a))}}function n(a){const b=a.replace(" ","");return""==b?"":b.match(/.{2}/g).map(a=>String.fromCharCode(parseInt(a,16))).join("")}const c={msgFormat:"string",outFormat:"hex"},d=Object.assign(c,b);switch(d.msgFormat){default:case"string":a=m(a);break;case"hex-bytes":a=n(a)}const e=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298],f=[1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225];a+=String.fromCharCode(128);const g=a.length/4+2,h=Math.ceil(g/16),i=new Array(h);for(let b=0;b<h;b++){i[b]=new Array(16);for(let c=0;c<16;c++)i[b][c]=a.charCodeAt(64*b+4*c+0)<<24|a.charCodeAt(64*b+4*c+1)<<16|a.charCodeAt(64*b+4*c+2)<<8|a.charCodeAt(64*b+4*c+3)<<0}const j=8*(a.length-1)/Math.pow(2,32),k=8*(a.length-1)>>>0;i[h-1][14]=Math.floor(j),i[h-1][15]=k;for(let a=0;a<h;a++){const b=new Array(64);for(let c=0;c<16;c++)b[c]=i[a][c];for(let a=16;a<64;a++)b[a]=Sha256.σ1(b[a-2])+b[a-7]+Sha256.σ0(b[a-15])+b[a-16]>>>0;let c=f[0],d=f[1],g=f[2],h=f[3],j=f[4],k=f[5],l=f[6],m=f[7];for(let a=0;a<64;a++){const f=m+Sha256.Σ1(j)+Sha256.Ch(j,k,l)+e[a]+b[a],i=Sha256.Σ0(c)+Sha256.Maj(c,d,g);m=l,l=k,k=j,j=h+f>>>0,h=g,g=d,d=c,c=f+i>>>0}f[0]=f[0]+c>>>0,f[1]=f[1]+d>>>0,f[2]=f[2]+g>>>0,f[3]=f[3]+h>>>0,f[4]=f[4]+j>>>0,f[5]=f[5]+k>>>0,f[6]=f[6]+l>>>0,f[7]=f[7]+m>>>0}for(let a=0;a<f.length;a++)f[a]=("00000000"+f[a].toString(16)).slice(-8);const l="hex-w"==d.outFormat?" ":"";return f.join(l)}static ROTR(a,b){return b>>>a|b<<32-a}static"Σ0"(a){return Sha256.ROTR(2,a)^Sha256.ROTR(13,a)^Sha256.ROTR(22,a)}static"Σ1"(a){return Sha256.ROTR(6,a)^Sha256.ROTR(11,a)^Sha256.ROTR(25,a)}static"σ0"(a){return Sha256.ROTR(7,a)^Sha256.ROTR(18,a)^a>>>3}static"σ1"(a){return Sha256.ROTR(17,a)^Sha256.ROTR(19,a)^a>>>10}static Ch(a,b,c){return a&b^~a&c}static Maj(a,b,c){return a&b^a&c^b&c}}"undefined"!=typeof module&&module.exports&&(module.exports=Sha256);

$(document).ready(function(){
    var i = $('#string'), // input field
        o = $('#output'), // output field
        f = $('#form1'), // form
        n = $('#pass-genraate-box'), // form
        m = $('#multiline'), // multiline option
        buildOutput = function() {
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
         // calc the hash
            if (!o.length) { // ensure the output exists and create if it doesn't
                //n.append('<div class="pass-genraate-box"><h4>SHA-256 Hash:</h4><p><textarea name="output" type="text" id="output"></textarea></p></div>'); // create the output section
                //o = $('#output'); // cache the new element
                //o.autogrow(); // add the autogrow behavior
            }
            if (m.prop('checked')) { // is the multiple lines option checked?
                var strings = i.val().replace(/\r\n/, "\n").split("\n"), // break the lines into an array
                    outputs = []; // bucket to hold the hashes
                $.each(strings, function(index, value) { // iterate through each line
                    if (value !== '') { // if it's not a blank line...
                        outputs.push(Sha256.hash(value)); // add the hash to the bucket
                    } else { // it's a blank line...
                        outputs.push(''); // and a blank to the bucket
                    }
                });
                o.val(outputs.join("\n")); // display the hashes
            } else { // single line
                o.val(Sha256.hash(i.val())); // compute the hash
            }
            o.trigger('change');
        };
    i.on('input propertychange', function(e) { // add a timer to auto calc the hash
        var t = $(this);
        if (window.event && event.type==='propertychange' && event.propertyName!=='value') {
            return; // ignore the event if it's not a propertychange on a value
        }
        window.clearTimeout(t.data('timeout')); // clear the timer
        t.data('timeout', setTimeout(buildOutput, 250)); // add the timer in milliseconds
    });
    f.on('submit', function(e) { // override the submit button to run javascript
        e.preventDefault(); // cancel the form submission
        buildOutput(); // run the hashing
        o.focus().select(); // select the contents of the output
    });
    $('li[data-here="'+$('body').data('here')+'"]').addClass('active');
    o.autogrow(); // add the autogrow behavior to the output
    m.on('change', buildOutput); // trigger the hashing when the checkbox is (un)checked
});

function copyClipboard() {
  var copyText = document.getElementById("output");
  copyText.select();
  document.execCommand("Copy");
  $('#toop').attr('title', 'Copied').tooltip('fixTitle').tooltip('show');
}
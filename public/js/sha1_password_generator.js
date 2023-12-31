/* SHA1 (Secure Hash Algorithm) from http://www.webtoolkit.info/ */
function SHA1(msg){function rotate_left(n,s){var t4=n<<s|n>>>32-s;return t4}function lsb_hex(val){var str="";var i;var vh;var vl;for(i=0;i<=6;i+=2){vh=val>>>i*4+4&15;vl=val>>>i*4&15;str+=vh.toString(16)+vl.toString(16)}return str}function cvt_hex(val){var str="";var i;var v;for(i=7;i>=0;i--){v=val>>>i*4&15;str+=v.toString(16)}return str}function Utf8Encode(string){string=string.replace(/\r\n/g,"\n");var utftext="";for(var n=0;n<string.length;n++){var c=string.charCodeAt(n);if(c<128)utftext+=String.fromCharCode(c);
else if(c>127&&c<2048){utftext+=String.fromCharCode(c>>6|192);utftext+=String.fromCharCode(c&63|128)}else{utftext+=String.fromCharCode(c>>12|224);utftext+=String.fromCharCode(c>>6&63|128);utftext+=String.fromCharCode(c&63|128)}}return utftext}var blockstart;var i,j;var W=new Array(80);var H0=1732584193;var H1=4023233417;var H2=2562383102;var H3=271733878;var H4=3285377520;var A,B,C,D,E;var temp;msg=Utf8Encode(msg);var msg_len=msg.length;var word_array=new Array;for(i=0;i<msg_len-3;i+=4){j=msg.charCodeAt(i)<<
24|msg.charCodeAt(i+1)<<16|msg.charCodeAt(i+2)<<8|msg.charCodeAt(i+3);word_array.push(j)}switch(msg_len%4){case 0:i=2147483648;break;case 1:i=msg.charCodeAt(msg_len-1)<<24|8388608;break;case 2:i=msg.charCodeAt(msg_len-2)<<24|msg.charCodeAt(msg_len-1)<<16|32768;break;case 3:i=msg.charCodeAt(msg_len-3)<<24|msg.charCodeAt(msg_len-2)<<16|msg.charCodeAt(msg_len-1)<<8|128;break}word_array.push(i);while(word_array.length%16!=14)word_array.push(0);word_array.push(msg_len>>>29);word_array.push(msg_len<<3&
4294967295);for(blockstart=0;blockstart<word_array.length;blockstart+=16){for(i=0;i<16;i++)W[i]=word_array[blockstart+i];for(i=16;i<=79;i++)W[i]=rotate_left(W[i-3]^W[i-8]^W[i-14]^W[i-16],1);A=H0;B=H1;C=H2;D=H3;E=H4;for(i=0;i<=19;i++){temp=rotate_left(A,5)+(B&C|~B&D)+E+W[i]+1518500249&4294967295;E=D;D=C;C=rotate_left(B,30);B=A;A=temp}for(i=20;i<=39;i++){temp=rotate_left(A,5)+(B^C^D)+E+W[i]+1859775393&4294967295;E=D;D=C;C=rotate_left(B,30);B=A;A=temp}for(i=40;i<=59;i++){temp=rotate_left(A,5)+(B&C|B&
D|C&D)+E+W[i]+2400959708&4294967295;E=D;D=C;C=rotate_left(B,30);B=A;A=temp}for(i=60;i<=79;i++){temp=rotate_left(A,5)+(B^C^D)+E+W[i]+3395469782&4294967295;E=D;D=C;C=rotate_left(B,30);B=A;A=temp}H0=H0+A&4294967295;H1=H1+B&4294967295;H2=H2+C&4294967295;H3=H3+D&4294967295;H4=H4+E&4294967295}var temp=cvt_hex(H0)+cvt_hex(H1)+cvt_hex(H2)+cvt_hex(H3)+cvt_hex(H4);return temp.toLowerCase()};

$(document).ready(function(){
	var i = $('#string'), // input field
		o = $('#output'), // output field
		f = $('#form1'), // form
		n = $('#resultxt'), // form
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
				//n.append('<div class="pass-genraate-box"><h4>SHA 1:</h4><p><input name="output" type="text" id="output"></p></div>'); // create the output section
				//o = $('#output'); // cache the new element
				//o.autogrow(); // add the autogrow behavior
			}
			if (m.prop('checked')) { // is the multiple lines option checked?
				var strings = i.val().replace(/\r\n/, "\n").split("\n"), // break the lines into an array
					outputs = []; // bucket to hold the hashes
				$.each(strings, function(index, value) { // iterate through each line
					if (value !== '') { // if it's not a blank line...
						outputs.push(SHA1(value)); // add the hash to the bucket
					} else { // it's a blank line...
						outputs.push(''); // and a blank to the bucket
					}
				});
				o.val(outputs.join("\n")); // display the hashes
			} else { // single line
				o.val(SHA1(i.val())); // compute the hash
			}
			o.trigger('change');
		};
	i.on('input propertychange', function(e) { // add a timer to auto calc the md5
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
import * as QRCode from 'qrcode';

var btn = document.getElementById('btn');
var text = document.getElementById('text2');
btn.addEventListener("click", function(){
    var url = document.getElementById("url").value;
    validURL(url) ? writeQR(url) && (text.textContent = '') : text.textContent = 'Invalid URL.';
})

function writeQR(url){
    const qrOption = { 
        margin: 50,
        width : 1000,
    };

    QRCode.toCanvas(url, qrOption, function(error, canvas) {
        if (error) {
            console.error(error);
            return;
        }
        var name = "cover_"+Math.floor(Math.random() * 500)+".png";

        var context = canvas.getContext('2d');
        context.font = '24px Arial';
        context.fillStyle = '#000000';
        context.fillText('VK Covers extension.', 10, canvas.height/2);
        context.fillText('github.com/addavriance/vkEx', 10, (canvas.height/2)+25);

        canvas.toBlob(function(blob) {
            var file = new File([blob], name, { type: 'image/png' });

            let a = document.createElement("a");
            a.href = URL.createObjectURL(file);
            a.download = name;
            a.click();
        }, 'image/png');
    });
}

function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
      '((\\d{1,3}\\.){3}\\d{1,3}))'+
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
      '(\\?[;&a-z\\d%_.~+=-]*)?'+
      '(\\#[-a-z\\d_]*)?$','i');
    return !!pattern.test(str);
}
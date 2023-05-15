/*/outerHTML used only for getting and replacing VK user cover preview and nothing else. (extension adds animated covers for every user
who placed qr-code on his page cover)/*/

import { BrowserQRCodeReader } from '@zxing/browser'

var loadingURL = "url('https://venturebeat.com/wp-content/uploads/2014/10/loading_desktop_by_brianmccumber-d41z4h6.gif?w=1200&strip=all')"

var targetNode = getElementByXpath("/html/body");
var config = { attributes: true, childList: true };
var Gcounter = 0;
var counter = 0

function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function getURL(Obj){
    var cUrl = Obj.style.backgroundImage;
    var url = Obj.style.backgroundImage.replace('url("', "").replace('")', '');

    Obj.style.backgroundImage = loadingURL;

    scanQR(Obj, url, cUrl);
    }

function scanQR(Obj, url, cUrl){
    if(!counter) {
        counter++;
        var link = '';
        var imgObj = new Image();

        imgObj.src = url + '?' + new Date().getTime();
        imgObj.setAttribute('crossOrigin', '');

        const codeReader = new BrowserQRCodeReader()
        codeReader.decodeFromImageElement(imgObj).then(result => 
            link = `url("${result.getText()}")`
        ).catch(()=>{ console.log("qr-scan failed") });

        var i = setInterval(function(){
            counter++;
            counter>=4 ? !!(Obj.style.backgroundImage=cUrl) && !(counter = 0) && clearInterval(i) : void 0;
            !!link ? !!(Obj.style.backgroundImage=link) && !(counter = 0) && clearInterval(i) : void 0
        }, 1000);

    }
};

var callback = function(mutationsList) {
    for(var mutation of mutationsList) {
        if (mutation.type == 'childList') {
            checkonload();
        }
        else if (mutation.type == 'attributes') {
            checkonload();
        }
    }
};

var observer = new MutationObserver(callback);

function checkonload(){
    var coverObj;
    if(Gcounter<=3){
        try {  
            if (document.getElementsByClassName("OwnerPageCover__in").length > 1) {
                var e;
                Gcounter = 0;
                coverObj=!!(e = document.getElementsByClassName("OwnerPageCover__in"))[0].textContent ? e[0] : e[1];
                getURL(coverObj);
            } else {
                Gcounter++;
                setTimeout(()=>{checkonload()}, 1000);
            }
        } catch (e) {
            console.log("cover finding failure.")
        }
    } else {
        Gcounter = 0;
    }
}

window.onload = checkonload();

var observer = new MutationObserver(callback);

try { observer.observe(targetNode, config) } catch(e) { console.log("observer error") };
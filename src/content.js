import { BrowserQRCodeReader } from '@zxing/browser'
var HTMLparts = ['<div class="OwnerPageCover__in" style="background-image: url(&quot;','&quot;);"><div class="OwnerPageCover__button"><button type="button" class="vkuiButton vkuiButton--sz-m vkuiButton--lvl-secondary vkuiButton--clr-overlay vkuiButton--aln-center vkuiButton--sizeY-compact vkuiButton--with-icon vkuiTappable vkuiTappable--sizeX-regular vkuiTappable--hasHover vkuiTappable--hasActive vkuiTappable--mouse"><span class="vkuiButton__in"><span role="presentation" class="vkuiButton__before"><div role="presentation" class=" vkuiIcon vkuiIcon--24 vkuiIcon--w-24 vkuiIcon--h-24 vkuiIcon--pen_outline_24 " style="width: 24px; height: 24px;"><svg viewBox="0 0 24 24" width="24" height="24" style="display: block;"><use xlink:href="#pen_outline_24" style="fill: currentcolor;"></use></svg></div></span><span class="vkuiButton__content vkuiSubhead vkuiSubhead--sizeY-compact vkuiSubhead--w-2">Изменить обложку</span></span><span aria-hidden="true" class="vkuiTappable__hoverShadow"></span><span aria-hidden="true" class="vkuiFocusVisible vkuiFocusVisible--outside"></span></button></div></div>' ,'&quot;);"><div class="OwnerPageCover__button"><button type="button" class="vkuiButton vkuiButton--sz-m vkuiButton--lvl-secondary vkuiButton--clr-overlay vkuiButton--aln-center vkuiButton--sizeY-compact vkuiButton--with-icon vkuiTappable vkuiTappable--sizeX-regular vkuiTappable--hasHover vkuiTappable--hasActive vkuiTappable--mouse"><span class="vkuiButton__in"><span role="presentation" class="vkuiButton__before"><div role="presentation" class=" vkuiIcon vkuiIcon--24 vkuiIcon--w-24 vkuiIcon--h-24 vkuiIcon--pen_outline_24 " style="width: 24px; height: 24px;"><svg viewBox="0 0 24 24" width="24" height="24" style="display: block;"><use xlink:href="#pen_outline_24" style="fill: currentcolor;"></use></svg></div></span><span class="vkuiButton__content vkuiSubhead vkuiSubhead--sizeY-compact vkuiSubhead--w-2">Чтобы изменить обложку отключите расширение</span></span><span aria-hidden="true" class="vkuiTappable__hoverShadow"></span><span aria-hidden="true" class="vkuiFocusVisible vkuiFocusVisible--outside"></span></button></div></div>', '&quot;);"></div>']
function getURLs(html=''){
        var url=html.replace(HTMLparts[0], '').replace(HTMLparts[1],'').replace('&quot;);"></div>', '')
        return url
    }

function scanQR(url){
    var imgObj = new Image();
    imgObj.src = url + '?' + new Date().getTime();
    imgObj.setAttribute('crossOrigin', '');
    const codeReader = new BrowserQRCodeReader()
    codeReader.decodeFromImageElement(imgObj).then(result=>function(){
        localStorage.setItem("link", result.getText()) // не работает по какой-то причине
    })
};

var Link=localStorage.link

var HTML=HTMLparts[0]+Link+HTMLparts[3]

var targetNode = document.getElementById('wrap3');
var config = { attributes: true, childList: true };

var callback = function(mutationsList) {
    for(var mutation of mutationsList) {
        if (mutation.type == 'childList') {
            console.log("childlist change")
            checkonload(false)
        }
        else if (mutation.type == 'attributes') {
            console.log("attribute change")
            checkonload(false)
        }
    }
};
var observer = new MutationObserver(callback);

function checkonload(fail){
    if (!fail)
        console.log("сover finding started.")

        setTimeout(window.onload = function(){
            try{    
                if (document.getElementsByClassName("OwnerPageCover__in")[0].outerHTML.length!=38){
                    scanQR(getURLs(document.getElementsByClassName("OwnerPageCover__in")[0].outerHTML))
                    document.getElementsByClassName("OwnerPageCover__in")[0].outerHTML=HTML
                    console.log("HTML loaded.")
                } else {
                    console.log("cover load failure, retrying...")
                    checkonload(true)
                }
            } catch (e) {
                console.log("сover finding failure.")
            }
        }, 1000)
}

window.onload=checkonload(false)

try{observer.observe(targetNode, config);} catch(e){console.log("observer error")}
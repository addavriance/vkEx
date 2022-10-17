import { BrowserQRCodeReader } from '@zxing/browser'
var HTMLparts = ['<div class="OwnerPageCover__in" style="background-image: url(&quot;','&quot;);"><div class="OwnerPageCover__button"><button type="button" class="vkuiButton vkuiButton--sz-m vkuiButton--lvl-secondary vkuiButton--clr-overlay vkuiButton--aln-center vkuiButton--sizeY-compact vkuiButton--with-icon vkuiTappable vkuiTappable--sizeX-regular vkuiTappable--hasHover vkuiTappable--hasActive vkuiTappable--mouse"><span class="vkuiButton__in"><span role="presentation" class="vkuiButton__before"><div role="presentation" class=" vkuiIcon vkuiIcon--24 vkuiIcon--w-24 vkuiIcon--h-24 vkuiIcon--pen_outline_24 " style="width: 24px; height: 24px;"><svg viewBox="0 0 24 24" width="24" height="24" style="display: block;"><use xlink:href="#pen_outline_24" style="fill: currentcolor;"></use></svg></div></span><span class="vkuiButton__content vkuiSubhead vkuiSubhead--sizeY-compact vkuiSubhead--w-2">Изменить обложку</span></span><span aria-hidden="true" class="vkuiTappable__hoverShadow"></span><span aria-hidden="true" class="vkuiFocusVisible vkuiFocusVisible--outside"></span></button></div></div>' ,'&quot;);"><div class="OwnerPageCover__button"><button type="button" class="vkuiButton vkuiButton--sz-m vkuiButton--lvl-secondary vkuiButton--clr-overlay vkuiButton--aln-center vkuiButton--sizeY-compact vkuiButton--with-icon vkuiTappable vkuiTappable--sizeX-regular vkuiTappable--hasHover vkuiTappable--hasActive vkuiTappable--mouse"><span class="vkuiButton__in"><span role="presentation" class="vkuiButton__before"><div role="presentation" class=" vkuiIcon vkuiIcon--24 vkuiIcon--w-24 vkuiIcon--h-24 vkuiIcon--pen_outline_24 " style="width: 24px; height: 24px;"><svg viewBox="0 0 24 24" width="24" height="24" style="display: block;"><use xlink:href="#pen_outline_24" style="fill: currentcolor;"></use></svg></div></span><span class="vkuiButton__content vkuiSubhead vkuiSubhead--sizeY-compact vkuiSubhead--w-2">Чтобы изменить обложку отключите расширение</span></span><span aria-hidden="true" class="vkuiTappable__hoverShadow"></span><span aria-hidden="true" class="vkuiFocusVisible vkuiFocusVisible--outside"></span></button></div></div>', '&quot;);"></div>']
var loadingHTML = HTMLparts[0]+'https://venturebeat.com/wp-content/uploads/2014/10/loading_desktop_by_brianmccumber-d41z4h6.gif?w=1200&strip=all'+HTMLparts[3]
var start_HTML='';
if(localStorage.working==undefined){
    localStorage.working=true
}
function getURL(html='', my=false){
        var url=html.replace(HTMLparts[0], '').replace(HTMLparts[1],'').replace('&quot;);"></div>', '').replace('&quot;);"><div class="OwnerPageCover__button OwnerPageCover__button--shown"><button type="button" class="vkuiButton vkuiButton--sz-m vkuiButton--lvl-secondary vkuiButton--clr-overlay vkuiButton--aln-center vkuiButton--sizeY-compact vkuiButton--with-icon vkuiTappable vkuiTappable--sizeX-regular vkuiTappable--hasHover vkuiTappable--hasActive vkuiTappable--mouse vkuiTappable--hover-background"><span class="vkuiButton__in"><span role="presentation" class="vkuiButton__before"><div role="presentation" class=" vkuiIcon vkuiIcon--24 vkuiIcon--w-24 vkuiIcon--h-24 vkuiIcon--pen_outline_24 " style="width: 24px; height: 24px;"><svg viewBox="0 0 24 24" width="24" height="24" style="display: block;"><use xlink:href="#pen_outline_24" style="fill: currentcolor;"></use></svg></div></span><span class="vkuiButton__content vkuiSubhead vkuiSubhead--sizeY-compact vkuiSubhead--w-2">Изменить обложку</span></span><span aria-hidden="true" class="vkuiTappable__hoverShadow"></span><span aria-hidden="true" class="vkuiFocusVisible vkuiFocusVisible--outside"></span></button></div></div>', '')
        document.getElementsByClassName("OwnerPageCover__in")[0].outerHTML = loadingHTML
        scanQR(url, my)
    }

function scanQR(url, my){
    var link = ''
    var counter = 0
    var imgObj = new Image();
    imgObj.src = url + '?' + new Date().getTime();
    imgObj.setAttribute('crossOrigin', '');
    const codeReader = new BrowserQRCodeReader()
    codeReader.decodeFromImageElement(imgObj).then(result => 
        link = result.getText()
    ).catch(res=>console.log(/*/"qr-scan failed"/*/))
    var i = setInterval(function(){
        counter+=1; 
        if (counter==5){
            document.getElementsByClassName("OwnerPageCover__in")[0].outerHTML=start_HTML
            clearInterval(i)
        }
        if (link!='')
        { /*/console.log(link), /*/
            solveHTML(link, my);
            clearInterval(i)
        } else {/*/console.log("qr-scan att "+counter)/*/}
    }, 1000)
};
    
var HTML=''
function solveHTML(link, my){
    //console.log("Solving HTML...")
    if(my){
        HTML=HTMLparts[0]+link+HTMLparts[2]
    } else {
        HTML=HTMLparts[0]+link+HTMLparts[3] 
    }
    document.getElementsByClassName("OwnerPageCover__in")[0].outerHTML=HTML
    //console.log("HTML loaded.")
}

var targetNode = document.getElementById('wrap3');
var config = { attributes: true, childList: true };

var callback = function(mutationsList) {
    for(var mutation of mutationsList) {
        if (mutation.type == 'childList') {
            //console.log("childlist change")
            checkonload(false)
        }
        else if (mutation.type == 'attributes') {
            //console.log("attribute change")
            checkonload(false)
        }
    }
};
var observer = new MutationObserver(callback);

function checkonload(fail){
    if(localStorage.working=='true'){
    if (!fail)
        //console.log("сover finding started.")

        setTimeout(window.onload = function(){
            try{    
                if (document.getElementsByClassName("OwnerPageCover__in")[0].outerHTML.length!=38){
                    start_HTML=document.getElementsByClassName("OwnerPageCover__in")[0].outerHTML;
                    getURL(start_HTML, start_HTML.length>300)
                } else {
                    console.log("cover load failure, retrying...")
                    checkonload(true)
                }
            } catch (e) {
                console.log("сover finding failure.")
            }
        }, 1000)
    }
}

window.onload=checkonload(false)

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    localStorage.working=localStorage.working=='true' ? false : true

    if(localStorage.working=='true'){
        alert("VK Covers: Расширение включено, перезагрузите страницу.")
        // chrome.browserAction.setTitle("VK Covers: анимированные обложки включены")
    } else {
        alert("VK Covers: Расширение отключено, перезагрузите страницу.")
        // chrome.browserAction.setTitle("VK Covers: анимированные обложки в отключены")
    }
    return true
});

try{observer.observe(targetNode, config);} catch(e){console.log("observer error")}
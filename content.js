// import QrScanner from "./node_modules/qr-scanner"
// function scanQR(){
//     QrScanner.scanImage("https://sun9-west.userapi.com/sun9-68/s/v1/s2/NerPfT2cEvGvB9qN79U_1SrXxnE-XgBNwju0lILXyowID_P2xV0HqA5jc1fhddPCOV9TPGpK-f33Q3UJsu72yeI.jpg")
//     .then(result => console.log(result))
//     .catch(error => console.log(error || 'No QR code found.'));
// }


var myLink = 'https://i.yapx.ru/OqAKA.gif'
var otherLink = 'https://wallpaperaccess.com/full/2641074.gif'
var myHTML = '<div class="OwnerPageCover__in" style="background-image: url(&quot;'+myLink+'&quot;);"><div class="OwnerPageCover__button"><button type="button" class="vkuiButton vkuiButton--sz-m vkuiButton--lvl-secondary vkuiButton--clr-overlay vkuiButton--aln-center vkuiButton--sizeY-compact vkuiButton--with-icon vkuiTappable vkuiTappable--sizeX-regular vkuiTappable--hasHover vkuiTappable--hasActive vkuiTappable--mouse"><span class="vkuiButton__in"><span role="presentation" class="vkuiButton__before"><div role="presentation" class=" vkuiIcon vkuiIcon--24 vkuiIcon--w-24 vkuiIcon--h-24 vkuiIcon--pen_outline_24 " style="width: 24px; height: 24px;"><svg viewBox="0 0 24 24" width="24" height="24" style="display: block;"><use xlink:href="#pen_outline_24" style="fill: currentcolor;"></use></svg></div></span><span class="vkuiButton__content vkuiSubhead vkuiSubhead--sizeY-compact vkuiSubhead--w-2">Чтобы изменить обложку отключите расширение</span></span><span aria-hidden="true" class="vkuiTappable__hoverShadow"></span><span aria-hidden="true" class="vkuiFocusVisible vkuiFocusVisible--outside"></span></button></div></div>'
var otherHTML='<div class="OwnerPageCover__in" style="background-image: url(&quot;'+otherLink+'&quot;);"></div>'
function checkonload(click=false){
    var timing
    if(click){timing=970} else {timing=360}
        setTimeout(window.onload = function(){
            try{
                if(document.getElementsByClassName("OwnerPageCover__in")[0].outerHTML.length>300){
                    document.getElementsByClassName("OwnerPageCover__in")[0].outerHTML=myHTML
                } else {
                    document.getElementsByClassName("OwnerPageCover__in")[0].outerHTML=otherHTML
                }
            } catch (e) {
                console.log("Cover finding failure.")
            }
        }, timing)
    }
checkonload()
var targetNode = document.getElementById('wrap3');
var config = { attributes: true, childList: true };
var callback = function(mutationsList) {
    for(var mutation of mutationsList) {
        if (mutation.type == 'childList') {
            checkonload(true)
        }
        else if (mutation.type == 'attributes') {
            checkonload(true)
        }
    }
};
var observer = new MutationObserver(callback);
observer.observe(targetNode, config);

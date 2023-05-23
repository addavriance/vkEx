/*/outerHTML used only for getting and replacing VK user cover preview and nothing else. (extension adds animated covers for every user
who placed qr-code on his page cover)/*/

import { BrowserQRCodeReader } from '@zxing/browser';

const loadingURL = "url('https://venturebeat.com/wp-content/uploads/2014/10/loading_desktop_by_brianmccumber-d41z4h6.gif?w=1200&strip=all')";


function scanQRCode(obj, url, currentURL) {
  const imgObj = new Image();
  imgObj.src = url + '?' + new Date().getTime();
  imgObj.setAttribute('crossOrigin', '');

  const codeReader = new BrowserQRCodeReader();
  codeReader.decodeFromImageElement(imgObj)
    .then(result => {
      obj.style.backgroundImage = `url("${result.getText()}")`;
    })
    .catch(() => {
      obj.style.backgroundImage = currentURL;
      console.log("QR scan failed");
    });
}

function processProfileWrapper() {
  console.log("Processing cover...");
  const coverObj = document.getElementsByClassName("OwnerPageCover__in")[1];
  if (coverObj) {
    getURL(coverObj);
  }
}

function trackProfileWrapper() {
  const observer = new MutationObserver(mutationsList => {
    mutationsList.forEach(mutation => {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(node => {
          if (!!node.classList && (node.classList.contains('ProfileWrapper') || (!!node.src && node.src.includes("userapi.com") && !!node.classList.value))) {
            setTimeout(() => {
              processProfileWrapper();
            }, 500);
        }
      });
    }
  });
});

observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
}

function getURL(obj) {
  const cUrl = obj.style.backgroundImage;
  const url = obj.style.backgroundImage.replace('url("', "").replace('")', '');

  obj.style.backgroundImage = loadingURL;

  scanQRCode(obj, url, cUrl);
}
trackProfileWrapper();
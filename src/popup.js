import QRCode from 'easyqrcodejs';

function convertSvgToCanvas(svgElement) {
  const canvas = document.createElement('canvas');

  canvas.width = svgElement.width.animVal.value
  canvas.height = svgElement.height.animVal.value
  
  const context = canvas.getContext('2d');
  
  const svgString = new XMLSerializer().serializeToString(svgElement);
  
  const img = new Image();
  
  img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString);

  img.onload = function() {
    context.drawImage(img, 0, 0);
  };

  return canvas;
}

function createQRCode(textLink) {
  var qrCodeContainer = document.getElementById("qrcode");
  qrCodeContainer.style.display = 'none';

  new QRCode(qrCodeContainer, {
    text: textLink,
    width: 128,
    height: 128,
    colorDark: "#000000",
    colorLight: "#ffffff",
    quietZone: 10,
    quietZoneColor: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H,
    drawer: 'svg',
    onRenderingEnd: function(qrCodeOptions) {
      reDrawDownloadQRCode(textLink, qrCodeOptions._element);
  },
  });
}

function reDrawDownloadQRCode(textLink, qrCodeContainer) {
  const qrSvg = qrCodeContainer.querySelector('svg');
  const qrCanvas = convertSvgToCanvas(qrSvg);

  const backgroundImg = new Image();
  backgroundImg.crossOrigin = "anonymous";
  backgroundImg.src = textLink;
  backgroundImg.onload = () => {
    const finalCanvas = document.createElement('canvas');
    const finalContext = finalCanvas.getContext('2d');

    finalCanvas.width = Math.max(backgroundImg.width, 960);
    finalCanvas.height = Math.max(backgroundImg.height, 384);

    const ctx = finalCanvas.getContext('2d');

    ctx.drawImage(backgroundImg, 0, 0, backgroundImg.width, backgroundImg.height, 0, 0, finalCanvas.width, finalCanvas.height);

    var qrX = (finalCanvas.width - qrCanvas.width) / 2;
    var qrY = (finalCanvas.height - qrCanvas.height) / 2;
    finalContext.drawImage(qrCanvas, qrX, qrY);

    var imageData = finalCanvas.toDataURL("image/png");

    var downloadLink = document.createElement("a");
    downloadLink.href = imageData;
    downloadLink.download = "qrcode.png";

    downloadLink.style.display = "none"; // Скрыть элемент скачивания QR-кода
    qrCodeContainer.appendChild(downloadLink);
    downloadLink.click();
    qrCodeContainer.removeChild(downloadLink); // Удалить элемент после скачивания
  };
}

function validURL(url) {
  var pattern = new RegExp(
    '^(https?:\\/\\/)?' +
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
    '((\\d{1,3}\\.){3}\\d{1,3}))' +
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
    '(\\?[;&a-z\\d%_.~+=-]*)?' +
    '(\\#[-a-z\\d_]*)?$',
    'i'
  );
  return !!pattern.test(url);
}

function handleButtonClick() {
  var urlInput = document.getElementById("url").value;
  var qrTextElement = document.getElementById('text2');

  if (validURL(urlInput)) {
    createQRCode(urlInput);
    qrTextElement.textContent = '';
  } else if (!urlInput) {
    qrTextElement.textContent = 'Введите ссылку.';
  } else {
    qrTextElement.textContent = 'Неверная ссылка.';
  }
}

var btn = document.getElementById('btn');
btn.addEventListener("click", handleButtonClick);

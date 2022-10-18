var working;
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  working = message.working
  if(working=='true'){
    chrome.action.setTitle({title: "VK Covers: выключить анимированные обложки"})
    chrome.action.setIcon({path: {"38":"/icons/icon_on_38.png"}})
  } else {
    chrome.action.setTitle({title: "VK Covers: включить анимированные обложки"})
    chrome.action.setIcon({path: {"38":"/icons/icon_off_38.png"}})
  }
  return true
})
try{
    chrome.action.onClicked.addListener(function (tab) {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        // if (tabs[0].url.match('https:\/\/.*.vk.com\/.*')) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "open_dialog_box"}, function(response) {});  
        // }
      });
    });
} catch(e){console.log(e)}
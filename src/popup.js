var btn = document.getElementById('btn')
var text = document.getElementById("text2")
btn.addEventListener("click", function(){
    var url = document.getElementById("url").value
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
        if (tabs[0].url.match('https:\/\/vk.com\/.*')) {
        var activeTab = tabs[0];
        text.textContent=''
        chrome.tabs.sendMessage(activeTab.id, {"url": url});
        } else {
            text.textContent='Переключитесь на вкладку с ВКонтакте!'
        }
    });
})
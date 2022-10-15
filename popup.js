var key=""
document.addEventListener('DOMContentLoaded', async () => {
        var btn = document.getElementById('btn');
        btn.addEventListener('click', function(){
            key = document.getElementById("myInput").value
            chrome.storage.sync.set({key1: key}, function() {
                console.log('Value is set to ' + key);
              });
              
              chrome.storage.sync.get(['key1'], function(result) {
                console.log('Value currently is ' + result.key1);
              });
        })
});
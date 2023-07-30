function reloadPage() {
    window.location.reload()
}

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    console.log(request, sender)
    if(request.reload) {
        chrome.tabs.query({active: true, currentWindow: true}, function (arrayOfTabs) {
            chrome.scripting.executeScript({
                target: {tabId: arrayOfTabs[0].id, allFrames: true},
                func: reloadPage
            });
        });
    }
});
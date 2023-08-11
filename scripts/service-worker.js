chrome.tabs.onUpdated.addListener(function (tabId , info, tab) {
    const currentDate = new Date();

    let startLoadingTime = null;
    let completeLoadingTime = null;


    if(tab?.url?.includes('funkoeurope.com')) {
        if (info.status === 'loading') {
            startLoadingTime = currentDate.getTime();

            chrome.storage.local.set({ startLoadingTime: currentDate.getTime() })
                .then(() => {
                    console.log('startLoadingTime has been set')
                });
        }

        if (info.status === 'complete') {
            completeLoadingTime = currentDate.getTime();

            chrome.storage.local.set({ completeLoadingTime: currentDate.getTime() })
                .then(() => {
                    console.log('completeLoadingTime has been set')
                });
        }
    }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    if(request.action === "GET_TAB") {
        chrome.tabs.query({ active: true, lastFocusedWindow: true }, function(tabs) {
            // and use that tab to fill in out title and url
            let currentWorkingTab = tabs[0];
            // console.log(tab.url);
            console.log(currentWorkingTab)
            sendResponse(currentWorkingTab);
        });
    }

    // switch (request.action) {
    //     case "GET_TAB":
    //         break;
    //     case "RELOAD":
    //         chrome.tabs.query({active: true, currentWindow: true}, function (arrayOfTabs) {
    //             chrome.scripting.executeScript({
    //                 target: {tabId: arrayOfTabs[0].id, allFrames: true},
    //                 func: reloadPage
    //             });
    //         });

    //         break;
    //     default:
    //         break;
    // }
});


function reloadPage() {
    window.location.reload()
}
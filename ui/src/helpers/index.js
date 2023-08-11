const getActiveTab = (chrome, callback) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        // and use that tab to fill in out title and url
        let currentWorkingTab = tabs[0];
        // console.log(tab.url);
        callback(currentWorkingTab);
    });
}

const createActiveTab = (chrome, url) => {
    chrome.tabs.create({
        active: true,
        url: url
    })
}

export { getActiveTab, createActiveTab };
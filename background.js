let color = "red";
// runs in service worker
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({color})
});
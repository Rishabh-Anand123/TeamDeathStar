let timeSpent = {};
let activeTabId = null;
let timer = null;

chrome.tabs.onActivated.addListener(activeInfo => {
    if (activeTabId !== null) {
        clearInterval(timer);
        chrome.tabs.get(activeTabId, tab => {
            if (tab.url) {
                const url = new URL(tab.url).hostname;
                timeSpent[url] = (timeSpent[url] || 0) + 1; // Increment time spent by 1 second
                chrome.storage.local.set({ timeSpent }); // Save to storage
            }
        });
    }

    activeTabId = activeInfo.tabId;

    chrome.tabs.get(activeTabId, tab => {
        if (tab.url) {
            const url = new URL(tab.url).hostname;
            timer = setInterval(() => {
                timeSpent[url] = (timeSpent[url] || 0) + 1; // Increment time spent by 1 second
                chrome.storage.local.set({ timeSpent }); // Save to storage
            }, 1000);
        }
    });
});

chrome.tabs.onRemoved.addListener((tabId) => {
    clearInterval(timer);
    // Send data to the server when the tab is closed
    sendData();
});

function sendData() {
    fetch('https://yourwebsite.com/api/track-time', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ timeSpent: timeSpent })
    }).then(response => {
        console.log('Data sent:', response);
    }).catch(error => {
        console.error('Error sending data:', error);
    });
}
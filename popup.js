chrome.storage.local.get('timeSpent', (data) => {
    const timeData = data.timeSpent || {};
    const timeDataDiv = document.getElementById('timeData');
    timeDataDiv.innerHTML = '';

    for (const [url, time] of Object.entries(timeData)) {
        timeDataDiv.innerHTML += `<p>${url}: ${time} seconds</p>`;
    }
});
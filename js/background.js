// Run multiple javascript files at the same time
var executeScripts = function(tabId, injectDetailsArray) {
	function createCallback(tabId, injectDetails, innerCallback) {
		return function () {
			chrome.tabs.executeScript(tabId, injectDetails, innerCallback);
		};
	}

	var callback = null; 

	for (var i = injectDetailsArray.length - 1; i >= 0; --i)
		callback = createCallback(tabId, injectDetailsArray[i], callback);

	if (callback !== null)
    callback();   // execute outermost function
}

// Check to see if a tab exists
var tabExists = function(tabId, callback) {
	chrome.windows.getAll({ populate: true }, function (windows) {
		var exists = false;
		for (var i = 0, window; window = windows[i]; i++) {
			for (var j = 0, tab; tab = window.tabs[j]; j++) {
				if (tab.id === tabId) {
					exists = true
				}
			}
		}

		callback(exists);
	});
}


chrome.browserAction.onClicked.addListener(function(tab) { // when the extension button is clicked

	chrome.storage.local.get(null, function(storageObject) { // see if the messenger tab from before is still open
		var tabId = storageObject.tabId;
		var windowId = storageObject.windowId;

		tabExists(tabId, function(exists) { // if it is, focus on that existing tab
			if (exists === true) {
				chrome.windows.update(windowId, {focused: true});
				chrome.tabs.update(tabId, {selected: true});
			}
			else {
				chrome.tabs.create({ url: "https://www.facebook.com/messages/" }, function(tab) { // otherwise open a new messenger tab
					chrome.storage.local.set({tabId: tab.id, windowId: tab.windowId}); // and remember that you did that
					chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) { // and then run the scripts on the messenger page
						if (tabId === tab.id && changeInfo.status === 'complete') {
							executeScripts(tabId, [ 
						    { file: 'js/lib/jquery-2.1.3.min.js' }, 
						    { file: "js/strip.js" }
							])
						}	  
					});

				});
			}
		});
	});
});

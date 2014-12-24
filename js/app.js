function executeScripts(tabId, injectDetailsArray) {
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

chrome.browserAction.onClicked.addListener(function(tab) {

	chrome.storage.local.get(null, function(storageObject) {
		var tabId = storageObject.tabId;
		var windowId = storageObject.windowId;


		tabExists(tabId, function(exists) {
			if (exists === true) {
				chrome.windows.update(windowId, {focused: true});
				chrome.tabs.update(tabId, {selected: true});
			}
			else {
				chrome.tabs.create({ url: "https://www.facebook.com/messages/" }, function(tab) {
					chrome.storage.local.set({tabId: tab.id, windowId: tab.windowId});

					chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {//add listener to the url
						if (tabId === tab.id && changeInfo.status === 'complete') {
							// chrome.tabs.executeScript({ code: 'alert("hello world");' });
							executeScripts(null, [ 
							    { file: 'js/lib/jquery-2.1.3.min.js' }, 
							    { file: "js/modifications.js" }
							])
						}	  
					});

				});
			}
		});
	});
});

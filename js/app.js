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
				chrome.tabs.update(tabId, {selected: true});
				chrome.windows.update(windowId, {focused: true});
			}
			else {
				chrome.tabs.create({ url: "https://www.facebook.com/messages/" }, function(tab) {
					chrome.storage.local.set({tabId: tab.id, windowId: tab.windowId}, function(tab) {
					});
				});
			}
		});
		
	});
});

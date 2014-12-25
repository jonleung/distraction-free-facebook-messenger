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
window.BG_APP = window.BG_APP || {};

(function(BG_APP) {
  
  chrome.browserAction.onClicked.addListener(function(tab) { // when the extension button is clicked

    chrome.storage.local.get(null, function(storageObject) { // see if the messenger tab from before is still open
      var tabId = storageObject.tabId;
      var windowId = storageObject.windowId;

      BG_APP.tabExists(tabId, function(exists) { // if it is, focus on that existing tab
        if (exists === true) {
          mixpanel.track("tabExists");
          chrome.windows.update(windowId, {focused: true});
          chrome.tabs.update(tabId, {selected: true});
        }
        else {
          mixpanel.track("tabCreated");
          chrome.tabs.create({ url: "https://www.facebook.com/messages/" }, function(tab) { // otherwise open a new messenger tab
            chrome.storage.local.set({tabId: tab.id, windowId: tab.windowId}); // and remember that you did that
            chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) { // and then run the scripts on the messenger page
              if (tabId === tab.id && changeInfo.status === 'complete') {
                BG_APP.executeScripts(tabId, [ 
                  { file: 'js/lib/jquery-2.1.3.min.js' },
                  { file: 'js/lib/jquery.noty-2.3.3.packaged.min.js'},
                  { file: 'js/content_scripts/stripper.js' },
                  { file: 'js/content_scripts/main.js' }
                ])
              }   
            });

          });
        }
      });
    });
  });

})(window.BG_APP);
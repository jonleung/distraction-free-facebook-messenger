window.BG_APP = window.GB_APP || {};

(function(BG_APP) {

  var generateGuid = (function() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
                 .toString(16)
                 .substring(1);
    }
    return function() {
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
             s4() + '-' + s4() + s4() + s4();
    };
  })();

  var getIP = function() {
    if (window.XMLHttpRequest) xmlhttp = new XMLHttpRequest();
    else xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");

    xmlhttp.open("GET","http://api.hostip.info/get_html.php",false);
    xmlhttp.send();

    hostipInfo = xmlhttp.responseText.split("\n");

    for (i=0; hostipInfo.length >= i; i++) {
        ipAddress = hostipInfo[i].split(":");
        if ( ipAddress[0] == "IP" ) return ipAddress[1];
    }

    return false;
  }

  chrome.storage.sync.get(null, function(storageObject) {
    if (storageObject.guid === undefined) {
      BG_APP.GUID = generateGuid();
      chrome.storage.sync.set( {guid: BG_APP.GUID} );
    }
    else {
      BG_APP.GUID = storageObject.guid;
    }

    mixpanel.identify(BG_APP.GUID);
    mixpanel.people.set({
      "$name": BG_APP.GUID
    });

    BG_APP.track = function(action, params) {
      params = params || {};
      params.distinct_id = BG_APP.GUID;

      mixpanel.track(action, params);
    };

  });


})(window.BG_APP);
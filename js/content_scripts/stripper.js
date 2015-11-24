window.CT = window.CT || {};

(function(CT) {

  CT.Stripper = {

    STATIC_DISTRACTIONS: [
      '#pagelet_bluebar',  // top bar selector
      '#rightCol',        // right column selector
      '._5qqe',           // tiny box that is used to push the sidebar's content below the navbar
      '#pagelet_ticker',  // mini newsfeed selector
      '#pagelet_canvas_nav_content' // suggested content like games
    ],

    DISTRACTING_POPUP_SELECTORS: [
      '.uiContextualLayerLeft',        // appears when hovering over people in the right side chat bar
      '.uiContextualLayerAboveLeft',  // appears above a hoverable profile link
      '.uiContextualLayerBelowLeft',  // appears below a hoverable profile link
      '._50d1'
    ],

    DISTRACTING_LINK_SELECTORS: [
      '.webMessengerMessageGroup a:has(img)',  // clickable profile picture in chat box
      '.webMessengerMessageGroup strong a',    // clickable name in chat thread
      '.titlebarText',                         // clickable name name in mini chat window
      '#webMessengerHeaderName a'              // clickable name at the top of the chat thread
    ],

    alertWarning: function() {
      var n = noty({
        layout: 'topRight',
        type: 'error',
        theme: 'relax',
        text: "Nope... That takes you to facebook. We don't want to facebook.",
        timeout: 2500,
        closeWith: ['click', 'button', 'backdrop'],
        animation: {
          open: {height: 'toggle'}, // jQuery animate function property object
          close: {height: 'toggle'}, // jQuery animate function property object
          easing: 'swing', // easing
          speed: 500 // opening & closing animation speed
        },
        dismissQueue: true, // If you want to use queue feature set this true
      });
    },

    neuterLinks: function() {
      var undesirableLinkSelector = this.DISTRACTING_LINK_SELECTORS
        .map(function(selector) {
            return selector + '[neutered!="true"]'
          })
        .join(", ");

      $(undesirableLinkSelector)
        .attr('neutered', 'true')
        .attr('href', '#')
        .on('click', this.alertWarning);
    },

    stripNotificationInTitle: function() {
      document.title = document.title.replace(/\((.+)\)\ /,'');
    },

    replaceNotificationCountWithUnreadMessageCount: function() {
      var unreadMessageCountString = $("#u_0_n > div > div.wmMasterView > div > div._6jw > ul > li.selectedFolder > h3 > a > span.pls._1r.fwn").text();

      var notificationRegex = /\(\d+\)/;
      if (notificationRegex.test(document.title)) {
        document.title = document.title.replace(/\((\d+)\)/, unreadMessageCountString);
      }
      else {
        document.title = unreadMessageCountString + " " + document.title
      }
    },

    stripStaticEls: function() {
      this.STATIC_DISTRACTIONS.forEach(function(sd) {
        $(sd).remove();
      });

      var joinedDistractingPopupSelectors = this.DISTRACTING_POPUP_SELECTORS.join(', ');
      var style = $('<style> ' + joinedDistractingPopupSelectors + ' {display: none;}</style>')
      $('html > head').append(style);
    },

    stripDynamicEls: function() {
      // this.neuterLinks(); // Disable neutering links because they seem to be useful when answering messages      this.stripNotificationInTitle();
    },

    strip: function() {
      this.stripStaticEls();

      var self = this;
      setInterval(function() { self.stripDynamicEls() }, 500);
    }

  };

})(window.CT);

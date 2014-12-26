window.CT = window.CT || {};

(function(CT) {
	
	CT.Stripper = {

		TOP_BAR_SELECTOR: '#pagelet_bluebar',
		RIGHT_COL_SELECTOR: '#rightCol',
		SIDEBAR_SPACER_SELECTOR: '._5qqe', // tiny box that is used to push the sidebar's content below the navbar
		MINI_NEWSFEED_SELECTOR: '#pagelet_ticker',

		UNDESIRABLE_POPUP_SELECTORS: [
			'.uiContextualLayerLeft',				// appears when hovering over people in the right side chat bar
			'.uiContextualLayerAboveLeft',	// appears above a hoverable profile link
			'.uiContextualLayerBelowLeft',	// appears below a hoverable profile link 
			'._50d1'
		],

		UNDESIRABLE_LINK_SELECTORS: [
			'.webMessengerMessageGroup a:has(img)',	// clickable profile picture in chat box
			'.webMessengerMessageGroup strong a',		// clickable name in chat thread
			'.titlebarText'													// clickable name name in mini chat window
		],

		stripElements: function() {
			$(this.TOP_BAR_SELECTOR).remove(); // removes the top bar
			$(this.RIGHT_COL_SELECTOR).remove(); // removes the right column
			$(this.MINI_NEWSFEED_SELECTOR).remove() // removes the annoying mini-newsfeed on the top right hand corner
			$(this.SIDEBAR_SPACER_SELECTOR).remove(); // removes a
		},

		hidePopups: function() {
			var style = $('<style> ' + this.UNDESIRABLE_POPUP_SELECTORS.join(', ') + ' {display: none;}</style>') 
			$('html > head').append(style);																									
		},

		alertWarning: function() {
			var n = noty({
				layout: 'topRight',
		    type: 'error',
				theme: 'relax',
		    text: "Nope... That takes you to facebook. We don't want to facebook.",
		    timeout: 2500,
		    closeWith: ['click', 'button', 'hover', 'backdrop'],
		    animation: {
	        open: {height: 'toggle'}, // jQuery animate function property object
	        close: {height: 'toggle'}, // jQuery animate function property object
	        easing: 'swing', // easing
	        speed: 500 // opening & closing animation speed
		    },
		    dismissQueue: true, // If you want to use queue feature set this true
			});
		},

		neutorLinks: function() {
			var undesirableLinkSelector = this.UNDESIRABLE_LINK_SELECTORS
				.map(function(selector) {
						return selector + '[neutered!="true"]'
					})
				.join(", ");

			$(undesirableLinkSelector)
				.attr('neutered', 'true')
				.attr('href', '#')
				.on('click', this.alertWarning);
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

		strip: function() {
			this.hidePopups();
			this.stripElements();
		},

		pollingStrip: function(interval) {
			var that = this;
			setInterval(function() { // a set timeout is necessary because FB generates new content on the fly in messages
				that.neutorLinks();
				that.replaceNotificationCountWithUnreadMessageCount();
			}, interval); // this seems to 	
		}
	};

})(window.CT);




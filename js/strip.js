$('#pagelet_bluebar').remove(); // removes the top bar
$('#rightCol').remove(); // removes the right column
$('#pagelet_ticker').remove() // removes the annoying mini-newsfeed on the top right hand corner
$('._5qqe').remove(); // removes a tiny box is left behind near the mini-newsfeed

// Remove profile hover overs
var style = $('<style>.uiContextualLayerLeft, ._50d1 {display: none;}</style>') // note that the left one is chosen. 
$('html > head').append(style);																									// If it is the more generic non-sided uiContextualLayer
																																								// then the dropdowns for various menus would also break
																																								// instead of making the profile hovers disappear



setInterval(function() { // a set timeout is necessary because FB generates new content on the fly in messages

	// neutor all links that hover and bring up information 
	// when hovered over (usually profiles) so that they are not clickable.
	$('a[data-hovercard]').each(function(i, aTag) {
		aTag = $(aTag);
		aTag.attr('href', '#');
		aTag.removeAttr('data-hovercard');
	});	

	// neutor all chat links and profile picture links, respctively so that they are not clickable.
	$('.titlebarText, a:has(img)').attr('href', '#');

	// Attempted to remove profile links by specifying the regex
	// $('a').filter(function() {
	// 	var href = $(this).attr('href');
	// 	if (href !== undefined) {
	// 		return href.match(/https:\/\/www\.facebook\.com\/\w+$/);
	// 	}
	// 	else {
	// 		return false
	// 	}
	// }).attr('href', '#');


}, 500); // this seems to 


// Attempted to make links not clickable as they were dynamically inserted into the page.
// $(document).bind('DOMNodeInserted', function(e) {
// 	var el = $(e.target);

// 	if(el.is('a')) {
// 		var href = $(this).attr('href');
// 		if (href !== undefined) {
// 			console.log(href);
// 			if (href.match(/https:\/\/www\.facebook\.com\/[\w\.]+$/)) {
// 				el.attr('href', '#');
// 			}
// 		}
// 	}
// });
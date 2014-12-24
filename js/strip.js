$('#pagelet_bluebar').remove(); // removes the top bar
$('#rightCol').remove(); // removes the right column
$('#pagelet_ticker').remove() // removes the annoying mini newsfeed on the top right hand corner
$('._5qqe').remove(); // removes a tiny box that show up

// Remove any kind of hover overs
var style = $('<style>.uiContextualLayerLeft, ._50d1 {display: none;}</style>')
$('html > head').append(style);

window.resizeTo(window.outerWidth+1, window.outerHeight+1);
window.resizeTo(window.outerWidth-1, window.outerHeight-1);

setInterval(function() {

	$('a[data-hovercard]').each(function(i, aTag) {
		aTag = $(aTag);
		aTag.attr('href', '#');
		aTag.removeAttr('data-hovercard');
	});	

	$('.titlebarText, a:has(img)').attr('href', '#');

	// $('a').filter(function() {
	// 	var href = $(this).attr('href');
	// 	if (href !== undefined) {
	// 		return href.match(/https:\/\/www\.facebook\.com\/\w+$/);
	// 	}
	// 	else {
	// 		return false
	// 	}
	// }).attr('href', '#');


}, 500);

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
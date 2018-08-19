$(function() {
	// Clicking the ? popover
	$('.btn-qm').popover({
		html: true,
        'content': () => { return $('#qm-content').html() },
		container: 'body' // making an adjustment to be able to change the width of the popover without breaking it
 	});

	hoverOver('.client', 'btn-success', 'A client');
	hoverOver('.servant', 'btn-danger', 'A servant');

    // Hovering over the 'chosen' button
    function hoverOver(button, origClr, btnText) {
    	$(button).hover(function() {
			if ($(this).hasClass('chosen')) {
	    		$(this).html('&Cross;');
				$(this).css({
	      			'font-size': '20px',
	      			'padding': '3px'
				});
				$(this).removeClass(origClr);
				$(this).addClass('btn-secondary');
			}
    	}, function() {
			$(this).html(btnText);
			$(this).css({
				'font-size': '1rem',
				'padding': '6px 12px'
			});
			$(this).removeClass('btn-secondary');
			$(this).addClass(origClr);
    	});
	}
});

// Clicking 'A client' button
$('.client').click(function(){
	whoClicked('.client', function() {
		$('.client-panel').slideDown(1000);
	}, function() {
		// TODO remove all the orders (NEED BACKEND)
	});
});

// Clicking 'A servant' button
$('.servant').click(function(){
	whoClicked('.servant', function() {
		$('.servant-panel').slideDown(1000);
	});
});

// Used in clicking 'A client' and 'A servant' buttons
function whoClicked(thisBut, doAfterButAnim, doBeforeRefreshing) {
	let oppBut;
	if (thisBut === '.client') oppBut = '.servant';
	else if (thisBut === '.servant') oppBut = '.client';

	if (!$(thisBut).hasClass('chosen')){
		$(oppBut).animate({ 
				width: 0,
				padding: 0,
				margin: 0,
				border: 0
			}, 1000, function(){ // callback
			$(oppBut).css({
				'display': 'none'
			});
			$(thisBut).css({
				'border-radius': '.25rem'
			});
			$(thisBut).toggleClass("chosen");

			if (doAfterButAnim && typeof(doAfterButAnim) === "function")
				doAfterButAnim();
		});
	} else {
		if (confirm("Are you sure you want to return back discarding all the changes?")) {
			if (doBeforeRefreshing && typeof(doBeforeRefreshing) === 'function')
				doBeforeRefreshing();
			location.reload(); // refresh the page
		}
	}
}
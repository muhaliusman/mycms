/***
 |--------------------------------------------
 | 
 | Base backend javasrcip.
 | this js file, always load in bakend
 |
 |--------------------------------------------
 */

/***
 * jquery fn & ????
 */
(function($){
	// check element exist
	$.fn.exists = function()
	{
		return (0 < $(this).length);
	};
	
	// create unique id from date get time
	window.WCB.helper.uniqId = function(){
		var newDate = new Date();

		return newDate.getTime();
	};
})(jQuery);


/***
 * ?????
 */
(function($, i18n){
	$(document).on("click", ".confirmation--delete", function(){
		return confirm(i18n._delete);
	});
})(jQuery, window.WCB._i18n);
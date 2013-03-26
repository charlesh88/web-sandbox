/**
 * @depends jQuery.browser.mobile.js
 * @depends modernizr.touch.js
 * @depends vfn.js
 */

VFN.namespace("browser", (function(window, document, $) {
	var that = {};

	that.isMobile = function() {
		return $.browser.mobile;
	};

	that.isTouchEnabled = function() {
		return that.isMobile() && Modernizr.touch;
	};

	return that;

})(window, document, jQuery));
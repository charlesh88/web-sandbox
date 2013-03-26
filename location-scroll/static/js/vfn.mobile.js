/**
 * @depends vfn.js
 * @depends vfn.browser.js
 * @depends iscroll-lite.min.js
 */

VFN.namespace("mobile", (function(window, document, $) {

	var that = {},
		 	scrollers = [],
		 	defaultScrollingOptions = {
		 		bounce: true,
		 		hScroll: true,
		 		vScroll: true,
		 		hScrollbar: true,
		 		vScrollbar: true
		 	};

	that.initTouchScrolling = function(elementId, options) {
		if (!VFN.browser.isTouchEnabled()) return;
		
		if (isDocumentContentLoading()) {
			setTimeout(function() {
				that.initTouchScrolling(elementId, options);
			}, 50);
			return;
		}

		options = $.extend({}, defaultScrollingOptions, options);

		initScrollableContent(elementId, options);
		fixFormElements();
	};

	that.preventNormalDocumentScrolling = function() {
		document.addEventListener("touchmove", function (e) { e.preventDefault(); }, false);
	};

	that.scrollLocationBarOutOfViewOnIOS = function() {
		var initialized = false;
		
		function init() {
			if (initialized) return;
			initialized = true;
			$(window).bind("resize", function() {
			 // Removed 'orientationchange' from bind arguments, was forcing doScroll to be called twice. Bottomline: orientationchange IS a resize event.
				doScroll();
			});
		}
	
    var doScroll = function() {
      $(document.body).css("min-height", ($(window).height() + 100) + "px");
      window.scrollTo(0, 1);
  		//alert('scrollLocationBarOutOfViewOnIOS called');
    }
    
		init();
		doScroll();
	};

	function isDocumentContentLoading() {
		return document.readyState && document.readyState !== "complete";
	}

	function initScrollableContent(elementId, options) {
		if (scrollers[elementId]) {
			scrollers[elementId].destroy();
		}

		if (options.hScroll) {
			fixHorizontalScrolling(elementId);
		}
		
		var scroller = new iScroll(elementId, options);

		refreshIScrollAfterContentLoads(elementId, scroller);

		scrollers[elementId] = scroller;
	}

	function fixHorizontalScrolling(elementId) {
		var $firstChild = $("#" + elementId + ">*:first-child");
		if ($firstChild.length <= 0) return;

		$firstChild.css("min-width", $firstChild[0].scrollWidth + "px");
	}

	function refreshIScrollAfterContentLoads(elementId, scroller) {
		$("#" + elementId + " img").load(function() { scroller.refresh(); });
	}

	// to solve form field accessibility problem when using iScroll
	// http://stackoverflow.com/questions/5745374/
	function fixFormElements() {
		$(":input").each(function() {
			this.addEventListener("touchstart", function(e) { e.stopPropagation(); }, false);
		});
	}

	return that;

})(window, document, jQuery));
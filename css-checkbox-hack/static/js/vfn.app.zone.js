VFN.namespace2("app.zone", [ jQuery, Backbone ], function(MODULE, $, Backbone) {

  MODULE.FEEDS = {
    HOME_PAGE: 1,
    USER_INTEREST: 4,
    LOGIN: 1
  };

  MODULE.init = function(options) {
    $.extend(MODULE, options);

    MODULE.app.start();

    VFN.app.zone.analytics.init();
  };

  MODULE.showWaitSpinner = function() {
    $("#wait-spinner-root").addClass("show");
  };

  MODULE.hideWaitSpinner = function() {
    $("#wait-spinner-root").removeClass("show");
  };

  MODULE.isUserLoggedIn = function() {
    return MODULE.userId !== null;
  };


});

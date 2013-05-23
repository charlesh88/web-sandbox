VFN.namespace2("app.zone.mobileApp", [ window ], function(MODULE, window) {

  var ZONE = VFN.app.zone;

  ZONE.app.addInitializer(function() {
    ZONE.events.on("app:zone:login", onLogin);
    ZONE.events.on("app:zone:logout", onLogout);
  });

  var onLogin = function() {
    tryAppNavigate("#home");
  };

  var onLogout = function() {
    tryAppNavigate("#login");
  };

  var tryAppNavigate = function(fragment) {
    if (window === window.parent) return;
    try {
      window.parent.$.mobile.navigate(fragment);
    } catch (err) {  }
  };

});
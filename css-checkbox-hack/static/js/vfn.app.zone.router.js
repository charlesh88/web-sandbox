VFN.namespace2("app.zone.router", [ window, jQuery ], function(MODULE, window, $) {

  var ZONE = VFN.app.zone;

  ZONE.app.addInitializer(function() {
    MODULE.onRouteMainContent(setCurrentNavStack);
  });

  MODULE.onRouteMainContent = (function() {
    var bindWhenRoutersAvailable = function(handler) {
      if (ZONE.router.account && ZONE.router.cards && ZONE.router.root) {
        ZONE.router.account.on("route", handler);
        ZONE.router.cards.on("route", handler);
        ZONE.router.feeds.on("route", handler);
        ZONE.router.root.on("route", handler);
        return;
      }
      setTimeout(function() { bindWhenRoutersAvailable(handler); }, 100);
    };

    return function(handler) {
      bindWhenRoutersAvailable(handler);
    };
  }());

  MODULE.getCurrentRoute = function() {
    if (typeof Backbone.history.fragment !== "undefined") {
      return Backbone.history.fragment;
    }

    var prefix = "/app/zone", route = "", pathName = window.location.pathname, hash = window.location.hash;

    if (pathName.indexOf(prefix) === 0) {
      route = pathName.substr(prefix.length + 1);
    }
    if (route.length <= 0 && hash.length > 0) {
      route = hash;
      if (route.charAt(0) === "#") route = route.substr(1);
    }
    if (route.length <= 0) {
      route = "home";
    }
    return route;
  };

  MODULE.getCurrentPath = function() {
    var path = $.url().attr('path');
    var prefix = "/app/zone";

    if (path.indexOf(prefix) === 0) {
      path = path.substr(prefix.length + 1);
    }
    if (path.length <= 0) {
      path = "home";
    }
    return path;
  }

  MODULE.goToLogin = function(destination) {
    var loginRoute = destination || MODULE.getCurrentRoute();

    if (loginRoute.charAt(0) === "/") {
      loginRoute = loginRoute.substr(1);
    }

    if (loginRoute !== "login" && loginRoute.indexOf("login/") !== 0) {
      loginRoute = "login/" + loginRoute;
    }

    Backbone.history.navigate(loginRoute, { trigger: true });
  };

  var setCurrentNavStack = function() {
    var currentRoute = MODULE.getCurrentPath();
    VFN.app.zone.model.nav.set("currentStack", ZONE.model.nav.getStackFromIdentifierSpec(currentRoute.split("/")));
  };

});

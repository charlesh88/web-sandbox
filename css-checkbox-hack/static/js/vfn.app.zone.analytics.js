VFN.namespace2("app.zone.analytics", [], function(MODULE) {

  var ZONE = VFN.app.zone;

  MODULE.init = function() {
    initRouteTracking();
  };

  var initRouteTracking = function() {
    ZONE.router.account.on("route", function(routeName) {
      VFN.analytics.all.track("app:zone:navigate:account:" + routeName);
    });

    ZONE.router.cards.on("route", function(routeName, parts) {
      var eventName = "app:zone:navigate:cards:" + routeName;

      if (parts && parts.length > 0) {
        eventName += ":" + parts[0].replace(/\//g, ":");
      }

      VFN.analytics.all.track(eventName);
    });

    ZONE.router.feeds.on("route:feed", function(feedId) {
      VFN.analytics.all.track("app:zone:navigate:feed:" + feedId);
    });

    ZONE.router.root.on("route", function(routeName) {
      VFN.analytics.all.track("app:zone:navigate:" + routeName);
    });
  };

});
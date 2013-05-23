VFN.namespace2("app.zone.router", [ window, Marionette ], function(MODULE, window, Marionette) {

  var ZONE = VFN.app.zone;

  ZONE.app.addInitializer(function() {
    ZONE.router.feeds = new ZONE.router.FeedsRouter({
      controller: new ZONE.router.FeedsController()
    });
  });

  MODULE.FeedsRouter = Marionette.AppRouter.extend({
    appRoutes: {
      "feed(/:feedIdentifier)": "feed"
    }
  });

  MODULE.FeedsController = Marionette.Controller.extend({
    feed: function(feedIdentifier) {
      ZONE.showWaitSpinner();

      var feedId = getFeedId(feedIdentifier);
      var collection = new ZONE.collection.FeedCollection(null, { feedId: feedId });
      collection.fetch({
        complete: ZONE.hideWaitSpinner
      });

      var view = new ZONE.view.EntityCollectionView({ collection: collection });
      ZONE.app.mainContent.show(view);
      // TODO(Chad Phillips): Probably should have a getter/setter for this.
      ZONE.currentFeed = 'feed/' + feedIdentifier;
    }
  });

  var getFeedId = function(feedIdentifier) {
    if (typeof feedIdentifier === "undefined") feedIdentifier = "home";
    var navStack = ZONE.model.nav.getStackFromIdentifierSpec([ "feed", feedIdentifier ]);

    if (navStack.length <= 0) {
      return ZONE.FEEDS.HOME_PAGE;
    }

    return navStack.pop().get("navId");
  };

});

VFN.namespace2("app.zone.router", [ window, Marionette ], function(MODULE, window, Marionette) {

  var ZONE = VFN.app.zone;

  ZONE.app.addInitializer(function() {
    ZONE.router.root = new ZONE.router.ZoneRouter({
      controller: new ZONE.router.ZoneController()
    });
  });

  MODULE.ZoneRouter = Marionette.AppRouter.extend({
    appRoutes: {
      "": "home",
      "home": "home"
    }
  });

  MODULE.ZoneController = Marionette.Controller.extend({
    home: function() {
      ZONE.showWaitSpinner();

      var homeLayout = new ZONE.view.HomeLayout();
      ZONE.app.mainContent.show(homeLayout);

      showFeatureStory(homeLayout);
      showHomeFeed(homeLayout, function() {
        ZONE.hideWaitSpinner()
      });
    }
  });

  var showFeatureStory = function(homeLayout) {
    var collection = new VFN.app.widget.featureStory.collection.FeatureStoryCollection();
    collection.fetch({
      success: function() {
        var view = new VFN.app.widget.featureStory.view.FeatureStoryCollectionView({ collection: collection });
        homeLayout.featureStory.show(view);
      }
    });
  };

  var showHomeFeed = function(homeLayout, onComplete) {
    var collection = new ZONE.collection.FeedCollection(null, { feedId: ZONE.FEEDS.HOME_PAGE });
    collection.fetch({
      complete: onComplete,
      success: function() {
        var view = new ZONE.view.EntityCollectionView({ collection: collection });
        homeLayout.feed.show(view);
      }
    });
  };

});

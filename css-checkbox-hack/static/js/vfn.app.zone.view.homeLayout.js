VFN.namespace("app.zone.view", (function() {
  var that = {};

  that.HomeLayout = Marionette.Layout.extend({
    template: "#app-zone-home-template",
    regions: {
      featureStory: ".home-featured-story-region",
      feed: ".home-feed-region"
    }
  });

  return that;
}()));
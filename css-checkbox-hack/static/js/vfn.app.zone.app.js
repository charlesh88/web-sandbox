VFN.namespace2("app.zone", [ window, jQuery, _, Marionette ], function(MODULE, window, $, _, Marionette) {

  $.extend(_.templateSettings, {
    variable: "data"
  });

  MODULE.app = new Marionette.Application();

  MODULE.app.addRegions({
    mainMenu: "#main-menu-container",
    breadcrumbs: "#breadcrumbs-container",
    mainContent: "#main-content-container",
    overlay: "#overlay-content"
  });

  MODULE.app.on("initialize:after", function() {
    initQueryParams();
    addFeedLoadListener();
    Backbone.history.start({ pushState: true, root: "/app/zone/", silent: false });
  });

  var initQueryParams = function() {
    MODULE.urlQueryParams.entityId = parseInt($.url().param('entity_id'));
    MODULE.urlQueryParams.mode = $.url().param('mode');
    MODULE.urlQueryParams.type = $.url().param('type');
    MODULE.urlQueryParams.channels = $.url().param('channels');
    MODULE.urlQueryParams.message = $.url().param('message');
  };

  var addFeedLoadListener = function() {
    MODULE.events.on("app:zone:feed:load", function(collection) {
      checkForModeOnLoad(collection);
    });
  };

  // TODO(Chad Phillips): Ideally, the overlay would have an awareness of the
  // collection that's behind it, but for now this approach works.
  var checkForModeOnLoad = function(collection) {
    if (MODULE.urlQueryParams.entityId && MODULE.urlQueryParams.mode) {
      var model = collection.get(MODULE.urlQueryParams.entityId)
      if (model) {
        switch (MODULE.urlQueryParams.mode) {
          case 'display':
            MODULE.overlay.displayEntity(model);
            break;
          case 'share':
            MODULE.overlay.displayShareEntity(model);
            break;
          case 'auth':
            var channels = MODULE.urlQueryParams.channels.split(',');
            MODULE.share.authCallback(model, channels, MODULE.urlQueryParams.type, MODULE.urlQueryParams.message);
            break;
        }
      }
      // We only want this to happen on initial page load, so clean up the
      // markers here.
      delete MODULE.urlQueryParams.entityId;
      delete MODULE.urlQueryParams.mode;
      delete MODULE.urlQueryParams.type;
      delete MODULE.urlQueryParams.channels;
      delete MODULE.urlQueryParams.message;
    }
  };

});

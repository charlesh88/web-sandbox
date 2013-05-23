VFN.namespace2("app.zone.collection", [ _, Backbone ], function(MODULE, _, Backbone) {
  var ZONE = VFN.app.zone;

  MODULE.CardCollection = Backbone.Collection.extend({
    constructor: function() {
      var args = Array.prototype.slice.apply(arguments);
      Backbone.Collection.prototype.constructor.apply(this, args);
    },

    initialize: function(models, options) {
      this.collectionId = options.collectionId;
      this.classificationFilters = options.classificationFilters;
    },

    model: function(attrs, options) {
      return VFN.app.zone.entityFactory.createModel(attrs, options);
    },

    url: function() {
      var url = "/graph/application/id/" + VFN.app.zone.appId + "/collection/id/" + this.collectionId;

      _.each(this.classificationFilters, function(classificationId) {
        url += "/navigation/id/" + classificationId;
      }, this);

      return url + "/members?nocache=" + (new Date()).getTime();
    },

    parse: function(response) {
      this.cssClass = response.css_class;
      return response.data;
    }

  });

  MODULE.FeedCollection = Backbone.Collection.extend({
    initialize: function(models, options) {
      this.feedId = options.feedId;

      this.listenTo(this, "reset", this._onReset, this);
    },

    model: function(attrs, options) {
      return VFN.app.zone.entityFactory.createModel(attrs, options);
    },

    url: function() {
      var url = "/graph/feed/id/" + this.feedId;
      // TODO(Chad Phillips): This should probably support multiple hints eventually.
      if (ZONE.urlQueryParams.entityId) {
        url += "/with/id/" + ZONE.urlQueryParams.entityId;
      }
      return url;
    },

    parse: function(response) {
      this.cssClass = response.data.css_class;
      return response.data.application_entities;
    },

    _onReset: function() {
      ZONE.events.trigger("app:zone:feed:load", this);
    }
  });

});

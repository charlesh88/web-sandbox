VFN.namespace2("app.zone.view", [ jQuery, _, Backbone ], function(MODULE, $, _, Backbone) {

  MODULE.EntityCollectionView = Backbone.View.extend({
    initialize: function() {
      this._gridBoxViews = [];

      this.listenTo(this.collection, "add remove reset", this.render, this);

      this.listenTo(VFN.app.widget.athlete.events, "app:widget:athlete:fanPlus", function(data) {
        if (data.collectionId === this.collection.collectionId) {
          this.collection.fetch();
        }
      }, this);
    },

    render: function() {
      this._removeExistingSubViews();
      this.$el.addClass("app-zone-grid");

      if (this.collection.cssClass) {
        $("body").addClass(this.collection.cssClass);
      }

      var entities = this.collection.first(2000);
      var gridBox, gridBoxOptions = this._getGridBoxOptions();

      while (entities.length > 0) {
        gridBox = fillNewGridBox(entities, gridBoxOptions);
        gridBox.render();
        this.$el.append(gridBox.$el);

        this._gridBoxViews.push(gridBox);
      }

      return this;
    },

    close: function() {
      if (this.collection.cssClass) {
        $("body").removeClass(this.collection.cssClass);
      }

      this._removeExistingSubViews();

      this.remove();
    },

    _removeExistingSubViews: function() {
      _.each(this._gridBoxViews, function(view) {
        view.close();
        view.remove();
      }, this);
      this.$el.empty();
    },

    _getGridBoxOptions: function() {
      var maxWidth = 2, maxHeight = 1;
      this.collection.each(function(entity) {
        if (entity.getUnitWidth() > maxWidth) maxWidth = entity.getUnitWidth();
        if (entity.getUnitHeight() > maxHeight) maxHeight = entity.getUnitHeight();
      });
      return { maxWidth: maxWidth, maxHeight: maxHeight };
    }
  });

  var fillNewGridBox = function(remainingEntities, gridBoxOptions) {
    var gridBox = new VFN.app.zone.view.entity.GridBox(gridBoxOptions);
    var entityAdded;

    while (remainingEntities.length > 0) {
      entityAdded = false;

      for (var i = 0; i < remainingEntities.length; i++) {
        if (gridBox.willEntityFit(remainingEntities[i])) {
          gridBox.add(remainingEntities[i]);
          remainingEntities.splice(i, 1);
          entityAdded = true;
          break;
        }
      }

      if (!entityAdded) break;
    }

    return gridBox;
  };


  MODULE.CardEntityView = Marionette.ItemView.extend({
    tagName: "div",
    className: "app-widget app-widget-card",
    template: function() { return ""; },

    onRender: function() {
      this.$el.css("background-image", "url(http://demo.platform.v-fan.com/static-entities/" + this.model.get("short_code") + ".jpg)");
    }
  });

});

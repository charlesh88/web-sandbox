VFN.namespace("app.zone.view.entity", (function($, _, Backbone) {

  var that = {};

  that.GridBox = Backbone.View.extend({
    tag: "div",
    className: "gridbox",

    _children: null,
    _views: null,
    _maxWidth: 2,
    _maxHeight: 2,

    initialize: function(options) {
      this._children = [];
      this._views = [];
      if (options && options.maxWidth) this._maxWidth = options.maxWidth;
      if (options && options.maxHeight) this._maxHeight = options.maxHeight;
    },

    add: function(entity) {
      if (!this.willEntityFit(entity)) throw "Entity will not fit in this gridbox!";
      this._children.push(entity);
    },

    willEntityFit: function(entity) {
      var entityWidth = entity.getUnitWidth();
      var entityHeight = entity.getUnitHeight();

      return entityWidth <= this._maxWidth
          && entityHeight <= this._maxHeight
          && (this._getAvailableArea() - this._getEntityArea(entity)) >= 0
          && entityHeight <= this._getAvailableVertical()
          && entityWidth <= this._getAvailableHorizontal();
    },

    render: function() {
      this._closeExistingViews();
      this._setFormFactorCssClass();
      this._renderEntities();
    },

    close: function() {
      this._closeExistingViews();
    },

    _closeExistingViews: function() {
      var view;
      while (this._views.length > 0) {
        view = this._views.pop();
        if (typeof view.close === "function") {
          view.close();
        }
        view.remove();
      }
      this.$el.empty();
    },

    _setFormFactorCssClass: function() {
      if (this._getTallestEntityHeight() <= 1 && this._getOccupiedArea() <= 2) {
        this.$el.addClass("grid-2x1");
      } else {
        this.$el.addClass("grid-2x2");
      }
    },

    _renderEntities: function() {
      var layoutBuilder = new VFN.app.zone.view.entity.GridBoxLayoutBuilder(this._maxWidth, this._maxHeight, this._children);
      var layout = layoutBuilder.getLayout();
      var view;

      for (var i = 0; i < layout.length; i++) {
        view = this._createEntityView(layout[i].entity);
        this._wrapViewElementAndAddToGridBox(view, this._getPositionCssClass(layout[i].position));
        this._views.push(view);
      }
    },

    _getPositionCssClass: function(position) {
      var minX = 0, maxX = this._maxWidth - 1;
      var minY = 0, maxY = this._maxHeight - 1;
      if (position.x === minX && position.y === minY) return "north-east";
      if (position.x === maxX && position.y === minY) return "north-west";
      if (position.x === minX && position.y === maxY) return "south-east";
      if (position.x === maxX && position.y === maxY) return "south-west";
      return null;
    },

    _getTallestEntityHeight: function() {
      return _.reduce(this._children, function(memo, entity) {
        return Math.max(memo, entity.getUnitHeight());
      }, 0);
    },

    _createEntityView: function(entity) {
      var entityView = VFN.app.zone.entityFactory.createView(entity);
      entityView.render();

      return entityView;
    },

    _wrapViewElementAndAddToGridBox: function(entityView, postionCssClass) {
      var $inner = $("<div></div>").addClass("inner").append(entityView.$el);
      var $outer = $("<div></div>").addClass("item").addClass(this._getEntityCssClass(entityView.model)).append($inner);
      if (postionCssClass) $outer.addClass(postionCssClass);
      this.$el.append($outer);
    },

    _getEntityCssClass: function(entity) {
      var cssClass = "grid-item-";
      cssClass += entity.getUnitWidth().toString().replace(".", "_");
      cssClass += "x";
      cssClass += entity.getUnitHeight().toString().replace(".", "_");

      return cssClass;
    },

    _getAvailableArea: function() {
      return (this._maxHeight * this._maxWidth) - this._getOccupiedArea();
    },

    _getOccupiedArea: function() {
      return _.reduce(this._children, function(memo, entity) {
        return memo + this._getEntityArea(entity);
      }, 0, this);
    },

    _getEntityArea: function(entity) {
      return entity.getUnitWidth() * entity.getUnitHeight();
    },

    _getAvailableHorizontal: function() {
      // TODO: This logic is horribly inflexible, replace
      var availableArea = this._getAvailableArea();

      if (availableArea === 0) return 0;
      if (availableArea === 1) return 1;
      if (availableArea === 3 || availableArea === 4) return 2;

      for (var i = 0; i < this._children.length; i++) {
        height = this._children[i].getUnitHeight();

        if (height === 2) return 1;
      }

      return 2;
    },

    _getAvailableVertical: function() {
      // TODO: This logic is horribly inflexible, replace
      var availableArea = this._getAvailableArea();

      if (availableArea === 0) return 0;
      if (availableArea === 1) return 1;
      if (availableArea === 3 || availableArea === 4) return 2;

      for (var i = 0; i < this._children.length; i++) {
        width = this._children[i].getUnitWidth();

        if (width === 2) return 1;
      }

      return 2;
    }
  });

  return that;

}(jQuery, _, Backbone)));

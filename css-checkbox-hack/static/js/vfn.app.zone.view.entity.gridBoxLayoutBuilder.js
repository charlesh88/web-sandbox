VFN.namespace("app.zone.view.entity", (function($, _) {

  var that = {}, UNFILLED = false, FILLED = true;

  that.GridBoxLayoutBuilder = function(maxWidth, maxHeight, entities) {
    this._maxWidth = maxWidth;
    this._maxHeight = maxHeight;
    this._entities = entities;
    this._layoutMatrix = this._createLayoutMatrix();
    this._layout = [];
  }

  $.extend(that.GridBoxLayoutBuilder.prototype, {
    getLayout: function() {
      this._addFirstEntityToLayout();
      this._addRemainingEntitesToLayout();

      return this._layout;
    },

    _createLayoutMatrix: function() {
      var layoutMatrix = [];

      for (var y = 0; y < this._maxHeight; y++) {
        layoutMatrix.push([]);
        for (var x = 0; x < this._maxWidth; x++) {
          layoutMatrix[y].push(UNFILLED);
        }
      }

      return layoutMatrix;
    },

    _addFirstEntityToLayout: function() {
      this._addEntityToLayout(this._entities[0], { x: 0, y: 0 });
    },

    _addRemainingEntitesToLayout: function() {
      var remainingEntities = _.rest(this._entities, 1),
          entity, entityPosition;

      while (remainingEntities.length > 0) {
        entity = this._getEntityWithLeastAvailablePositions(remainingEntities);
        entityPosition = this._getFirstAvailablePosition(entity);
        this._addEntityToLayout(entity, entityPosition);

        remainingEntities = _.without(remainingEntities, entity);
      }
    },

    _getEntityWithLeastAvailablePositions: function(entities) {
      var sorted = _.sortBy(entities, function(entity) {
        var possiblePositions = this._getAvailablePositions(entity);
        return possiblePositions.length;
      }, this);

      return sorted[0];
    },

    _addEntityToLayout: function(entity, position) {
      this._layout.push({
        entity: entity,
        position: position
      });
      this._markPositionFilled(entity, position.x, position.y);
    },

    _getAvailablePositions: function(entity) {
      var possiblePositions = [];
      var entityWidth = entity.getUnitWidth(), entityHeight = entity.getUnitHeight();

      for (var y = 0; y < this._maxHeight - entityHeight + 1; y++) {
        for (var x = 0; x < this._maxWidth - entityWidth + 1; x++) {
          if (this._willEntityFitAtPosition(entity, x, y)) {
            possiblePositions.push({ x: x, y: y });
          }
        }
      }

      return possiblePositions;
    },

    _getFirstAvailablePosition: function(entity) {
      var entityWidth = entity.getUnitWidth(), entityHeight = entity.getUnitHeight();

      for (var y = 0; y < this._maxHeight - entityHeight + 1; y++) {
        for (var x = 0; x < this._maxWidth - entityWidth + 1; x++) {
          if (this._willEntityFitAtPosition(entity, x, y)) {
            return { x: x, y: y };
          }
        }
      }
    },

    _willEntityFitAtPosition: function(entity, x, y) {
      var entityWidth = entity.getUnitWidth(), entityHeight = entity.getUnitHeight();

      if (x + entityWidth - 1 > this._maxWidth || y + entityHeight - 1 > this._maxHeight) return false;

      for (var y1 = y; y1 < y + entityHeight; y1++) {
        for (var x1 = x; x1 < x + entityWidth; x1++) {
          if (this._layoutMatrix[y1][x1] === FILLED) return false;
        }
      }
      return true;
    },

    _markPositionFilled: function(entity, x, y) {
      for (var x1 = x; x1 < x + entity.getUnitWidth(); x1++) {
        for (var y1 = y; y1 < y + entity.getUnitHeight(); y1++) {
          this._layoutMatrix[y1][x1] = FILLED;
        }
      }
    }
  });

  return that;

}(jQuery, _)));

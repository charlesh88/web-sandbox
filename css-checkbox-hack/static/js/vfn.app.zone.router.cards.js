VFN.namespace2("app.zone.router", [ _, Marionette ], function(MODULE, _, Marionette) {

  var ZONE = VFN.app.zone;

  ZONE.app.addInitializer(function() {
    ZONE.router.cards = new ZONE.router.CardsRouter({
      controller: new ZONE.router.CardsController()
    });
  });

  MODULE.CardsRouter = Marionette.AppRouter.extend({
    appRoutes: {
      "cards-me(/*classifications)": "cardsUser",
      "cards-all(/*classifications)": "cardsAll"
    }
  });

  MODULE.CardsController = Marionette.Controller.extend({
    cardsUser: function(path) {
      this._showCards(ZONE.userDefaultCollectionId, "cards-me/" + path);
    },

    cardsAll: function(path) {
      this._showCards(ZONE.defaultCollectionId, "cards-all/" + path);
    },

    _showCards: function(cardCollectionId, path) {
      ZONE.showWaitSpinner();

      var classificationIds = convertPathToClassificationIdArray(path);

      var collection = new ZONE.collection.CardCollection(null, {
        collectionId: cardCollectionId,
        classificationFilters: classificationIds
      });
      collection.fetch({
        complete: ZONE.hideWaitSpinner
      });
      
      var view = new ZONE.view.EntityCollectionView({ collection: collection });
      ZONE.app.mainContent.show(view);
    }
  });

  var convertPathToClassificationIdArray = function(path) {
    var pathParts = path ? path.split("/") : [];
    var navStack = ZONE.model.nav.getStackFromIdentifierSpec(pathParts);
    var classificationIds = filterForClassificationIds(navStack);

    return classificationIds;
  };

  var filterForClassificationIds = function(navStack) {
    var navIds = _.map(navStack, function(item) { return item.get("navId"); });
    var classificationIds = _.filter(navIds, function(id) { return /^[0-9]+$/.test(id); });

    return classificationIds;
  };

});

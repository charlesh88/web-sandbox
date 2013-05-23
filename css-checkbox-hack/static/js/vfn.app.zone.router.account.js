VFN.namespace2("app.zone.router", [ window, Backbone, Marionette ], function(MODULE, window, Backbone, Marionette) {

  var ZONE = VFN.app.zone;

  ZONE.app.addInitializer(function() {
    MODULE.account = new MODULE.AccountRouter({
      controller: new MODULE.AccountController()
    });
  });

  MODULE.AccountRouter = Marionette.AppRouter.extend({
    appRoutes: {
      "loginToSeeMore": "loginToSeeMore",
      "login(*returnPath)": "login",
      "logout": "logout",
      "account/register/complete/:userId/:timestamp/:hashKey": "completeRegistration",
      "account/password-reset/:userId/:timestamp/:hashKey": "passwordReset",
      "account/edit": "accountEdit",
      "account/interests": "accountInterests"
    }
  });

  MODULE.AccountController = Marionette.Controller.extend({
    login: function(returnPath) {
      if (ZONE.isUserLoggedIn()) {
        ZONE.events.trigger("app:zone:login");
        var queryString = window.location.search || "";
        returnPath = returnPath || "";
        Backbone.history.navigate(returnPath + queryString, { trigger: true });
        return;
      }

      showBackdropCollection();

      var view = new ZONE.view.LoginView();
      ZONE.app.overlay.show(view);

      ZONE.overlay.show("overlay-login", true);
    },

    loginToSeeMore: function() {
      if (ZONE.isUserLoggedIn()) {
        ZONE.events.trigger("app:zone:login");
        var queryString = window.location.search || "";
        Backbone.history.navigate("/" + queryString, { trigger: true });
        return;
      }

      var model = new ZONE.model.LoginModel({
        info: "To see more exclusive athlete content please sign in or pre-register for Sqor - social sports built by athlete and fans for athletes and fans."
      });
      var view = new ZONE.view.LoginView({ model: model });
      ZONE.app.overlay.show(view);

      ZONE.overlay.show("overlay-login", true);
    },

    logout: function() {
      ZONE.events.trigger("app:zone:logout");
      window.location = "/app/zone/logout";
    },

    completeRegistration: function(userId, timestamp, hashKey) {
      showBackdropCollection();

      var model = new Backbone.Model({
        userId: userId,
        timestamp: timestamp,
        hashKey: hashKey
      });
      var view = new ZONE.view.CompleteRegistrationView({ model: model });
      ZONE.app.overlay.show(view);

      ZONE.overlay.show("overlay-complete-registration", true);
    },

    passwordReset: function(userId, timestamp, hashKey) {
      showBackdropCollection();

      var model = new Backbone.Model({
        userId: userId,
        timestamp: timestamp,
        hashKey: hashKey
      });
      var view = new ZONE.view.PasswordResetView({ model: model });
      ZONE.app.overlay.show(view);

      ZONE.overlay.show("overlay-password-reset", true);
    },

    accountEdit: function() {
      var view = new ZONE.view.AccountEditView();
      ZONE.app.mainContent.show(view);
    },

    accountInterests: function() {
      var collection = new ZONE.collection.FeedCollection(null, { feedId: ZONE.FEEDS.USER_INTEREST });
      collection.fetch();
      var view = new ZONE.view.EntityCollectionView({ collection: collection });
      ZONE.app.mainContent.show(view);
    }
  });

  var showBackdropCollection = function() {
    var backdropCollection = new ZONE.collection.FeedCollection(null, { feedId: ZONE.FEEDS.LOGIN });
    backdropCollection.fetch();
    var backdropView = new ZONE.view.EntityCollectionView({ collection: backdropCollection });
    ZONE.app.mainContent.show(backdropView);
  };

});

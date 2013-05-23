VFN.namespace2("app.zone.view.share", [ Marionette ], function(MODULE, Marionette) {

  var ZONE = VFN.app.zone;

  MODULE.AuthFacebookView = Marionette.ItemView.extend({
    tagName: "div",
    className: "app-common app-zone-share",
    template: "#app-zone-login-facebook-template",

    events: {
      "click .cancel": "_cancel",
    },

    serializeData: function() {
      return {
        "entityId": this.model.id,
        "currentFeed": ZONE.currentFeed,
        "channels": encodeURIComponent(this.options.channels.join(',')),
        "message": encodeURIComponent(this.options.message),
      }
    },

    _cancel: function(e) {
      e.preventDefault();
      ZONE.share.dismissAuthFacebook(this.model);
      return false;
    },
  });

  MODULE.AuthTwitterView = Marionette.ItemView.extend({
    tagName: "div",
    className: "app-common app-zone-share",
    template: "#app-zone-login-twitter-template",

    events: {
      "click .cancel": "_cancel",
    },

    serializeData: function() {
      return {
        "entityId": this.model.id,
        "currentFeed": ZONE.currentFeed,
        "channels": encodeURIComponent(this.options.channels.join(',')),
        "message": encodeURIComponent(this.options.message),
      }
    },

    _cancel: function(e) {
      e.preventDefault();
      ZONE.share.dismissAuthTwitter(this.model);
      return false;
    },
  });

});


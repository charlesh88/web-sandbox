VFN.namespace("app.zone.view", (function(Marionette) {

  var that = {};

  that.PasswordResetView = Marionette.ItemView.extend({
    tagName: "div",
    className: "app-zone-password-reset",
    template: "#app-zone-password-reset-template"
  });

  return that;

}(Marionette)));

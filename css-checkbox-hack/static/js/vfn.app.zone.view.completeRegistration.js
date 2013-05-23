VFN.namespace2("app.zone.view", [ Marionette ], function(MODULE, Marionette) {

  MODULE.CompleteRegistrationView = Marionette.ItemView.extend({
    tagName: "div",
    className: "app-zone-complete-registration",
    template: "#app-zone-complete-registration-template"
  });

});

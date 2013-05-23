VFN.namespace2("app.zone.view", [ Marionette ], function(MODULE, Marionette) {

  MODULE.LoginView = Marionette.ItemView.extend({
    tagName: "div",
    className: "app-zone-login",
    template: "#app-zone-login-template",

    serializeData: function() {
      var queryStringParts = [];

      if (this.model) {
        var messageKeys = [ "info", "warn", "error" ];
        for (var i = 0; i < messageKeys.length; i++) {
          var value = this.model.get(messageKeys[i])
          if (value && value.length > 0) {
            queryStringParts.push(messageKeys[i] + "=" + encodeURIComponent(value));
          }
        }
      }

      return {
        queryString: queryStringParts.join("&amp;")
      };
    }
  });

});

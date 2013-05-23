VFN.namespace("app.zone.view", (function(Marionette) {

  var that = {};
  var ZONE = VFN.app.zone;

  that.AccountEditView = Marionette.ItemView.extend({
    tagName: "div",
    className: "account-edit-container",
    template: function() {
      return '<iframe frameborder="0" src="/app/account/user/' + ZONE.userId + '/account-info/edit"></iframe>';
    }
  });

  return that;

}(Marionette)));

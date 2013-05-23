VFN.namespace2("app.zone.model", [], function(MODULE) {

  ZONE = VFN.app.zone;

  MODULE.Share = Backbone.Model.extend({
    url: function() {
      return '/graph/entity/id/' + this.get('entity_id') + '/share';
    },
  });

  MODULE.ShareChannel = Backbone.Model.extend({
    url: function() {
      return '/graph/user/id/' + ZONE.userId + '/share-channel';
    },
  });

});

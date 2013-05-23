VFN.namespace2("app.zone.model", [], function(MODULE) {

  MODULE.EntityEdit = VFN.model.Entity.extend({
    url: function() {
      return '/graph/entity/id/' + this.id;
    },
  });

});

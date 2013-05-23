VFN.namespace2("app.zone.template", [ _ ], function(MODULE, _) {

  var templateMap = {
    navRootItem: "#nav-root-item",
    navSubItem: "#nav-sub-item"
  };

  /**
   * Load and compile all client-side underscore templates.
   *
   * Places a reference to the compiled template in
   * VFN.app.zone.template
   */
  MODULE.init = function() {
    // Convert underscore template variable interpolation to [[ foo ]], in the 'data' namespace.
    _.templateSettings = {
      interpolate: /\[\[(.+?)\]\]/g,
      variable: "data"
    };

    _.each(templateMap, loadTemplate);
  };

  var loadTemplate = function(idAttr, name) {
    var template = _.template($(idAttr).html());
    VFN.app.zone.template[name] = template;
  };

});
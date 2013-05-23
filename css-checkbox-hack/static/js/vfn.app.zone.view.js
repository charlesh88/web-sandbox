VFN.namespace("app.zone.view", (function($) {

  var ZONE = VFN.app.zone;

  VFN.app.zone.app.addInitializer(function() {
    showMainMenu();
    showBreadcrumbs();
    //showParentMenuLink();
  });

  var showMainMenu = function() {
    ZONE.model.nav = new ZONE.model.Navigation({
      navigationData: ZONE.nav
    });

    var mainMenuView = new ZONE.view.NavigationView({
      model: ZONE.model.nav
    });
    ZONE.app.mainMenu.show(mainMenuView);

    VFN.app.widget.athlete.events.on("app:widget:athlete:fanPlus", function() {
      ZONE.model.nav.update();
    });
  };

  var showBreadcrumbs = function() {
    var breadcrumbsView = new ZONE.view.NavBreadcrumbsView({
      model: ZONE.model.nav
    });
    ZONE.app.breadcrumbs.show(breadcrumbsView);
  };

  var showParentMenuLink = function() {
    (new ZONE.view.NavParentMenuView({
      model: ZONE.model.nav
    })).render();
  };

}(jQuery)));

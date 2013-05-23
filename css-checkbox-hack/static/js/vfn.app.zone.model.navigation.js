VFN.namespace2("app.zone.model", [ jQuery, _, Backbone ], function(MODULE, $, _, Backbone) {

  MODULE.NavCollection = Backbone.Collection.extend({
    constructor: function() {
      var args = Array.prototype.slice.apply(arguments);
      Backbone.Collection.prototype.constructor.apply(this, args);
    },

    findByIdentifier: function(identifier) {
      return this.find(function(navItem) { return navItem.get("identifier") === identifier; });
    }
  })

  MODULE.Navigation = Backbone.Model.extend({
    constructor: function() {
      var args = Array.prototype.slice.apply(arguments);
      Backbone.Model.prototype.constructor.apply(this, args);
    },

    defaults: {
      children: null,
      currentStack: []
    },
    
    initialize: function(options) {
      this.on("change:currentStack", this._onCurrentStackChange, this);

      options.navigationData && this.set("children", this._buildModels(options.navigationData));
    },

    getStackFromIdentifierSpec: function(spec) {
      var stack = [];
      var currentCollection = this.get("children");

      for (var i = 0; i < spec.length; i++) {
        var item = currentCollection.find(function(item) { return item.get("identifier").toString() === spec[i].toString(); });
        if (typeof item === "undefined") return [];

        stack.push(item);
        currentCollection = item.get("children");
      }

      return stack;
    },

    setStackByIdentifierSpec: function(spec) {
      var newStack = this.getStackFromIdentifierSpec(spec);
      this.set("currentStack", newStack);
    },

    update: function() {
      var that = this;

      $.get("/app/zone/navigation?nocache=" + (new Date()).getTime(), function(data) {
        var currentIdSpec = _.map(that.get("currentStack"), function(item) { return item.get("identifier"); });
        that.set("children", that._buildModels(data));
        that.set("currentStack", that.getStackFromIdentifierSpec(currentIdSpec));
      });
    },

    _onCurrentStackChange: function() {
      this._deactivateAll(this.get("children"));
      this._activateStack(this.get("currentStack"));
    },

    _deactivateAll: function(collection) {
      collection.each(function(item) {
        if (item.get("active")) item.set("active", false);
        if (item.get("childActive")) item.set("childActive", false);
        this._deactivateAll(item.get("children"));
      }, this);
    },

    _activateStack: function(stack) {
      if (stack.length <= 0) return;

      for (var i = 0; i < stack.length - 1; i++) {
        stack[i].set("childActive", true);
      }
      stack[stack.length - 1].set("active", true);
    },

    _buildModels: function(navDataList, parent) {
      var navItemCollection = new MODULE.NavCollection();

      for (var i = 0; i < navDataList.length; i++) {
        var navItem = new MODULE.NavItem({
          navId: navDataList[i].nav_id,
          parent: parent || null,
          label: navDataList[i].label,
          identifier: navDataList[i].nav_name,
          collection: navItemCollection,
          hidden: !!navDataList[i].hidden
        });

        navItem.set("children", this._buildModels(navDataList[i].children, navItem));

        addAllNavItemIfAppropriate(navItem);

        navItemCollection.add(navItem);
      }

      return navItemCollection;
    }
  });


  MODULE.NavItem = Backbone.Model.extend({
    defaults: {
      id: null,
      parent: null,
      label: null,
      identifier: null,
      children: null,
      active: false,
      childActive: false,
      hidden: false
    },

    getCssClass: function() {
      return "navicon-" + this.get("identifier");
    },

    getUrlFragment: function() {
      var navStack = this.getNavStack();
      var url = "", identifier;

      while (navStack.length > 0) {
        identifier = navStack.shift().get("identifier");
        if (identifier) url += "/" + identifier;
      }

      return url;
    },

    getNavStack: function() {
      var stack = [ this ];
      var current = this;

      while (current.get("parent")) {
        stack.unshift(current.get("parent"));
        current = current.get("parent");
      }

      return stack;
    }
  });

  var addAllNavItemIfAppropriate = function(navItem) {
    if (shouldAddAllSportsChild(navItem)) {
      addAllSportsChild(navItem);
    }

    if (shouldAddAllTeamsChild(navItem)) {
      addAllTeamsChild(navItem);
    }
  };

  var shouldAddAllSportsChild = function(navItem) {
    var children = navItem.get("children");
    return _.contains([ "cards-all", "cards-me" ], navItem.get("navId"))
        && children.length > 0;
  };

  var addAllSportsChild = function(navItem) {
    var allNavItem = new MODULE.NavItem({
      navId: navItem.get("navId") + "-all-sports",
      parent: navItem,
      label: "All Sports",
      identifier: "all-sports",
      children: new Backbone.Collection()
    });
    
    navItem.get("children").unshift(allNavItem);
  };

  var shouldAddAllTeamsChild = function(navItem) {
    var parent = navItem.get("parent");
    var children = navItem.get("children");
    return parent
        && _.contains([ "cards-all", "cards-me" ], parent.get("navId"))
        && children.length > 1;
  };

  var addAllTeamsChild = function(navItem) {
    var allNavItem = new MODULE.NavItem({
      navId: navItem.get("navId") + "-all-teams",
      parent: navItem,
      label: "All Teams",
      identifier: "all-teams",
      children: new Backbone.Collection()
    });
    
    navItem.get("children").unshift(allNavItem);
  };

});

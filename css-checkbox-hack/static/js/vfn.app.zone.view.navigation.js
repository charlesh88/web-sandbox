VFN.namespace("app.zone.view", (function($, _, Backbone, Marionette) {

  var that = {};

  that.NavItemView = Marionette.CompositeView.extend({
    template: "#app-zone-nav-item-template",
    tagName: "li",
    className: "nav-item",

    initialize: function() {
      this.collection = this.model.get("children");
      this.listenTo(this.model, "change:active change:childActive", this._onActiveChange, this);
      this._childDomCreated = false;
    },

    ui: {
      link: "a"
    },

    events: {
      "click a": "_onClick"
    },

    onRender: function() {
      this.$el.attr("id", "nav-item-" + this.model.get("navId"));
      this._onActiveChange();
    },

    appendHtml: function(collectionView, itemView, index) {
      if (!this._childDomCreated) {
        this._childDomCreated = true;
        this.ui.link.append('<span class="submenu-arrow"></span>');
        this.$el.addClass('has-children');

        this.$ul = $("<ul></ul>").attr("id", "nav-item-" + this.model.get("navId") + "-children");
        this.$el.append(this.$ul);
      }

      this.$ul.append(itemView.el);
    },

    serializeData: function() {
      return {
        urlFragment: this.model.getUrlFragment(),
        label: this.model.get("label")
      };
    },

    _onActiveChange: function() {
      if (this._shouldHaveActiveCssClass()) {
        this.$el.addClass("active");
      }
      else this.$el.removeClass("active");
    },

    _shouldHaveActiveCssClass: function() {
      return this.model.get("active") || this.model.get("childActive");
    },

    _onClick: function(e) {
      e.preventDefault();

      if (this.model.get("children").length > 0) {
        VFN.app.zone.navigation.handleNavClick(e.target);
      } else {
        VFN.app.zone.navigation.handleNavClickLeaf(e.target);
        Backbone.history.navigate(this.model.getUrlFragment(), {trigger: true});
      }

      return false;
    },
  });

  that.NavigationView = Marionette.CompositeView.extend({
    itemView: that.NavItemView,
    tagName: "ul",
    className: "nav-menu",
    template: function() { return ''; },

    initialize: function() {
      this.collection = this.model.get("children");
      this.listenTo(this.model, "change:children", this._onChildrenChange, this);
    },

    onRender: function() {
      this.$el.attr("id", "main-menu");
      $(document).ready(function() { VFN.app.zone.navigation.init({}); });
    },

    _onChildrenChange: function() {
      this.collection = this.model.get("children");
      this.renderCollection();
    }
  });


  that.NavBreadcrumbsView = Backbone.View.extend({
    tagName: "ul",
    className: "nav-breadcrumbs",

    initialize: function() {
      this.listenTo(this.model, "change:currentStack", this.render, this);
    },

    render: function() {
      var stack = this.model.get("currentStack");
      this.$el.empty();

      _.each(stack, function(item) {
        var $link = $('<a></a>').attr("href", "/app/zone" + item.getUrlFragment()).text(item.get("label"));
        $link.append('<span class="submenu-arrow"></span>');
        var $listItem = $('<li></li>').append($link);
        this.$el.append($listItem);

        $link.click(function(e) {
          e.preventDefault();

          Backbone.history.navigate(item.getUrlFragment(), {trigger: true});

          return false;
        })
      }, this);
    }
  });


  that.NavParentMenuView = Backbone.View.extend({
    el: "a#nav-current-parent-menu",

    initialize: function() {
      this.listenTo(this.model, "change:currentStack", this.render, this);
      this.parentNavId = null;
    },

    events: {
      "click": "_onClick"
    },

    render: function() {
      this.$el.empty();
      this.parentNavId = null;

      var stack = this.model.get("currentStack");
      if (stack.length <= 1) return;

      var parent = stack[stack.length - 2];
      this.$el.text(parent.get("label"));
      this.parentNavId = parent.get("navId");
    },

    _onClick: function(e) {
      e.preventDefault();
      if (this.parentNavId !== null) {
        VFN.app.zone.navigation.showMenu("#nav-item-" + this.parentNavId);
      }
      return false;
    }
  });

  return that;

}(jQuery, _, Backbone, Marionette)));

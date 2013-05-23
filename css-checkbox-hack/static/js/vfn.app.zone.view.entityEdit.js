VFN.namespace2("app.zone.view", [ Marionette ], function(MODULE, Marionette) {

  MODULE.EntityEditView = Marionette.ItemView.extend({
    tagName: "div",

    // Provided by subclasses.
    className: "",
    // Provided by subclasses.
    template: "",

    events: {
      "click .delete": "_delete",
      "click .save": "_save",
      "click .cancel": "_cancel",
      "click .confirm-delete": "_confirm_delete",
      "click .confirm-cancel": "_confirm_cancel",
      "click .delete-success-ok": "_delete_success_ok",
      "click .delete-error-ok": "_delete_error_ok",
      "click .save-success-ok": "_save_success_ok",
      "click .save-error-ok": "_save_error_ok",
    },

    onRender: function() {
      this._hideUserMessages();
      this._injectEntityMarkers();
      this._setDefaultValues();
    },

    _injectEntityMarkers: function() {
      var type = this._getEntityType()
      this.$el.find('.entity-type-marker').each(function(index) {
        $(this).html(type);
      });
    },

    _setDefaultValues: function() {
      // TODO(Chad Phillips): These hard-coded values should be obtained from
      // the server.
      var visibility = 'VISIBILITY_PUBLIC';
      if (this.model.get('visibility') == 2) {
        visibility = 'VISIBILITY_PRIVATE';
      }
      this.$el.find('#select-visibility').val(visibility);
      this.$el.find('#textarea-caption').val(this.model.get('caption'));
    },

    _hideUserMessages: function() {
      this.$el.find('.user-message').each(function(index) {
         $(this).hide()
      });
    },

    _showUserMessage: function(cls) {
      this.$el.find('.' + cls + '-container:first').show();
    },

    _delete: function(e) {
      e.preventDefault();
      this._showUserMessage('delete-confirm');
      return false;
    },

    _save: function(e) {
      e.preventDefault();

      var caption = this.$el.find('#textarea-caption').val();
      var visibility = this.$el.find('#select-visibility').val();

      var attrs = {
        id: this.model.id,
        entity: {
          visibility: visibility,
        },
        meta_data: {
        },
      }

      // TODO(Chad Phillips): This is a hack until the terms between entity
      // metadata can be standardized.
      var dot_type = this.model.get('dot_type');
      switch(dot_type) {
        case 'com.vfn.entity.photo':
        case 'com.vfn.entity.photo.captioned':
          attrs.meta_data.summary = caption;
          break;
        case 'com.vfn.entity.video':
        case 'com.vfn.entity.video.captioned':
          attrs.meta_data.description = caption;
          break;
      }
      var entityEditModel = new ZONE.model.EntityEdit(attrs);
      entityEditModel.save({},
        {
          success: jQuery.proxy(this._saveSuccess, this),
          error: jQuery.proxy(this._saveError, this),
        }
      );

      return false;
    },

    _saveSuccess: function(model, response, options) {
      this._showUserMessage('save-success');
    },

    _saveError: function(model, xhr, options) {
      this._showUserMessage('save-error');
    },

    _cancel: function(e) {
      return this._backToOverlay(e);
    },

    _confirm_delete: function(e) {
      e.preventDefault();
      this._hideUserMessages();

      var attrs = {
        id: this.model.id,
        entity: {
          // TODO(Chad Phillips): This hard-coded value should be
          // obtained from the server.
          status: 'STATUS_DELETED',
        },
      }

      var entityEditModel = new ZONE.model.EntityEdit(attrs);
      entityEditModel.save({},
        {
          success: jQuery.proxy(this._deleteSuccess, this),
          error: jQuery.proxy(this._deleteError, this),
        }
      );
    },

    _deleteSuccess: function(model, response, options) {
      this._showUserMessage('delete-success');
    },

    _deleteError: function(model, xhr, options) {
      this._showUserMessage('delete-error');
    },

    _confirm_cancel: function(e) {
      e.preventDefault();

      this._hideUserMessages();

      return false;
    },

    _delete_success_ok: function(e) {
      return this._dismissOverlay(e);
    },

    _delete_error_ok: function(e) {
      return this._backToOverlay(e);
    },

    _save_success_ok: function(e) {
      return this._dismissOverlay(e);
    },

    _save_error_ok: function(e) {
      return this._backToOverlay(e);
    },

    // Provided by subclass.
    _dismissOverlay: function(e) {
    },

    // Provided by subclass.
    _backToOverlay: function(e) {
    },

    // Provided by subclass.
    _getEntityType: function() {
      return 'content';
    }

  });

});

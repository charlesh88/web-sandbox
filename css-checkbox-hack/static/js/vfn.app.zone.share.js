VFN.namespace2("app.zone.share", [ _, Backbone ], function(MODULE, _, Backbone) {

  var ZONE = VFN.app.zone;

  MODULE.submit = function(shareView) {
    var message = shareView.$el.find('#textarea-share-caption').val();
    var channels = [];
    var $cbox_fb = shareView.$el.find('#cbox-facebook');
    var $cbox_tw = shareView.$el.find('#cbox-twitter');
    
    if ($cbox_fb.attr('checked')) {
      channels.push($cbox_fb.val());
      //alert('channels.push ' + $cbox_fb.val());
    }
    if ($cbox_tw.attr('checked')) {
      channels.push($cbox_tw.val());
      //alert('channels.push ' + $cbox_tw.val());
    }
    
    var expiresInSeconds = 60 * 60 * 24 * 365;
    VFN.cookies.set('default_social_channels', channels.join(','), expiresInSeconds);
    if (!_.isEmpty(channels)) {
      return execute(shareView.model, channels, message);
    }
    return false;
  };

  MODULE.checkLoginState = function(model, action) {
    if (!ZONE.isUserLoggedIn()) {
      var destination = buildShareCallbackPath(model, action);
      ZONE.router.goToLogin(destination);
      return false
    }
    return true
  };

  MODULE.checkExistingSocialChannels = function(model, channels, message) {
    if (_.contains(channels, ZONE.facebookSharingIdentifier) && !_.contains(ZONE.existingSocialChannels, ZONE.facebookSharingIdentifier)) {
      // TODO(Chad Phillips): Not used right now, but might be useful later.
      //var callback = buildShareAuthCallback(model, ZONE.facebookSharingIdentifier, channels, message);
      MODULE.authFacebook(model, channels, message);
      return false;
    }
    else if (_.contains(channels, ZONE.twitterSharingIdentifier) && !_.contains(ZONE.existingSocialChannels, ZONE.twitterSharingIdentifier)) {
      // TODO(Chad Phillips): Not used right now, but might be useful later.
      //var callback = buildShareAuthCallback(model, ZONE.twitterSharingIdentifier, channels, message);
      MODULE.authTwitter(model, channels, message);
      return false;
    }
    return true;
  };

  MODULE.authFacebook = function(model, channels, message) {
    ZONE.overlay.showAuthFacebook(model, channels, message);
  };

  MODULE.authTwitter = function(model, channels, message) {
    ZONE.overlay.showAuthTwitter(model, channels, message);
  };

  MODULE.dismissAuthFacebook = function(model) {
    ZONE.overlay.dismissAuthFacebook(model);
  };

  MODULE.dismissAuthTwitter = function(model) {
    ZONE.overlay.dismissAuthTwitter(model);
  };

  MODULE.authCallback = function (entityModel, channels, addedChannel, message) {
    // Add the channel to the client-side array.
    ZONE.existingSocialChannels.push(addedChannel);
    execute(entityModel, channels, message);
  };

  var execute = function(model, channels, message) {
    var attrs = {
      // This is used to build the share URL for the entity.
      entity_id: model.id,
      channels: channels,
      message: message,
      from_feed: ZONE.currentFeed,
    };
    if (MODULE.checkExistingSocialChannels(model, channels, message)) {
      var shareModel = new VFN.app.zone.model.Share(attrs);
      shareModel.save();
      // This double navigation is necessary because the navigate function
      // aborts if the path fragment is the same.
      Backbone.history.navigate('', { replace: true });
      Backbone.history.navigate(ZONE.currentFeed, { replace: true });
      return true;
    }
    return false;
  };

  var buildShareCallbackPath = function(model, mode) {
    // TODO(Chad Phillips): Cleaner way to build this?
    var currentRoute = ZONE.router.getCurrentPath();
    var params = 'entity_id=' + encodeURIComponent(model.id) + '&mode=' + encodeURIComponent(mode);
    return currentRoute + '?' + params;
  };

  // TODO(Chad Phillips): Not used right now, but might be useful later.
  var buildShareAuthCallback = function(model, identifier, channels, message) {
    // TODO(Chad Phillips): Cleaner way to build this.
    var path = buildShareCallbackPath(model, 'auth');
    var params = '&type=' + encodeURIComponent(identifier) + '&channels=' + encodeURIComponent(channels.join(',')) + '&message=' + encodeURIComponent(message);
    var callback = 'http://' + window.location.host + path + params;
    return callback
  };

  MODULE.setShareFormDefaultChannels = function(shareView) {
    var cookies = [];
    var channelsString = decodeURIComponent(VFN.cookies.get('default_social_channels'));
    if (channelsString) {
      cookies = channelsString.split(',');
    }
    if (_.contains(cookies, ZONE.facebookSharingIdentifier)) {
      //shareView.$el.find('#select-facebook').val(ZONE.facebookSharingIdentifier);
      shareView.$el.find('#cbox-facebook').attr('checked', true);
    }
    if (_.contains(cookies, ZONE.twitterSharingIdentifier)) {
      //shareView.$el.find('#select-twitter').val(ZONE.twitterSharingIdentifier);
      shareView.$el.find('#cbox-twitter').attr('checked', true);
    }
  }

});


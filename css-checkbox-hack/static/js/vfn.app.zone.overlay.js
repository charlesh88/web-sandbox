VFN.namespace2("app.zone.overlay", [ jQuery ], function(MODULE, $) {

  var ZONE = VFN.app.zone,
      currentContentSpecificClass = null;

  ZONE.app.addInitializer(function() {
    initOverlayEventHandlers();
    handleOverlayShowEvent(VFN.app.widget.photo.events, "app:widget:photo:show", showPhoto);
    handleOverlayShowEvent(VFN.app.widget.photo.events, "app:widget:photo:share", showPhotoShare);
    handleOverlayShowEvent(VFN.app.widget.photo.events, "app:widget:photo:edit", showPhotoEdit);
    handleOverlayShowEvent(VFN.app.widget.photo.events, "app:widget:photo:dismiss", dismissOverlay);
    handleOverlayShowEvent(VFN.app.widget.athlete.events, "app:widget:athlete:showCard", showAthleteCard);
    handleOverlayShowEvent(VFN.app.widget.video.events, "app:widget:video:show", showVideo);
    handleOverlayShowEvent(VFN.app.widget.video.events, "app:widget:video:share", showVideoShare);
    handleOverlayShowEvent(VFN.app.widget.video.events, "app:widget:video:edit", showVideoEdit);
    handleOverlayShowEvent(VFN.app.widget.video.events, "app:widget:video:dismiss", dismissOverlay);
    handleOverlayShowEvent(VFN.app.widget.newsArticle.events, "app:widget:news-article:show", showNewsArticle);
  });

  MODULE.show = function(contentSpecificClass, isModal, entity_model, mode) {
    if (entity_model && mode) {
      var route = MODULE.buildOverlayPath(entity_model, mode);
      Backbone.history.navigate(route, { replace: true });
    }
    var $overlayWrapper = $("#overlay-wrapper");
    $overlayWrapper.addClass("show");
    $("#btn-mobile").addClass("hide");
    if (contentSpecificClass) {
      $overlayWrapper.addClass(contentSpecificClass);
    }
    if (isModal) {
      $overlayWrapper.addClass("modal");
    } else {
      $overlayWrapper.removeClass("modal");
    }
    $('body').addClass('no-scroll');
    currentContentSpecificClass = contentSpecificClass;

    VFN.analytics.all.track("app:zone:overlay:show", { cssClass: contentSpecificClass });
  };

  MODULE.hide = function() {
    var route = ZONE.router.getCurrentPath();
    Backbone.history.navigate(route, { replace: true });
    $("#overlay-wrapper").removeClass("show");
    $("#btn-mobile").removeClass("hide");
    if (currentContentSpecificClass) $("#overlay-wrapper").removeClass(currentContentSpecificClass);
    ZONE.app.overlay.reset();
    $('body').removeClass('no-scroll');

    VFN.analytics.all.track("app:zone:overlay:hide", { cssClass: currentContentSpecificClass });
  };

  MODULE.buildOverlayPath = function(model, mode) {
    // TODO(Chad Phillips): Cleaner way to build this?
    var currentRoute = ZONE.router.getCurrentPath();
    var params = 'entity_id=' + encodeURIComponent(model.id) + '&mode=' + encodeURIComponent(mode);
    return currentRoute + '?' + params;
  };

  // TODO(Chad Phillips): Ideally, the overlay would have an awareness of the
  // collection that's behind it, but for now this approach works.
  MODULE.displayEntity = function(model) {
    // TODO(Chad Phillips): These dot_types are taken from
    // vfn_platform.constants.entity_dot_types. Eventually they should be
    // transferred programatically for consistency.
    var dot_type = model.get('dot_type');
    switch(dot_type) {
      case 'com.vfn.entity.news_article.photo':
      case 'com.vfn.entity.news_article.text':
        VFN.app.widget.newsArticle.events.trigger("app:widget:news-article:show", model);
        break;
      case 'com.vfn.entity.person.athlete':
        VFN.app.widget.athlete.events.trigger("app:widget:athlete:showCard", model);
        break;
      case 'com.vfn.entity.photo':
      case 'com.vfn.entity.photo.captioned':
        VFN.app.widget.photo.events.trigger("app:widget:photo:show", model);
        break;
      case 'com.vfn.entity.video':
      case 'com.vfn.entity.video.captioned':
        VFN.app.widget.video.events.trigger("app:widget:video:show", model);
        break;
    }
  }

  // TODO(Chad Phillips): Ideally, the overlay would have an awareness of the
  // collection that's behind it, but for now this approach works.
  MODULE.displayShareEntity = function(model) {
    // TODO(Chad Phillips): These dot_types are taken from
    // vfn_platform.constants.entity_dot_types. Eventually they should be
    // transferred programatically for consistency.
    var dot_type = model.get('dot_type');
    switch(dot_type) {
      case 'com.vfn.entity.text.plain':
        // TODO(Chad Phillips): Needs to be implemented.
        break;
      case 'com.vfn.entity.photo':
      case 'com.vfn.entity.photo.captioned':
        VFN.app.widget.photo.events.trigger("app:widget:photo:share", model);
        break;
      case 'com.vfn.entity.video':
      case 'com.vfn.entity.video.captioned':
        VFN.app.widget.video.events.trigger("app:widget:video:share", model);
        break;
    }
  }

  MODULE.showAuthFacebook = function(model, channels, message) {
    var view = new ZONE.view.share.AuthFacebookView({ model: model, channels: channels, message: message });
    ZONE.app.overlay.show(view);
    // TODO(Chad Phillips): What class should go here?
    ZONE.overlay.show("overlay-auth");
  };

  MODULE.showAuthTwitter = function(model, channels, message) {
    var view = new ZONE.view.share.AuthTwitterView({ model: model, channels: channels, message: message });
    ZONE.app.overlay.show(view);
    // TODO(Chad Phillips): What class should go here?
    ZONE.overlay.show("overlay-auth");
  };

  MODULE.dismissAuthFacebook = function(model) {
    MODULE.displayShareEntity(model);
  };

  MODULE.dismissAuthTwitter = function(model) {
    MODULE.displayShareEntity(model);
  };

  var handleOverlayShowEvent = (function() {
    var countCookieKey = 'zone-overlay-view-count',
        maxNonLoggedInViewCount = 1;

    var handleEvent = function(eventQueue, eventName, handler) {
      eventQueue.on(eventName, function(model) {
        if (!VFN.app.zone.isUserLoggedIn()) {
          if (getOverlayViewCount() >= maxNonLoggedInViewCount) {
            Backbone.history.navigate(getLoginFragmentWithEntityId(model), { trigger: true });
            return;
          }
          incrementOverlayViewCount();
        }
        handler(model);
      });
    };

    var getOverlayViewCount = function() {
      var viewCount = VFN.cookies.get(countCookieKey) || 0;
      return parseInt(viewCount, 10);
    };

    var incrementOverlayViewCount = function() {
      var viewCount = getOverlayViewCount();
      VFN.cookies.set(countCookieKey, viewCount + 1, 60 * 60 * 24 * 365);
    };

    var getLoginFragmentWithEntityId = function(model) {
      var entityId = model.get("entity_id");
      var querystring = entityId ? "?mode=display&entity_id=" + entityId : "";
      return "loginToSeeMore" + querystring;
    };

    return handleEvent;
  }());


  var showPhoto = function(model) {
    var view = new VFN.app.widget.photo.view.PhotoDisplayView({ model: model });
    ZONE.app.overlay.show(view);
    ZONE.overlay.show("overlay-photo overlay-media", null, model, 'display');
  };

  var showNewsArticle = function(model) {
    var view = new VFN.app.widget.newsArticle.view.NewsArticleDisplayView({ model: model });
    ZONE.app.overlay.show(view);
    ZONE.overlay.show("overlay-news-article overlay-media", null, model, 'display');
  };


  var showPhotoShare = function(model) {
    var view = new VFN.app.widget.photo.view.PhotoShareView({ model: model });
    ZONE.app.overlay.show(view);
    // TODO(Chad Phillips): What class should go here?
    ZONE.overlay.show("overlay-photo overlay-media overlay-narrow", null, model, 'share');
  };

  var showPhotoEdit = function(model) {
    var view = new VFN.app.widget.photo.view.PhotoEditView({ model: model });
    ZONE.app.overlay.show(view);
    // TODO(Chad Phillips): What class should go here?
    ZONE.overlay.show("overlay-photo overlay-media overlay-narrow");
  };

  var showAthleteCard = function(model) {
    var view = new VFN.app.widget.athlete.view.AthleteCardView({ model: model });
    ZONE.app.overlay.show(view);
    ZONE.overlay.show("overlay-athlete-card", null, model, 'display');
  };

  var showVideo = function(model) {
    var view = new VFN.app.widget.video.view.VideoDisplayView({ model: model });
    ZONE.app.overlay.show(view);
    ZONE.overlay.show("overlay-video overlay-media", null, model, 'display');
  };

  var showVideoShare = function(model) {
    var view = new VFN.app.widget.video.view.VideoShareView({ model: model });
    ZONE.app.overlay.show(view);
    // TODO(Chad Phillips): What class should go here?
    ZONE.overlay.show("overlay-video overlay-media overlay-narrow", null, model, 'share');
  };

  var showVideoEdit = function(model) {
    var view = new VFN.app.widget.video.view.VideoEditView({ model: model });
    ZONE.app.overlay.show(view);
    // TODO(Chad Phillips): What class should go here?
    ZONE.overlay.show("overlay-video overlay-media overlay-narrow");
  };

  var dismissOverlay = function(model) {
    ZONE.overlay.hide()
  };

  var initOverlayEventHandlers = function() {
    $("#overlay-close, #overlay-knockback").click(function(e) {
      if ($("#overlay-wrapper").hasClass("modal")) return;

      e.preventDefault();

      ZONE.overlay.hide();

      return false;
    });

    $(document).keyup(function(e) {
      var KEY_ESC = 27;
      if (e.keyCode === KEY_ESC && isOverlayShowing()) {
        ZONE.overlay.hide();
      }
    });
  };

  var isOverlayShowing = function() {
    return $("#overlay-wrapper").hasClass("show");
  };

});

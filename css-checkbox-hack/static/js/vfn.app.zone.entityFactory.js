VFN.namespace("app.zone.entityFactory", (function() {
  var that = {};

  that.createModel = function(attrs, options) {
    switch (attrs.type) {
      case "com.vfn.entity.card.v1":
        return new VFN.app.zone.model.CardEntity(attrs, options);

      case "com.vfn.entity.widget.athlete.v1":
        return new VFN.app.widget.athlete.model.AthleteModel(attrs, options);

      case "com.vfn.entity.widget.icon.v1":
        return new VFN.app.widget.icon.model.IconModel(attrs, options);

      case "com.vfn.entity.widget.advertisement.v1":
        return new VFN.app.widget.advertisement.model.AdvertisementModel(attrs, options);

      case "com.vfn.entity.widget.logo.v1":
        return new VFN.app.widget.logo.model.LogoModel(attrs, options);

      case "com.vfn.entity.widget.news_article.v1":
        return new VFN.app.widget.newsArticle.model.NewsArticleModel(attrs, options);

      case "com.vfn.entity.widget.photo.v1":
        return new VFN.app.widget.photo.model.PhotoModel(attrs, options);

      case "com.vfn.entity.widget.user_interest.v1":
        return new VFN.app.widget.userInterest.model.UserInterestModel(attrs, options);

      case "com.vfn.entity.widget.video.v1":
        return new VFN.app.widget.video.model.VideoModel(attrs, options);

      case "com.vfn.entity.widget.text.v1":
        return new VFN.app.widget.text.model.TextModel(attrs, options);

      case "com.vfn.entity.widget.twitter.v1":
        return new VFN.app.widget.twitter.model.TwitterModel(attrs, options);
    }
    throw "Unsupported entity type: " + attrs.type;
  };

  that.createView = function(model) {
    switch (model.get("type")) {
      case "com.vfn.entity.card.v1":
        return new VFN.app.zone.view.CardEntityView({ model: model });

      case "com.vfn.entity.widget.athlete.v1":
        return new VFN.app.widget.athlete.view.AthleteView({ model: model });

      case "com.vfn.entity.widget.icon.v1":
        return new VFN.app.widget.icon.view.IconView({ model: model });

      case "com.vfn.entity.widget.advertisement.v1":
        return new VFN.app.widget.advertisement.view.AdvertisementView({ model: model });

      case "com.vfn.entity.widget.logo.v1":
        return new VFN.app.widget.logo.view.LogoView({ model: model });

      case "com.vfn.entity.widget.news_article.v1":
        return new VFN.app.widget.newsArticle.view.NewsArticleView({ model: model });

      case "com.vfn.entity.widget.photo.v1":
        return new VFN.app.widget.photo.view.PhotoView({ model: model });

      case "com.vfn.entity.widget.user_interest.v1":
        return new VFN.app.widget.userInterest.view.UserInterestView({ model: model });

      case "com.vfn.entity.widget.video.v1":
        return new VFN.app.widget.video.view.VideoView({ model: model });
      case "com.vfn.entity.widget.text.v1":
        return new VFN.app.widget.text.view.TextView({ model: model });
      case "com.vfn.entity.widget.twitter.v1":
        return new VFN.app.widget.twitter.view.TwitterView({ model: model });
    }
    throw "Unsupported entity type: " + model.get("type");
  };

  return that;

}()));

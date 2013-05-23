VFN.namespace("app.zone.navigation", (function($) {

  var that = {};
  
  that.init = function() {
    logEvent('Inited');
    initNavMenus();
    enableJQueryHandlers();
    if (VFN.browser.isMobile()) {
      VFN.mobile.scrollLocationBarOutOfViewOnIOS();
    }
  };
  
  var defaultMenuSel = '#main-menu'; // Was nav #main-nav
  var $lastHigherMenu;
  var $lastMenu;
  var hoverOk = false;
  var $level1Nodes;
  var $parentNodes;
  var developMode = false; // DO NOT CHECK IN WITH THIS SET TO TRUE!!!
  var $leafNodes;
  var cardCats = {
    'nav-item-cards-all': 'cards-all',
    'nav-item-cards-me': 'cards-me'
  };
   
  var initNavMenus = function() {
    $level1Nodes = $('nav > ul > li > a');
    //$parentNodes = $('ul li a span.submenu-arrow').parent();
    $parentNodes = $('ul li.has-children');
    //$parentNodes.addClass('hilite');
    $leafNodes = $('ul li:not(:has(.has-children))');
    resetShowingChildren();
    showMenu($(defaultMenuSel));
  };
  
/**************************************** DISPLAY / STATUS CONTROL **********************/ 
  
  var show = function($el) {
    $el.removeClass('hide');
    $el.addClass('show');
  };
  
  var hide = function($el) {
    $el.removeClass('show');
    $el.addClass('hide');
  };
  
  var toggleNavPanel = function() {
    if ($('#nav-wrapper').hasClass('expand')) {
      collapseNavPanel();
    }
    else {
      expandNavPanel();
    }
  };

  var expandNavPanel = function() {
    $('#header').addClass('expand');
    $('#nav-wrapper').addClass('expand');
    $('#page-wrapper').addClass('collapse');
    showMenu($lastMenu);
    $('#main-menu-container').scrollTop(0);
  };

  var collapseNavPanel = function() {
    $('#header').removeClass('expand');
    $('#nav-wrapper').removeClass('expand');
    $('#page-wrapper').removeClass('collapse');
  };
  
  var hideMenus = function() {
    hide($('nav').find('ul'));
  };
  
  var resetShowingChildren = function() {
    $('nav ul').removeClass('showingChildren');
  };
  
  var showMenu = function($menuToBeDisplayed) {
    if ($menuToBeDisplayed.attr('id') != undefined) {
      $lastHigherMenu = $menuToBeDisplayed.parent('li').parent('ul');
      if ($lastHigherMenu.attr('id') != undefined) {
        $lastHigherMenu.addClass('showingChildren');
        show($('#show-last-menu'));
      }
      else {
        hide($('#show-last-menu'));
      }
      hideMenus();
      showLastMenuButton($menuToBeDisplayed);
      $lastMenu = $menuToBeDisplayed;
    }
  };
  
  var showLastMenuButton = function($menuToBeDisplayed) {
    var $m = $($menuToBeDisplayed.parent().find('> a'));
    var menuName = $m.text();
    $('#show-last-menu #label').text(menuName);
    show($menuToBeDisplayed);
  };
  
  var setBreadcrumbContext = function(navItemLinkElement) {
    var thisId = $(navItemLinkElement).parent('li').attr('id');
    var bcClass = cardCats[thisId];
    $('#breadcrumbs-container ul.nav-breadcrumbs').attr('class', 'nav-breadcrumbs ' + bcClass);
  };
  
  /**************************************** MAIN NAV CLICK FUNCTIONS **********************/
  
  that.handleNavClick = function(navItemLinkElement) {
    var $curMenuItem = $(navItemLinkElement).parent('li');
    var $menuToBeDisplayed = $curMenuItem.children('ul');
    showMenu($menuToBeDisplayed);
  };
  
  that.handleNavClickLeaf = function(navItemLinkElement) {
    resetShowingChildren();
    hideMenus();
    setBreadcrumbContext(navItemLinkElement);
    collapseNavPanel();
  };
  
  var handleHoverOut = function() {
    //alert('hoverOut');
    if (!developMode)
      initNavMenus();
  };
  

  /******************************** JQUERY EVENT SELECION AND HANDLING **********************/ 
  
  var enableJQueryHandlers = function() {
    hoverOk = $('html').hasClass('no-touch');

    $('#show-last-menu').click(function() {
      showMenu($lastHigherMenu);
    });
    
    $('#btn-mobile').click(function() {
      toggleNavPanel();
    });
    
    $('nav ul').hover(function() {}, function() { if (hoverOk) { handleHoverOut(); } });
    
    $('#hover-status').click(function() {
      hoverOk = (hoverOk)? false:true;
      $(this).text('Hover ' + hoverOk);
    });
    
    $('#clear-events').click(function() {
      $('#events').empty();
    });
    
  };
  
  /******************************** UTILS **********************/
  var logEvent = function(ev) {
    $('#events').prepend($('<p>' + ev + '</p>'));
  };


 return that;

}(jQuery)));
 

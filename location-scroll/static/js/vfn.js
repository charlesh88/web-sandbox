var VFN;
VFN = VFN || {};

/**
 * Creates a submodule of the VFN namespace
 *
 * @param namespace Subpath of the VFN namespace
 * @param members Map of namespace members
 *
 * Example:
 *    VFN.namespace("card.ad", {
 *      open: function() {
 *        ...
 *      }
 *    });
 *
 *    VFN.card.ad.open();
 */
VFN.namespace = (function($) {

  function createModuleHierarchy(namespace) {
    var parts = namespace.split("."),
      parent = VFN;

    if (parts[0] === "VFN") {
      parts = parts.slice(1);
    }

    for (var i = 0; i < parts.length; i++) {
      if (typeof parent[parts[i]] === "undefined") {
        parent[parts[i]] = {};
      }
      parent = parent[parts[i]];
    }

    return parent;
  }

  return function(namespace, members) {
    var module = createModuleHierarchy(namespace);

    return $.extend(module, members);
  };

}(jQuery));

/**
 * TODO: Code below needs to be refactored into VFN namespace
 */

$(function() {
  var attachWaitSpinnerToSubmitButtonClick = function(index) {
    var startWaitSpinner = function(e) {
      waitSpinner('start');
    }
    $(this).click(startWaitSpinner);
  }
  // All deform submit buttons display a wait spinner when clicked.
  $('li.buttons button.submit').each(attachWaitSpinnerToSubmitButtonClick);
})


/**
 * Manages the page-wide wait spinner.
 *
 * Args:
 *   op:
 *     'start' to start the spinner, 'stop' to stop the spinner.
 */
var waitSpinner = function(op, spinner_id) {
  if (typeof spinner_id == 'undefined') {
    spinner_id = '#default-wait-spinner'
  }
  spinner = $(spinner_id)
  if (spinner.size()) {
    switch (op) {
      case 'start':
        spinner.css('display', 'block');
        break;
      case 'stop':
        spinner.css('display', 'none');
        break;
    }
  }
}


/**
 * Custom operations after a deform form submission returns successfully.
 */
var onDeformSuccessCustom = function() {
  waitSpinner('stop');
}


/**
 * Base operations after a deform form submission returns successfully.
 *
 * This is called by the 'success' callback that's injected to deform forms
 * via the 'ajax_options' parameter.
 */
var onDeformSuccessBase = function (rText, sText, xhr, form) {
  // This is needed to reattach the event handlers to the form in case of
  // validation failure.
  if(deform && deform.load) {
    deform_loaded = false;
    deform.load();
  }
  onDeformSuccessCustom();
  if (xhr && xhr.getResponseHeader) {
    var loc = xhr.getResponseHeader('X-Relocate');
    if (loc) {
      document.location = loc;
    };
  }
}

var onDeformErrorBase = function (xhr, textStatus, errorThrown) {
  // typically only one of textStatus or errorThrown
  // will have info
  this; // the options for this ajax request
}

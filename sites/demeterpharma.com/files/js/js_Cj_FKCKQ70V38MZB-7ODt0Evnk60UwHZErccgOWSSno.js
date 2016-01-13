(function ($) {

Drupal.behaviors.textarea = {
  attach: function (context, settings) {
    $('.form-textarea-wrapper.resizable', context).once('textarea', function () {
      var staticOffset = null;
      var textarea = $(this).addClass('resizable-textarea').find('textarea');
      var grippie = $('<div class="grippie"></div>').mousedown(startDrag);

      grippie.insertAfter(textarea);

      function startDrag(e) {
        staticOffset = textarea.height() - e.pageY;
        textarea.css('opacity', 0.25);
        $(document).mousemove(performDrag).mouseup(endDrag);
        return false;
      }

      function performDrag(e) {
        textarea.height(Math.max(32, staticOffset + e.pageY) + 'px');
        return false;
      }

      function endDrag(e) {
        $(document).unbind('mousemove', performDrag).unbind('mouseup', endDrag);
        textarea.css('opacity', 1);
      }
    });
  }
};

})(jQuery);
;
/**
 * jQuery Mobile Select (Adapted for Drupal)
 * @Author: Jochen Vandendriessche <jochen@builtbyrobot.com>
 * @Author URI: http://builtbyrobot.com
 *
**/

(function($){

  var methods = {
    init : function(config) {
      var options = $.extend({
        autoHide: true,
        defaultOption: Drupal.t("Go to..."),
        deviceWidth: 480
      }, config);
      
      // we test the width of the document
      if ($(document).width() < options.deviceWidth){
        $(this).each(function() {
          var _o = $(this), // store the jqyuery object once
          _p = _o.parent(), // get the parent node
          _s = $("<select />"); // create a filthy select
          _s.appendTo(_p); // append it to the parent

          $("<option />", {
            "selected": (!$('.active', _o).length) ? 'selected' : '',
            "value": "",
            "text": options.defaultOption
          }).appendTo(_s);

          // Populate the dropdown with menu items. If there is an li.current we'll
          // make this one selected
          $('a', _o).each(function() {
            var el = $(this),
            sl = el.parent('li').hasClass('active') ? 'selected' : '';
            $("<option />", {
              "selected": sl,
              "value": el.attr("href"),
              "text": el.text()
            }).appendTo(_s);
          });
          // hide the navigation ul
          if (options.autoHide){
            $(_o).hide();
          }
          // now make it work :-)
          _s.change(function() {
            window.location = $(this).find("option:selected").val();
          });
        });
      }
    }
  };

  $.fn.mobileSelect = function(method){
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' + method + ' does not exist on jQuery.mobileselect' );
    }
  };
})(this.jQuery);
;

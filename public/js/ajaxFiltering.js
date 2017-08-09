/**
 * for backend data - ModX pdoTools
 */

$(function() {
  // filter container
  const AJAX_CONTAINER_SEL = '.prod-list';
  const CONTAINER_ITEM_SEL = '.prod-card';
  const CONTAINER_BUTTON_MORE = '.ajax-more';
  // filter form elements
  const AJAX_FORM_SEL = '.size-form';
  const FORM_BUTTON_START = '.ajax-start';
  const FORM_BUTTON_RESET = '.ajax-reset';
  // user form fields uses when form reset
  const FORM_SLIDER_PRICE = $('#price').data("ionRangeSlider");
  const FORM_SLIDER_PRICE_MIN = $('#p1');
  const FORM_SLIDER_PRICE_MAX = $('#p2');
  // effects
  const FADE_SPEED = 200;

  function ajaxFiltering() {
    $.ajax({
      data: $(AJAX_FORM_SEL).serialize()
    }).done(function(response) {
      $(AJAX_CONTAINER_SEL).fadeOut(FADE_SPEED);
      setTimeout(function() {
        $(AJAX_CONTAINER_SEL).html($(response).find(AJAX_CONTAINER_SEL).html()).fadeIn(FADE_SPEED);
      }, FADE_SPEED);
    });
  }

  $(FORM_BUTTON_START).click(function (e) {
    e.preventDefault();
    ajaxFiltering();
  });

  $(FORM_BUTTON_RESET).click(function (e) {
    e.preventDefault();
    $(AJAX_FORM_SEL).trigger('reset');
    FORM_SLIDER_PRICE.reset();
    FORM_SLIDER_PRICE_MIN.val('');
    FORM_SLIDER_PRICE_MAX.val('');
    ajaxFiltering();
  });

  $(AJAX_CONTAINER_SEL).on('click', CONTAINER_BUTTON_MORE, function (e) {
    e.preventDefault();
    var offset = $(CONTAINER_ITEM_SEL).length;
    $.ajax({
      data: $(AJAX_FORM_SEL).serialize() + '&offset=' + offset
    }).done(function(response) {
      $(CONTAINER_BUTTON_MORE).remove();
      $(response).find(CONTAINER_ITEM_SEL).hide();
      $(AJAX_CONTAINER_SEL).append($(response).find(AJAX_CONTAINER_SEL).html());
      $(CONTAINER_ITEM_SEL).fadeIn();
    });
  });

  $('' + AJAX_FORM_SEL + '').submit(function() {
    return false;
  });

});
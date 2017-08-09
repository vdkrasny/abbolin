const CONTROL_SLIDE_HOME_SEL = '.btn-control--slide-nav_home';

const NAVIGATION_SEL = '.navigation';
const NAVIGATION_LINK_SEL = '.navigation__link';
const NAVIGATION_BTN_SEL = '.navigation-control';

const SECTION_NAV_UP_SEL = '#section-nav_up';
const SECTION_NAV_DOWN_SEL = '#section-nav_down';
const SECTION_NAV_ON = {'visibility':'visible'};
const SECTION_NAV_OFF = {'visibility':'hidden'};
const SECTION_ANCHORS = ['home', 'landing-page', 'website-cards', 'corporate-website', 'faq'];
const SECTION_ID_LAST = SECTION_ANCHORS.length;

const SLIDE_INNER_PAGE = ['landing-page', 'website-cards', 'corporate-website'];

const FIXED_ELEMENTS = '.preload, .layout-header, .btn-control--section-nav';

$(window).on('load', function() {
  $('.logo').addClass('logo--load')
});

$(document).ready(function() {
  fullPage();

  $('textarea').each(function(){
    autosize(this);
  }).on('autosize:resized', function(){
    console.log('textarea height updated');
  });

  $('.if-js-disable').removeClass('if-js-disable'); // if client not use js
  $('.fp-controlArrow').remove();

  $(NAVIGATION_BTN_SEL).click(function () {
    $(this).toggleClass('active');
  });

  $(NAVIGATION_BTN_SEL).click(function () {
    if ($(NAVIGATION_SEL).is(':visible')) {
      $(NAVIGATION_SEL).fadeOut();
      $(NAVIGATION_LINK_SEL).removeClass('fadeInUp animated');
    } else {
      $(NAVIGATION_SEL).fadeIn();
      $(NAVIGATION_LINK_SEL).addClass('fadeInUp animated');
    }
  });

  $(NAVIGATION_LINK_SEL).click(function () {
    $(NAVIGATION_SEL).fadeOut();
    $(NAVIGATION_BTN_SEL).toggleClass('active');
  });

  $(SECTION_NAV_UP_SEL).click(function () {
    $.fn.fullpage.moveSectionUp();
  });

  $(SECTION_NAV_DOWN_SEL).click(function () {
    $.fn.fullpage.moveSectionDown();
  });

  $.fn.fullpage.setMouseWheelScrolling(false);
  $.fn.fullpage.setAllowScrolling(false);

  $('.faq__item').each(function() {
    const item = $(this);
    item.children('.faq__question').click(function() {
      if (!item.hasClass('active')) {
        $('.faq__item.active').removeClass('active');
        item.addClass('active');
      }
      $.fn.fullpage.reBuild();
    });
  });

});

function rememberScrollPosition() {
  var nextSection = $(this).next();
  var prevSection = $(this).prev();
  if(nextSection.hasClass('remember-scroll-position') ) {
    var IScroll = nextSection.find('.fp-scrollable').data('iscrollInstance');
    IScroll.scrollTo(0, 0, 0)
  }
  if(prevSection.hasClass('remember-scroll-position') ) {
    var IScroll = prevSection.find('.fp-scrollable').data('iscrollInstance');
    IScroll.scrollTo(0, IScroll.maxScrollY, 0)
  }
}

function fullPage() {
  $('#full-screen').fullpage({
    lockAnchors: false,
    anchors: SECTION_ANCHORS,
    navigation: false,
    navigationPosition: 'dots-line--right',

    //showActiveTooltip: false,
    slidesNavigation: false,
    slidesNavPosition: 'dots-line--left',
    animateAnchor: false, // после загрузки не прыгает с первого слайда, а пказывает загруженную секцию

    //Scrolling
    css3: true,
    scrollingSpeed: 700,
    fitToSection: true,
    fitToSectionDelay: 1000,
    easing: 'easeInOutCubic',
    easingcss3: 'ease',
    loopHorizontal: false,
    continuousVertical: false,
    normalScrollElements: '.element2',
    scrollOverflow: true,
    scrollOverflowOptions: {
      scrollbars: 'custom',
      //mouseWheel: false,
      disableMouse: false,
      //disablePointer: true,
      //disableTouch: true
      interactiveScrollbars: true,
      mouseWheel: true,
      bounce: false
    },

    //Accessibility
    keyboardScrolling: true,
    recordHistory: true,

    //Design
    verticalCentered: true,
    fixedElements: FIXED_ELEMENTS,
    responsiveWidth: 0,
    responsiveHeight: 0,
    responsiveSlides: false,

    //Custom selectors
    sectionSelector: '.section',
    slideSelector: '.slide',

    //events
    afterLoad: function(anchorLink, index){
      //rememberScrollPosition();
      if (index === 1) {
        // $('.preload').css({'top':'50%', 'display':'flex'});
        // $('.preload').animate({'opacity':'1'}, 500);
        $('.layout-header__we-are').fadeIn(500);
        $(SECTION_NAV_UP_SEL).css(SECTION_NAV_OFF);
        $('.logo__image').css(SECTION_NAV_ON)
        $('.logo').css({'z-index':'98'});
      } else {
        $(SECTION_NAV_UP_SEL).css(SECTION_NAV_ON);
        $('.logo__image').css(SECTION_NAV_OFF)
        $('.logo').css({'z-index':'0'});
      }
      if (index === SECTION_ID_LAST) {
        $(SECTION_NAV_DOWN_SEL).css(SECTION_NAV_OFF);
      } else {
        $(SECTION_NAV_DOWN_SEL).css(SECTION_NAV_ON);
      }
    },
    onLeave: function (index, nextIndex, direction) {
      if (index === 1 && direction === 'down' ) {
        $('.layout-header__we-are').fadeOut(500);
        $('.logo__image').css(SECTION_NAV_OFF);
        $('.logo').css({'z-index':'0'});
      }
      if (nextIndex === 1) {
        $(SECTION_NAV_UP_SEL).css(SECTION_NAV_OFF);
        $('.logo').css({'z-index':'98'});
        $('.logo__image').css(SECTION_NAV_ON);
      }
      if (nextIndex === SECTION_ID_LAST) {
        $(SECTION_NAV_DOWN_SEL).css(SECTION_NAV_OFF);
      }
      // $('.preload').animate({'top':'0', 'opacity':'0'}, 500);
      // setTimeout(function() {
      //   $('.preload').css({'display':'none'});
      // }, 500);
    },
    afterSlideLoad: function( anchorLink, index, slideAnchor, slideIndex){
      var selector, isInnerPage;
      isInnerPage = SLIDE_INNER_PAGE.indexOf(anchorLink) > -1;
      if (isInnerPage) {
        selector = '.section[data-anchor=' + anchorLink + ']';
        $(selector).find(CONTROL_SLIDE_HOME_SEL).css(SECTION_NAV_ON);
      }
      if (slideIndex === 0) {
        $(selector).find(CONTROL_SLIDE_HOME_SEL).css(SECTION_NAV_OFF);
      }
      setTimeout(function(){
        $.fn.fullpage.reBuild();
      }, 100);
    },
    onSlideLeave: function(anchorLink, index, slideIndex, direction, nextSlideIndex){
      var selector, isInnerPage;
      isInnerPage = SLIDE_INNER_PAGE.indexOf(anchorLink) > -1;
      if (isInnerPage) {
        selector = '.section[data-anchor=' + anchorLink + ']';
        $(selector).find(CONTROL_SLIDE_HOME_SEL).css(SECTION_NAV_ON);
      }
      if (nextSlideIndex === 0) {
        $(selector).find(CONTROL_SLIDE_HOME_SEL).css(SECTION_NAV_OFF);
      }
    }
  });
}
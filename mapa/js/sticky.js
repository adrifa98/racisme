jQuery(document).ready(function ($) {

  var parentElement = $('.sidebar');
  var stickyElement = $('.sticky-sidebar');
  var container = $('.body');
  var header = $('.header');
  var containerHeight = container.height() + 'px';
  var mediaBreakPoint = '(max-width: 980px)';
  var height = stickyElement.height();
  var heightString = height + 'px';
  var widthString = stickyElement.width() + 'px';
  var headerHeight = header.height() + 'px';

  function scrollStickySidebar($) {
    $(window).scroll(function () {
      var scroll = $(this).scrollTop();

      setParentOrContainerHeight();
      setStickyElementScrollDefaultStyles();

      var length = parentElement.height() - stickyElement.height() + parentElement.offset().top;

      if (!window.matchMedia(mediaBreakPoint).matches) {
        if (scroll < parentElement.offset().top) {
          stickyElement.css({
            'position': 'absolute',
            'top': '0',
            'bottom': 'auto'
          });
        }
        else if (scroll > length) {
          stickyElement.css({
            'position': 'absolute',
            'top': 'auto',
            'bottom': '0'
          });
        }
        else {
          stickyElement.css({
            'position': 'fixed',
            'top': '0',
            'bottom': 'auto'
          });
        }
      }
      else {
        setStickyElementMobileDefaultStyles();
      }
    }
  )};


  function setStickyElementScrollDefaultStyles() {
    stickyElement.css({
      'height': heightString,
      'width': widthString,
      'max-width': widthString
    });
  }

  function setStickyElementMobileDefaultStyles() {
    setParentToAutoHeight();

    stickyElement.css({
      'position': 'relative',
      'top': 'auto',
      'bottom': 'auto',
      'height': 'auto',
      'width': '100%',
      'max-width': '16.688em'
    });
  }

  function setParentOrContainerHeight() {
    if (height < container.height()) {
      parentElement.css({
        'height': containerHeight
      });
    }
    else {
      parentElement.css({
        'height': heightString
      });
      container.css({
        'height': heightString
      });
    }
  }

  function setParentToAutoHeight() {
    parentElement.css({
      'height': 'auto'
    });
  }
  
  scrollStickySidebar($);
  
  $(window).resize(scrollStickySidebar);
    
});
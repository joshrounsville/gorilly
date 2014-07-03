$(function() {

  // set booleans for window size
  var body = $('body');
  var isPhone = body.css('padding-bottom') === '1px';
  var isDesktop = body.css('margin-bottom') !== '1px';
  var notDesktop = body.css('margin-bottom') === '1px';



  // setup request animation frame shim
  (function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
  }());



  // svg fallback
  if ( !Modernizr.svg ) {
    $('img[src*="svg"]').attr('src', function() {
      return $(this).attr('src').replace('.svg', '.png');
    });
  }




  // get sliders going

  var sliders = function() {

    var $slider = $('.slider');
    var $sliderNext = $('a.slide-next');
    var $sliderPrev = $('a.slide-prev');

    $slider.slick({
      infinite: true,
      speed: 400,
      draggable: false,
      arrows: false,
      lazyLoad: 'ondemand',
      slidesToShow: 3,
      slidesToScroll: 1
    });

    $sliderNext.on('click', function(e) {
      e.preventDefault();
      $slider.slickNext();
    });

    $sliderPrev.on('click', function(e) {
      e.preventDefault();
      $slider.slickPrev();
    });

    var $bigSlider = $('.slider-full');

    $bigSlider.slick({
      autoplay: true,
      autoplaySpeed: 6000,
      infinite: true,
      speed: 400,
      draggable: false,
      arrows: false,
      lazyLoad: 'ondemand',
      dots: true,
      fade: true
    });

  };

  sliders();





  // tab action

  var tabs = function() {

    var navWrap = $('.tab-nav');
    var nav = navWrap.find('.tab-item');
    var tab = $('.tab');
    var tabWrap = $('.tab-wrap');
    var formBtn = $('.tab .btn-form');
    var editBtn = $('.tab .btn-edit');
    var count = tab.length;

    formBtn.on('click', function(e) {
      e.preventDefault();

      var currentTab = $(this).parents('.tab').attr('data-tab');
          currentTab = currentTab.split('-');
          currentTab = parseInt(currentTab[1], 10);
      var nextTab = currentTab + 1;
      var prevTab = currentTab - 1;
      var target;
      var targetNav;

      if ( $(this).hasClass('btn-next') ) {
        target = tabWrap.find('.tab[data-tab=tab-' + nextTab + ']');
        targetNav = navWrap.find('.tab-item[data-target=tab-' + nextTab + ']');

        if ( nextTab <= count ) {
          tab.removeClass('active');
          nav.removeClass('active');

          target.addClass('active');
          targetNav.addClass('active');
        }

      } else if ( $(this).hasClass('btn-back') ) {
        target = tabWrap.find('.tab[data-tab=tab-' + prevTab + ']');
        targetNav = navWrap.find('.tab-item[data-target=tab-' + prevTab + ']');

        if ( prevTab > 0 ) {
          tab.removeClass('active');
          nav.removeClass('active');

          target.addClass('active');
          targetNav.addClass('active');
        }

      }

    });

    editBtn.on('click', function(e) {
      e.preventDefault();

      tab.removeClass('active');
      nav.removeClass('active');

      tabWrap.find('.tab[data-tab=tab-1]').addClass('active');
      navWrap.find('.tab-item[data-target=tab-1]').addClass('active');
    });

  };

  tabs();





  // img swapper on product detail page
  var imgSwapper = function() {

    var mainImgWrap = $('div.img-large');
    var mainImg = $(mainImgWrap).find('img');
    var thumbImgs = $('ul.img-thumbs').find('img');
    var mainSrc;
    var thumbSrc;

    thumbImgs.on('click', function() {
      mainSrc = $(mainImg).attr('src');
      thumbSrc = $(this).attr('src');

      if ( mainSrc != thumbSrc ) {
        mainImgWrap.addClass('loading');
        mainImg.attr('src', thumbSrc);

        setTimeout(function() {
          mainImgWrap.removeClass('loading');
        }, 300);

      }

    });

  };

  imgSwapper();




  // bootstrap affix
  var affixEl = $('.affix-el');

  var affix = function() {
    var top = affixEl.offset().top;
        top = top - parseInt(affixEl.css('top'));
    var bodyHeight = body.height();
    var affixBottom = $('.affix-el-bottom');
    var affixBottomOffset = affixBottom.offset().top;
    var affixBottomHeight = affixBottom.height();
    var bottom = bodyHeight - affixBottomHeight - affixBottomOffset;

    affixEl.affix({
      offset: {
        top: top,
        bottom: bottom
      }
    });

  };

  if ( affixEl.length ) {
    affix();
  }



  // form scroll craziness
  var formEl = $('div.form-scroll');
  var windowPosition;
  var formElPosition;

  var formScroll = function() {

    windowPosition = $(window).scrollTop() + 20;
    formElPosition = windowPosition - parseInt(formHeight);

    if ( windowPosition > formHeight ) {
      formEl.css('top', formElPosition);
    } else {
      formEl.css('top', 0);
    }

  };

  if ( $('div.form-scroll').length ) {
    var formHeight = formEl.offset().top;

    formScroll();

    $(window).on('scroll', function() {
      window.requestAnimationFrame(formScroll);
    });
  }





  // bootstrap modal
  var modalLink = $('.modal-link');
  modalLink.on('click', function(e) {
    e.preventDefault();

    var target = $(this).attr('href');
    $(target).modal();
  });





});
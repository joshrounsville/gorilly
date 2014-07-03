$(function() {

  // set booleans for window size
  var body = $('body');
  var isPhone = body.css('padding-bottom') === '1px';
  var isDesktop = body.css('margin-bottom') !== '1px';
  var notDesktop = body.css('margin-bottom') === '1px';


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
    var dataTop = affixEl.attr('data-top');
    var top = affixEl.offset().top;
        top = top - parseInt(dataTop, 10);
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

  var formScroll = function() {
    var formHeight = formEl.offset().top;
    var windowPosition;
    var formElPosition;

    $(window).on('scroll', function() {

      windowPosition = $(window).scrollTop() + 20;
      formElPosition = windowPosition - parseInt(formHeight);

      if ( windowPosition > formHeight ) {
        formEl.css('transform', 'translateY(' + formElPosition + 'px)').addClass('sticky');
      } else {
        formEl.css('transform', 'translateY(0)' ).removeClass('sticky');
      }

    });

  };

  if ( formEl.length ) {
    formScroll();
  }





  // bootstrap modal
  var modalLink = $('.modal-link');
  modalLink.on('click', function(e) {
    e.preventDefault();

    var target = $(this).attr('href');
    $(target).modal();
  });





});
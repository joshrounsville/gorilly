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


  // tab action
  var tabs = function() {

    var navWrap = $('.tab-nav');
    var nav = navWrap.find('a');
    var tab = $('.tab');
    var tabWrap = $('.tab-wrap');
    var formBtn = $('.tab .btn-form');
    var count = tab.length;

    nav.on('click', function(e) {
      e.preventDefault();

      var target = $(this).attr('data-target');
          target = $(tabWrap).find('.tab[data-tab=' + target + ']');

      tab.removeClass('active');
      nav.removeClass('active');

      target.addClass('active');
      $(this).addClass('active');
    });


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
        targetNav = navWrap.find('a[data-target=tab-' + nextTab + ']');

        if ( nextTab <= count ) {
          tab.removeClass('active');
          nav.removeClass('active');

          target.addClass('active');
          targetNav.addClass('active');
        }

      } else if ( $(this).hasClass('btn-back') ) {
        target = tabWrap.find('.tab[data-tab=tab-' + prevTab + ']');
        targetNav = navWrap.find('a[data-target=tab-' + prevTab + ']');

        if ( prevTab > 0 ) {
          tab.removeClass('active');
          nav.removeClass('active');

          target.addClass('active');
          targetNav.addClass('active');
        }

      }

    });

  };

  tabs();


});
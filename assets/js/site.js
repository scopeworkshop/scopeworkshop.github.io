$(document).ready(function () {
    var $navbar = $('.navbar'),
        $body = $('body'),
        $window = $(window),
        $hamSymb = $('[data-hamburger]'),
	$document = $(document),
        navOffsetTop;

    function init() {
        $window.on('scroll', onScroll);
        $window.on('resize', resize);
	$hamSymb.on('click', eatHamburger);
	$document.on('click', closeHamburger);
        $('a[href^="#"]:not([href="#"])').on('click', smoothScroll);
        resize();
    }
    
    function resize() {
	closeHamburger();
        $body.removeClass('has-docked-nav');
        navOffsetTop = $navbar.offset().top;
        onScroll();
	
    }

    function smoothScroll(e) {
        e.preventDefault();
	closeHamburger();
        var target = this.hash,
            $target = $(target),
            offset = $navbar.outerHeight();
        $(document).off("scroll", onScroll);
        $('html, body').animate({
            scrollTop: $target.offset().top - (1.5*offset)
        }, 600, 'swing', function () {
	    history.pushState(null, null, target);
            $(document).on("scroll", onScroll);
        });
    }

    function rotateHamburger(deg) {
	$hamSymb.css('transform', `rotate({$deg}deg)`);
    }
    
    function eatHamburger(e) {
	e.preventDefault();
	var hamburger = $($(e.currentTarget).data('hamburger'));
	if(!hamburger.hasClass('open')) {
	    rotateHamburger(90);
	} else {
	    rotateHamburger(0);
	}
	toggleHamburger();
	e.stopImmediatePropagation();
    }
    
    function toggleHamburger() {
	$('.hamburger').toggleClass('open');
    }

    function closeHamburger() {
	$('.hamburger').removeClass('open');
	rotateHamburger(0);
    }
 
    function onScroll() {
	closeHamburger();
        if ($window.scrollTop() > navOffsetTop && !$body.hasClass('has-docked-nav')) {
            $body.addClass('has-docked-nav');
        } else if ($window.scrollTop() <= navOffsetTop && $body.hasClass('has-docked-nav')) {
            $body.removeClass('has-docked-nav');
        }
    }

    init();
});


/*
 * ===== 左侧悬浮菜单栏补丁开始 =====
 * 这段代码添加了左侧悬浮菜单栏的交互功能
 */
$(document).ready(function() {
  // 显示悬浮菜单栏
  $('.floating-sidebar').show();
  
  // 移动设备菜单展开/折叠
  $('.floating-sidebar-toggle').on('click', function() {
    $('.floating-sidebar').toggleClass('expanded');
  });
  
  // 点击菜单项后滚动到对应位置
  $('.floating-sidebar-link').on('click', function(e) {
    e.preventDefault();
    var target = $(this).attr('href');
    var $target = $(target);
    
    // 滚动到目标位置
    $('html, body').animate({
      scrollTop: $target.offset().top - 20
    }, 600, 'swing', function() {
      history.pushState(null, null, target);
    });
    
    // 在移动设备上点击后折叠菜单
    $('.floating-sidebar').removeClass('expanded');
  });
  
  // 点击页面其他区域关闭移动设备上展开的菜单
  $(document).on('click', function(e) {
    if (!$(e.target).closest('.floating-sidebar').length) {
      $('.floating-sidebar').removeClass('expanded');
    }
  });
});
/* ===== 左侧悬浮菜单栏补丁结束 ===== */
/*
 * ===== 左侧悬浮菜单栏综合补丁 =====
 * 解决三个问题：缩窄悬浮框、修复移动设备汉堡菜单、添加标题链接
 */
$(document).ready(function() {
  // 显示悬浮菜单栏
  $('.floating-sidebar').show();
  
  // 移动设备菜单展开/折叠
  $('.floating-sidebar-toggle').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    $('.floating-sidebar').toggleClass('expanded');
  });
  
  // 点击菜单项后滚动到对应位置
  $('.floating-sidebar-link').on('click', function(e) {
    e.preventDefault();
    var target = $(this).attr('href');
    var $target = $(target);
    
    // 滚动到目标位置
    $('html, body').animate({
      scrollTop: $target.offset().top - 20
    }, 600, 'swing', function() {
      history.pushState(null, null, target);
    });
    
    // 在移动设备上点击后折叠菜单
    $('.floating-sidebar').removeClass('expanded');
  });
  
  // 标题链接点击事件 - 滚动到页面顶部
  $('.floating-sidebar-title-link').on('click', function(e) {
    e.preventDefault();
    
    // 滚动到页面顶部
    $('html, body').animate({
      scrollTop: 0
    }, 600, 'swing', function() {
      history.pushState(null, null, '#');
    });
    
    // 在移动设备上点击后折叠菜单
    $('.floating-sidebar').removeClass('expanded');
  });
  
  // 点击页面其他区域关闭移动设备上展开的菜单
  $(document).on('click', function(e) {
    if (!$(e.target).closest('.floating-sidebar').length) {
      $('.floating-sidebar').removeClass('expanded');
    }
  });
});
/* ===== 左侧悬浮菜单栏综合补丁结束 ===== */

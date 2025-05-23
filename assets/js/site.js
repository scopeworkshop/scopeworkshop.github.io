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
 * ===== 左侧悬浮菜单栏综合补丁 =====
 * 包含所有优化：缩窄悬浮框、优化汉堡菜单图标、添加标题链接
 */
$(document).ready(function() {
  // 显示悬浮菜单栏
  $('.floating-sidebar').show();
  
  // 确保在移动设备上正确显示汉堡图标
  function updateMenuVisibility() {
    if ($(window).width() <= 767) {
      // 移动设备上初始隐藏菜单项
      if (!$('.floating-sidebar').hasClass('expanded')) {
        $('.floating-sidebar-menu').hide();
      }
      $('.floating-sidebar-toggle').show();
    } else {
      // 非移动设备上始终显示菜单项，隐藏汉堡图标
      $('.floating-sidebar-menu').show();
      $('.floating-sidebar-toggle').hide();
    }
  }
  
  // 页面加载和窗口大小改变时更新菜单显示
  updateMenuVisibility();
  $(window).resize(updateMenuVisibility);
  
  // 点击汉堡图标切换菜单显示
  $('.floating-sidebar-toggle').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    $('.floating-sidebar').toggleClass('expanded');
    
    // 展开/折叠菜单项
    if ($('.floating-sidebar').hasClass('expanded')) {
      $('.floating-sidebar-menu').slideDown(300);
    } else {
      $('.floating-sidebar-menu').slideUp(300);
    }
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
    if ($(window).width() <= 767) {
      $('.floating-sidebar-menu').slideUp(300);
    }
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
    if ($(window).width() <= 767) {
      $('.floating-sidebar-menu').slideUp(300);
    }
  });
  
  // 点击页面其他区域关闭移动设备上展开的菜单
  $(document).on('click', function(e) {
    if (!$(e.target).closest('.floating-sidebar').length) {
      $('.floating-sidebar').removeClass('expanded');
      if ($(window).width() <= 767) {
        $('.floating-sidebar-menu').slideUp(300);
      }
    }
  });
});
/* ===== 左侧悬浮菜单栏综合补丁结束 ===== */

/*
 * ===== 移动端菜单展开问题修复补丁 =====
 * 解决移动端点击汉堡图标后无法展开菜单的问题
 */
$(document).ready(function() {
  // 显示悬浮菜单栏
  $('.floating-sidebar').show();
  
  // 确保汉堡图标在移动设备上可见
  if ($(window).width() <= 767) {
    $('.floating-sidebar-toggle').css('display', 'block');
    // 初始状态下隐藏菜单项
    $('.floating-sidebar-menu').hide();
  }
  
  // 重新绑定汉堡图标点击事件，使用更直接的方式
  $('.floating-sidebar-toggle').off('click').on('click', function(e) {
    console.log('汉堡图标被点击'); // 调试信息
    e.preventDefault();
    e.stopPropagation(); // 阻止事件冒泡
    
    // 切换菜单展开状态
    var $menu = $('.floating-sidebar-menu');
    var $sidebar = $('.floating-sidebar');
    
    if ($menu.is(':visible')) {
      console.log('菜单即将隐藏'); // 调试信息
      $menu.hide();
      $sidebar.removeClass('expanded');
    } else {
      console.log('菜单即将显示'); // 调试信息
      $menu.show();
      $sidebar.addClass('expanded');
    }
  });
  
  // 窗口大小改变时更新菜单显示状态
  $(window).resize(function() {
    if ($(window).width() <= 767) {
      // 移动设备上
      $('.floating-sidebar-toggle').css('display', 'block');
      // 如果没有展开，则隐藏菜单
      if (!$('.floating-sidebar').hasClass('expanded')) {
        $('.floating-sidebar-menu').hide();
      }
    } else {
      // 非移动设备上
      $('.floating-sidebar-toggle').css('display', 'none');
      $('.floating-sidebar-menu').show();
    }
  });
  
  // 点击页面其他区域关闭菜单
  $(document).on('click', function(e) {
    if ($(window).width() <= 767) {
      if (!$(e.target).closest('.floating-sidebar').length) {
        $('.floating-sidebar-menu').hide();
        $('.floating-sidebar').removeClass('expanded');
      }
    }
  });
  
  // 点击菜单项后关闭菜单
  $('.floating-sidebar-link').on('click', function(e) {
    if ($(window).width() <= 767) {
      $('.floating-sidebar-menu').hide();
      $('.floating-sidebar').removeClass('expanded');
    }
  });
});
/* ===== 移动端菜单展开问题修复补丁结束 ===== */

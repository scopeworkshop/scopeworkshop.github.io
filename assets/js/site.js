$(document).ready(() => {
  var $sidebar = $(".sidebar"),
    $body = $("body"),
    $window = $(window),
    $hamSymb = $("[data-hamburger]"),
    $document = $(document)

  function init() {
    $hamSymb.on("click", toggleHamburger)
    $document.on("click", closeHamburger)
    $('a[href^="#"]:not([href="#"])').on("click", smoothScroll)
  }

  function smoothScroll(e) {
    e.preventDefault()
    closeHamburger()
    var target = this.hash,
      $target = $(target)
    $(document).off("scroll")
    $("html, body").animate(
      {
        scrollTop: $target.offset().top - 20,
      },
      600,
      "swing",
      () => {
        history.pushState(null, null, target)
      },
    )
  }

  function rotateHamburger(deg) {
    $hamSymb.css("transform", `rotate(${deg}deg)`)
  }

  function toggleHamburger(e) {
    if (e) {
      e.preventDefault()
      e.stopImmediatePropagation()
    }

    var hamburger = $("#_hamburger")
    if (!hamburger.hasClass("open")) {
      rotateHamburger(90)
    } else {
      rotateHamburger(0)
    }
    hamburger.toggleClass("open")
  }

  function closeHamburger() {
    $(".hamburger").removeClass("open")
    rotateHamburger(0)
  }

  init()
})

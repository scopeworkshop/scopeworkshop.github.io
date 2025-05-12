import $ from "jquery"

$(document).ready(() => {
  var $floatingSidebar = $(".floating-sidebar"),
    $hamSymb = $("[data-hamburger]"),
    $document = $(document)

  function init() {
    $hamSymb.on("click", toggleHamburger)
    $document.on("click", (e) => {
      if (!$(e.target).closest(".floating-sidebar").length && !$(e.target).is($hamSymb)) {
        closeHamburger()
      }
    })
    $('a[href^="#"]:not([href="#"])').on("click", smoothScroll)

    // Mobile sidebar toggle
    $(".hamburger-text").on("click", (e) => {
      e.preventDefault()
      $floatingSidebar.toggleClass("expanded")
    })
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

  function toggleHamburger(e) {
    if (e) {
      e.preventDefault()
      e.stopImmediatePropagation()
    }

    var hamburger = $("#_hamburger")
    hamburger.toggleClass("open")
  }

  function closeHamburger() {
    $(".hamburger").removeClass("open")
    $floatingSidebar.removeClass("expanded")
  }

  init()
})

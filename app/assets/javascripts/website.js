$(document).ready(function () {
  $(".homemain .products").each(function () {
    var currentSlide = getRandomInt(10,15)*1000;
    var pre = "#" + $(this).parent().children('.title').children('.viewall').children(".btnPre").attr("id");
    var next = "#" + $(this).parent().children('.title').children('.viewall').children(".btnNext").attr("id");
    $(this).jCarouselLite({
      btnNext: next,
      btnPrev: pre,
      auto: currentSlide,
      speed: 1500,
      visible: 4,
      scroll: 3,
      vertical: false
    });
  })
})
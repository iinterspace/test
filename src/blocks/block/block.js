function posScroll(){
    var left = ($(".block__container").width() - $(".block__scroll").width())/2 ;
    if (left >= 0)
        $(".block__scroll").animate({scrollLeft: left}, 1);
}
$(window).resize(function(){
    posScroll();
});
posScroll();
if (device.desktop()) $(".block__scroll").niceScroll({cursorcolor:"#fff"});
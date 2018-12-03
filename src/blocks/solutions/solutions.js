function posScroll(){
    var left = ($(".solutions__container").width() - $(".solutions__scroll").width())/2 ;
    if (left >= 0)
        $(".solutions__scroll").animate({scrollLeft: left}, 1);
}
$(window).resize(function(){
    posScroll();
});
posScroll();
if (device.desktop()) $(".solutions__scroll").niceScroll({cursorcolor:"#fff"});
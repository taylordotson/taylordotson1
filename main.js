var parallaxElements = [];
var windowHeight = 0;
var speed = 2;

var requestAnimationFrame =
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;

window.requestAnimationFrame = requestAnimationFrame;

$(document).ready(function () {
    windowHeight = $(window).height();

    var touchSupported =
        "ontouchstart" in window ||
        (window.DocumentTouch && document instanceof DocumentTouch);

    if (touchSupported) {
        $(window).bind("touchmove", function (e) {
            var scroll = e.currentTarget.scrollY;
            Parallax(scroll);
        });
    } else {
        $(window).bind("scroll", function (e) {
            var scroll = $(this).scrollTop();
            Parallax(scroll);
        });
    }

    $(window).resize(function () {
        windowHeight = $(window).height();
    });
});

function Parallax(scrollTop) {
    $('[data-type="parallax"]').each(function () {
        var $this = $(this);
        var speed = $this.data("speed") || 0;
        var offset = $this.offset().top;
        var height = $this.outerHeight(true);

        if (offset + height <= scrollTop || offset >= scrollTop + windowHeight) {
            return;
        }

        var yPos = Math.round((scrollTop - offset) / speed);

        window.requestAnimationFrame(function () {
            $this.css("transform", "translate3d(0, " + yPos + "px, 0)");
            $this.css("-webkit-transform", "translate3d(0, " + yPos + "px, 0)");
        });
    });
}

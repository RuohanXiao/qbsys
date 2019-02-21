import $ from "jquery";
$(function () {

    var left = $('.left');
    var right = $('.right');
    var down = $('.down');
    var up = $('.up');
    var bg = $('.bgDiv');
    var leftNav = $('.leftNav');
    var rightNav = $('.rightNav');
    var downNav = $('.downNav');
    var upNav = $('.upNav');

    showNav(left, leftNav, "left");
    showNav(right, rightNav, "right");
    showNav(up, upNav, "up");
    showNav(down, downNav, "down");


    function showNav(btn, navDiv, direction) {
        btn.on('click', function () {
            bg.css({
                display: "block",
                transition: "opacity .5s"
            });
            if (direction == "right") {
                navDiv.css({
                    right: "0px",
                    transition: "right .5s"
                });
            } else if (direction == "left") {
                navDiv.css({
                    left: "0px",
                    transition: "left 1s"
                });
            } else if (direction == "up") {
                navDiv.css({
                    top: "0px",
                    transition: "top 1s"
                });
            } else if (direction == "down") {
                navDiv.css({
                    bottom: "0px",
                    transition: "bottom 1s"
                });
            }


        });
    }

    $('span').each(function () {
        var dom = $(this);
        dom.on('click', function () {
            hideNav();
            // alert(dom.text())
        });
    });


    bg.on('click', function () {
        hideNav();
    });

    function hideNav() {
        leftNav.css({
            left: "-47%",
            transition: "left .5s"
        });
        rightNav.css({
            right: "-22vw",
            transition: "right .5s"
        });
        bg.css({
            display: "none",
            transition: "display 1s"
        });
    }
});
"use strict";
$(function () {
    $(".menu-link").click(function () {
        $(".menu-link").removeClass("is-active");
        $(this).addClass("is-active");
    });
});
$(function () {
    $(".side-menu-inner").click(function () {
        $(".side-menu-inner").removeClass("side-menu-active");
        $(this).addClass("side-menu-active");
    });
});
$(function () {
    $(".main-header-link").click(function () {
        $(".main-header-link").removeClass("is-active");
        $(this).addClass("is-active");
    });
});
const dropdowns = document.querySelectorAll(".dropdown");
dropdowns.forEach((dropdown) => {
    dropdown.addEventListener("click", (e) => {
        e.stopPropagation();
        dropdowns.forEach((c) => c.classList.remove("is-active"));
        dropdown.classList.add("is-active");
    });
});
$(".search-bar input")
    .focus(function () {
    $(".header").addClass("wide");
})
    .blur(function () {
    $(".header").removeClass("wide");
});
$(document).click(function (e) {
    var container = $(".status-button");
    var dd = $(".dropdown");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
        dd.removeClass("is-active");
    }
});
$(function () {
    $(".dropdown").on("click", function (e) {
        $(".content-wrapper").addClass("overlay");
        e.stopPropagation();
    });
    $(document).on("click", function (e) {
        if ($(e.target).is(".dropdown") === false) {
            $(".content-wrapper").removeClass("overlay");
        }
    });
});
$(function () {
    $(".status-button:not(.open)").on("click", function (e) {
        $(".overlay-app").addClass("is-active");
    });
    $(".pop-up .close").click(function () {
        $(".overlay-app").removeClass("is-active");
    });
});
$(".status-button:not(.open)").click(function () {
    $(".pop-up").addClass("visible");
});
$(".pop-up .close").click(function () {
    $(".pop-up").removeClass("visible");
});
const toggleButton = document.querySelector('.dark-light');
toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
});


//It will show only coressponding Data related to field 
// $("#Worksheet-only").click(function () {
//     $("#Assignment-data").hide();
//     $("#Worksheet-data").show();
//     $("#Announcement-data").hide();
// });
// $("#Assignment-only").click(function () {
//     $("#Worksheet-data").hide();
//     $("#Assignment-data").show();
//     $("#Announcement-data").hide();
// });
// $("#Announcement-only").click(function () {
//     $("#Assignment-data").hide();
//     $("#Announcement-data").show();
//     $("#Worksheet-data").hide();
// });
$("#All-data").click(function () {
    $("#Assignment-data").show();
    $("#Announcement-data").show();
    $("#Worksheet-data").show();
});

//PupUp
let popup=document.getElementById("popup")
    function openPopup()
    {
      popup.classList.add("open-popup")
    }
     function closePopup()
    {
      popup.classList.remove("open-popup")
    }
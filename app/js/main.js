'use strict';
import * as $ from 'jquery';
import './jquery.validate.min.js';
import './jquery.inputmask.min';
import './slick.min';

window.addEventListener('load', function () {

    function OpenPopup(popupId) {
        $("body").removeClass("no-scrolling");
        $(".popup").removeClass("js-popup-show");
        popupId = "#" + popupId;
        $(popupId).addClass("js-popup-show");
        $("body").addClass("no-scrolling");
    }
    $(".pop-op").click(function (e) {
        e.preventDefault();
        let data = $(this).data("popup");
        OpenPopup(data);
    });
    function closePopup() {
        $(".js-close-popup").on("click", function (e) {
            e.preventDefault();
            $(".popup").removeClass("js-popup-show");
            $("body").removeClass("no-scrolling");
        });
    }
    closePopup();
    function clickClosePopup(popupId) {
        popupId = "#" + popupId;
        $(popupId).removeClass("js-popup-show");
        $("body").removeClass("no-scrolling");
    }
    function maskInit() {
        $(".phone-mask").inputmask({
            mask: "+7(999)999-99-99",
            clearIncomplete: true,
        });
    }
    maskInit();

    $(".popup-form-agree-item").click(function () {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
        } else {
            $(this).addClass("active");
        }
    });

    $(".register-btn").click(function () {
        let fieldsFlag = false;
        let agreeFlag = true;
        let name = $(this).parents(".popup-form").find("[name=name]").val();
        let phone = $(this).parents(".popup-form").find("[name=phone]").val();
        let email = $(this).parents(".popup-form").find("[name=email]").val();
        if (name.trim() != "" && phone.trim() != "" && email.trim() != "") {
            $(".popup-error").removeClass("active");
            fieldsFlag = true;
        } else {
            $(".popup-error").addClass("active");
            if (name.trim() == "" && phone.trim() != "" && email.trim() != "") {
                $(".popup-error").text("Заполните имя");
            }
            if (name.trim() != "" && phone.trim() == "" && email.trim() != "") {
                $(".popup-error").text("Заполните телефон");
            }
            if (name.trim() != "" && phone.trim() != "" && email.trim() == "") {
                $(".popup-error").text("Заполните почту");
            }
            if (name.trim() == "" && phone.trim() == "" && email.trim() != "") {
                $(".popup-error").text("Заполните имя и телефон");
            }
            if (name.trim() == "" && phone.trim() != "" && email.trim() == "") {
                $(".popup-error").text("Заполните имя и почту");
            }
            if (name.trim() != "" && phone.trim() == "" && email.trim() == "") {
                $(".popup-error").text("Заполните почту и телефон");
            }
            if (name.trim() == "" && phone.trim() == "" && email.trim() == "") {
                $(".popup-error").text("Заполните имя, почту и телефон");
            }
        }
        for (
            let i = 0;
            i < $(this).parents(".popup-form").find(".popup-form-agree-item").length;
            i++
        ) {
            if (
                !$(this)
                    .parents(".popup-form")
                    .find(".popup-form-agree-item")
                    .eq(i)
                    .hasClass("active")
            ) {
                agreeFlag = false;
            }
        }
        if (fieldsFlag && agreeFlag) {
            $(this)
                .parents(".popup-inner")
                .find(".popup-title")
                .text("Регистрация пройдена");
            $(this).parents(".popup-inner").find(".popup-form").addClass("disnone");
            $(this)
                .parents(".popup-inner")
                .find(".popup-form-done")
                .addClass("active");
        }
    });

    $(".sign-in-btn").click(function () {
        let email = $(this).parents(".popup-form").find("[name=email]").val();
        let password = $(this).parents(".popup-form").find("[name=password]").val();
        if (email.trim() == "123@gmail.com" && password.trim() == "1234") {
            $(".popup-error").removeClass("active");
            $(this).parents(".popup").removeClass("js-popup-show");
            $(this)
                .parents(".popup-form")
                .find(".popup-form-field")
                .removeClass("red");
        } else {
            $(".popup-error").addClass("active");
            $(".popup-error").text("Неверный логин или пароль");
            $(this).parents(".popup-form").find(".popup-form-field").addClass("red");
        }
    });

    (function mobMenu() {
        if(!document.querySelector('.header-nav')) {
            return;
        }

        document.querySelector('.mob-menu-btn')
            .addEventListener('click', function (e) {
                e.preventDefault();

                if (!this.classList.contains('active')) {
                    document.body.style.overflowY = 'hidden';
                }

                if (this.classList.contains('active')
                    && document.body.style.overflowY === 'hidden') {
                    document.body.style.overflowY = 'scroll';
                }

                this.classList.toggle('active');
                document.querySelector('.header-nav')
                    .classList.toggle('active');
                document.querySelector('.header')
                    .classList.toggle('active');
            })
    })();

    (function fixHeader() {

        const header = document.querySelector('.header');
        let sticky = header.offsetTop;

        if (document.querySelector('.header-nav')) {
            window.addEventListener('scroll', scrollHandler);
        }

        function scrollHandler() {
            if (window.pageYOffset > sticky) {
                header.classList.add("scroll");
            } else {
                header.classList.remove("scroll");
            }
        }
    })();

    (function accountSlider() {
        if (!document.querySelector('.account')) {
            return;
        }

        $('.account__main_round-slider').slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: '<div class="slick-prev"><span></span></div>',
            nextArrow: '<div class="slick-next"><span></span></div>',
            autoplay: false,
        });
    })();

    (function tooltips() {
        if (!document.querySelector('.tooltip')) {
            return;
        }

        const haveTooltipElements = [...document.querySelectorAll('.have-tooltip')];

        haveTooltipElements.forEach(h => {
            h.addEventListener('click', function (e) {
                e.preventDefault();

                const target = e.target;
                const tooltipName = target.dataset.tooltip;
                document.querySelector(`.${tooltipName}`)
                    .classList.toggle('active');
            })
        })
    })();

    (function winners() {
        if (!document.querySelector('.winners__wrap')) {
            return;
        }

        const wrap = document.querySelector('.winners__wrap');
        const tabs = [...wrap.querySelectorAll('.winners__tabs_item')];

        tabs.forEach(t => {
            t.addEventListener('click', function (e) {
                e.preventDefault();

                if (this.classList.contains('active')) {
                    return;
                }
                const category = this.dataset.winners;

                document.querySelector('.winners__tabs_item.active')
                    .classList.remove('active');
                document.querySelector('.winners__list.active')
                    .classList.remove('active');

                setTimeout(() => {
                    this.classList.add('active');
                    document.querySelector(`.winners__list.${category}`)
                        .classList.add('active');
                }, 300);
            })
        })
    })();
});
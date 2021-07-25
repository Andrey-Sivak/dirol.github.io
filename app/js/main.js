'use strict';
import * as $ from 'jquery';
import './jquery.validate.min.js';
import './jquery.inputmask.min';
import './slick.min';
import './select2.min';

window.addEventListener('load', function () {

    function maskInit() {
        $(".phone-mask").inputmask({
            mask: "+7(999)999-99-99",
            clearIncomplete: true,
        });
    }
    maskInit();

    $('.select2-hidden-accessible').select2();

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

    (function modal() {
        if (!document.querySelector('.popup')) {
            return;
        }

        const activeClass = 'js-popup-show';

        const modalBtns = [...document.querySelectorAll('[data-popup]')];

        modalBtns.forEach(m => {
           m.addEventListener('click', function (e) {
               e.preventDefault();

               const modalName = this.dataset.popup;

               if (document.querySelector(`.popup.${activeClass}`)) {
                   document.querySelector(`.popup.${activeClass}`)
                       .classList.remove(activeClass);
               }

               const currentModal = document.querySelector(`[data-modal="${modalName}"]`);

               currentModal.classList.add(activeClass);
               document.body.classList.add('no-scrolling');
               currentModal.addEventListener('click', function (e) {
                   if (e.target.dataset.close) {
                       e.preventDefault();
                       modalClose(currentModal);
                   }
               })


           })
        });

        function modalClose(modal) {
           modal.classList.remove(activeClass);
            document.body.classList.remove('no-scrolling');
        }

    })();

    (function checkValidate() {
        const form = $('form');

        $.each(form, function () {
            $(this).validate({
                ignore: [],
                errorClass: 'error',
                validClass: 'success',
                rules: {
                    fio: {
                        required: true
                    },
                    FName: {
                        required: true
                    },
                    SName: {
                        required: true
                    },
                    phone: {
                        required: true,
                        // PhoneNumber: true
                    },
                    email: {
                        required: true,
                        // Email: true
                    },
                    checkbox1: {
                        required: true
                    },
                    checkbox2: {
                        required: true
                    },
                    checkbox3: {
                        required: true
                    },
                    region: {
                        required: true
                    },
                    city: {
                        required: true
                    },
                    street: {
                        required: true
                    },
                    house: {
                        required: true
                    },
                    flat: {
                        required: true
                    },
                    size: {
                        required: true
                    },
                    password: {
                        required: true,
                        normalizer: function normalizer(value) {
                            return $.trim(value);
                        }
                    }
                },
                errorElement: 'span',
                errorPlacement: function (error, element) {
                    var placement = $(element).data('error');
                    if (placement) {
                        $(placement).append(error);
                    } else {
                        error.insertBefore(element);
                    }
                },
                messages: {
                    PhoneNumber: 'Некорректный номер',
                    Email: 'Некорректный e-mail'
                }
            });
        });
        $.validator.addMethod('Email', function (value, element) {
            return this.optional(element) || /\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6}/.test(value);
        });
        $.validator.addMethod('PhoneNumber', function (value, element) {
            return this.optional(element) || /\+7\(\d+\)\d{3}-\d{2}-\d{2}/.test(value);
        });
    })();
});
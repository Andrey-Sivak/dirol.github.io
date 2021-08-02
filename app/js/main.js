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

    function cardValidation() {
        $(".card-input").inputmask({
            mask: "9999-9999-9999-9999",
            clearIncomplete: true,
        });
    }

    cardValidation();

    (function menu() {
        if (!document.querySelector('.header-nav')) {
            return;
        }

        if (!document.getElementById('presents')) {
            return;
        }

        const prizes = document.getElementById('presents');
        let sticky = prizes.offsetTop - 275;

        const prizesMenuItem = [...document.querySelectorAll('.header-nav-item > a')]
            .filter(h => h.innerHTML === 'Призы')[0];

        const mainMenuItem = [...document.querySelectorAll('.header-nav-item > a')]
            .filter(h => h.innerHTML === 'Главная')[0];

        prizesMenuItem.addEventListener('click', function(e) {
            if (document.querySelector('.header-nav').classList.contains('active')) {

                document.querySelector('.header-nav').classList.remove('active');
                document.body.style.overflowY = 'scroll';
                document.querySelector('.header').classList.remove('active');
                document.querySelector('.mob-menu-btn').classList.remove('active');
            }

            if (!this.classList.contains('active')) {
                this.classList.add('active');
            }
        });

        if (window.pageYOffset > sticky) {
            mainMenuItem.parentElement.classList.remove("active");
            prizesMenuItem.parentElement.classList.add("active");
        }

        window.addEventListener('scroll', scrollPrizes);

        function scrollPrizes() {
            if (window.pageYOffset > sticky) {
                mainMenuItem.parentElement.classList.remove("active");
                prizesMenuItem.parentElement.classList.add("active");
            } else {
                prizesMenuItem.parentElement.classList.remove("active");
                mainMenuItem.parentElement.classList.add("active");
            }
        }
    })();

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

            if (window.pageYOffset > sticky) {
                header.classList.add("scroll");
            }

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

        const slider = $('.account__main_round-slider');
        const loader = document.querySelector('.loader');

        $(slider).slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: '<div class="slick-prev"><span></span></div>',
            nextArrow: '<div class="slick-next"><span></span></div>',
            autoplay: false,
        });

        loader.parentElement.removeChild(loader);
        slider.removeClass('hide');
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
                    card: {
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
                    theme: {
                        required: true
                    },
                    mess: {
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

    (function productSlider() {
        if (!document.querySelector('.product__slider')) {
            return;
        }

        const loader = document.querySelector('.loader') || null;
        const slider = $('.product__slider');

        $(slider).slick({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            prevArrow: '<div class="slick-prev"><span></span></div>',
            nextArrow: '<div class="slick-next"><span></span></div>',
            autoplay: false,
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                    }
                }
            ]
        });

        if (loader && slider.hasClass('hide')) {
            loader.parentElement.removeChild(loader);
            slider.removeClass('hide');
        }
    })();


//

    if ($('.select').length > 1) {
        $('select.sl').each(function () {
            let $this = $(this).not('.select-search');
            let parent = $(this).not('.select-search').parents('.select');
            $this.select2({
                minimumResultsForSearch: Infinity,
                dropdownParent: parent
            });
        });
        $('.select-search').each(function () {
            let $this = $(this);
            let parent = $(this).parents('.select');
            $this.select2({
                dropdownParent: parent
            });
        });
    } else {
        $('select.sl').select2({
            minimumResultsForSearch: Infinity,
            dropdownParent: $('.select')
        });
    }

    $('.select-search').each(function () {
        let $this = $(this);
        let parent = $(this).parents('.select');
        $this.select2({
            minimumResultsForSearch: 0,
            dropdownParent: parent,
            language: {
                noResults: function (params) {
                    return "Найдено 0 строк";
                }
            }
        });
    });

    /*(function feedbackForm() {
        if (!document.querySelector('.feedback__form')) {
            return;
        }

        const form = document.querySelector('.feedback__form');
        let filledInputs = [];
        const inputs = [...form.querySelectorAll('.feedback__form_input')];

        inputs.forEach(i => {
            if (i.value !== '') {
                filledInputs.push(i);
            }

            i.addEventListener('input', function (e) {
                const val = this.value;
                if (filledInputs.includes(this) && val === '') {
                    filledInputs = filledInputs.filter(f => f !== this);
                } else if (!filledInputs.includes(this) && val !== '') {
                    filledInputs.push(this);
                }
            })
        });
    })();*/

    (function faq() {
        if (!document.querySelector('.feedback__faq_wrap')) {
            return;
        }

        const items = [...document.querySelector('.feedback__faq_wrap').children];

        items.forEach(i => {
            i.addEventListener('click', function (e) {
                if (e.target.classList.contains('feedback__faq_ask')) {
                    i.classList.toggle('active');
                }
            })
        })
    })();
});
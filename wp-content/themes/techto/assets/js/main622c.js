/**
*
* --------------------------------------------------------------------
*
* Template : techto – Industry & Factory WordPress Theme
* Author : rs-theme
* Author URI : http://www.rstheme.com
*
* --------------------------------------------------------------------
*
**/

(function ($) {
    "use strict";
    // sticky menu
    if ($('.rs-enable-sticky').length) {
        let lastScrollTop = 0;
        window.addEventListener("scroll", function () {
            var scrollY = window.pageYOffset;
            let key = scrollY || document.documentElement.scrollTop;
            let targetElement = document.getElementById('rs-header');
            if ($('.rs-onepage-header, .rs-sticky-flyout-off').length) {
                if (scrollY < 200) {
                    targetElement.classList.remove("sicky-add");
                } else {
                    targetElement.classList.add("sicky-add");
                }
            } else {
                if (window.pageYOffset < 200) {
                    targetElement.classList.remove("sicky-add");
                } else if (document.documentElement.scrollTop > lastScrollTop) {
                    targetElement.classList.remove("sicky-add");
                } else {
                    targetElement.classList.add("sicky-add");
                }
                lastScrollTop = key <= 200 ? 0 : key;
            }
        }, false);
    }

    // Smooth Scroling
    if ($('.rs-smoother-yes').length) {
        const lenis = new Lenis({
            smoothWheel: true,
            wheelMultiplier: 1.2,
            duration: 1.5,
            lerp: 0.1,
        });
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Handle scroll animation for anchor links
        document.querySelectorAll('a[href^="#"]').forEach((el) => {
            el.addEventListener('click', (e) => {
                e.preventDefault()
                const id = el.getAttribute('href')?.slice(1)
                if (!id) return
                const target = document.getElementById(id)
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' })
                }
            })
        });

        // Function to handle lenis prevent for dynamic select woo checkout
        if ($('body.woocommerce-checkout').length) {
            const lenisPreventDynamic = () => {
                document.querySelectorAll('.select2-results__options:not([data-lenis-prevent])').forEach((el) => {
                    el.setAttribute('data-lenis-prevent', '');
                });
            };
            const observer = new MutationObserver((mutationsList) => {
                mutationsList.forEach((mutation) => {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === 1 && node.matches('.select2-results__options')) {
                            lenisPreventDynamic();
                        } else if (node.nodeType === 1 && node.querySelector('.select2-results__options')) {
                            lenisPreventDynamic();
                        }
                    });
                });
            });
            observer.observe(document.body, {
                childList: true,
                subtree: true,
            });
            lenisPreventDynamic();
        }
    }

    if ($().niceScroll) {
        if ($(window).width() > 991) {
            $('body, html').addClass('rs-scrollbar');
            $("body").niceScroll({
                cursorcolor: scroll_data.cursorcolor,
                horizrailenabled: false,
                cursorwidth: scroll_data.cursor_width,
                cursorminheight: scroll_data.cursorminheight,
                scrollspeed: scroll_data.scrollspeed,
                mousescrollstep: scroll_data.mousescrollstep,
                autohidemode: 'false',
                cursorborder: "0px solid #fff", // css definition for cursor border
                cursorborderradius: "0px", // border radius in pixel for cursor
                background: scroll_data.rail_bg,
                overflowy: 'false'
            });
        }
    }

    // Theia Stick
    var $theiaStickyElements = $('.contents-sticky, .sticky-sidebar');
    if ($theiaStickyElements.length) {
        var additionalMarginTop = 160;
        $theiaStickyElements.theiaStickySidebar({
            additionalMarginTop: additionalMarginTop,
            additionalMarginBottom: 20
        });
    }

    // Copyright Get The Live Year
    var $currentYearElement = $("#current-year");
    if ($currentYearElement.length > 0) {
        var cprcurrentYear = new Date().getFullYear();
        $currentYearElement.text(cprcurrentYear);
        setInterval(function () {
            var cprupdatedYear = new Date().getFullYear();
            if (cprupdatedYear !== cprcurrentYear) {
                $currentYearElement.text(cprupdatedYear);
                cprcurrentYear = cprupdatedYear;
            }
        }, 1000);
    }

    $(".widget_nav_menu li a").filter(function () {
        return $.trim($(this).html()) == '';
    }).hide();

    $(".menu-area .navbar ul > li.menu-item-has-children").on('hover', function () {
        $(this).addClass('hover-minimize');
    },
        function () {
            $(this).removeClass("hover-minimize");
        }
    );

    //search
    $('.search_icons').on('click', function (event) {
        $('.rs_stickys_form').slideToggle('show');
        $(this).toggleClass('icon_close');
    });

    $('.sticky_search').on('click', function () {
        $('body').removeClass('search-active').removeClass('search-close');
        if ($(this).hasClass('close-full')) {
            $('body').addClass('search-close');
        }
        else {
            $('body').addClass('search-active');
        }
        return false;
    });

    $('.nav-link-container').on('click', function (e) {
        $('body.on-offcanvas').removeClass('on-offcanvas');
        setTimeout(function () { $('body').addClass('on-offcanvas'); }, 500);
    });

    $('.sticky_form_search').on('click', function () {
        $('body, html').removeClass('rs-search-active').removeClass('rs-search-close');
        if ($(this).hasClass('close-search')) {
            $('body, html').addClass('rs-search-close');

        }
        else {
            $('body, html').addClass('rs-search-active');
        }
        return false;
    });

    $("#rs-header ul > li.classic").on('hover',
        function () {
            $('body').addClass('mega-classic');
        },
        function () {
            $('body.mega-classic').removeClass("mega-classic");
        }
    );

    // Canvas Menu Js
    $(".nav-link-container > a").off("click").on("click", function (event) {
        event.preventDefault();
    });

    // Get a quote popup
    $('.popup-quote').magnificPopup({
        type: 'inline',
        preloader: false,
        focus: '#qname',
        removalDelay: 500, //delay removal by X to allow out-animation
        // When elemened is focused, some mobile browsers in some cases zoom in
        // It looks not nice, so we disable it:
        callbacks: {
            beforeOpen: function () {
                this.st.mainClass = this.st.el.attr('data-effect');
                if ($(window).width() < 700) {
                    this.st.focus = false;
                } else {
                    this.st.focus = '#qname';
                }
            }
        }
    });

    // Magnific Popup Box
    var rsaddon_PRObox = $('.rsaddon_pro_box');
    if (rsaddon_PRObox.length) {
        $('.rsaddon_pro_box').magnificPopup({
            delegate: '.pointer-events',
            removalDelay: 500,
            callbacks: {
                beforeOpen: function () {
                    this.st.mainClass = this.st.el.attr('data-effect');
                }
            },
            midClick: true
        });
    }

    // Portfolio Single Carousel
    if ($('.portfolio-carousel').length) {
        $('.portfolio-carousel').owlCarousel({
            loop: true,
            nav: true,
            autoHeight: true,
            items: 1
        })
    }

    // blog init
    $(".blog-carousel").each(function () {
        var options = $(this).data('carousel-options');
        $(this).owlCarousel(options);
    });

    $(".rs-products-grid .product-btn .button").addClass("ri-shopping-basket-2-line");

    //Videos popup jQuery activation code
    $('.popup-videos, .popup-border').magnificPopup({
        disableOn: 10,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,

        fixedContentPos: false
    });

    // collapse hidden
    $(function () {
        var navMain = $(".navbar-collapse");
        navMain.on("click", "a:not([data-toggle])", null, function () {
            navMain.collapse('hide');
        });
    });

    //Select box wrap css
    $(".menu-area .navbar ul > li.mega > ul.sub-menu").wrapInner("<div class='container flex-mega'></div>");
    $('.menu-area .navbar ul > li.mega > ul.sub-menu li').first().addClass('first-li-item');


    if ($('div').hasClass('openingfoot')) {
        $('body').addClass('openingfootwrap');
    }

    if ($('nav').hasClass('absolute-position')) {
        $('header.elementor-section').addClass('absolute-header');
    }

    if ($('body').hasClass('page-template-page-single2')) {
        $('body').addClass('page-template-page-single page-template-page-single-php');
    }
    //preloader
    $(window).on('load', function () {
        $("#pre-load").delay(600).fadeOut(500);
        $(".pre-loader").delay(600).fadeOut(500);

        if ($(window).width() < 992) {
            $('.rs-menu').css('height', '0');
            $('.rs-menu').css('opacity', '0');
            $('.rs-menu').css('z-index', '-1');
            $('.rs-menu-toggle').on('click', function () {
                $('.rs-menu').css('opacity', '1');
                $('.rs-menu').css('z-index', '1');
            });
        }

        setTimeout(function () {
            $('#pre-load .cancel-loader').animate({ opacity: 1 }, 500);
        }, 5000);

        $('#pre-load .cancel-loader').on('click', function () {
            $("#pre-load, .pre-loader").stop(true, true).fadeOut(300);
        });
    });


    /*image loaded portfolio init*/
    if ($('.grid').length) {
        $('.grid').imagesLoaded(function () {
            $('.portfolio-filter').on('click', 'button', function () {
                var filterValue = $(this).attr('data-filter');
                $grid.isotope({
                    filter: filterValue
                });
            });
            var $grid = $('.grid').isotope({

                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false
                },

                itemSelector: '.grid-item',
                percentPosition: true,
                masonry: {
                    columnWidth: '.grid-item',
                }
            });
        });
    }

    // Team Social Icon Collaps Button
    $('.team_social_collaps_btn').on('click', function () {
        $(this).parents('.team-inner-wrap').toggleClass('is-open')
    });

    // portfolio Filter
    $('.portfolio-filter button').on('click', function (event) {
        $(this).siblings('.active').removeClass('active');
        $(this).addClass('active');
        event.preventDefault();
    });

    // magnificPopup init
    $('.image-popup').magnificPopup({
        type: 'image',
        callbacks: {
            beforeOpen: function () {
                this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure animated zoomInDown');
            }
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
            titleSrc: function (item) {
                return '<div class="gallery-title-wrap"><h3>' + item.el.attr('title') + '</h3>' + '<p>' + item.el.attr('caption') + '</p></div>';
            }
        },
        gallery: {
            enabled: true
        }
    });

    // scrollTop init
    var win = $(window);
    var totop = $('#scrollUp');
    win.on('scroll', function () {
        var scrollTop = win.scrollTop();
        var docHeight = $(document).height();
        var windowHeight = win.height();
        var scrollPercent = (scrollTop) / (docHeight - windowHeight);
        var progressOffset = 113.1 - (scrollPercent * 113.1);
        $('.progress-circle').css('stroke-dashoffset', progressOffset);

        if (scrollTop > 150) {
            totop.fadeIn();
        } else {
            totop.fadeOut();
        }
    });
    totop.on('click', function () {
        $("html,body").animate({
            scrollTop: 0
        }, 500);
    });

    $(".comment-body, .comment-respond").wrap("<div class='comment-full'></div>");
    $(".wpcf7-form-control.wpcf7-select").each(function () {
        $(this).wrap("<em class='select-full'></em>");
    });
    $('.rs-heading .description p:empty').remove();
    $(".woocommerce-product-gallery, .summary.entry-summary").wrapAll("<div class='rs-wrap-summery'></div>");
    $(".form-row.form-row-first, .form-row.form-row-last").wrapAll("<div class='rs-wrap-coupon'></div>");
    $("ul.children").addClass("sub-menu");
    $(".blog .rs-blog .blog-item, .archive .rs-blog .blog-item").last().addClass("last--child");
    $('.popup-text-video').addClass('expand');

    // mobile Menu
    $('.menu-wrap-off a').each(function () {
        var href = $(this).attr("href");
        if (href == "#") {
            $(this).addClass('hash');
        } else {
            $(this).removeClass('hash');
        }
    });


    $.fn.menumaker = function (options) {
        var mobile_menu = $(this), settings = $.extend({
            format: "dropdown",
            sticky: false
        }, options);

        return this.each(function () {
            mobile_menu.find('li ul').parent().addClass('has-sub');
            var multiTg = function () {
                mobile_menu.find(".has-sub").prepend('<span class="submenu-button"></span>');
                mobile_menu.find(".hash").parent().addClass('hash-has-sub');
                mobile_menu.find('.submenu-button').on('click', function () {
                    $(this).toggleClass('submenu-opened');
                    if ($(this).siblings('ul').hasClass('open-sub')) {
                        $(this).siblings('ul').removeClass('open-sub').hide('fadeIn');
                        $(this).siblings('ul').hide('fadeIn');
                    }
                    else {
                        $(this).siblings('ul').addClass('open-sub').hide('fadeIn');
                        $(this).siblings('ul').slideToggle().show('fadeIn');
                    }
                });
            };

            if (settings.format === 'multitoggle') multiTg();
            else mobile_menu.addClass('dropdown');
            if (settings.sticky === true) mobile_menu.css('position', 'fixed');
            var resizeFix = function () {
                if ($(window).width() > 991) {
                    mobile_menu.find('ul').show('fadeIn');
                    mobile_menu.find('ul.sub-menu').hide('fadeIn');
                }
            };
            resizeFix();
            return $(window).on('resize', resizeFix);
        });
    };

    $(document).ready(function () {
        $("#mobile_menu").menumaker({
            format: "multitoggle"
        });

        $(".odometer").html("0");
        $('.odometer').appear(function (e) {
            var odo = $(".odometer");
            odo.each(function () {
                var countNumber = $(this).attr("data-count");
                $(this).html(countNumber);
            });
        });

        //Offcanvas js
        function resizeNav() {
            $(".menu-ofcn").css({ "height": window.innerHeight });
            var radius = Math.sqrt(Math.pow(window.innerHeight, 2) + Math.pow(window.innerWidth, 2));
            var diameter = radius * 2;
            $(".off-nav-layer").width(diameter);
            $(".off-nav-layer").height(diameter);
            $(".off-nav-layer").css({ "margin-top": -radius, "margin-left": -radius });
        }
        $(".menu-button, .close-button, .offwrap").on('click', function () {
            $(".nav-toggle, .menu-ofcn, .close-button, body").toggleClass("off-open");
        });
        $(window).resize(resizeNav);
        resizeNav();
    });

    //woocommerce quantity style
    if (!String.prototype.getDecimals) {
        String.prototype.getDecimals = function () {
            var num = this,
                match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
            if (!match) {
                return 0;
            }
            return Math.max(0, (match[1] ? match[1].length : 0) - (match[2] ? +match[2] : 0));
        }
    }

    // woocommerce Quantity "plus" and "minus" buttons
    $(document.body).on('click', '.plus, .minus', function () {
        var $qty = $(this).closest('.quantity').find('.qty'),
            currentVal = parseFloat($qty.val()),
            max = parseFloat($qty.attr('max')),
            min = parseFloat($qty.attr('min')),
            step = $qty.attr('step');
        // Format values
        if (!currentVal || currentVal === '' || currentVal === 'NaN') currentVal = 0;
        if (max === '' || max === 'NaN') max = '';
        if (min === '' || min === 'NaN') min = 0;
        if (step === 'any' || step === '' || step === undefined || parseFloat(step) === 'NaN') step = 1;

        // Change the value
        if ($(this).is('.plus')) {
            if (max && (currentVal >= max)) {
                $qty.val(max);
            } else {
                $qty.val((currentVal + parseFloat(step)).toFixed(step.getDecimals()));
            }
        } else {
            if (min && (currentVal <= min)) {
                $qty.val(min);
            } else if (currentVal > 0) {
                $qty.val((currentVal - parseFloat(step)).toFixed(step.getDecimals()));
            }
        }

        // Trigger change event
        $qty.trigger('change');
    });

    $('.cd-words-wrapper p').html(function () {
        var text = $(this).text().split(' ');
        var last = text.pop();
        return text.join(" ") + (text.length > 0 ? ' <span class="last">' + last + '</span>' : last);
    });

    //canvas menu
    var navexpander = $('.nav-expander, .nav-expander2');
    if (navexpander.length) {
        $('.nav-expander, .nav-expander2, .rsoffwrap, .rsoffwrap-close').on('click', function (e) {
            e.preventDefault();
            $('body').toggleClass('nav-expanded');
        });
        $('ul.rs_onepage_mobile_menu li a, .right_menu_togle .widget_media_gallery .gallery-item div a').on('click', function (e) {
            $('body').toggleClass('nav-expanded');
        });
    }

    $('.accordion-menu-wrapper button').on('click', function () {
        $('.accordion-menu-wrapper button').removeClass('show');
    });

    if ($('.first-word, .first-word-yes').length > 0) {
        $('.first-word, .first-word-yes').each(function () {
            var text = $(this).text();
            var words = text.split(' ');
            words[0] = '<span class="word-active">' + words[0] + '</span>';
            var modifiedText = words.join(' ');
            $(this).html(modifiedText);
        });
    }

})(jQuery);
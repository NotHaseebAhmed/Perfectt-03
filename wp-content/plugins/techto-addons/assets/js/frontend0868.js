(function ($) {
    "use strict";

    // Function to handle "rs-lettering-text"
    const letteringTextHandler = function () {
        if ($(".rs-lettering-text").length) {
            $(".rs-lettering-text").each(function () {
                const sentence = $(this).text().trim();
                let wrappedSentence = "";
                const useEm = !$(this).hasClass("style2");

                for (let i = 0; i < sentence.length; i++) {
                    wrappedSentence += useEm 
                        ? `<span><em>${sentence[i]}</em></span>` 
                        : `<span class="char${[i]}">${sentence[i]}</span>`;
                }

                $(this).html(wrappedSentence);
            });
        }
    };

    // Function for handling "draw-line" elements
    const headingJsHandler = function ($scope, $) {
        const drawLines = $scope.find(".draw-line");
        if (!drawLines.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add("start-draw");
                    }, 300);
                } else {
                    entry.target.classList.remove("start-draw");
                }
            });
        }, { threshold: 0.1 });

        drawLines.each((_, drawLine) => observer.observe(drawLine));
    };

    // Function for handling "rs-highlight" elements
    const handleHighlight = () => {
        const sections = document.querySelectorAll(".rs-highlight");
        if (!sections.length) return;

        sections.forEach((section) => {
            const thresholdClass = [...section.classList].find(cls => cls.startsWith("threshold-"));
            const threshold = thresholdClass ? parseFloat(thresholdClass.split("-")[1]) : 0.4;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("in-view");
                    } else {
                        entry.target.classList.remove("in-view");
                    }
                });
            }, { root: null, threshold });

            observer.observe(section);
        });
    };

    // Function to mouse move parallax effect
    const handleParallax = () => {
        if ($('.rs-parallax-parent').length) {
            $(".rs-parallax-parent").each(function () {
                var $wrapper = $(this);

                if ($wrapper.hasClass("parallax-initialized")) return;
                $wrapper.addClass("parallax-initialized");

                let $elements = $wrapper.find(".rs-parallax-child");

                $elements.each(function () {
                    let $original = $(this);
                    let depthClass = ($original.attr("class").match(/parallax-depth-(\d+)/) || [])[1];
                    let movement = parseInt(depthClass, 10) || 30;

                    let $element = $original;

                    if ($original.hasClass("elementor-widget")) {
                        const inner = $original.find(".elementor-widget-container > div");
                        if (inner.length) {
                            $element = inner;
                        }
                    }
                    
                    let targetX = 0, targetY = 0;
                    let currentX = 0, currentY = 0;
                    let isHovering = false;

                    function animate() {
                        if (!isHovering) return;
                        currentX += (targetX - currentX) * 0.1;
                        currentY += (targetY - currentY) * 0.1;
                        $element.css("transform", `translate(${currentX}px, ${currentY}px)`);
                        requestAnimationFrame(animate);
                    }

                    $wrapper.on("mouseenter", function () {
                        isHovering = true;
                        requestAnimationFrame(animate);
                    });

                    $wrapper.on("mousemove", function (e) {
                        const offset = $wrapper.offset();
                        const width = $wrapper.outerWidth();
                        const height = $wrapper.outerHeight();
                        const relX = e.pageX - offset.left;
                        const relY = e.pageY - offset.top;
                        targetX = ((relX - width / 2) / width) * movement;
                        targetY = ((relY - height / 2) / height) * movement;
                    });

                    $wrapper.on("mouseleave", function () {
                        isHovering = false;
                        const resetInterval = setInterval(() => {
                            currentX += (0 - currentX) * 0.1;
                            currentY += (0 - currentY) * 0.1;
                            $element.css("transform", `translate(${currentX}px, ${currentY}px)`);
                            if (Math.abs(currentX) < 0.5 && Math.abs(currentY) < 0.5) {
                                clearInterval(resetInterval);
                                $element.css("transform", "translate3d(0px, 0px, 0)");
                            }
                        }, 16);
                    });
                });

            });
        }
    };

    // Initialize all functions
    const initObservers = () => {
        letteringTextHandler();
        handleHighlight();
    };

    // Elementor hooks for frontend and editor
    $(window).on("elementor/frontend/init", () => {
        const isEditMode = elementorFrontend.isEditMode();

        elementorFrontend.hooks.addAction("frontend/element_ready/rs-heading.default", headingJsHandler);

        if (isEditMode) {
            elementorFrontend.hooks.addAction("frontend/element_ready/global", () => {
                initObservers();

                $(document).ready( function() {
                    handleParallax();
                });
            });
        } else {
            $(document).ready( function() {
                initObservers();
                handleParallax();
            });
        }
    });
    $(window).on("elementor/frontend/init", () => {
        $(window).on('elementor:init', () => {
            elementor.on('preview:loaded', () => {
                console.log('Preview loaded');
            });
        });
    });

})(jQuery);


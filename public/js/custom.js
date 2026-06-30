(function ($) {
	"use strict";

	$(window).on('load', function () {
		$('.preloader').fadeOut();
		$('#preloader').delay(550).fadeOut('slow');
		$('body').delay(450).css({
			'overflow': 'visible'
		});
	});

	$(window).on('scroll', function () {
		if ($(window).scrollTop() > 50) {
			$('.main-header').addClass('fixed-menu');
		} else {
			$('.main-header').removeClass('fixed-menu');
		}
	});

	/* Gallery */
	if ($.fn.superslides) {
		$('#slides-shop').superslides({
			inherit_width_from: '.cover-slides',
			inherit_height_from: '.cover-slides',
			play: 5000,
			animation: 'fade'
		});
	}

	$(".cover-slides ul li").append("<div class='overlay-background'></div>");

	/* Back To Top */
	$(window).on('scroll', function () {
		if ($(this).scrollTop() > 100) {
			$('#back-to-top').fadeIn();
		} else {
			$('#back-to-top').fadeOut();
		}
	});

	$('#back-to-top').click(function () {
		$("html, body").animate({
			scrollTop: 0
		}, 600);
		return false;
	});

	/* Special Menu */
	if ($.fn.imagesLoaded && $.fn.isotope) {
		var Container = $('.container');

		Container.imagesLoaded(function () {
			var $grid = $('.special-list').isotope({
				itemSelector: '.special-grid'
			});

			$('.special-menu').on('click', 'button', function () {
				$(this).addClass('active').siblings().removeClass('active');

				var filterValue = $(this).attr('data-filter');

				$grid.isotope({
					filter: filterValue
				});
			});
		});
	}

	/* BaguetteBox */
	if (typeof baguetteBox !== "undefined") {
		baguetteBox.run('.tz-gallery', {
			animation: 'fadeIn',
			noScrollbars: true
		});
	}

	/* Offer Box */
	if ($.fn.inewsticker) {
		$('.offer-box').inewsticker({
			speed: 3000,
			effect: 'fade',
			dir: 'ltr',
			font_size: 13,
			color: '#ffffff',
			font_family: 'Montserrat, sans-serif',
			delay_after: 1000
		});
	}

	/* Tooltip */
	if ($.fn.tooltip) {
		$('[data-toggle="tooltip"]').tooltip();
	}

	/* Instagram Carousel */
	if ($.fn.owlCarousel) {
		$('.main-instagram').owlCarousel({
			loop: true,
			margin: 0,
			dots: false,
			autoplay: true,
			autoplayTimeout: 3000,
			autoplayHoverPause: true,
			navText: [
				"<i class='fas fa-arrow-left'></i>",
				"<i class='fas fa-arrow-right'></i>"
			],
			responsive: {
				0: { items: 2, nav: true },
				600: { items: 4, nav: true },
				1000: { items: 8, nav: true, loop: true }
			}
		});

		$('.featured-products-box').owlCarousel({
			loop: true,
			margin: 0,
			dots: false,
			autoplay: true,
			autoplayTimeout: 3000,
			autoplayHoverPause: true,
			navText: [
				"<i class='fas fa-arrow-left'></i>",
				"<i class='fas fa-arrow-right'></i>"
			],
			responsive: {
				0: { items: 1, nav: true },
				600: { items: 3, nav: true },
				1000: { items: 4, nav: true, loop: true }
			}
		});
	}

	/* Slider Range REMOVED */
	/* This was causing:
	   $(...).slider is not a function
	*/

	/* NiceScroll */
	if ($.fn.niceScroll) {
		$(".brand-box").niceScroll({
			cursorcolor: "#9b9b9c"
		});
	}

})(jQuery);
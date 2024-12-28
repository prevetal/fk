WW = window.innerWidth || document.clientWidth || document.getElementsByTagName('body')[0].clientWidth
WH = window.innerHeight || document.clientHeight || document.getElementsByTagName('body')[0].clientHeight
BODY = document.getElementsByTagName('body')[0]


document.addEventListener('DOMContentLoaded', function () {
	// Mini popups
	$('.mini_modal_btn').click(function(e) {
		e.preventDefault()

		const modalId = $(this).data('modal-id')

		if ($(this).hasClass('active')) {
			$(this).removeClass('active')
			$('.mini_modal').removeClass('active')

			if (is_touch_device()) $('body').css('cursor', 'default')
		} else {
			$('.mini_modal_btn').removeClass('active')
			$(this).addClass('active')

			$('.mini_modal').removeClass('active')
			$(modalId).addClass('active')

			if (is_touch_device()) $('body').css('cursor', 'pointer')
		}
	})

	// Close the popup when clicking outside of it
	$(document).click(e => {
		if ($(e.target).closest('.modal_cont').length === 0) {
			$('.mini_modal, .mini_modal_btn').removeClass('active')

			if (is_touch_device()) $('body').css('cursor', 'default')
		}
	})


	// Opportunities/Resources
	// opportunitiesResourcesSliders = []

	if ($('.opportunities_resources').length) {
		opportunitiesResourcesOffset = $('.opportunities_resources .items').outerWidth() - $('.opportunities_resources .items_wrap').outerWidth() + 5

		opportunitiesResourcesTopOffset = (WH - $('.opportunities_resources .data').outerHeight()) / 2

		opportunitiesResourcesAnimStart = $('.opportunities_resources .data').offset().top + opportunitiesResourcesTopOffset

		$('.opportunities_resources .offset').height(opportunitiesResourcesOffset)

		$('.opportunities_resources .data').css('--top_offset', opportunitiesResourcesTopOffset + 'px')
	}

	// const opportunitiesResources = document.querySelectorAll('.opportunities_resources .swiper')

	// opportunitiesResources.forEach((el, i) => {
	// 	el.classList.add('opportunities_resources_s' + i)

	// 	let options = {
	// 		loop: false,
	// 		speed: 500,
	// 		watchSlidesProgress: true,
	// 		slideActiveClass: 'active',
	// 		slideVisibleClass: 'visible',
	// 		lazy: true,
	// 		spaceBetween: 16,
	// 		slidesPerView: 'auto',
	// 		on: {
	// 			init: swiper => setHeight(swiper.el.querySelectorAll('.item')),
	// 			resize: swiper => {
	// 				let items = swiper.el.querySelectorAll('.item')

	// 				items.forEach(el => el.style.height = 'auto')

	// 				setHeight(items)
	// 			}
	// 		}
	// 	}

	// 	opportunitiesResourcesSliders.push(new Swiper('.opportunities_resources_s' + i, options))
	// })


	// Film commissions slider
	const filmCommissionsSliders = [],
		filmCommissions = document.querySelectorAll('.film_commissions .swiper')

	filmCommissions.forEach((el, i) => {
		el.classList.add('film_commissions_s' + i)

		let options = {
			loop: false,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			lazy: true,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				bulletActiveClass: 'active',
				renderBullet: function (index, className) {
					return '<span class="' + className + '">' + (index + 1) + "</span>"
				}
			},
			breakpoints: {
				0: {
					spaceBetween: 12,
					slidesPerView: 'auto'
				},
				768: {
					spaceBetween: 20,
					slidesPerView: 2
				},
				1024: {
					spaceBetween: 20,
					slidesPerView: 3
				},
				1280: {
					spaceBetween: 24,
					slidesPerView: 4
				}
			}
		}

		filmCommissionsSliders.push(new Swiper('.film_commissions_s' + i, options))
	})


	// Project steps slider
	const projectStepsSliders = [],
		projectSteps = document.querySelectorAll('.project_steps .swiper')

	projectSteps.forEach((el, i) => {
		el.classList.add('project_steps_s' + i)

		let options = {
			loop: true,
			speed: 750,
			effect: 'coverflow',
			grabCursor: true,
			centeredSlides: true,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			loopAdditionalSlides: 1,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				bulletActiveClass: 'active'
			},
			spaceBetween: 0,
			slidesPerView: 1,
			breakpoints: {
				0: {
					coverflowEffect: {
						rotate: 0,
						stretch: 285,
						depth: 124,
						slideShadows: true
					}
				},
				768: {
					coverflowEffect: {
						rotate: 60,
						stretch: 24,
						depth: 280,
						slideShadows: true
					}
				}
			},
			on: {
				init: (swiper) => {
					// swiper.slidePrev(0, false)
					// swiper.slideNext(0, false)
				},
				beforeTransitionStart: (swiper) => {
					let parent = $(swiper.el).closest('.project_steps')

					parent.find('.block_head .title').hide()
					parent.find('.block_head .title').eq(swiper.realIndex).fadeIn(300)
				}
			}
		}

		projectStepsSliders.push(new Swiper('.project_steps_s' + i, options))
	})


	// Tabs
	$('body').on('click', '.tabs .btn', function(e) {
		e.preventDefault()

		if (!$(this).hasClass('active')) {
			let parent = $(this).closest('.tabs_container'),
				activeTab = $(this).data('content'),
				activeTabContent = $(activeTab),
				level = $(this).data('level')

			parent.find('.tabs:first .btn').removeClass('active')
			parent.find('.tab_content.' + level).removeClass('active')

			$(this).addClass('active')
			activeTabContent.addClass('active')
		}
	})


	// Phone input mask
	const phoneInputs = document.querySelectorAll('input[type=tel]')

	if (phoneInputs) {
		phoneInputs.forEach(el => {
			IMask(el, {
				mask: '(000) 000-00-00',
				lazy: true
			})
		})
	}


	// Custom select - Nice select
	const selects = document.querySelectorAll('select:not(.skip)')

	if (selects) {
		selects.forEach(el => {
			if (Array.from(el.options).some(option => option.getAttribute('selected') !== null)) {
				el.classList.add('selected')
			}

			NiceSelect.bind(el, {
				placeholder: el.getAttribute('data-placeholder')
			})

			el.addEventListener('change', () => el.classList.add('selected'))
		})
	}


	$('.form .input, .form textarea').keyup(function() {
		let _self = $(this)

		setTimeout(() => {
			_self.val().length
				? _self.addClass('active')
				: _self.removeClass('active')
		})
	})


	// Filter
	$('.filter .sort_btn').click(function(e) {
		e.preventDefault()

		$(this).toggleClass('active')
	})


	// Film commision info
	$('.financing_terms .mob_spoler_btn').click(function(e) {
		e.preventDefault()

		$(this).toggleClass('active')

		$('.film_commission_info .files').addClass('show')
	})


	// Film commision info
	$('header .menu_btn').click(function(e) {
		e.preventDefault()

		$('header .menu_btn').toggleClass('active')
		$(BODY).toggleClass('menu_open')

		$('header .menu_btn').hasClass('active')
			? $('.mob_menu').fadeIn(300)
			: $('.mob_menu').fadeOut(200)

		$('header .menu_btn').hasClass('active')
			? $('.overlay').fadeIn(300)
			: $('.overlay').fadeOut(200)
	})


	// Search
	$('header .search_btn, .search_modal .head .close_btn, .search_modal .mob_close_btn').click(function(e) {
		e.preventDefault()

		$('header .search_btn').toggleClass('active')
		$(BODY).toggleClass('search_open')

		$('header .search_btn').hasClass('active')
			? $('.search_modal').fadeIn(300)
			: $('.search_modal').fadeOut(200)

		$('header .search_btn').hasClass('active')
			? $('.overlay').fadeIn(300)
			: $('.overlay').fadeOut(200)
	})


	$('.overlay').click(function(e) {
		e.preventDefault()

		if ($(BODY).hasClass('menu_open')) {
			$('header .menu_btn').removeClass('active')
			$(BODY).removeClass('menu_open')

			$('.mob_menu').fadeOut(200)
		}

		if ($(BODY).hasClass('search_open')) {
			$('header .search_btn').removeClass('active')
			$(BODY).removeClass('search_open')

			$('.search_modal').fadeOut(200)
		}

		$('.overlay').fadeOut(200)
	})


	$('.search_modal form .input').keyup(function(e) {
		e.preventDefault()

		let _self = $(this)

		setTimeout(() => {
			if (_self.val().length) {
				$('.search_modal form .clear_btn').fadeIn(300)

				$('.search_modal .tips').removeClass('show')
				$('.search_modal .result').addClass('show')
			} else {
				$('.search_modal form .clear_btn').fadeOut(200)

				$('.search_modal .result').removeClass('show')
				$('.search_modal .tips').addClass('show')
			}
		})
	})


	$('.search_modal form .clear_btn').click(function(e) {
		e.preventDefault()

		$('.search_modal form .input').val('')

		$(this).fadeOut(200)

		$('.search_modal .result').removeClass('show')
		$('.search_modal .tips').addClass('show')
	})


	// Submit feedback form
	$('.feedback form, #order_modal form').submit(function(e) {
		e.preventDefault()

		// Show success modal
		Fancybox.show([{
			src: '#success_feedback_modal',
			type: 'inline'
		}])
	})


	// Fancybox
	Fancybox.defaults.autoFocus = false
	Fancybox.defaults.trapFocus = false
	Fancybox.defaults.dragToClose = false
	Fancybox.defaults.placeFocusBack = false
	Fancybox.defaults.l10n = {
		CLOSE: 'Закрыть',
		NEXT: 'Следующий',
		PREV: 'Предыдущий',
		MODAL: 'Вы можете закрыть это модальное окно нажав клавишу ESC'
	}

	Fancybox.defaults.tpl = {
		closeButton: '<button data-fancybox-close class="f-button is-close-btn" title="{{CLOSE}}"><svg><use xlink:href="images/sprite.svg#ic_close"></use></svg></button>',

		main: `<div class="fancybox__container" role="dialog" aria-modal="true" aria-label="{{MODAL}}" tabindex="-1">
			<div class="fancybox__backdrop"></div>
			<div class="fancybox__carousel"></div>
			<div class="fancybox__footer"></div>
		</div>`,
	}


	// Zoom images
	Fancybox.bind('.fancy_img', {
		Carousel: {
			transition: 'slide',
		},
		Image: {
			zoom: false
		},
		Thumbs: {
			autoStart: false
		}
	})


	// Modals
	$('.modal_btn').click(function(e) {
		e.preventDefault()

		if (e.target.getAttribute('data-modal')) {
			let select = document.getElementById(e.target.getAttribute('data-modal')).querySelector('.services_select')

			if (select) {
				Array.from(select.options).forEach(el => el.removeAttribute('selected'))

				select.querySelector('select option[value="'+ e.target.getAttribute('data-service-index') +'"]').setAttribute('selected', true)

				if (typeof orderServicesInstance === 'undefined') {
					if (Array.from(select.options).some(option => option.getAttribute('selected') !== null)) {
						select.classList.add('selected')
					}

					orderServicesInstance = NiceSelect.bind(select, {
						placeholder: select.getAttribute('data-placeholder')
					})

					select.addEventListener('change', () => select.classList.add('selected'))
				} else {
					orderServicesInstance.update()
				}
			}
		}

		Fancybox.close()

		Fancybox.show([{
			src: document.getElementById(e.target.getAttribute('data-modal')),
			type: 'inline'
		}])
	})


	$('.success_modal .close_btn').click(function(e) {
		e.preventDefault()

		Fancybox.close()
	})


	// Cookies
	setTimeout(() => $('.cookies').addClass('show'), 1000)

	$('.cookies .btn').click(function(e) {
		e.preventDefault()

		$('.cookies').removeClass('show')
	})
})



window.addEventListener('resize', function () {
	WH = window.innerHeight || document.clientHeight || BODY.clientHeight

	let windowW = window.outerWidth

	if (typeof WW !== 'undefined' && WW != windowW) {
		// Overwrite window width
		WW = window.innerWidth || document.clientWidth || BODY.clientWidth


		// Opportunities/Resources
		if ($('.opportunities_resources').length) {
			opportunitiesResourcesOffset = $('.opportunities_resources .items').outerWidth() - $('.opportunities_resources .items_wrap').outerWidth() + 5

			opportunitiesResourcesTopOffset = (WH - $('.opportunities_resources .data').outerHeight()) / 2

			opportunitiesResourcesAnimStart = $('.opportunities_resources .data').offset().top + opportunitiesResourcesTopOffset

			$('.opportunities_resources .offset').height(opportunitiesResourcesOffset)

			$('.opportunities_resources .data').css('--top_offset', opportunitiesResourcesTopOffset + 'px')
		}


		// Mob. version
		if (!fakeResize) {
			fakeResize = true
			fakeResize2 = false

			document.getElementsByTagName('meta')['viewport'].content = 'width=device-width, initial-scale=1, maximum-scale=1'
		}

		if (!fakeResize2) {
			fakeResize2 = true

			if (windowW < 375) document.getElementsByTagName('meta')['viewport'].content = 'width=375, user-scalable=no'
		} else {
			fakeResize = false
			fakeResize2 = true
		}
	}
})



window.addEventListener('scroll', function () {
	// Opportunities/Resources
	if ($('.opportunities_resources').length) {
		if ($(window).scrollTop() > opportunitiesResourcesAnimStart && ($(window).scrollTop() - opportunitiesResourcesAnimStart) < opportunitiesResourcesOffset) {
			($(window).scrollTop() - opportunitiesResourcesAnimStart) > opportunitiesResourcesOffset * 0.2
				? $('.opportunities_resources .info').addClass('hide')
				: $('.opportunities_resources .info').removeClass('hide')

			$('.opportunities_resources .items').css('transform', `translateX(${opportunitiesResourcesAnimStart - $(window).scrollTop()}px)`)
		}
	}
})



// Map
function mapInit() {
	ymaps.ready(() => {
		let myMap = new ymaps.Map('map', {
			center: [55.761350, 37.609056],
			zoom: 16,
			controls: []
		})

		// Кастомный маркер
		let myPlacemark = new ymaps.Placemark([55.761350, 37.609056], {}, {
			iconLayout : 'default#image',
			iconImageHref : 'images/ic_map_marker.svg',
			iconImageSize : [85, 106],
			iconImageOffset : [-43, -106],
		})

		myMap.geoObjects.add(myPlacemark)

		myMap.behaviors.disable('scrollZoom')
	})
}
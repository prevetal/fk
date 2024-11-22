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


	// Opportunities/Resources slider
	opportunitiesResourcesSliders = []

	const opportunitiesResources = document.querySelectorAll('.opportunities_resources .swiper')

	opportunitiesResources.forEach((el, i) => {
		el.classList.add('opportunities_resources_s' + i)

		let options = {
			loop: false,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			lazy: true,
			spaceBetween: 16,
			slidesPerView: 'auto',
			on: {
				init: swiper => setHeight(swiper.el.querySelectorAll('.item')),
				resize: swiper => {
					let items = swiper.el.querySelectorAll('.item')

					items.forEach(el => el.style.height = 'auto')

					setHeight(items)
				}
			}
		}

		opportunitiesResourcesSliders.push(new Swiper('.opportunities_resources_s' + i, options))
	})


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
			loop: false,
			speed: 750,
			effect: 'coverflow',
			grabCursor: true,
			centeredSlides: true,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			// initialSlide: 1,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			spaceBetween: 0,
			slidesPerView: 1,
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				bulletActiveClass: 'active',
			},
			breakpoints: {
				0: {
					coverflowEffect: {
						rotate: 0,
						stretch: 285,
						depth: 150,
						slideShadows: true
					}
				},
				768: {
					coverflowEffect: {
						rotate: 50,
						stretch: 24,
						depth: 150,
						slideShadows: true
					}
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
	const selects = document.querySelectorAll('select')

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


	// About gallery
	lottie.loadAnimation({
		container: document.querySelector('.about_head .gallery'),
		renderer: 'canvas',
		loop: true,
		autoplay: true,
		path: './carousel.json'
	})


	// Film commision info
	$('.financing_terms .mob_spoler_btn').click(function(e) {
		e.preventDefault()

		$(this).toggleClass('active')

		$('.film_commission_info .files').addClass('show')
	})
})



window.addEventListener('resize', function () {
	WH = window.innerHeight || document.clientHeight || BODY.clientHeight

	let windowW = window.outerWidth

	if (typeof WW !== 'undefined' && WW != windowW) {
		// Overwrite window width
		WW = window.innerWidth || document.clientWidth || BODY.clientWidth


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
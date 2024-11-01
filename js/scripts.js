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
			breakpoints: {
				0: {
					spaceBetween: 12,
					slidesPerView: 'auto'
				},
				480: {
					spaceBetween: 16,
					slidesPerView: 2
				},
				768: {
					spaceBetween: 16,
					slidesPerView: 2
				}
			},
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
			breakpoints: {
				0: {
					spaceBetween: 12,
					slidesPerView: 'auto'
				},
				480: {
					spaceBetween: 16,
					slidesPerView: 2
				},
				1280: {
					spaceBetween: 24,
					slidesPerView: 4
				}
			}
		}

		filmCommissionsSliders.push(new Swiper('.film_commissions_s' + i, options))
	})


	// Tabs
	var locationHash = window.location.hash

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


	// Scroll interception
	// scrollStopPosition = $('.opportunities_resources').offset().top + ($(window).outerHeight() * 0.5) - ($('.opportunities_resources').outerHeight() * 0.5)
})




// setInterval(() => {
// 	const scrollTop = window.scrollY || document.documentElement.scrollTop

// 	if (scrollTop >= scrollStopPosition) {
// 		if (e.deltaY > 0 && !opportunitiesResourcesSliders[0].isEnd) {
// 			BODY.classList.add('lock')

// 			window.scrollTo({ top: scrollStopPosition })
// 		}

// 		if (e.deltaY > 0 && opportunitiesResourcesSliders[0].isEnd) {
// 			BODY.classList.remove('lock')
// 		}

// 		if (e.deltaY > 0 && BODY.classList.contains('lock') ){
// 			if (!opportunitiesResourcesSliders[0].animating) {
// 				opportunitiesResourcesSliders[0].slideNext(500, true)
// 			}
// 		}
// 	}
// }, 5)


// window.addEventListener('wheel', handleScroll, { passive: false })
// window.addEventListener('scroll', handleScroll, { passive: false })
// window.addEventListener('touchmove', handleScroll, { passive: false })


// Обработка скроллинга
// function handleScroll(e) {
// 	if ($(window).scrollTop() >= scrollStopPosition) {
// 		if (e.deltaY > 0 && !opportunitiesResourcesSliders[0].isEnd) {
// 			BODY.classList.add('lock')

// 			window.scrollTo({ top: scrollStopPosition })
// 		}

// 		if (e.deltaY > 0 && opportunitiesResourcesSliders[0].isEnd) {
// 			BODY.classList.remove('lock')
// 		}

// 		if (e.deltaY > 0 && BODY.classList.contains('lock') ){
// 			if (!opportunitiesResourcesSliders[0].animating) {
// 				opportunitiesResourcesSliders[0].slideNext(500, true)
// 			}
// 		}
// 	}



// 	if ($(window).scrollTop() <= scrollStopPosition) {
// 		if (e.deltaY < 0 && !opportunitiesResourcesSliders[0].isBeginning) {
// 			BODY.classList.add('lock')
// 		}

// 		if (e.deltaY < 0 && opportunitiesResourcesSliders[0].isBeginning) {
// 			BODY.classList.remove('lock')
// 		}

// 		if (e.deltaY < 0 && BODY.classList.contains('lock') ){
// 			if (!opportunitiesResourcesSliders[0].animating) {
// 				opportunitiesResourcesSliders[0].slidePrev(500, true)
// 			}
// 		}
// 	}
// }



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
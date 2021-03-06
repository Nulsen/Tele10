$(document).ready(function() {
	$('#read-more').click(function(e) {
		e.preventDefault();

		$('html, body')
			.stop()
			.animate(
				{
					scrollTop: $('.pitch').offset().top - 59,
				},
				500
			);
	});

	$('.nav .button').click(function(e) {
		e.preventDefault();

		$('.nav ul').toggleClass('active');
	});

	if (window.location.pathname == '/tele10-molnvaxel') {
		$('.nav [href="/tele10-molnvaxel#mobile"]').click(function(e) {
			e.preventDefault();

			$('.nav ul').removeClass('active');

			$('html, body')
				.stop()
				.animate(
					{
						scrollTop: $('#mobile').offset().top - 59,
					},
					500
				);
		});
	}

	$('.contact form').submit(function(e) {
		e.preventDefault();

		const $message = $(e.target).find('.success:visible, .error:visible');

		$(this)
			.find('button')
			.addClass('disabled');

		if ($message.length) {
			$message
				.slideUp()
				.promise()
				.then(function() {
					postForm($(e.target));
				});
		} else {
			postForm($(e.target));
		}
	});

	function postForm($form) {
		$.post($form[0].action, $form.serialize())
			.then(function(response) {
				if ('ga' in window) {
					var tracker = ga.getAll()[0];
					if (tracker) {
						tracker.send('event', 'Contact form', 'Send');
					}
				}

				$form[0].reset();
				$form
					.find('.success')
					.html(response)
					.slideDown();
			})
			.fail(function(err) {
				$form
					.find('.error')
					.html(err.responseText)
					.slideDown();
			})
			.done(function() {
				$form.find('button').removeClass('disabled');
			});
	}

	for (let i = 0; i < 3; i++) {
		let waypoint = new Waypoint({
			element: $('.pitch .box')[i],
			handler() {
				this.destroy();
				$(this.element).addClass('animated fadeIn');
			},
			offset: '75%'
		});
	}

	$('.accordion').accordion();
});

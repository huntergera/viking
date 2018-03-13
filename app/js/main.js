;(function($){

	regEmail = /[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}/;
	function InputKeyup() {
		if ($this.hasClass("login")) {
			if ($this.val().length < 2) {
				$this.removeClass('correct').addClass('incorrect');
				$('.login_error_text').addClass('show');
			}
			else {
				$this.removeClass('incorrect').addClass('correct');
				$('.login_error_text').removeClass('show');
			};
		}
		else if ($this.hasClass("email")) {
			if ($this.val().search(regEmail) == -1) {
				$this.removeClass('correct').addClass('incorrect');
				$('.email_error_text').addClass('show');
			}
			else {
				$this.removeClass('incorrect').addClass('correct');
				$('.email_error_text').removeClass('show');
			};
		}
		if ($this.hasClass("password")) {
			if ($this.val().length < 6) {
				$this.removeClass('correct').addClass('incorrect');
				$('.password_error_text').addClass('show');
			}
			else {
				$this.removeClass('incorrect').addClass('correct');
				$('.password_error_text').removeClass('show');
			};
		}

		Form = $this.parents('form:first');
		InputLogin = Form.find('.login');
		InputEmail = Form.find('.email');
		InputPassword = Form.find('.password');
		InputSubmit = Form.find('.submit');

		if (InputLogin.hasClass("correct") && InputEmail.hasClass("correct") && InputPassword.hasClass("correct")) {
			InputSubmit.addClass('correct');
		}
		else {
			InputSubmit.removeClass("correct");
		}

	};

	$('.form input').keyup(function() {
		$this = $(this);
		InputKeyup();
	});

	$('.form input').blur(function() {
		$this = $(this);
		InputKeyup();
	});

	$('.form').submit(function(e) {
		e.preventDefault();
		thisForm = $(this);
		submit = $(this).find('.submit');
		if(!submit.hasClass('correct')) {
			thisForm.find('input').each(function() {
				$this = $(this);
				InputKeyup();
			});
		}
		else {
			$.ajax({
				url : thisForm.attr('action'),
				data: thisForm.serialize(),
				method:'POST',
				success : function(data){
					if ( data.trim() == '1') {
						thisForm.find('input').each(function() {
							$(this).val('').removeClass('correct');
						});
						thisForm.find('.submit').removeClass('correct');
						$('.tnx_pop_up').fadeIn();
					};
				}
			});
		};
	});

	$('.tnx_pop_up .close, .tnx_pop_up .fade_pop_up').click(function() {
		$('.tnx_pop_up').fadeOut();
	});


	particlesJS("particles-js", {
		"particles": {

			"number": {
				"value": 80,
				"density": {
					"enable": true,
					"value_area": 800
				}
			},

			"color": {
				"value": "#f07000"
			},

			"shape": {
				"type": "circle",
				"stroke": {
					"width": 0,
					"color": "#000000"
				},

				"polygon": {
					"nb_sides": 5
				},

				"image": {
					"src": "img/github.svg",
					"width": 100,
					"height": 100
				}
			},

			"opacity": {
				"value": 0.5,
				"random": false,
				"anim": {
					"enable": false,
					"speed": 1,
					"opacity_min": 0.1,
					"sync": false
				}
			},

			"size": {
				"value": 3,
				"random": true,
				"anim": {
					"enable": false,
					"speed": 40,
					"size_min": 0.1,
					"sync": false
				}
			},

			"line_linked": {
				"enable": false,
				"distance": 150,
				"color": "#ffffff",
				"opacity": 0.4,
				"width": 1
			},

			"move": {
				"enable": true,
				"speed": 15,
				"direction": "top",
				"random": false,
				"straight": false,
				"out_mode": "out",
				"bounce": false,
				"attract": {
					"enable": false,
					"rotateX": 600,
					"rotateY": 1200
				}
			}
		},

		"interactivity": {
			"detect_on": "canvas",

			"events": {

				"onhover": {
					"enable": false,
					"mode": "repulse"
 				},

				"onclick": {
					"enable": false,
					"mode": "push"
				},

				"resize": true
			},

			"modes": {

				"grab": {
					"distance": 400,
					"line_linked": {
						"opacity": 1
					}
				},

				"bubble": {
					"distance": 400,
					"size": 40,
					"duration": 2,
					"opacity": 8,
					"speed": 3
				},

				"repulse": {
					"distance": 200,
					"duration": 0.4
				},

				"push": {
					"particles_nb": 4
				},

				"remove": {
					"particles_nb": 2
				}
			}
		},
		"retina_detect": true
	});


//Run parallax	
	$('.plaxify').plaxify();
	$.plax.enable();

//Run wow.js
	new WOW().init();


})(jQuery);
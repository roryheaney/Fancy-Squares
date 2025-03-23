document.addEventListener( 'DOMContentLoaded', () => {
	const carousels = document.querySelectorAll( '.swiper' );

	carousels.forEach( ( el ) => {
		// Retrieve config from data-swiper
		const data = el.getAttribute( 'data-swiper' ) || '{}';
		let config = {};
		try {
			config = JSON.parse( data );
		} catch ( err ) {
			// eslint-disable-next-line no-console
			console.warn( 'Invalid JSON in data-swiper:', err );
		}

		// Initialize Swiper
		// eslint-disable-next-line no-undef
		const swiper = new Swiper( el, config );

		// Track whether the user manually paused via the button
		let isPaused = false;

		// 1) Always pause on hover if autoplay is set
		if ( config.autoplay ) {
			el.addEventListener( 'mouseenter', () => {
				if ( ! isPaused ) {
					swiper.autoplay.stop();
				}
			} );
			el.addEventListener( 'mouseleave', () => {
				if ( ! isPaused ) {
					swiper.autoplay.start();
				}
			} );
		}

		// 2) Look for the swiper__button-control (Play/Pause button)
		const playPauseButton = el.querySelector( '.swiper__button-control' );
		if ( playPauseButton ) {
			playPauseButton.addEventListener( 'click', ( evt ) => {
				evt.preventDefault();

				if ( ! isPaused ) {
					// Currently playing, so pause it
					swiper.autoplay.stop();

					// Update ARIA label => "Carousel is paused, click to play"
					playPauseButton.setAttribute(
						'aria-label',
						'Carousel is paused, click to play'
					);

					// Hide first span, show second
					playPauseButton.children[ 0 ].classList.add( 'd-none' );
					playPauseButton.children[ 1 ].classList.remove( 'd-none' );

					isPaused = true;
				} else {
					// Currently paused, so resume autoplay
					swiper.autoplay.start();

					// ARIA label => "Carousel is playing, click to pause"
					playPauseButton.setAttribute(
						'aria-label',
						'Carousel is playing, click to pause'
					);

					// Show first span, hide second
					playPauseButton.children[ 0 ].classList.remove( 'd-none' );
					playPauseButton.children[ 1 ].classList.add( 'd-none' );

					isPaused = false;
				}
			} );
		}
	} );
} );

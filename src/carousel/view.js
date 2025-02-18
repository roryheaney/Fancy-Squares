document.addEventListener( 'DOMContentLoaded', () => {
	const carousels = document.querySelectorAll( '.swiper' );
	carousels.forEach( ( el ) => {
		const data = el.getAttribute( 'data-swiper' ) || '{}';
		let config = {};
		try {
			config = JSON.parse( data );
		} catch ( err ) {
			console.warn( 'Invalid JSON in data-swiper:', err );
		}

		// Initialize Swiper
		new Swiper( el, config );
	} );
} );

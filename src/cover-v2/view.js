// view.js
document.addEventListener( 'DOMContentLoaded', () => {
	const lazyVideos = document.querySelectorAll(
		'.wp-block-cover__video-background[data-src]'
	);

	// console.log( lazyVideos );

	if ( 'IntersectionObserver' in window ) {
		const options = {
			root: null,
			rootMargin: '200px', // load video ~200px before it appears
			threshold: 0,
		};
		const observer = new IntersectionObserver( ( entries ) => {
			entries.forEach( ( entry ) => {
				if ( entry.isIntersecting ) {
					const video = entry.target;
					const dataSrc = video.getAttribute( 'data-src' );
					if ( dataSrc ) {
						video.setAttribute( 'src', dataSrc );
						video.removeAttribute( 'data-src' );
					}
					observer.unobserve( video );
				}
			} );
		}, options );

		lazyVideos.forEach( ( video ) => observer.observe( video ) );
	} else {
		// Fallback: load them immediately if IntersectionObserver not supported
		lazyVideos.forEach( ( video ) => {
			const dataSrc = video.getAttribute( 'data-src' );
			if ( dataSrc ) {
				video.setAttribute( 'src', dataSrc );
				video.removeAttribute( 'data-src' );
			}
		} );
	}
} );

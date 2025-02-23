import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		slidesToShow,
		columnGap,
		pagination,
		navigation,
		autoplay,
		delay,
		loop,
		breakpoints,
		speed,

		// existing attributes for fade + fractional
		enableFade,
		fractionalSlidesEnabled,
		fractionalSlidesValue,

		// new attribute
		showPlayPauseButton,
	} = attributes;

	// Decide which slidesPerView to use:
	// If fractionalSlidesEnabled is true AND slidesToShow=1, use fractionalSlidesValue
	let finalSlidesPerView = slidesToShow;
	if ( slidesToShow === 1 && fractionalSlidesEnabled ) {
		finalSlidesPerView = 1 + fractionalSlidesValue;
	}

	const swiperData = {
		slidesPerView: finalSlidesPerView,
		autoplay: autoplay ? { delay } : false,
		speed,
		spaceBetween: columnGap,
		breakpoints: breakpoints.reduce( ( acc, bp ) => {
			acc[ bp.breakpoint ] = { slidesPerView: bp.slidesToShow };
			return acc;
		}, {} ),
		pagination: pagination
			? { el: '.swiper-pagination', clickable: true, bulletElement: 'button' }
			: false,
		navigation: navigation
			? { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }
			: false,
		loop: loop,
	};

	// If fade is enabled (only relevant if slidesToShow=1):
	if ( slidesToShow === 1 && enableFade ) {
		swiperData.effect = 'fade';
		swiperData.fadeEffect = { crossFade: true };
	}

	const blockProps = useBlockProps.save( {
		className: 'swiper',
		'data-swiper': JSON.stringify( swiperData ),
	} );

	// Build the className for our combined container
	// If *both* showPlayPauseButton and pagination are disabled => add "d-none"
	const pausePaginationClasses = [ 'swiper-pause-pagination' ];
	if ( ! showPlayPauseButton && ! pagination ) {
		pausePaginationClasses.push( 'd-none' );
	}

	return (
		<div { ...blockProps }>
			<div className="swiper-wrapper">
				<InnerBlocks.Content />
			</div>

			{/* Always render the container, but hide it if empty */}
			<div className={ pausePaginationClasses.join( ' ' ) }>
				<div className="swiper-pause-pagination__inner-container">
					{ showPlayPauseButton && (
						<button
							className="dsb-button-control"
							aria-label="Carousel is playing, click to pause"
						>
							<span aria-hidden="true">Pause</span>
							<span aria-hidden="true" class="d-none">Play</span>
						</button>
					) }

					{ pagination && (
						<div className="swiper-pagination"></div>
					) }
				</div>
			</div>

			{ navigation && (
				<>
					<div className="swiper-button-next"></div>
					<div className="swiper-button-prev"></div>
				</>
			) }
		</div>
	);
}

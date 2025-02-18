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

		// New attributes for fade + fractional
		enableFade,
		fractionalSlidesEnabled,
		fractionalSlidesValue,
	} = attributes;

	// Decide which slidesPerView to use:
	// If fractionalSlidesEnabled is true AND slidesToShow is 1, we use fractionalSlidesValue
	// Otherwise, we use the integer slidesToShow
	let finalSlidesPerView = slidesToShow;
	if ( slidesToShow === 1 && fractionalSlidesEnabled ) {
		finalSlidesPerView = 1 + fractionalSlidesValue;
	}

	const swiperData = {
		slidesPerView: finalSlidesPerView,
		// autoplay: autoplay ? { delay } : false,
		autoplay: autoplay ? { delay } : false,
		speed,
		spaceBetween: columnGap,
		breakpoints: breakpoints.reduce( ( acc, bp ) => {
			acc[ bp.breakpoint ] = { slidesPerView: bp.slidesToShow };
			return acc;
		}, {} ),
		pagination: pagination
			? { el: '.swiper-pagination', clickable: true }
			: false,
		navigation: navigation
			? { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }
			: false,
		loop: autoplay && loop,
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

	return (
		<div { ...blockProps }>
			<div className="swiper-wrapper">
				<InnerBlocks.Content />
			</div>
			{ pagination && <div className="swiper-pagination"></div> }
			{ navigation && (
				<>
					<div className="swiper-button-next"></div>
					<div className="swiper-button-prev"></div>
				</>
			) }
		</div>
	);
}

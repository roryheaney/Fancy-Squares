import { Fragment, useState } from '@wordpress/element';
import {
	InspectorControls,
	InnerBlocks,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	ToggleControl,
	SelectControl,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalNumberControl as NumberControl,
	Button,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import classnames from 'classnames';
import './editor.scss';

// Helper function to get the current slides to show based on breakpoints
function getCurrentSlidesToShow( slidesToShow, breakpoints ) {
	let slides = slidesToShow;
	let largest = 0;
	if ( Array.isArray( breakpoints ) ) {
		breakpoints.forEach( ( bp ) => {
			if ( bp.breakpoint > largest ) {
				largest = bp.breakpoint;
				slides = bp.slidesToShow;
			}
		} );
	}
	return slides;
}

export default function Edit( { attributes, setAttributes, clientId } ) {
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
		templateLock,

		// New attributes for crossfade + fractional slides
		enableFade,
		fractionalSlidesEnabled,
		fractionalSlidesValue,

		// HTML element tag
		elementTag,

		// ADA specific feature
		// New attribute for play/pause button
		showPlayPauseButton,
		// auto Height
		autoHeight,
	} = attributes;

	const [ localBreakpoints, setLocalBreakpoints ] = useState( breakpoints );

	// Check if this block has any child blocks
	const { hasChildBlocks } = useSelect(
		( select ) => {
			const { getBlockCount } = select( 'core/block-editor' );
			return {
				hasChildBlocks: getBlockCount( clientId ) > 0,
			};
		},
		[ clientId ]
	);

	const className = classnames(
		`fancysquares-shows-${ getCurrentSlidesToShow(
			slidesToShow,
			localBreakpoints
		) }-slides`,
		{
			'fancysquares-show-scrollbar': hasChildBlocks,
			'fancysquares-hide-scrollbar': ! hasChildBlocks,
		}
	);

	const blockProps = useBlockProps( { className } );

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title="Carousel Settings" initialOpen={ true }>
					<RangeControl
						label="Slides to show"
						value={ slidesToShow }
						onChange={ ( val ) =>
							setAttributes( { slidesToShow: val } )
						}
						min={ 1 }
						max={ 5 }
					/>
					<RangeControl
						label="Columns gap"
						value={ columnGap }
						onChange={ ( val ) =>
							setAttributes( { columnGap: val } )
						}
						min={ 0 }
						max={ 100 }
						step={ 10 }
					/>
					<SelectControl
						label="HTML Element"
						value={ elementTag }
						options={ [
							{ label: 'div', value: 'div' },
							{ label: 'section', value: 'section' },
						] }
						onChange={ ( val ) =>
							setAttributes( { elementTag: val } )
						}
					/>
					<ToggleControl
						label="Dots navigation"
						onChange={ () =>
							setAttributes( { pagination: ! pagination } )
						}
						checked={ pagination }
					/>
					<ToggleControl
						label="Arrows navigation"
						onChange={ () =>
							setAttributes( { navigation: ! navigation } )
						}
						checked={ navigation }
					/>
					<ToggleControl
						label="Autoplay"
						onChange={ () =>
							setAttributes( { autoplay: ! autoplay } )
						}
						checked={ autoplay }
					/>
					<ToggleControl
						label="Infinite Loop"
						onChange={ () => setAttributes( { loop: ! loop } ) }
						checked={ loop }
						help="Requires enough slides to loop."
					/>
					{ autoplay && (
						<RangeControl
							label="Delay (ms)"
							value={ delay }
							onChange={ ( val ) =>
								setAttributes( { delay: val } )
							}
							min={ 500 }
							max={ 9999 }
							step={ 500 }
						/>
					) }

					{ /* SHOW CROSSFADE & FRACTIONAL ONLY IF slidesToShow == 1 */ }
					{ slidesToShow === 1 && (
						<>
							<ToggleControl
								label="Enable Fade (Crossfade)"
								help="Use a fade transition instead of sliding."
								checked={ enableFade }
								onChange={ () =>
									setAttributes( {
										enableFade: ! enableFade,
									} )
								}
							/>
							<ToggleControl
								label="Use Partial (Fractional) Slides?"
								help="Overrides slidesToShow=1 with a fractional slidesPerView (0.05–0.50)."
								checked={ fractionalSlidesEnabled }
								onChange={ () =>
									setAttributes( {
										fractionalSlidesEnabled:
											! fractionalSlidesEnabled,
									} )
								}
							/>
							{ fractionalSlidesEnabled && (
								<RangeControl
									label="Fractional slides per view"
									value={ fractionalSlidesValue }
									onChange={ ( val ) =>
										setAttributes( {
											fractionalSlidesValue: val,
										} )
									}
									min={ 0.05 }
									max={ 0.5 }
									step={ 0.05 }
								/>
							) }
						</>
					) }

					{ /* 2) ADD OUR NEW TOGGLE FOR "Play/Pause" */ }
					<ToggleControl
						label="Enable Play/Pause Button"
						checked={ showPlayPauseButton }
						onChange={ () =>
							setAttributes( {
								showPlayPauseButton: ! showPlayPauseButton,
							} )
						}
					/>
					<ToggleControl
						label="Enable Auto Height"
						checked={ autoHeight }
						onChange={ () =>
							setAttributes( {
								autoHeight: ! autoHeight,
							} )
						}
					/>
				</PanelBody>

				<PanelBody title="Responsive" initialOpen={ false }>
					{ localBreakpoints.map( ( bp, index ) => (
						<div key={ index } style={ { marginBottom: '30px' } }>
							<strong>Breakpoint { index + 1 }</strong>
							<NumberControl
								label="Min screen width (px)"
								labelPosition="side"
								isDragEnabled
								min={ 100 }
								max={ 2000 }
								value={ bp.breakpoint }
								onChange={ ( val ) => {
									setLocalBreakpoints( ( prev ) => {
										const next = [ ...prev ];
										next[ index ] = {
											...next[ index ],
											breakpoint: parseInt( val, 10 ),
										};
										setAttributes( { breakpoints: next } );
										return next;
									} );
								} }
							/>
							<RangeControl
								label="Slides to show"
								value={ bp.slidesToShow }
								onChange={ ( val ) => {
									setLocalBreakpoints( ( prev ) => {
										const next = [ ...prev ];
										next[ index ] = {
											...next[ index ],
											slidesToShow: val,
										};
										setAttributes( { breakpoints: next } );
										return next;
									} );
								} }
								min={ 1 }
								max={ 5 }
							/>
							<Button
								isDestructive
								isLink
								onClick={ () => {
									setLocalBreakpoints( ( prev ) => {
										const next = prev.filter(
											( _, i ) => i !== index
										);
										setAttributes( { breakpoints: next } );
										return next;
									} );
								} }
							>
								Remove breakpoint { index + 1 }
							</Button>
						</div>
					) ) }

					{ localBreakpoints.length < 3 && (
						<Button
							variant="secondary"
							onClick={ () => {
								setLocalBreakpoints( ( prev ) => {
									const next = [
										...prev,
										{ breakpoint: 768, slidesToShow: 2 },
									];
									setAttributes( { breakpoints: next } );
									return next;
								} );
							} }
						>
							Add breakpoint
						</Button>
					) }
				</PanelBody>

				<PanelBody title="Animation" initialOpen={ false }>
					<RangeControl
						label="Speed (ms)"
						value={ speed }
						onChange={ ( val ) => setAttributes( { speed: val } ) }
						min={ 100 }
						max={ 900 }
						step={ 50 }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<InnerBlocks
					orientation="horizontal"
					allowedBlocks={ [ 'fancysquares/slide' ] }
					templateLock={ templateLock }
					renderAppender={ InnerBlocks.ButtonBlockAppender }
				/>
			</div>
		</Fragment>
	);
}

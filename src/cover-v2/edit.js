import {
	BlockControls,
	InspectorControls,
	InnerBlocks,
	useBlockProps,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import {
	PanelBody,
	FormTokenField,
	ToggleControl,
	Button,
	RangeControl,
	ToolbarGroup,
	Dropdown,
	AlignmentMatrixControl,
	CheckboxControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { Fragment, useEffect, useState } from '@wordpress/element';

import './editor.scss';
import {
	displayOptions,
	marginOptions,
	paddingOptions,
	positionOptions,
	zindexOptions,
	bleedCoverOptions,
} from '../../data/bootstrap-classes/classes.js';

// Helper function to map class values to their labels or values based on mode
const getDisplayValues = ( values, options, showValues ) => {
	return values.map( ( value ) => {
		const option = options.find( ( opt ) => opt.value === value );
		if ( option ) {
			if ( showValues ) {
				return option.value;
			}
			return option.label;
		}
		return value; // Fallback if no matching option is found
	} );
};

// Helper function to map selected labels or values back to values
const getValuesFromDisplay = ( displayValues, options, showValues ) => {
	return displayValues.map( ( display ) => {
		const option = options.find( ( opt ) =>
			showValues ? opt.value === display : opt.label === display
		);
		if ( option ) {
			return option.value;
		}
		return display; // Fallback if no matching option is found
	} );
};

/* ------------------------------------------------------------------------ */
/*  Utility functions
/* ------------------------------------------------------------------------ */

function ensureBaseClasses( arr ) {
	const final = [ ...arr ];
	[ 'wp-block-cover', 'wp-block-fancysquares-cover-block' ].forEach(
		( cls ) => {
			if ( ! final.includes( cls ) ) {
				final.unshift( cls );
			}
		}
	);
	return final;
}

function buildClassArray(
	orig,
	displayArr,
	marginArr,
	paddingArr,
	positionArr,
	zindexArr,
	bleedCoverArr
) {
	const final = ensureBaseClasses( orig );
	final.push(
		...displayArr,
		...marginArr,
		...paddingArr,
		...positionArr,
		...zindexArr,
		...bleedCoverArr
	);
	return final;
}

function toSlug( str ) {
	return str
		.toLowerCase()
		.replace( /[^\w\s-]+/g, '' )
		.trim()
		.replace( /\s+/g, '-' );
}

/* ------------------------------------------------------------------------ */
/*  Edit Component
/* ------------------------------------------------------------------------ */
export default function Edit( { attributes, setAttributes } ) {
	const {
		url = '',
		isVideo = false,
		lazyLoadVideo = false,
		dimRatio = 50,
		contentPosition = 'center center',
		fullHeight = false,
		additionalClasses = [],
	} = attributes;

	const [ showValues, setShowValues ] = useState( false ); // Local state for checkbox

	useEffect( () => {
		if ( additionalClasses.length === 0 ) {
			setAttributes( {
				additionalClasses: [
					'wp-block-cover',
					'wp-block-fancysquares-cover-block',
				],
			} );
		} else {
			const fixed = ensureBaseClasses( additionalClasses );
			if ( fixed.join( ' ' ) !== additionalClasses.join( ' ' ) ) {
				setAttributes( { additionalClasses: fixed } );
			}
		}
	}, [ additionalClasses, setAttributes ] );

	// Filter out base classes for easier handling in the advanced fields
	const filtered = additionalClasses.filter(
		( c ) =>
			! [
				'wp-block-cover',
				'wp-block-fancysquares-cover-block',
			].includes( c )
	);

	// Helper to find intersection (to pre-populate fields)
	const intersect = ( arr, options ) =>
		arr.filter( ( c ) => options.some( ( opt ) => opt.value === c ) );

	const displayVals = intersect( filtered, displayOptions );
	const marginVals = intersect( filtered, marginOptions );
	const paddingVals = intersect( filtered, paddingOptions );
	const positionVals = intersect( filtered, positionOptions );
	const zindexVals = intersect( filtered, zindexOptions );
	const bleedCoverVals = intersect( filtered, bleedCoverOptions );

	/* ------------------------------------------------------------------------ */
	/*  onChange handler for advanced classes
	/* ------------------------------------------------------------------------ */
	const handleTokenChange = ( options ) => ( newTokens ) => {
		const newValues = getValuesFromDisplay(
			newTokens,
			options,
			showValues
		);
		const updated = buildClassArray(
			additionalClasses,
			options === displayOptions ? newValues : displayVals,
			options === marginOptions ? newValues : marginVals,
			options === paddingOptions ? newValues : paddingVals,
			options === positionOptions ? newValues : positionVals,
			options === zindexOptions ? newValues : zindexVals,
			options === bleedCoverOptions ? newValues : bleedCoverVals
		);
		setAttributes( { additionalClasses: updated } );
	};

	/* ------------------------------------------------------------------------ */
	/*  Media Handling
	/* ------------------------------------------------------------------------ */
	const onSelectMedia = ( media ) => {
		if ( ! media || ! media.url ) {
			setAttributes( { url: '', isVideo: false, lazyLoadVideo: false } );
			return;
		}
		setAttributes( {
			url: media.url,
			isVideo: media.type === 'video',
		} );
	};

	const onRemoveMedia = () => {
		setAttributes( {
			url: '',
			isVideo: false,
			lazyLoadVideo: false,
		} );
	};

	const setPosition = ( val ) => {
		setAttributes( { contentPosition: val } );
	};

	/* ------------------------------------------------------------------------ */
	/*  Build block classes
	/* ------------------------------------------------------------------------ */
	const editorClasses = [ ...additionalClasses ];
	if ( contentPosition ) {
		const slug = toSlug( contentPosition );
		editorClasses.push( `is-position-${ slug }` );
		if ( contentPosition !== 'center center' ) {
			editorClasses.push( 'has-custom-content-position' );
		}
	}

	const blockProps = useBlockProps( {
		className: editorClasses.join( ' ' ),
		style: fullHeight ? { minHeight: '100vh' } : {},
	} );

	// Background element classes and styles
	const bgClasses = [ 'wp-block-cover__background' ];
	if ( dimRatio !== 100 ) {
		bgClasses.push( 'has-background-dim' );
	}
	if ( attributes.gradient ) {
		bgClasses.push( `has-${ attributes.gradient }-gradient-background` );
	}
	if ( attributes.backgroundColor ) {
		bgClasses.push(
			`has-${ attributes.backgroundColor }-background-color`
		);
	}

	const bgStyle = {
		opacity: dimRatio / 100,
		...( attributes.style?.color?.gradient && {
			backgroundImage: attributes.style.color.gradient,
		} ),
		...( attributes.background && { background: attributes.background } ),
		...( attributes.style?.color?.background && {
			backgroundColor: attributes.style.color.background,
		} ),
	};

	// Media element rendering
	// eslint-disable-next-line no-nested-ternary
	const mediaElement = url ? (
		isVideo ? (
			<video
				className="wp-block-cover__video-background"
				src={ url }
				autoPlay
				loop
				muted
				playsInline
			/>
		) : (
			<img
				className="wp-block-cover__image-background"
				src={ url }
				alt=""
				loading="lazy"
			/>
		)
	) : null;

	/* ------------------------------------------------------------------------ */
	/*  Return Edit markup
	/* ------------------------------------------------------------------------ */
	return (
		<Fragment>
			<BlockControls group="block">
				<ToolbarGroup>
					<Dropdown
						className="cover-block-position-dropdown"
						contentClassName="cover-block-position-dropdown__content"
						position="bottom left"
						renderToggle={ ( { isOpen, onToggle } ) => (
							<Button
								label={ __( 'Position Content', 'fs-blocks' ) }
								icon="marker"
								isPressed={ isOpen }
								onClick={ onToggle }
							/>
						) }
						renderContent={ () => (
							<AlignmentMatrixControl
								value={ contentPosition }
								onChange={ setPosition }
							/>
						) }
					/>
				</ToolbarGroup>
			</BlockControls>

			<InspectorControls>
				<PanelBody
					title={ __( 'Cover Settings', 'fs-blocks' ) }
					initialOpen={ true }
				>
					<MediaUploadCheck>
						<MediaUpload
							allowedTypes={ [ 'image', 'video' ] }
							onSelect={ onSelectMedia }
							render={ ( { open } ) => (
								<Button variant="primary" onClick={ open }>
									{ url
										? __( 'Replace Media', 'fs-blocks' )
										: __( 'Select Media', 'fs-blocks' ) }
								</Button>
							) }
						/>
						{ url && (
							<Button
								variant="secondary"
								onClick={ onRemoveMedia }
								style={ { marginTop: '8px' } }
							>
								{ __( 'Remove Media', 'fs-blocks' ) }
							</Button>
						) }
					</MediaUploadCheck>

					{ isVideo && (
						<ToggleControl
							label={ __( 'Lazy Load Video', 'fs-blocks' ) }
							checked={ lazyLoadVideo }
							onChange={ ( val ) =>
								setAttributes( { lazyLoadVideo: val } )
							}
						/>
					) }

					<RangeControl
						label={ __( 'Dim Ratio', 'fs-blocks' ) }
						value={ dimRatio }
						onChange={ ( val ) =>
							setAttributes( { dimRatio: val } )
						}
						min={ 0 }
						max={ 100 }
					/>

					<ToggleControl
						label={ __( 'Toggle Full Height', 'fs-blocks' ) }
						checked={ fullHeight }
						onChange={ ( val ) =>
							setAttributes( { fullHeight: val } )
						}
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Advanced Classes', 'fs-blocks' ) }
					initialOpen={ true }
				>
					<CheckboxControl
						label={ __( 'Show Values', 'fs-blocks' ) }
						checked={ showValues }
						onChange={ setShowValues }
						help={ __(
							'Display Bootstrap class names instead of labels.',
							'fs-blocks'
						) }
						style={ { marginBottom: '20px' } }
					/>

					<div style={ { marginBottom: '20px' } }>
						<FormTokenField
							label={ __( 'Display Classes', 'fs-blocks' ) }
							value={ getDisplayValues(
								displayVals,
								displayOptions,
								showValues
							) }
							suggestions={ displayOptions.map( ( o ) =>
								showValues ? o.value : o.label
							) }
							onChange={ handleTokenChange( displayOptions ) }
						/>
						<details style={ { marginTop: '5px' } }>
							<summary>
								{ __(
									'Available Display Classes',
									'fs-blocks'
								) }
							</summary>
							<ul
								style={ {
									fontSize: '12px',
									paddingLeft: '20px',
									margin: '5px 0',
								} }
							>
								{ displayOptions.map( ( item ) => (
									<li key={ item.value }>
										{ showValues ? item.value : item.label }
									</li>
								) ) }
							</ul>
						</details>
					</div>

					<div style={ { marginBottom: '20px' } }>
						<FormTokenField
							label={ __( 'Margin Classes', 'fs-blocks' ) }
							value={ getDisplayValues(
								marginVals,
								marginOptions,
								showValues
							) }
							suggestions={ marginOptions.map( ( o ) =>
								showValues ? o.value : o.label
							) }
							onChange={ handleTokenChange( marginOptions ) }
						/>
						<details style={ { marginTop: '5px' } }>
							<summary>
								{ __(
									'Available Margin Classes',
									'fs-blocks'
								) }
							</summary>
							<ul
								style={ {
									fontSize: '12px',
									paddingLeft: '20px',
									margin: '5px 0',
								} }
							>
								{ marginOptions.map( ( item ) => (
									<li key={ item.value }>
										{ showValues ? item.value : item.label }
									</li>
								) ) }
							</ul>
						</details>
					</div>

					<div style={ { marginBottom: '20px' } }>
						<FormTokenField
							label={ __( 'Padding Classes', 'fs-blocks' ) }
							value={ getDisplayValues(
								paddingVals,
								paddingOptions,
								showValues
							) }
							suggestions={ paddingOptions.map( ( o ) =>
								showValues ? o.value : o.label
							) }
							onChange={ handleTokenChange( paddingOptions ) }
						/>
						<details style={ { marginTop: '5px' } }>
							<summary>
								{ __(
									'Available Padding Classes',
									'fs-blocks'
								) }
							</summary>
							<ul
								style={ {
									fontSize: '12px',
									paddingLeft: '20px',
									margin: '5px 0',
								} }
							>
								{ paddingOptions.map( ( item ) => (
									<li key={ item.value }>
										{ showValues ? item.value : item.label }
									</li>
								) ) }
							</ul>
						</details>
					</div>

					<div style={ { marginBottom: '20px' } }>
						<FormTokenField
							label={ __( 'Position Classes', 'fs-blocks' ) }
							value={ getDisplayValues(
								positionVals,
								positionOptions,
								showValues
							) }
							suggestions={ positionOptions.map( ( o ) =>
								showValues ? o.value : o.label
							) }
							onChange={ handleTokenChange( positionOptions ) }
						/>
						<details style={ { marginTop: '5px' } }>
							<summary>
								{ __(
									'Available Position Classes',
									'fs-blocks'
								) }
							</summary>
							<ul
								style={ {
									fontSize: '12px',
									paddingLeft: '20px',
									margin: '5px 0',
								} }
							>
								{ positionOptions.map( ( item ) => (
									<li key={ item.value }>
										{ showValues ? item.value : item.label }
									</li>
								) ) }
							</ul>
						</details>
					</div>

					<div style={ { marginBottom: '20px' } }>
						<FormTokenField
							label={ __( 'Z-Index Classes', 'fs-blocks' ) }
							value={ getDisplayValues(
								zindexVals,
								zindexOptions,
								showValues
							) }
							suggestions={ zindexOptions.map( ( o ) =>
								showValues ? o.value : o.label
							) }
							onChange={ handleTokenChange( zindexOptions ) }
						/>
						<details style={ { marginTop: '5px' } }>
							<summary>
								{ __(
									'Available Z-Index Classes',
									'fs-blocks'
								) }
							</summary>
							<ul
								style={ {
									fontSize: '12px',
									paddingLeft: '20px',
									margin: '5px 0',
								} }
							>
								{ zindexOptions.map( ( item ) => (
									<li key={ item.value }>
										{ showValues ? item.value : item.label }
									</li>
								) ) }
							</ul>
						</details>
					</div>

					<div style={ { marginBottom: '20px' } }>
						<FormTokenField
							label={ __( 'Bleed Cover Classes', 'fs-blocks' ) }
							value={ getDisplayValues(
								bleedCoverVals,
								bleedCoverOptions,
								showValues
							) }
							suggestions={ bleedCoverOptions.map( ( o ) =>
								showValues ? o.value : o.label
							) }
							onChange={ handleTokenChange( bleedCoverOptions ) }
						/>
						<details style={ { marginTop: '5px' } }>
							<summary>
								{ __(
									'Available Bleed Cover Classes',
									'fs-blocks'
								) }
							</summary>
							<ul
								style={ {
									fontSize: '12px',
									paddingLeft: '20px',
									margin: '5px 0',
								} }
							>
								{ bleedCoverOptions.map( ( item ) => (
									<li key={ item.value }>
										{ showValues ? item.value : item.label }
									</li>
								) ) }
							</ul>
						</details>
					</div>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div
					className={ bgClasses.join( ' ' ) }
					aria-hidden="true"
					style={ bgStyle }
				/>
				<div className="wp-block-cover__img-video-wrapper">
					{ mediaElement }
				</div>
				<div className="wp-block-cover__inner-container">
					<InnerBlocks />
				</div>
			</div>
		</Fragment>
	);
}

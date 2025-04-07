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
import { Fragment, useEffect, useRef, useState } from '@wordpress/element';
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
	const result = [];
	for ( const value of values ) {
		const option = options.find( ( opt ) => opt.value === value );
		if ( option ) {
			if ( showValues ) {
				result.push( option.value );
			} else {
				result.push( option.label );
			}
		} else {
			result.push( value ); // Fallback if no matching option
		}
	}
	return result;
};

// Helper function to map selected labels or values back to values
const getValuesFromDisplay = ( displayValues, options, showValues ) => {
	const result = [];
	for ( const display of displayValues ) {
		const option = options.find( ( opt ) => {
			if ( showValues ) {
				return opt.value === display;
			}
			return opt.label === display;
		} );
		if ( option ) {
			result.push( option.value );
		} else {
			result.push( display ); // Fallback if no match
		}
	}
	return result;
};

// Convert arrays of { label, value } to suggestion strings based on showValues
const getSuggestions = ( options, showValues ) => {
	const suggestions = [];
	for ( const item of options ) {
		if ( showValues ) {
			suggestions.push( item.value );
		} else {
			suggestions.push( item.label );
		}
	}
	return suggestions;
};

/* ------------------------------------------------------------------------ */
/*  Utility functions
/* ------------------------------------------------------------------------ */

/**
 * Ensures that base classes are always present.
 *
 * @param {string[]} arr - Array of class names.
 * @return {string[]} Array of class names, guaranteed to include base classes.
 */
function ensureBaseClasses( arr ) {
	const final = [ ...arr ];
	const baseClasses = [
		'wp-block-cover',
		'wp-block-fancysquares-cover-block',
	];
	for ( const cls of baseClasses ) {
		if ( ! final.includes( cls ) ) {
			final.unshift( cls );
		}
	}
	return final;
}

/*
 * Builds the final array of classes, ensuring base classes and adding
 * the classes from each set (display, margin, padding, etc.).
 *
 * @param {string[]} displayArr - Selected display classes.
 * @param {string[]} marginArr - Selected margin classes.
 * @param {string[]} paddingArr - Selected padding classes.
 * @param {string[]} positionArr - Selected position classes.
 * @param {string[]} zindexArr - Selected z-index classes.
 * @param {string[]} bleedCoverArr - Selected bleed cover classes.
 * @return {string[]} Final array of classes.
 */
function buildClassArray(
	displayArr,
	marginArr,
	paddingArr,
	positionArr,
	zindexArr,
	bleedCoverArr
) {
	const final = ensureBaseClasses( [] );
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

/**
 * Converts a string to a dash-delimited, lowercase "slug" format.
 *
 * @param {string} str - Any string to be slugified.
 * @return {string} Slugified version.
 */
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
export default function Edit( { attributes, setAttributes, clientId } ) {
	const {
		url = '',
		isVideo = false,
		lazyLoadVideo = false,
		dimRatio = 50,
		contentPosition = 'center center',
		fullHeight = false,
		additionalClasses = [],
	} = attributes;

	const [ showValues, setShowValues ] = useState( false );
	const blockRef = useRef();

	// Set default classes and ensure base classes
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

	// Filter out base classes for token fields
	const filtered = additionalClasses.filter(
		( c ) =>
			! [
				'wp-block-cover',
				'wp-block-fancysquares-cover-block',
			].includes( c )
	);

	const intersect = ( arr, options ) =>
		arr.filter( ( c ) => options.some( ( opt ) => opt.value === c ) );

	const displayVals = intersect( filtered, displayOptions );
	const marginVals = intersect( filtered, marginOptions );
	const paddingVals = intersect( filtered, paddingOptions );
	const positionVals = intersect( filtered, positionOptions );
	const zindexVals = intersect( filtered, zindexOptions );
	const bleedCoverVals = intersect( filtered, bleedCoverOptions );

	/* ------------------------------------------------------------------------ */
	/*  onChange handlers for advanced classes
	/* ------------------------------------------------------------------------ */
	const onChangeDisplay = ( newTokens ) => {
		const newValues = getValuesFromDisplay(
			newTokens,
			displayOptions,
			showValues
		);
		const updated = buildClassArray(
			newValues,
			marginVals,
			paddingVals,
			positionVals,
			zindexVals,
			bleedCoverVals
		);
		setAttributes( { additionalClasses: updated } );
	};

	const onChangeMargin = ( newTokens ) => {
		const newValues = getValuesFromDisplay(
			newTokens,
			marginOptions,
			showValues
		);
		const updated = buildClassArray(
			displayVals,
			newValues,
			paddingVals,
			positionVals,
			zindexVals,
			bleedCoverVals
		);
		setAttributes( { additionalClasses: updated } );
	};

	const onChangePadding = ( newTokens ) => {
		const newValues = getValuesFromDisplay(
			newTokens,
			paddingOptions,
			showValues
		);
		const updated = buildClassArray(
			displayVals,
			marginVals,
			newValues,
			positionVals,
			zindexVals,
			bleedCoverVals
		);
		setAttributes( { additionalClasses: updated } );
	};

	const onChangePosition = ( newTokens ) => {
		const newValues = getValuesFromDisplay(
			newTokens,
			positionOptions,
			showValues
		);
		const updated = buildClassArray(
			displayVals,
			marginVals,
			paddingVals,
			newValues,
			zindexVals,
			bleedCoverVals
		);
		setAttributes( { additionalClasses: updated } );
	};

	const onChangeZIndex = ( newTokens ) => {
		const newValues = getValuesFromDisplay(
			newTokens,
			zindexOptions,
			showValues
		);
		const updated = buildClassArray(
			displayVals,
			marginVals,
			paddingVals,
			positionVals,
			newValues,
			bleedCoverVals
		);
		setAttributes( { additionalClasses: updated } );
	};

	const onChangeBleedCover = ( newTokens ) => {
		const newValues = getValuesFromDisplay(
			newTokens,
			bleedCoverOptions,
			showValues
		);
		const updated = buildClassArray(
			displayVals,
			marginVals,
			paddingVals,
			positionVals,
			zindexVals,
			newValues
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

	/* ------------------------------------------------------------------------ */
	/*  Compute background element classes and inline styles
	/* ------------------------------------------------------------------------ */
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
	};
	if (
		attributes.style &&
		attributes.style.color &&
		attributes.style.color.gradient
	) {
		bgStyle.backgroundImage = attributes.style.color.gradient;
	}
	if ( attributes.background ) {
		bgStyle.background = attributes.background;
	}
	if (
		attributes.style &&
		attributes.style.color &&
		attributes.style.color.background
	) {
		bgStyle.backgroundColor = attributes.style.color.background;
	}

	/* ------------------------------------------------------------------------ */
	/*  Decide which media to render
	/* ------------------------------------------------------------------------ */
	let mediaContent = null;
	if ( url ) {
		if ( isVideo ) {
			mediaContent = (
				<video
					className="wp-block-cover__video-background"
					src={ url }
					autoPlay
					loop
					muted
					playsInline
				/>
			);
		} else {
			mediaContent = (
				<img
					className="wp-block-cover__image-background"
					src={ url }
					alt=""
					loading="lazy"
				/>
			);
		}
	}

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
							'Display class names instead of labels.',
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
							suggestions={ getSuggestions(
								displayOptions,
								showValues
							) }
							onChange={ onChangeDisplay }
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
							suggestions={ getSuggestions(
								marginOptions,
								showValues
							) }
							onChange={ onChangeMargin }
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
							suggestions={ getSuggestions(
								paddingOptions,
								showValues
							) }
							onChange={ onChangePadding }
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
							suggestions={ getSuggestions(
								positionOptions,
								showValues
							) }
							onChange={ onChangePosition }
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
							suggestions={ getSuggestions(
								zindexOptions,
								showValues
							) }
							onChange={ onChangeZIndex }
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
							suggestions={ getSuggestions(
								bleedCoverOptions,
								showValues
							) }
							onChange={ onChangeBleedCover }
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

			<div { ...blockProps } ref={ blockRef }>
				<div
					className={ bgClasses.join( ' ' ) }
					aria-hidden="true"
					style={ bgStyle }
				/>
				<div className="wp-block-cover__img-video-wrapper">
					{ mediaContent }
				</div>
				<div className="wp-block-cover__inner-container">
					<InnerBlocks />
				</div>
			</div>
		</Fragment>
	);
}

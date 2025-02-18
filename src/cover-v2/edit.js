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
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { Fragment, useEffect } from '@wordpress/element';

import './editor.scss';
import {
	displayOptions,
	marginOptions,
	paddingOptions,
	positionOptions,
	zindexOptions,
} from '../../data/bootstrap-classes/classes.js';

/* ------------------------------------------------------------------------ */
/*  Prepare suggestions arrays
/* ------------------------------------------------------------------------ */
const displaySuggestions = displayOptions.map( ( o ) => o.value );
const marginSuggestions = marginOptions.map( ( o ) => o.value );
const paddingSuggestions = paddingOptions.map( ( o ) => o.value );
const positionSuggestions = positionOptions.map( ( o ) => o.value );
const zindexSuggestions = zindexOptions.map( ( o ) => o.value );

/* ------------------------------------------------------------------------ */
/*  Utility functions
/* ------------------------------------------------------------------------ */

/**
 * Make sure we always have the base classes in the array:
 * - wp-block-cover
 * - wp-block-fancysquares-cover-block
 */
function ensureBaseClasses( arr ) {
	let final = [ ...arr ];
	[ 'wp-block-cover', 'wp-block-fancysquares-cover-block' ].forEach(
		( cls ) => {
			if ( ! final.includes( cls ) ) {
				final.unshift( cls );
			}
		}
	);
	return final;
}

/* ------------------------------------------------------------------------ */
/*  Utility: Build final class array
/* ------------------------------------------------------------------------ */
/**
 * 1) Ensuring base classes
 * 2) Removing any existing display/margin/padding/position/zindex classes
 * 3) Adding the new tokens from each set
 *
 * @param {string} orig  'default' or 'fluid'
 * @param {string[]} displayArr
 * @param {string[]} marginArr
 * @param {string[]} paddingArr
 * @param {string[]} positionArr
 * @param {string[]} zindexArr
 * @return {string[]} The unified array of class names
 */
function buildClassArray(
	orig,
	displayArr,
	marginArr,
	paddingArr,
	positionArr,
	zindexArr
) {
	let final = ensureBaseClasses( orig );

	// Combine all suggestions so we can remove them from `final`.
	const allSuggestions = [
		...displaySuggestions,
		...marginSuggestions,
		...paddingSuggestions,
		...positionSuggestions,
		...zindexSuggestions,
	];

	// Remove any classes that appear in the known sets
	final = final.filter( ( c ) => ! allSuggestions.includes( c ) );

	// Now add in the new tokens from each set
	final.push(
		...displayArr,
		...marginArr,
		...paddingArr,
		...positionArr,
		...zindexArr
	);
	return final;
}

/**
 * Convert a string like "top left" to "top-left" for use in a class name.
 * Rough approximation of sanitize_title in WP.
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
export default function Edit( { attributes, setAttributes } ) {
	const {
		url,
		isVideo,
		lazyLoadVideo,
		dimRatio,
		contentPosition,
		fullHeight,
		additionalClasses,
	} = attributes;

	// ----------------------------------------------------------------------
	// Ensure base classes on mount (or if classes changed)
	// ----------------------------------------------------------------------
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

	// ----------------------------------------------------------------------
	// Extract known classes for display/margin/padding/position/zindex
	// ----------------------------------------------------------------------
	const filtered = additionalClasses.filter(
		( c ) =>
			! [
				'wp-block-cover',
				'wp-block-fancysquares-cover-block',
			].includes( c )
	);

	const intersect = ( arr, list ) =>
		arr.filter( ( c ) => list.includes( c ) );

	const displayVals = intersect( filtered, displaySuggestions );
	const marginVals = intersect( filtered, marginSuggestions );
	const paddingVals = intersect( filtered, paddingSuggestions );
	const positionVals = intersect( filtered, positionSuggestions );
	const zindexVals = intersect( filtered, zindexSuggestions );

	// ----------------------------------------------------------------------
	// onChange handlers for each set
	// ----------------------------------------------------------------------
	const onChangeDisplay = ( newTokens ) => {
		const updated = buildClassArray(
			additionalClasses,
			newTokens,
			marginVals,
			paddingVals,
			positionVals,
			zindexVals
		);
		setAttributes( { additionalClasses: updated } );
	};

	const onChangeMargin = ( newTokens ) => {
		const updated = buildClassArray(
			additionalClasses,
			displayVals,
			newTokens,
			paddingVals,
			positionVals,
			zindexVals
		);
		setAttributes( { additionalClasses: updated } );
	};

	const onChangePadding = ( newTokens ) => {
		const updated = buildClassArray(
			additionalClasses,
			displayVals,
			marginVals,
			newTokens,
			positionVals,
			zindexVals
		);
		setAttributes( { additionalClasses: updated } );
	};

	const onChangePosition = ( newTokens ) => {
		const updated = buildClassArray(
			additionalClasses,
			displayVals,
			marginVals,
			paddingVals,
			newTokens,
			zindexVals
		);
		setAttributes( { additionalClasses: updated } );
	};

	const onChangeZIndex = ( newTokens ) => {
		const updated = buildClassArray(
			additionalClasses,
			displayVals,
			marginVals,
			paddingVals,
			positionVals,
			newTokens
		);
		setAttributes( { additionalClasses: updated } );
	};

	// ----------------------------------------------------------------------
	// Media selection + Remove logic
	// ----------------------------------------------------------------------
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

	// ----------------------------------------------------------------------
	// contentPosition => e.g. "top left", "center center", "bottom right"
	// ----------------------------------------------------------------------
	const setPosition = ( val ) => {
		setAttributes( { contentPosition: val } );
	};

	// ----------------------------------------------------------------------
	// Build the editor preview classes
	// ----------------------------------------------------------------------
	const editorClasses = [ ...additionalClasses ];

	// If there's a contentPosition, add "is-position-{slug}"
	// If it's != 'center center', also add "has-custom-content-position"
	if ( contentPosition ) {
		const slug = toSlug( contentPosition );
		editorClasses.push( `is-position-${ slug }` );
		if ( contentPosition !== 'center center' ) {
			editorClasses.push( 'has-custom-content-position' );
		}
	}

	// ----------------------------------------------------------------------
	// useBlockProps => merges alignment classes, etc.
	// ----------------------------------------------------------------------
	const blockProps = useBlockProps( {
		className: editorClasses.join( ' ' ),
		style: fullHeight ? { minHeight: '100vh' } : {},
	} );

	// ----------------------------------------------------------------------
	// Render the editor UI
	// ----------------------------------------------------------------------
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
					<FormTokenField
						label={ __( 'Display Classes', 'fs-blocks' ) }
						value={ displayVals }
						suggestions={ displaySuggestions }
						onChange={ onChangeDisplay }
					/>
					<FormTokenField
						label={ __( 'Margin Classes', 'fs-blocks' ) }
						value={ marginVals }
						suggestions={ marginSuggestions }
						onChange={ onChangeMargin }
					/>
					<FormTokenField
						label={ __( 'Padding Classes', 'fs-blocks' ) }
						value={ paddingVals }
						suggestions={ paddingSuggestions }
						onChange={ onChangePadding }
					/>
					<FormTokenField
						label={ __( 'Position Classes', 'fs-blocks' ) }
						value={ positionVals }
						suggestions={ positionSuggestions }
						onChange={ onChangePosition }
					/>
					<FormTokenField
						label={ __( 'Z-Index Classes', 'fs-blocks' ) }
						value={ zindexVals }
						suggestions={ zindexSuggestions }
						onChange={ onChangeZIndex }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div
					className="wp-block-cover__background has-background-dim"
					aria-hidden="true"
					style={ { opacity: dimRatio / 100 } }
				/>
				{ url && isVideo ? (
					<video
						className="wp-block-cover__video-background"
						src={ url }
						autoPlay
						loop
						muted
						playsInline
					/>
				) : url ? (
					<img
						className="wp-block-cover__image-background"
						src={ url }
						alt=""
						loading="lazy"
					/>
				) : null }
				<div className="wp-block-cover__inner-container">
					<InnerBlocks />
				</div>
			</div>
		</Fragment>
	);
}

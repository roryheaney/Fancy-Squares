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
	bleedCoverOptions, // <-- Added here
} from '../../data/bootstrap-classes/classes.js';

/* ------------------------------------------------------------------------ */
/*  Prepare suggestions arrays
/* ------------------------------------------------------------------------ */
const displaySuggestions = displayOptions.map( ( o ) => o.value );
const marginSuggestions = marginOptions.map( ( o ) => o.value );
const paddingSuggestions = paddingOptions.map( ( o ) => o.value );
const positionSuggestions = positionOptions.map( ( o ) => o.value );
const zindexSuggestions = zindexOptions.map( ( o ) => o.value );
const bleedCoverSuggestions = bleedCoverOptions.map( ( o ) => o.value ); // <-- Added here

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
	bleedCoverArr // <-- Added to function signature
) {
	let final = ensureBaseClasses( orig );

	const allSuggestions = [
		...displaySuggestions,
		...marginSuggestions,
		...paddingSuggestions,
		...positionSuggestions,
		...zindexSuggestions,
		...bleedCoverSuggestions, // <-- Added here
	];

	// Remove classes that belong to any of the known sets
	final = final.filter( ( c ) => ! allSuggestions.includes( c ) );

	// Add the selected classes from each set
	final.push(
		...displayArr,
		...marginArr,
		...paddingArr,
		...positionArr,
		...zindexArr,
		...bleedCoverArr // <-- Added here
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
		url,
		isVideo,
		lazyLoadVideo,
		dimRatio,
		contentPosition,
		fullHeight,
		additionalClasses,
	} = attributes;

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
	const intersect = ( arr, list ) =>
		arr.filter( ( c ) => list.includes( c ) );

	const displayVals = intersect( filtered, displaySuggestions );
	const marginVals = intersect( filtered, marginSuggestions );
	const paddingVals = intersect( filtered, paddingSuggestions );
	const positionVals = intersect( filtered, positionSuggestions );
	const zindexVals = intersect( filtered, zindexSuggestions );
	const bleedCoverVals = intersect( filtered, bleedCoverSuggestions ); // <-- Bleed cover

	/* ------------------------------------------------------------------------ */
	/*  onChange handlers for advanced classes
	/* ------------------------------------------------------------------------ */
	const onChangeDisplay = ( newTokens ) => {
		const updated = buildClassArray(
			additionalClasses,
			newTokens,
			marginVals,
			paddingVals,
			positionVals,
			zindexVals,
			bleedCoverVals
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
			zindexVals,
			bleedCoverVals
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
			zindexVals,
			bleedCoverVals
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
			zindexVals,
			bleedCoverVals
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
			newTokens,
			bleedCoverVals
		);
		setAttributes( { additionalClasses: updated } );
	};

	const onChangeBleedCover = ( newTokens ) => {
		const updated = buildClassArray(
			additionalClasses,
			displayVals,
			marginVals,
			paddingVals,
			positionVals,
			zindexVals,
			newTokens
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

	// ------------------------------------------------------------------------
	// Compute background element classes and inline styles.
	// ------------------------------------------------------------------------
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

	// ------------------------------------------------------------------------
	// Determine which media element to render (avoid nested ternaries)
	// ------------------------------------------------------------------------
	let mediaElement = null;
	if ( url ) {
		if ( isVideo ) {
			mediaElement = (
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
			mediaElement = (
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
					{ /* FormTokenField for Bleed Cover Classes */ }
					<FormTokenField
						label={ __( 'Bleed Cover Classes', 'fs-blocks' ) }
						value={ bleedCoverVals }
						suggestions={ bleedCoverSuggestions }
						onChange={ onChangeBleedCover }
					/>
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

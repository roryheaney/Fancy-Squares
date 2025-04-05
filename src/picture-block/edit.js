/**
 * edit.js
 *
 * This file defines the editor-side behavior for the FS Dynamic Picture Block.
 * It provides:
 *  - An ImageSelector component for uploading, previewing, or removing images
 *    (default, small, medium, large).
 *  - Automatic fetching of alt text and captions from the Media Library
 *    for the default image.
 *  - A fallback 1×1 pixel "filler" image if no default is chosen,
 *    with an optional custom alt text.
 *  - Aspect ratio options to control the rendered shape (e.g., 16:9, 4:3, etc.).
 *  - A live preview that mimics the front-end's <picture> markup and
 *    shows how breakpoints and captions will appear.
 *  - Basic accessibility features, such as wrapping the preview
 *    image in a button for keyboard interaction.
 *
 * The goal is to mirror the block’s dynamic rendering logic
 * on the front end, ensuring editors can see an approximate representation
 * before publishing.
 */

import {
	useBlockProps,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import {
	PanelBody,
	Button,
	TextControl,
	FormTokenField,
} from '@wordpress/components';
import { __, sprintf } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import {
	borderOptions,
	borderRadiusOptions,
} from '../../data/bootstrap-classes/classes.js';

// Helper function to map class values to their labels for display
const getLabelsFromValues = ( values, options ) => {
	return values.map( ( value ) => {
		const option = options.find( ( opt ) => opt.value === value );
		return option ? option.label : value; // Fallback to value if no label found
	} );
};

// Helper function to map selected labels back to values
const getValuesFromLabels = ( labels, options ) => {
	return labels.map( ( label ) => {
		const option = options.find( ( opt ) => opt.label === label );
		return option ? option.value : label; // Fallback to label if no value found
	} );
};

/*
 * Reusable ImageSelector component
 */
function ImageSelector( { label, imageId, imageUrl, onSelect, onRemove } ) {
	const selectLabel = sprintf( __( 'Select %s Image', 'fs-blocks' ), label );
	const editLabel = sprintf(
		__( 'Edit or Replace %s Image', 'fs-blocks' ),
		label
	);
	const removeLabel = sprintf( __( 'Remove %s Image', 'fs-blocks' ), label );

	return (
		<MediaUploadCheck>
			<MediaUpload
				onSelect={ onSelect }
				allowedTypes={ [ 'image' ] }
				value={ imageId }
				render={ ( { open } ) => {
					const handleKeyDown = ( event ) => {
						if ( event.key === 'Enter' || event.key === ' ' ) {
							open();
						}
					};

					return (
						<div style={ { marginBottom: '1em' } }>
							<Button isSecondary onClick={ open }>
								{ imageId ? editLabel : selectLabel }
							</Button>

							{ imageUrl && (
								<>
									<button
										type="button"
										style={ {
											display: 'block',
											background: 'none',
											border: 'none',
											padding: 0,
											marginTop: '0.5em',
											cursor: 'pointer',
										} }
										onClick={ open }
										onKeyDown={ handleKeyDown }
										aria-label={ editLabel }
									>
										<img
											src={ imageUrl }
											alt=""
											style={ {
												maxWidth: '100%',
												display: 'block',
											} }
										/>
									</button>

									<div style={ { marginTop: '0.5em' } }>
										<Button
											isDestructive
											onClick={ onRemove }
										>
											{ removeLabel }
										</Button>
									</div>
								</>
							) }
						</div>
					);
				} }
			/>
		</MediaUploadCheck>
	);
}

export default function Edit( props ) {
	const { attributes, setAttributes } = props;
	const {
		defaultImageId = 0,
		defaultImageUrl = '',
		smallImageId = 0,
		smallImageUrl = '',
		mediumImageId = 0,
		mediumImageUrl = '',
		largeImageId = 0,
		largeImageUrl = '',
		aspectRatio = 'none',
		fillerAlt = '',
		borderClass = [],
		borderRadiusClass = [],
	} = attributes;

	const blockProps = useBlockProps();

	const [ defaultAlt, setDefaultAlt ] = useState( '' );
	const [ defaultCaption, setDefaultCaption ] = useState( '' );

	useEffect( () => {
		if ( ! defaultImageId ) {
			setDefaultAlt( '' );
			setDefaultCaption( '' );
			return;
		}
		apiFetch( { path: `/wp/v2/media/${ defaultImageId }` } )
			.then( ( mediaItem ) => {
				setDefaultAlt( mediaItem.alt_text || '' );
				setDefaultCaption( mediaItem.caption?.rendered || '' );
			} )
			.catch( () => {
				setDefaultAlt( '' );
				setDefaultCaption( '' );
			} );
	}, [ defaultImageId ] );

	function onSelectImage( breakpoint ) {
		return ( media ) => {
			if ( ! media?.id || ! media?.url ) {
				return;
			}
			setAttributes( {
				[ `${ breakpoint }ImageId` ]: media.id,
				[ `${ breakpoint }ImageUrl` ]: media.url,
			} );
		};
	}

	function onRemoveImage( breakpoint ) {
		return () => {
			setAttributes( {
				[ `${ breakpoint }ImageId` ]: 0,
				[ `${ breakpoint }ImageUrl` ]: '',
			} );
		};
	}

	const hasSmall = !! smallImageUrl;
	const hasMedium = !! mediumImageUrl;
	const hasLarge = !! largeImageUrl;

	// Build figure classes for aspect ratio
	const figureClassNames = [ 'wp-block-image', 'fs-block-image' ];
	if ( aspectRatio && aspectRatio !== 'none' ) {
		figureClassNames.push(
			'fs-block-image--has-aspect-ratio',
			`is-aspect-ratio-${ aspectRatio }`
		);
	} else {
		figureClassNames.push( 'fs-block-image--no-aspect-ratio' );
	}
	const figureClass = figureClassNames.join( ' ' );

	// Handle border and radius tokens
	const onChangeBorderTokens = ( tokens ) => {
		const newValues = getValuesFromLabels( tokens, borderOptions );
		setAttributes( { borderClass: newValues } );
	};

	const onChangeRadiusTokens = ( tokens ) => {
		const newValues = getValuesFromLabels( tokens, borderRadiusOptions );
		setAttributes( { borderRadiusClass: newValues } );
	};

	function getImageProps() {
		const classes = [];
		const styleObj = {};

		if ( borderClass?.length ) {
			classes.push( ...borderClass );
			styleObj.borderStyle = 'solid';
		}
		if ( borderRadiusClass?.length ) {
			classes.push( ...borderRadiusClass );
		}

		return {
			className: classes.length ? classes.join( ' ' ) : undefined,
			style: Object.keys( styleObj ).length ? styleObj : undefined,
		};
	}

	function PicturePreview() {
		const imgProps = getImageProps();
		const noBreakpoints = ! hasSmall && ! hasMedium && ! hasLarge;

		if ( noBreakpoints ) {
			if ( ! defaultImageUrl ) {
				return (
					<p>{ __( 'No default image selected.', 'fs-blocks' ) }</p>
				);
			}
			return (
				<figure className={ figureClass }>
					<img
						src={ defaultImageUrl }
						alt={ defaultAlt }
						style={ { maxWidth: '100%' } }
						{ ...imgProps }
					/>
					{ defaultCaption && (
						<figcaption
							dangerouslySetInnerHTML={ {
								__html: defaultCaption,
							} }
						/>
					) }
				</figure>
			);
		}

		let sourceSmall = null;
		let sourceMedium = null;
		let sourceLarge = null;

		if ( hasSmall ) {
			sourceSmall = (
				<source media="(max-width: 600px)" srcSet={ smallImageUrl } />
			);
		} else if ( hasMedium ) {
			sourceSmall = (
				<source media="(max-width: 600px)" srcSet={ mediumImageUrl } />
			);
		}

		if ( hasMedium && hasSmall ) {
			sourceMedium = (
				<source
					media="(min-width: 601px) and (max-width: 1023px)"
					srcSet={ mediumImageUrl }
				/>
			);
		} else if ( hasMedium && ! hasSmall ) {
			sourceMedium = (
				<source media="(max-width: 1023px)" srcSet={ mediumImageUrl } />
			);
		}

		if ( hasLarge ) {
			sourceLarge = (
				<source media="(min-width: 1024px)" srcSet={ largeImageUrl } />
			);
		} else if ( hasMedium ) {
			sourceLarge = (
				<source media="(min-width: 1024px)" srcSet={ mediumImageUrl } />
			);
		}

		return (
			<figure className={ figureClass }>
				<picture>
					{ sourceSmall }
					{ sourceMedium }
					{ sourceLarge }
					<img
						src={ defaultImageUrl || '' }
						alt={ defaultAlt }
						style={ { maxWidth: '100%' } }
						{ ...imgProps }
					/>
				</picture>
				{ defaultCaption && (
					<figcaption
						dangerouslySetInnerHTML={ { __html: defaultCaption } }
					/>
				) }
			</figure>
		);
	}

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<PanelBody
					title={ __( 'Image Settings', 'fs-blocks' ) }
					initialOpen
				>
					<ImageSelector
						label="Default"
						imageId={ defaultImageId }
						imageUrl={ defaultImageUrl }
						onSelect={ onSelectImage( 'default' ) }
						onRemove={ onRemoveImage( 'default' ) }
					/>

					{ ! defaultImageId && (
						<div
							style={ {
								marginBottom: '1em',
								padding: '0.5em',
								background: '#f3f3f3',
							} }
						>
							<p style={ { fontWeight: 'bold' } }>
								{ __(
									'No default image selected',
									'fs-blocks'
								) }
							</p>
							<p>
								{ __(
									'A 1×1 transparent filler image will be used. For accessibility, provide alt text below.',
									'fs-blocks'
								) }
							</p>
							<TextControl
								label={ __( 'Filler Image Alt', 'fs-blocks' ) }
								value={ fillerAlt }
								onChange={ ( val ) =>
									setAttributes( { fillerAlt: val } )
								}
								placeholder={ __(
									'e.g. "No image provided"',
									'fs-blocks'
								) }
							/>
						</div>
					) }

					<ImageSelector
						label="Small"
						imageId={ smallImageId }
						imageUrl={ smallImageUrl }
						onSelect={ onSelectImage( 'small' ) }
						onRemove={ onRemoveImage( 'small' ) }
					/>

					<ImageSelector
						label="Medium"
						imageId={ mediumImageId }
						imageUrl={ mediumImageUrl }
						onSelect={ onSelectImage( 'medium' ) }
						onRemove={ onRemoveImage( 'medium' ) }
					/>

					<ImageSelector
						label="Large"
						imageId={ largeImageId }
						imageUrl={ largeImageUrl }
						onSelect={ onSelectImage( 'large' ) }
						onRemove={ onRemoveImage( 'large' ) }
					/>

					<p style={ { fontWeight: 'bold', marginTop: '1em' } }>
						{ __( 'Aspect Ratio', 'fs-blocks' ) }
					</p>
					<select
						value={ aspectRatio }
						onChange={ ( e ) =>
							setAttributes( { aspectRatio: e.target.value } )
						}
						style={ { maxWidth: '100%' } }
					>
						<option value="none">
							{ __( 'None', 'fs-blocks' ) }
						</option>
						<option value="1-1">
							{ __( 'Square - 1:1', 'fs-blocks' ) }
						</option>
						<option value="4-3">
							{ __( 'Standard - 4:3', 'fs-blocks' ) }
						</option>
						<option value="3-4">
							{ __( 'Portrait - 3:4', 'fs-blocks' ) }
						</option>
						<option value="3-2">
							{ __( 'Classic - 3:2', 'fs-blocks' ) }
						</option>
						<option value="2-3">
							{ __( 'Classic Portrait - 2:3', 'fs-blocks' ) }
						</option>
						<option value="16-9">
							{ __( 'Wide - 16:9', 'fs-blocks' ) }
						</option>
						<option value="9-16">
							{ __( 'Tall - 9:16', 'fs-blocks' ) }
						</option>
					</select>

					<p style={ { fontWeight: 'bold', marginTop: '1em' } }>
						{ __( 'Border Classes', 'fs-blocks' ) }
					</p>
					<FormTokenField
						value={ getLabelsFromValues(
							borderClass,
							borderOptions
						) }
						suggestions={ borderOptions.map(
							( opt ) => opt.label
						) }
						onChange={ onChangeBorderTokens }
						label={ __( 'Add border classes', 'fs-blocks' ) }
					/>

					<p style={ { fontWeight: 'bold', marginTop: '1em' } }>
						{ __( 'Border Radius Classes', 'fs-blocks' ) }
					</p>
					<FormTokenField
						value={ getLabelsFromValues(
							borderRadiusClass,
							borderRadiusOptions
						) }
						suggestions={ borderRadiusOptions.map(
							( opt ) => opt.label
						) }
						onChange={ onChangeRadiusTokens }
						label={ __( 'Add radius classes', 'fs-blocks' ) }
					/>
				</PanelBody>
			</InspectorControls>
			<PicturePreview />
		</div>
	);
}

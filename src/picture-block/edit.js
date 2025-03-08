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
 *
 * WordPress references:
 *  - @wordpress/block-editor for useBlockProps, InspectorControls, MediaUpload, etc.
 *  - @wordpress/components for UI elements like PanelBody, Button, SelectControl, etc.
 *  - @wordpress/i18n for translation functions (__ and sprintf).
 *  - @wordpress/api-fetch for retrieving alt/caption data from the REST API.
 *
 * For the final output, this block uses a separate render.php file (server-side)
 * to produce the <picture> element and handle alt text/caption logic.
 * The server-side logic ensures any updates to attachments in the Media Library
 * automatically reflect on the front end.
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
	SelectControl,
	TextControl,
} from '@wordpress/components';
import { __, sprintf } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

// We actually use these to let the user pick border classes
import {
	borderOptions,
	borderRadiusOptions,
} from '../../data/bootstrap-classes/classes.js';

/**
 * Reusable ImageSelector component
 * Shows a button, image preview (wrapped in <button> for a11y), and a "Remove" button.
 *
 * @param {Object} props                  The props object.
 * @param {string} props.label            The label for the image slot, e.g. "Default" or "Small".
 * @param {number} props.imageId          The ID of the selected image in the WordPress Media Library.
 * @param {string} props.imageUrl         The URL of the selected image.
 * @param {Function} props.onSelect       Callback fired when a new image is selected.
 * @param {Function} props.onRemove       Callback fired when the image is removed.
 */
function ImageSelector( { label, imageId, imageUrl, onSelect, onRemove } ) {
	const selectLabel = sprintf(
		/* translators: %s is the breakpoint label, like 'Default' or 'Small' */
		__( 'Select %s Image', 'fs-blocks' ),
		label
	);
	const editLabel = sprintf(
		/* translators: %s is the breakpoint label, like 'Default' or 'Small' */
		__( 'Edit or Replace %s Image', 'fs-blocks' ),
		label
	);
	const removeLabel = sprintf(
		/* translators: %s is the breakpoint label, like 'Default' or 'Small' */
		__( 'Remove %s Image', 'fs-blocks' ),
		label
	);

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
		defaultImageId,
		defaultImageUrl,
		smallImageId,
		smallImageUrl,
		mediumImageId,
		mediumImageUrl,
		largeImageId,
		largeImageUrl,
		aspectRatio,
		fillerAlt,
		// NEW attributes for border classes
		borderClass,
		borderRadiusClass,
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

	const onSelectImage = ( breakpoint ) => ( media ) => {
		if ( ! media?.id || ! media?.url ) {
			return;
		}
		setAttributes( {
			[ `${ breakpoint }ImageId` ]: media.id,
			[ `${ breakpoint }ImageUrl` ]: media.url,
		} );
	};

	const onRemoveImage = ( breakpoint ) => () => {
		setAttributes( {
			[ `${ breakpoint }ImageId` ]: 0,
			[ `${ breakpoint }ImageUrl` ]: '',
		} );
	};

	const hasSmall = !! smallImageUrl;
	const hasMedium = !! mediumImageUrl;
	const hasLarge = !! largeImageUrl;

	const figureClassNames = [ 'wp-block-image', 'fs-block-image' ];
	if ( aspectRatio && aspectRatio !== 'none' ) {
		figureClassNames.push( 'fs-block-image--has-aspect-ratio' );
		figureClassNames.push( `is-aspect-ratio-${ aspectRatio }` );
	} else {
		figureClassNames.push( 'fs-block-image--no-aspect-ratio' );
	}

	// If user chose a border or radius, append them
	if ( borderClass ) {
		figureClassNames.push( borderClass );
	}
	if ( borderRadiusClass ) {
		figureClassNames.push( borderRadiusClass );
	}

	const figureClass = figureClassNames.join( ' ' );

	/**
	 * Build a React component to mimic the <picture>/<figure> logic.
	 * Avoid nested ternaries; use if statements.
	 */
	function PicturePreview() {
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

		// Up to 600px
		if ( hasSmall ) {
			sourceSmall = (
				<source media="(max-width: 600px)" srcSet={ smallImageUrl } />
			);
		} else if ( hasMedium ) {
			sourceSmall = (
				<source media="(max-width: 600px)" srcSet={ mediumImageUrl } />
			);
		}

		// 601px–1023px
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

		// >= 1024px
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

					<SelectControl
						label={ __( 'Aspect Ratio', 'fs-blocks' ) }
						value={ aspectRatio }
						options={ [
							{ label: __( 'None', 'fs-blocks' ), value: 'none' },
							{
								label: __( 'Square - 1:1', 'fs-blocks' ),
								value: '1-1',
							},
							{
								label: __( 'Standard - 4:3', 'fs-blocks' ),
								value: '4-3',
							},
							{
								label: __( 'Portrait - 3:4', 'fs-blocks' ),
								value: '3-4',
							},
							{
								label: __( 'Classic - 3:2', 'fs-blocks' ),
								value: '3-2',
							},
							{
								label: __(
									'Classic Portrait - 2:3',
									'fs-blocks'
								),
								value: '2-3',
							},
							{
								label: __( 'Wide - 16:9', 'fs-blocks' ),
								value: '16-9',
							},
							{
								label: __( 'Tall - 9:16', 'fs-blocks' ),
								value: '9-16',
							},
						] }
						onChange={ ( newVal ) =>
							setAttributes( { aspectRatio: newVal } )
						}
					/>

					{ /* NEW: Border & Border Radius dropdowns */ }
					<SelectControl
						label={ __( 'Border', 'fs-blocks' ) }
						value={ borderClass }
						options={ borderOptions }
						onChange={ ( newVal ) =>
							setAttributes( { borderClass: newVal } )
						}
					/>
					<SelectControl
						label={ __( 'Border Radius', 'fs-blocks' ) }
						value={ borderRadiusClass }
						options={ borderRadiusOptions }
						onChange={ ( newVal ) =>
							setAttributes( { borderRadiusClass: newVal } )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<PicturePreview />
		</div>
	);
}

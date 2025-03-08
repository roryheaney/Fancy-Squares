/**
 * edit.js
 *
 * Demonstrates a dynamic block editor that closely matches
 * the front-end <picture> & <figure> logic:
 * - Uses a "default" image's alt & caption from the Media Library via the REST API
 * - If defaultImageId is 0, we allow the user to enter an alt text for the filler image. (We have an extra attribute: fillerAlt.)
 * - Fallback logic for small, medium, large breakpoints
 * - Provides remove buttons and aspect ratio
 * - Adds `wp-block-image fs-block-image` plus either `fs-block-image--no-aspect-ratio`
 *   or `fs-block-image--has-aspect-ratio is-aspect-ratio-XYZ` to <figure>
 */

import {
	useBlockProps,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck
  } from '@wordpress/block-editor';

  import {
	PanelBody,
	Button,
	SelectControl,
	TextControl
  } from '@wordpress/components';

  import { __ } from '@wordpress/i18n';
  import { useEffect, useState } from '@wordpress/element';
  import apiFetch from '@wordpress/api-fetch';

  function ImageSelector( { label, imageId, imageUrl, onSelect, onRemove } ) {
	return (
	  <MediaUploadCheck>
		<MediaUpload
		  onSelect={ onSelect }
		  allowedTypes={ [ 'image' ] }
		  value={ imageId }
		  render={ ( { open } ) => (
			<div style={ { marginBottom: '1em' } }>
			  <Button isSecondary onClick={ open }>
				{ imageId
				  ? __( `Edit/Replace ${ label } Image`, 'fs-blocks' )
				  : __( `Select ${ label } Image`, 'fs-blocks' )
				}
			  </Button>

			  { imageUrl && (
				<>
				  <img
					src={ imageUrl }
					alt=""
					style={ {
					  maxWidth: '100%',
					  marginTop: '0.5em',
					  cursor: 'pointer'
					} }
					onClick={ open }
				  />
				  <div style={ { marginTop: '0.5em' } }>
					<Button isDestructive onClick={ onRemove }>
					  { __( `Remove ${ label } Image`, 'fs-blocks' ) }
					</Button>
				  </div>
				</>
			  ) }
			</div>
		  ) }
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
	  fillerAlt // NEW attribute
	} = attributes;

	const blockProps = useBlockProps();

	const [ defaultAlt, setDefaultAlt ] = useState( '' );
	const [ defaultCaption, setDefaultCaption ] = useState( '' );

	// If defaultImageId != 0, fetch alt/caption from the Media Library
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
	  if ( ! media?.id || ! media?.url ) return;
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

	const hasSmall  = !! smallImageUrl;
	const hasMedium = !! mediumImageUrl;
	const hasLarge  = !! largeImageUrl;

	let figureClassNames = [ 'wp-block-image', 'fs-block-image' ];
	if ( aspectRatio && aspectRatio !== 'none' ) {
	  figureClassNames.push( 'fs-block-image--has-aspect-ratio' );
	  figureClassNames.push( `is-aspect-ratio-${ aspectRatio }` );
	} else {
	  figureClassNames.push( 'fs-block-image--no-aspect-ratio' );
	}
	const figureClass = figureClassNames.join( ' ' );

	function PicturePreview() {
	  // If only default is set, simpler <img>
	  const noBreakpoints = ( ! hasSmall && ! hasMedium && ! hasLarge );

	  if ( noBreakpoints ) {
		if ( ! defaultImageUrl ) {
		  // If no default image, we show a note
		  return <p>{ __( 'No default image selected.', 'fs-blocks' ) }</p>;
		}
		return (
		  <figure className={ figureClass }>
			<img
			  src={ defaultImageUrl }
			  alt={ defaultAlt }
			  style={ { maxWidth: '100%' } }
			/>
			{ !! defaultCaption && (
			  <figcaption dangerouslySetInnerHTML={ { __html: defaultCaption } } />
			) }
		  </figure>
		);
	  }

	  // Otherwise, build pseudo <picture> preview
	  return (
		<figure className={ figureClass }>
		  <picture>
			{/* Up to 600px */}
			{ hasSmall ? (
			  <source media="(max-width: 600px)" srcSet={ smallImageUrl } />
			) : hasMedium ? (
			  <source media="(max-width: 600px)" srcSet={ mediumImageUrl } />
			) : null }

			{/* 601px–1023px */}
			{ hasMedium && hasSmall ? (
			  <source
				media="(min-width: 601px) and (max-width: 1023px)"
				srcSet={ mediumImageUrl }
			  />
			) : hasMedium && ! hasSmall ? (
			  <source
				media="(max-width: 1023px)"
				srcSet={ mediumImageUrl }
			  />
			) : null }

			{/* >= 1024px */}
			{ hasLarge ? (
			  <source
				media="(min-width: 1024px)"
				srcSet={ largeImageUrl }
			  />
			) : hasMedium ? (
			  <source
				media="(min-width: 1024px)"
				srcSet={ mediumImageUrl }
			  />
			) : null }

			{/* Fallback <img> */}
			<img
			  src={ defaultImageUrl || '' }
			  alt={ defaultAlt }
			  style={ { maxWidth: '100%' } }
			/>
		  </picture>

		  { !! defaultCaption && (
			<figcaption dangerouslySetInnerHTML={ { __html: defaultCaption } } />
		  ) }
		</figure>
	  );
	}

	return (
	  <div { ...blockProps }>
		<InspectorControls>
		  <PanelBody title={ __( 'Image Settings', 'fs-blocks' ) } initialOpen={ true }>
			{/* DEFAULT IMAGE */}
			<ImageSelector
			  label="Default"
			  imageId={ defaultImageId }
			  imageUrl={ defaultImageUrl }
			  onSelect={ onSelectImage( 'default' ) }
			  onRemove={ onRemoveImage( 'default' ) }
			/>

			{/* If there's NO default image, show a note & let user set fillerAlt */}
			{ ! defaultImageId && (
			  <div style={ { marginBottom: '1em', padding: '0.5em', background: '#f3f3f3' } }>
				<p style={ { fontWeight: 'bold' } }>
				  { __( 'No default image selected', 'fs-blocks' ) }
				</p>
				<p>
				  { __(
					'A 1×1 transparent filler image will be used. For accessibility, you can provide alt text below.',
					'fs-blocks'
				  ) }
				</p>
				<TextControl
				  label={ __( 'Filler Image Alt', 'fs-blocks' ) }
				  value={ fillerAlt }
				  onChange={ (val) => setAttributes( { fillerAlt: val } ) }
				  placeholder={ __( 'e.g. "No image provided"', 'fs-blocks' ) }
				/>
			  </div>
			) }

			{/* SMALL IMAGE */}
			<ImageSelector
			  label="Small"
			  imageId={ smallImageId }
			  imageUrl={ smallImageUrl }
			  onSelect={ onSelectImage( 'small' ) }
			  onRemove={ onRemoveImage( 'small' ) }
			/>

			{/* MEDIUM IMAGE */}
			<ImageSelector
			  label="Medium"
			  imageId={ mediumImageId }
			  imageUrl={ mediumImageUrl }
			  onSelect={ onSelectImage( 'medium' ) }
			  onRemove={ onRemoveImage( 'medium' ) }
			/>

			{/* LARGE IMAGE */}
			<ImageSelector
			  label="Large"
			  imageId={ largeImageId }
			  imageUrl={ largeImageUrl }
			  onSelect={ onSelectImage( 'large' ) }
			  onRemove={ onRemoveImage( 'large' ) }
			/>

			{/* ASPECT RATIO */}
			<SelectControl
			  label={ __( 'Aspect Ratio', 'fs-blocks' ) }
			  value={ aspectRatio }
			  options={ [
				{ label: __( 'None', 'fs-blocks' ), value: 'none' },
				{ label: __( 'Square - 1:1', 'fs-blocks' ),  value: '1-1' },
				{ label: __( 'Standard - 4:3', 'fs-blocks' ),  value: '4-3' },
				{ label: __( 'Portrait - 3:4', 'fs-blocks' ),  value: '3-4' },
				{ label: __( 'Classic - 3:2', 'fs-blocks' ),  value: '3-2' },
				{ label: __( 'Classic Portrait - 2:3', 'fs-blocks' ),  value: '2-3' },
				{ label: __( 'Wide - 16:9', 'fs-blocks' ), value: '16-9' },
				{ label: __( 'Tall - 9:16', 'fs-blocks' ), value: '9-16' },
			  ] }
			  onChange={ ( newVal ) => setAttributes( { aspectRatio: newVal } ) }
			/>
		  </PanelBody>
		</InspectorControls>

		<PicturePreview />
	  </div>
	);
  }

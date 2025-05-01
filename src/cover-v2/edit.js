/**
 * fs-blocks/cover-v2 — Edit component (shared plumbing + bespoke media panel)
 */
import {
	BlockControls,
	InspectorControls,
	InnerBlocks,
	MediaUpload,
	MediaUploadCheck,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	ToolbarGroup,
	Dropdown,
	Button,
	RangeControl,
	ToggleControl,
	AlignmentMatrixControl,
	PanelBody,
} from '@wordpress/components';
import { Fragment, useMemo } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import { useBlockControls } from '../utils/useBlockControls';
import { toSlug } from '../utils/helpers';
import { BLOCK_CONFIG } from '../utils/config/blockConfig';

import './editor.scss';

/* -------------------------------------------------------------------------- */
/*  Media-handling helpers                                                    */
/* -------------------------------------------------------------------------- */
const MediaPanel = ( {
	url,
	isVideo,
	lazyLoadVideo,
	onSelectMedia,
	onRemoveMedia,
	onToggleLazy,
	dimRatio,
	setDimRatio,
	fullHeight,
	setFullHeight,
} ) => (
	<PanelBody title={ __( 'Cover Settings', 'fs-blocks' ) } initialOpen>
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
					style={ { marginTop: 8 } }
				>
					{ __( 'Remove Media', 'fs-blocks' ) }
				</Button>
			) }
		</MediaUploadCheck>

		{ isVideo && (
			<ToggleControl
				label={ __( 'Lazy-load video', 'fs-blocks' ) }
				checked={ lazyLoadVideo }
				onChange={ onToggleLazy }
			/>
		) }

		<RangeControl
			label={ __( 'Dim ratio', 'fs-blocks' ) }
			value={ dimRatio }
			onChange={ setDimRatio }
			min={ 0 }
			max={ 100 }
		/>

		<ToggleControl
			label={ __( 'Full-height', 'fs-blocks' ) }
			checked={ fullHeight }
			onChange={ setFullHeight }
		/>
	</PanelBody>
);

/* -------------------------------------------------------------------------- */
/*  Edit                                                                      */
/* -------------------------------------------------------------------------- */
export default function Edit( props ) {
	const { attributes, setAttributes, clientId, name } = props;
	const {
		/* media */
		url = '',
		isVideo = false,
		lazyLoadVideo = false,
		/* overlay */
		dimRatio = 40,
		contentPosition = 'center center',
		/* layout */
		fullHeight = false,
	} = attributes;

	/* ---------- shared generic inspector panels ---------- */
	const { inspectorPanels, previewClasses } = useBlockControls(
		name,
		attributes,
		setAttributes,
		clientId,
		{
			hasWidthControls: false,
			dropdown: BLOCK_CONFIG[ name ]?.dropdown || null,
			showPadding: true,
			showMargin: true,
			showNegMargin: true,
		}
	);

	/* ---------- bespoke media handlers ---------- */
	const onSelectMedia = ( media ) => {
		if ( ! media?.url ) {
			setAttributes( { url: '', isVideo: false, lazyLoadVideo: false } );
			return;
		}
		setAttributes( {
			url: media.url,
			isVideo: media.type === 'video',
		} );
	};
	const onRemoveMedia = () =>
		setAttributes( { url: '', isVideo: false, lazyLoadVideo: false } );
	const onToggleLazy = ( v ) => setAttributes( { lazyLoadVideo: v } );
	const setDimRatio = ( v ) => setAttributes( { dimRatio: v } );
	const setFullHeightFn = ( v ) => setAttributes( { fullHeight: v } );

	/* ---------- toolbar (content-position matrix) ---------- */
	const setPosition = ( val ) => setAttributes( { contentPosition: val } );

	/* ---------------------------------------------------------------------- */
	/*  Build *root* class list – and strip colour classes the engine adds    */
	/* ---------------------------------------------------------------------- */
	const rootClasses = useMemo( () => {
		const cls = [
			'wp-block-cover',
			'wp-block-fancysquares-cover-block',
			...previewClasses,
		];

		/* position helpers */
		if ( contentPosition ) {
			const slug = toSlug( contentPosition );
			cls.push( `is-position-${ slug }` );
			if ( contentPosition !== 'center center' ) {
				cls.push( 'has-custom-content-position' );
			}
		}

		/* remove any colour / gradient classes automatically added to root */
		const colourRE = /has-(?:[\w-]+-)?background-(?:color|gradient)/;
		return cls.filter( ( c ) => ! colourRE.test( c ) );
	}, [ previewClasses, contentPosition ] );

	/* ---------------------------------------------------------------------- */
	/*  Derive overlay (background) classes + style from attributes           */
	/* ---------------------------------------------------------------------- */
	const overlayClasses = [ 'wp-block-cover__background' ];
	const overlayStyle = { opacity: dimRatio / 100 };

	/* theme palette colour -------------------------------------------------- */
	if ( attributes.backgroundColor ) {
		overlayClasses.push(
			`has-${ attributes.backgroundColor }-background-color`
		);
	}

	/* theme gradient -------------------------------------------------------- */
	if ( attributes.gradient ) {
		overlayClasses.push(
			`has-${ attributes.gradient }-gradient-background`,
			'has-background-gradient'
		);
	}

	/* custom hex ------------------------------------------------------------ */
	if ( attributes?.style?.color?.background ) {
		overlayStyle.backgroundColor = attributes.style.color.background;
	}

	/* custom gradient ------------------------------------------------------- */
	if ( attributes?.style?.color?.gradient ) {
		overlayStyle.backgroundImage = attributes.style.color.gradient;
	}

	/* ---------------------------------------------------------------------- */
	/*  root props (strip inline colour from root)                            */
	/* ---------------------------------------------------------------------- */
	const rootStyle = fullHeight ? { minHeight: '100vh' } : {};

	/* WP stores custom colours in style.color[background|gradient] —
	   we do NOT want those on the root element: */
	if ( rootStyle.style?.color ) delete rootStyle.style;

	const blockProps = useBlockProps( {
		className: rootClasses.join( ' ' ),
		style: rootStyle,
	} );

	/* ---------- media element ---------- */
	const mediaEl =
		url &&
		( isVideo ? (
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
		) );

	/* ---------------------------------------------------------------------- */
	/*  Render                                                                */
	/* ---------------------------------------------------------------------- */
	return (
		<Fragment>
			{ /* toolbar --------------------------------------------------------- */ }
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

			{ /* inspector ------------------------------------------------------- */ }
			<InspectorControls>
				{ inspectorPanels }
				<MediaPanel
					url={ url }
					isVideo={ isVideo }
					lazyLoadVideo={ lazyLoadVideo }
					onSelectMedia={ onSelectMedia }
					onRemoveMedia={ onRemoveMedia }
					onToggleLazy={ onToggleLazy }
					dimRatio={ dimRatio }
					setDimRatio={ setDimRatio }
					fullHeight={ fullHeight }
					setFullHeight={ setFullHeightFn }
				/>
			</InspectorControls>

			{ /* preview --------------------------------------------------------- */ }
			<div { ...blockProps }>
				{ /* overlay ------------------------------------------------------ */ }
				<div
					className={ overlayClasses.join( ' ' ) }
					aria-hidden="true"
					style={ overlayStyle }
				/>
				{ /* media -------------------------------------------------------- */ }
				<div className="wp-block-cover__img-video-wrapper">
					{ mediaEl }
				</div>
				{ /* inner blocks -------------------------------------------------- */ }
				<div className="wp-block-cover__inner-container">
					<InnerBlocks />
				</div>
			</div>
		</Fragment>
	);
}

import { InspectorControls, ToggleControl } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';

import { useBlockControls } from '../utils/useBlockControls';
import { BLOCK_CONFIG } from '../utils/config/blockConfig';

export default function CoverExtensionEdit( props ) {
	const { attributes, setAttributes, clientId } = props;
	const {
		url = '',
		isVideo = false,
		lazyLoadVideo = false,
		fullHeight = false,
	} = attributes;

	const { inspectorPanels } = useBlockControls(
		'fs-blocks/cover-v2',
		attributes,
		setAttributes,
		clientId,
		{
			hasWidthControls: false,
			dropdown: BLOCK_CONFIG[ 'fs-blocks/cover-v2' ].dropdown,
			showPadding: true,
			showMargin: true,
			showNegMargin: true,
		}
	);

	// Derive isVideo attribute from file extension.
	useEffect( () => {
		if ( ! url ) {
			if ( isVideo ) setAttributes( { isVideo: false } );
			return;
		}
		const ext = url.split( '.' ).pop()?.toLowerCase() || '';
		const videoExtensions = [ 'mp4', 'mov', 'webm', 'ogg' ];
		const videoFile = videoExtensions.includes( ext );
		if ( videoFile !== isVideo ) {
			setAttributes( { isVideo: videoFile } );
		}
	}, [ url ] );

	const onToggleLazy = ( v ) => setAttributes( { lazyLoadVideo: v } );
	const setFullHeightFn = ( v ) => setAttributes( { fullHeight: v } );

	return (
		<InspectorControls key="fs-cover-extension">
			{ inspectorPanels }
			<PanelBody
				title={ __( 'Cover Settings', 'fs-blocks' ) }
				initialOpen
			>
				{ isVideo && (
					<ToggleControl
						label={ __( 'Lazy-load video', 'fs-blocks' ) }
						checked={ lazyLoadVideo }
						onChange={ onToggleLazy }
					/>
				) }
				<ToggleControl
					label={ __( 'Full-height', 'fs-blocks' ) }
					checked={ fullHeight }
					onChange={ setFullHeightFn }
				/>
			</PanelBody>
		</InspectorControls>
	);
}

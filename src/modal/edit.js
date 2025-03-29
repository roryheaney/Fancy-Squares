import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	InnerBlocks,
	useBlockProps,
} from '@wordpress/block-editor';
import { PanelBody, TextControl, SelectControl } from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const { modalId, modalTitle, modalPlacement } = attributes;

	const blockProps = useBlockProps( {
		className: 'fs-blocks-modal-editor',
	} );

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody
					title={ __( 'Modal Settings', 'fs-blocks' ) }
					initialOpen={ true }
				>
					<TextControl
						label={ __( 'Modal ID', 'fs-blocks' ) }
						help={ __(
							'Must match the button’s "Modal ID" so it can open this modal.',
							'fs-blocks'
						) }
						value={ modalId }
						onChange={ ( newVal ) =>
							setAttributes( { modalId: newVal } )
						}
					/>
					<TextControl
						label={ __( 'Modal Title', 'fs-blocks' ) }
						value={ modalTitle }
						onChange={ ( newVal ) =>
							setAttributes( { modalTitle: newVal } )
						}
					/>
					<SelectControl
						label={ __( 'Modal Placement', 'fs-blocks' ) }
						help={ __(
							'Controls how the modal is aligned on screen.',
							'fs-blocks'
						) }
						value={ modalPlacement }
						options={ [
							{
								label: __( 'Center', 'fs-blocks' ),
								value: 'center',
							},
							{
								label: __( 'Top Center', 'fs-blocks' ),
								value: 'top-center',
							},
							{
								label: __( 'Bottom Center', 'fs-blocks' ),
								value: 'bottom-center',
							},
							{
								label: __( 'Top Left', 'fs-blocks' ),
								value: 'top-left',
							},
							{
								label: __( 'Top Right', 'fs-blocks' ),
								value: 'top-right',
							},
							{
								label: __( 'Bottom Left', 'fs-blocks' ),
								value: 'bottom-left',
							},
							{
								label: __( 'Bottom Right', 'fs-blocks' ),
								value: 'bottom-right',
							},
						] }
						onChange={ ( newVal ) =>
							setAttributes( { modalPlacement: newVal } )
						}
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<h3>{ modalTitle || __( 'Modal Title', 'fs-blocks' ) }</h3>
				<InnerBlocks
					template={ [
						[
							'core/paragraph',
							{ placeholder: 'Enter modal content...' },
						],
					] }
					templateLock={ false }
				/>
			</div>
		</Fragment>
	);
}

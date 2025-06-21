import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	InnerBlocks,
	useBlockProps,
} from '@wordpress/block-editor';
import { PanelBody, TextControl, SelectControl, Flex, FlexItem } from '@wordpress/components';
import { useEffect, Fragment } from '@wordpress/element';
import { ClipboardButton } from '@10up/block-components';
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const { modalId, modalTitle, modalPlacement } = attributes;

	const blockProps = useBlockProps( {
		className: 'fs-blocks-modal-editor',
	} );

	useEffect( () => {
		if ( ! modalId ) {
			setAttributes( { modalId: clientId } );
		}
	}, [ clientId, modalId, setAttributes ] );

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody
					title={ __( 'Modal Settings', 'fs-blocks' ) }
					initialOpen={ true }
				>
					<Flex gap="2">
						<FlexItem isBlock>
							<TextControl
								label={ __( 'Modal ID', 'fs-blocks' ) }
								help={ __(
									'Use this ID for your Modal Button to open this modal.',
									'fs-blocks'
								) }
								value={ modalId }
								disabled
							/>
						</FlexItem>
						<FlexItem>
							<ClipboardButton
								text={ modalId }
								disabled={ ! modalId }
							/>
						</FlexItem>
					</Flex>
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

import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	InnerBlocks,
	useBlockProps,
} from '@wordpress/block-editor';
import { PanelBody, TextControl, Flex, FlexItem } from '@wordpress/components';
import { useEffect, Fragment } from '@wordpress/element';
import { ClipboardButton } from '@10up/block-components';
import './editor.scss';

export default function Edit( { clientId, attributes, setAttributes } ) {
	const { modalId, modalTitle } = attributes;

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

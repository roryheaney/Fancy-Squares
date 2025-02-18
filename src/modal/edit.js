import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	InnerBlocks,
	useBlockProps,
} from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const { modalId, modalTitle } = attributes;

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

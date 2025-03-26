import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/editor'; // or '@wordpress/block-editor' in WP 5.8+
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const { buttonText, modalId } = attributes;

	// Editor preview classes
	const blockProps = useBlockProps( {
		className: 'fs-modal-button-preview',
	} );

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<PanelBody
					title={ __( 'Modal Button Settings', 'fs-blocks' ) }
					initialOpen={ true }
				>
					<TextControl
						label={ __( 'Button Text', 'fs-blocks' ) }
						value={ buttonText }
						onChange={ ( newVal ) =>
							setAttributes( { buttonText: newVal } )
						}
					/>
					<TextControl
						label={ __( 'Modal ID to Open', 'fs-blocks' ) }
						help={ __(
							'The same ID used by the Modal block.',
							'fs-blocks'
						) }
						value={ modalId }
						onChange={ ( newVal ) =>
							setAttributes( { modalId: newVal } )
						}
					/>
				</PanelBody>
			</InspectorControls>

			<button
				type="button"
				className="btn btn-primary wp-block-button__link  wp-element-button"
				disabled
			>
				{ buttonText || __( 'Open Modal', 'fs-blocks' ) }
			</button>
			<p className="description">
				{ modalId
					? `Modal ID: #${ modalId }`
					: __( 'No Modal ID set.', 'fs-blocks' ) }
			</p>
		</div>
	);
}

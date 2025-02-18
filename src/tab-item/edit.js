import { useBlockProps, RichText, InnerBlocks } from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';

export default function Edit( { clientId, attributes, setAttributes } ) {
	const { title, tabId } = attributes;
	const blockProps = useBlockProps( {
		style: {
			padding: '1rem',
			border: '1px solid #dee2e6',
			borderTop: 'none',
		},
	} );

	// Initialize tab ID
	useEffect( () => {
		if ( ! tabId ) setAttributes( { tabId: clientId } );
	}, [ clientId ] );

	return (
		<div { ...blockProps }>
			<RichText
				tagName="div"
				className="tab-title-editor"
				value={ title }
				allowedFormats={ [] }
				onChange={ ( newTitle ) =>
					setAttributes( { title: newTitle } )
				}
				placeholder="Tab Title"
				style={ {
					fontSize: '1.25rem',
					marginBottom: '0.5rem',
				} }
			/>
			<InnerBlocks />
		</div>
	);
}

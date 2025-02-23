import {
	useBlockProps,
	RichText,
	InnerBlocks,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import './editor.scss';

export default function Edit( { clientId, attributes, setAttributes } ) {
	const { title, tabId } = attributes;

	// Ensure the child has a persistent identifier
	useEffect( () => {
		if ( ! tabId ) {
			setAttributes( { tabId: clientId } );
		}
	}, [ clientId, tabId ] );

	// Use the persistent tabId (or fallback to clientId)
	const persistentTabId = tabId || clientId;

	// Compare the parent's activeTab with the persistentTabId
	const { isActiveTab } = useSelect(
		( select ) => {
			const { getBlock, getBlockRootClientId } =
				select( blockEditorStore );
			const parentClientId = getBlockRootClientId( clientId );
			const parentBlock = getBlock( parentClientId );
			const parentActiveTab = parentBlock?.attributes?.activeTab;
			return {
				isActiveTab: parentActiveTab === persistentTabId,
			};
		},
		[ clientId, tabId ]
	);

	const blockProps = useBlockProps( {
		className: isActiveTab ? 'is-active-tab' : '',
		style: {
			padding: '1rem',
			border: '1px solid #dee2e6',
			borderTop: 'none',
		},
	} );

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

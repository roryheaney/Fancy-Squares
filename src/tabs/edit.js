import {
	useBlockProps,
	InnerBlocks,
	useSetting,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { useEffect, useState } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import './editor.scss';
// Add this import at the top
import { useActiveTabClass } from './editor';

export default function Edit( { clientId, attributes, setAttributes } ) {
	const { blockId } = attributes;
	const blockProps = useBlockProps();
	const [ activeTab, setActiveTab ] = useState( '' );
	const { selectBlock } = useDispatch( blockEditorStore );

	// Get child blocks
	const { childBlocks } = useSelect(
		( select ) => {
			const { getBlockOrder, getBlock } = select( blockEditorStore );
			const childIds = getBlockOrder( clientId );
			return {
				childBlocks: childIds.map( ( childId ) => getBlock( childId ) ),
			};
		},
		[ clientId ]
	);

	// Initialize block ID and active tab
	useEffect( () => {
		if ( ! blockId ) setAttributes( { blockId: clientId } );
		if ( childBlocks.length > 0 && ! activeTab ) {
			setActiveTab( childBlocks[ 0 ].clientId );
		}
	}, [ clientId, childBlocks ] );

	// Handle tab click
	const handleTabClick = ( tabClientId ) => {
		setActiveTab( tabClientId );
		selectBlock( tabClientId );
	};

	// Add this hook inside the component
	useActiveTabClass( clientId, activeTab );

	return (
		<div { ...blockProps }>
			<div className="wp-block-fs-blocks-tabs-editor">
				<ul className="tabs-nav">
					{ childBlocks.map( ( block ) => (
						<li key={ block.clientId } className="nav-item">
							<button
								className={ `nav-link ${
									activeTab === block.clientId
										? 'is-active'
										: ''
								}` }
								onClick={ () =>
									handleTabClick( block.clientId )
								}
								role="tab"
								aria-selected={ activeTab === block.clientId }
							>
								{ block.attributes.title || 'New Tab' }
							</button>
						</li>
					) ) }
					<li className="nav-item">
						<InnerBlocks.ButtonBlockAppender />
					</li>
				</ul>

				<div className="tab-content-editor">
					<InnerBlocks
					// ... other props ...
					/>
				</div>
			</div>
		</div>
	);
}

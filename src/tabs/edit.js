import {
	useBlockProps,
	InnerBlocks,
	useSetting,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { useEffect, useState, useRef } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import './editor.scss';
import { useActiveTabClass } from './editor';

export default function Edit( { clientId, attributes, setAttributes } ) {
	const { blockId, activeTab } = attributes;
	const blockProps = useBlockProps();
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

	// Initialize block ID and active tab (only if not set)
	useEffect( () => {
		if ( ! blockId ) {
			setAttributes( { blockId: clientId } );
		}
		// When there are children but no activeTab yet, default to the first child's persistent ID.
		if ( childBlocks.length > 0 && ! activeTab ) {
			const firstChildTabId = childBlocks[0].attributes.tabId || childBlocks[0].clientId;
			setAttributes( { activeTab: firstChildTabId } );
		}
	}, [ clientId, childBlocks ] );

	// Track the previous number of child blocks
	const previousChildCountRef = useRef(childBlocks.length);
	useEffect(() => {
		if ( childBlocks.length > previousChildCountRef.current ) {
			// A new tab-item has been added.
			const newChild = childBlocks[ childBlocks.length - 1 ];
			const newActiveTab = newChild.attributes.tabId || newChild.clientId;
			setAttributes( { activeTab: newActiveTab } );
			selectBlock( newChild.clientId );
		}
		previousChildCountRef.current = childBlocks.length;
	}, [ childBlocks ]);

	// Handle tab click manually (if user clicks on an existing tab)
	const handleTabClick = ( childBlock ) => {
		const childTabId = childBlock.attributes.tabId || childBlock.clientId;
		setAttributes( { activeTab: childTabId } );
		selectBlock( childBlock.clientId );
	};

	// Apply active class on child elements based on activeTab attribute
	useActiveTabClass( clientId, activeTab );

	const TEMPLATE = [
		[
			'fs-blocks/tab-item'
		],
	];

	return (
		<div { ...blockProps }>
			<div className="wp-block-fs-blocks-tabs-editor">
				<ul className="tabs-nav">
					{ childBlocks.map( ( block ) => {
						const childTabId = block.attributes.tabId || block.clientId;
						return (
							<li key={ block.clientId } className="nav-item">
								<button
									className={ `nav-link ${ activeTab === childTabId ? 'is-active' : '' }` }
									onClick={ () => handleTabClick( block ) }
									role="tab"
									aria-selected={ activeTab === childTabId }
								>
									{ block.attributes.title || 'New Tab' }
								</button>
							</li>
						);
					} ) }
					<li className="nav-item">
						<InnerBlocks.ButtonBlockAppender />
					</li>
				</ul>

				<div className="tab-content-editor">
					<InnerBlocks
						allowedBlocks={ [ 'fs-blocks/tab-item' ] }
						template={ TEMPLATE }
						templateLock={ false }
					/>
				</div>
			</div>
		</div>
	);
}

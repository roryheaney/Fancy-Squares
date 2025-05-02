/**
 * fs-blocks/index-block – Edit component
 * Adds generic class controls + shows the column number.
 */
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import { useBlockControls } from '../utils/useBlockControls';
import './editor.scss';
/* ----------------------------------------------------- */
/*  Component                                            */
/* ----------------------------------------------------- */
export default function Edit( props ) {
	const { clientId, attributes, setAttributes, name } = props;
	const { blockIndex } = attributes;

	/* ---------- generic shared panels / classes ---------- */
	const { inspectorPanels, previewClasses } = useBlockControls(
		name,
		attributes,
		setAttributes,
		clientId,
		{
			hasWidthControls: false,
			dropdown: null,
			/* show sliders & token fields (position / z‑index) */
			showPadding: true,
			showMargin: true,
			showNegMargin: true,
		}
	);

	/* ---------- calculate this column’s index ---------- */
	const parentIds = useSelect(
		( select ) => select( 'core/block-editor' ).getBlockParents( clientId ),
		[ clientId ]
	);
	const columnsContainerId =
		parentIds.length >= 2 ? parentIds[ parentIds.length - 2 ] : '';
	const thisColumnId =
		parentIds.length >= 1 ? parentIds[ parentIds.length - 1 ] : '';

	const zeroBased = useSelect(
		( select ) => {
			const siblings =
				select( 'core/block-editor' ).getBlocks( columnsContainerId );
			return siblings.findIndex( ( b ) => b.clientId === thisColumnId );
		},
		[ columnsContainerId, thisColumnId ]
	);

	const oneBased = zeroBased + 1;

	/* persist as attribute (for front‑end render.php) */
	useEffect( () => {
		if ( blockIndex !== oneBased ) {
			setAttributes( { blockIndex: oneBased } );
		}
	}, [ oneBased ] ); // eslint-disable-line react-hooks/exhaustive-deps

	/* ---------- block props ---------- */
	const blockProps = useBlockProps( {
		className: previewClasses.join( ' ' ),
	} );

	/* ---------- render ---------- */
	return (
		<>
			<InspectorControls>
				{ inspectorPanels /* generic shared panels */ }
			</InspectorControls>

			<div { ...blockProps }>
				{ /* simply show the index */ }
				{ oneBased }
			</div>
		</>
	);
}

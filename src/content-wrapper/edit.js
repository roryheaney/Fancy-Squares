import {
	InnerBlocks,
	useBlockProps,
	InspectorControls,
} from '@wordpress/block-editor';
import { useBlockControls } from '../utils/useBlockControls';
import './editor.scss';
const TEMPLATE = [
	[ 'core/heading', { placeholder: 'Enter heading…' } ],
	[ 'core/paragraph', { placeholder: 'Enter text…' } ],
];

export default function Edit( props ) {
	const { attributes, setAttributes, name, clientId } = props;

	// token field for class options, defaults are in blockConfig.js
	const { inspectorPanels, previewClasses } = useBlockControls(
		name, // 1  block name (e.g. "fs-blocks/content-wrapper")
		attributes, // 2  current attribute object for this block instance
		setAttributes, // 3  setter Gutenberg gives you for updating attributes
		clientId, // 4  block ID (needed for width-panel bootstrap helper)
		{
			hasWidthControls: true, // don't render width panel
			showPadding: true, // show Padding Settings panel
			showMargin: true, // show Margin Settings panel
			showNegMargin: true, // show negative margin controls
			dropdown: null,
			// dropdown : { // unique dropdown, null if not needed
			// 	attributeKey : 'singularSelectClass', // must exist in block.json
			// 	label        : __( 'Layout variant', 'fs-blocks' ),
			// 	options      : [
			// 		{ label: __( 'Default',   'fs-blocks' ), value: '' },
			// 		{ label: __( 'Wide',      'fs-blocks' ), value: 'layout-wide' },
			// 		{ label: __( 'Stacked',   'fs-blocks' ), value: 'layout-stacked' },
			// 	],
			// },
		}
	);

	return (
		<>
			<InspectorControls>{ inspectorPanels }</InspectorControls>

			<div
				{ ...useBlockProps( {
					className: previewClasses.join( ' ' ),
				} ) }
			>
				<InnerBlocks template={ TEMPLATE } />
			</div>
		</>
	);
}

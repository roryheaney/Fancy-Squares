// index.js
import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import metadata from './block.json';
import Edit from './edit';
import { generateAttributes } from '../utils/helpers';
import './style.scss';
// Combine static and generated attributes
const blockAttributes = {
	...metadata.attributes,
	...generateAttributes( metadata.name ),
};

registerBlockType( metadata.name, {
	attributes: blockAttributes,
	edit: Edit,
	save: () => <InnerBlocks.Content />,
} );

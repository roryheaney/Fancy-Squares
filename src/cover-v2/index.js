/**
 * Block bootstrap ­– register and merge shared attributes
 */
import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';

import metadata from './block.json';
import Edit from './edit';
import { generateAttributes } from '../utils/helpers';

import './editor.scss';
import './style.scss';

/* combine static + generated attributes */
const attributes = {
	...metadata.attributes,
	...generateAttributes(), // padding / margin / negative-margin / width
};

registerBlockType( metadata.name, {
	attributes,
	edit: Edit,
	save: () => <InnerBlocks.Content />,
} );

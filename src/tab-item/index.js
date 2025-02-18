import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, useBlockProps, RichText } from '@wordpress/block-editor';
import Edit from './edit';
import metadata from './block.json';

registerBlockType( metadata.name, {
	edit: Edit,
	save: ( { attributes } ) => (
		<div { ...useBlockProps.save() }>
			<RichText.Content
				tagName="div"
				className="tab-title"
				value={ attributes.title }
			/>
			<InnerBlocks.Content />
		</div>
	),
} );

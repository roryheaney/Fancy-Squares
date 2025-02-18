import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import Edit from './edit';

import './editor.scss';
import './style.scss';

// Because it’s a dynamic block, we rely on "render.php" on the front end.
registerBlockType( metadata.name, {
	edit: Edit,
	save: () => null, // No static save; server-side rendering
} );

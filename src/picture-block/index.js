// index.js
import { registerBlockType } from '@wordpress/blocks';
import edit from './edit';
import save from './save';

import './style.scss';

registerBlockType('fs-blocks/dynamic-picture-block', {
  edit,
  save,
});

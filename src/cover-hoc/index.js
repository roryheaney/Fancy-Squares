import { registerBlockExtension } from '@10up/block-components';
import { addFilter } from '@wordpress/hooks';
import { createElement, cloneElement, Children } from '@wordpress/element';
import { BLOCK_CONFIG } from '../utils/config/blockConfig';
import { generateAttributes, generateClassName } from '../utils/helpers';
import Edit from './edit';

const attributes = {
	isVideo: { type: 'boolean', default: false },
	lazyLoadVideo: { type: 'boolean', default: false },
	fullHeight: { type: 'boolean', default: false },
	additionalClasses: {
		type: 'array',
		items: { type: 'string' },
		default: [],
	},
	displayOptions: { type: 'array', items: { type: 'string' }, default: [] },
	positionOptions: { type: 'array', items: { type: 'string' }, default: [] },
	zindexOptions: { type: 'array', items: { type: 'string' }, default: [] },
	bleedCoverOptions: {
		type: 'array',
		items: { type: 'string' },
		default: [],
	},
	uniqueBlockClass: { type: 'string', default: '' },
	...generateAttributes( 'fs-blocks/cover-v2' ),
};

registerBlockExtension( 'core/cover', {
	extensionName: 'fs-cover-extension',
	attributes,
	classNameGenerator: ( attrs ) =>
		generateClassName( attrs, 'fs-blocks/cover-v2', BLOCK_CONFIG ),
	inlineStyleGenerator: ( attrs ) =>
		attrs.fullHeight ? { minHeight: '100vh' } : {},
	Edit,
} );

/**
 * Modify saved markup for core/cover block.
 * Adds lazy-loading attributes to images and supports lazy video loading.
 */
addFilter(
	'blocks.getSaveElement',
	'fs-blocks/cover-hoc/modify-save',
	( element, blockType, attrs ) => {
		if ( blockType.name !== 'core/cover' ) {
			return element;
		}

		const children = Children.map( element.props.children, ( child ) => {
			if ( ! child?.props ) return child;

			if (
				child.props.className?.includes(
					'wp-block-cover__video-background'
				)
			) {
				if ( attrs.lazyLoadVideo ) {
					return cloneElement( child, {
						'data-src': child.props.src,
						src: null,
						className: `${ child.props.className } wp-block-cover__video-background--lazy`,
					} );
				}
				return child;
			}

			if (
				child.props.className?.includes(
					'wp-block-cover__image-background'
				)
			) {
				return cloneElement( child, { loading: 'lazy' } );
			}

			return child;
		} );

		return cloneElement( element, element.props, children );
	}
);

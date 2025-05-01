// utils/helpers.js
import {
	PADDING_SIDE_TYPES,
	MARGIN_SIDE_TYPES,
	NEGATIVE_MARGIN_SIDE_TYPES,
} from './config/constants';
import { BLOCK_CONFIG } from './config/blockConfig';

/**
 * Convert an arbitrary string to a CSS-friendly slug.
 * e.g. "Center Center" → "center-center"
 */
export function toSlug( str = '' ) {
	return str
		.toString()
		.trim()
		.toLowerCase()
		.replace( /\s+/g, '-' ) // spaces → dash
		.replace( /[^a-z0-9-]/g, '' ) // strip anything unsafe
		.replace( /-{2,}/g, '-' ); // collapse multiple dashes
}

/**
 * Merge any number of class-arrays (plus an optional single-value) into one flat list.
 *
 * @param {string} singularSelectClass
 * @param {...string[]} classArrays  Zero or more arrays of classes
 * @returns {string[]}
 */
export function combineAllClasses( singularSelectClass, ...classArrays ) {
	const final = [];
	if ( singularSelectClass ) {
		final.push( singularSelectClass );
	}
	classArrays.forEach( ( arr ) => {
		if ( Array.isArray( arr ) ) {
			final.push( ...arr );
		}
	} );
	return final;
}

/**
 * @typedef {{ label: string; value: string }} Option
 */

/**
 * Convert stored values into labels or raw values for FormTokenField display.
 *
 * @param {string[]} values     Array of stored values.
 * @param {Option[]} options    List of available options.
 * @param {boolean} showValues  If true, we display raw class names; otherwise labels.
 * @returns {string[]}          Display items for the TokenField.
 */
export function getDisplayValues( values, options, showValues ) {
	return values.map( ( value ) => {
		const option = options.find( ( opt ) => opt.value === value );
		return option ? ( showValues ? option.value : option.label ) : value;
	} );
}

/**
 * Convert display items back into the stored class values.
 *
 * @param {string[]} displayValues Array of displayed items.
 * @param {Option[]} options       List of available options.
 * @param {boolean} showValues     Whether we matched by raw value or by label.
 * @returns {string[]}             Stored class names.
 */
export function getValuesFromDisplay( displayValues, options, showValues ) {
	return displayValues.map( ( display ) => {
		const option = options.find( ( opt ) =>
			showValues ? opt.value === display : opt.label === display
		);
		return option ? option.value : display;
	} );
}

export function getSuggestions( options, showValues ) {
	return options.map( ( item ) => ( showValues ? item.value : item.label ) );
}

/**
 * Return the dynamic attribute map for *one* block.
 * Call with the block's name (metadata.name).
 */
export function generateAttributes( blockName ) {
	const attributes = {};

	/* -------------------------------------------------- */
	/*  Width attributes (only if the block wants them)   */
	/* -------------------------------------------------- */
	if ( BLOCK_CONFIG[ blockName ]?.hasWidthControls ) {
		[ '', 'Sm', 'Md', 'Lg', 'Xl', 'Xxl' ].forEach( ( bp ) => {
			const key = `width${ bp || 'Base' }`;
			attributes[ key ] = { type: 'string', default: '' };
		} );
	}

	/* -------------------------------------------------- */
	/*  Padding / Margin / Negative-margin (always)       */
	/* -------------------------------------------------- */
	const bps = [ 'Base', 'Sm', 'Md', 'Lg', 'Xl', 'Xxl' ];
	const sides = [
		'All',
		'Horizontal',
		'Vertical',
		'Top',
		'Right',
		'Bottom',
		'Left',
	];

	sides.forEach( ( s ) =>
		bps.forEach( ( bp ) => {
			attributes[ `padding${ s }${ bp }` ] = {
				type: 'string',
				default: '',
			};
			attributes[ `margin${ s }${ bp }` ] = {
				type: 'string',
				default: '',
			};
			attributes[ `negativeMargin${ s }${ bp }` ] = {
				type: 'string',
				default: '',
			};
		} )
	);

	return attributes;
}

// Build class list from block attributes & BLOCK_CONFIG
export const generateClassName = ( attributes, blockName, BLOCK_CONFIG ) => {
	const config = BLOCK_CONFIG[ blockName ] || {};
	let combinedTokens = [];

	// Token-based classes from config.classOptions
	if ( config.classOptions && Array.isArray( config.classOptions ) ) {
		config.classOptions.forEach( ( classKey ) => {
			// classKey here matches attribute key, e.g. 'displayOptions', 'orderOptions', 'selfAlignmentOptions'
			const values = attributes[ classKey ] || [];
			if ( Array.isArray( values ) ) {
				combinedTokens.push( ...values );
			}
		} );
	}

	// Dropdown unique class
	if ( config.dropdown ) {
		const val = attributes[ config.dropdown.attributeKey ];
		if ( val && val !== 'none' && val !== '' ) {
			combinedTokens.push( val );
		}
	}

	// Width controls
	if ( config.hasWidthControls ) {
		[
			'widthBase',
			'widthSm',
			'widthMd',
			'widthLg',
			'widthXl',
			'widthXxl',
		].forEach( ( key ) => {
			const v = attributes[ key ];
			if ( v && v !== 'auto' && v !== '' ) combinedTokens.push( v );
		} );
	}

	// Padding
	const breakpoints = [ '', 'sm', 'md', 'lg', 'xl', 'xxl' ];
	PADDING_SIDE_TYPES.forEach( ( { key, prefix } ) => {
		breakpoints.forEach( ( bp ) => {
			const attrKey = `${ key }${
				bp ? bp.charAt( 0 ).toUpperCase() + bp.slice( 1 ) : 'Base'
			}`;
			const val = attributes[ attrKey ];
			if ( val && val !== '' ) {
				const suffix = bp ? `-${ bp }` : '';
				if ( Array.isArray( prefix ) ) {
					prefix.forEach( ( pre ) =>
						combinedTokens.push( `${ pre }${ suffix }-${ val }` )
					);
				} else {
					combinedTokens.push( `${ prefix }${ suffix }-${ val }` );
				}
			}
		} );
	} );

	// Positive margin
	MARGIN_SIDE_TYPES.forEach( ( { key, prefix } ) => {
		breakpoints.forEach( ( bp ) => {
			const attrKey = `${ key }${
				bp ? bp.charAt( 0 ).toUpperCase() + bp.slice( 1 ) : 'Base'
			}`;
			const val = attributes[ attrKey ];
			if ( val && val !== '' ) {
				const suffix = bp ? `-${ bp }` : '';
				if ( Array.isArray( prefix ) ) {
					prefix.forEach( ( pre ) =>
						combinedTokens.push( `${ pre }${ suffix }-${ val }` )
					);
				} else {
					combinedTokens.push( `${ prefix }${ suffix }-${ val }` );
				}
			}
		} );
	} );

	// Negative margin
	NEGATIVE_MARGIN_SIDE_TYPES.forEach( ( { key, prefix } ) => {
		breakpoints.forEach( ( bp ) => {
			const attrKey = `${ key }${
				bp ? bp.charAt( 0 ).toUpperCase() + bp.slice( 1 ) : 'Base'
			}`;
			const val = attributes[ attrKey ];
			if ( val && val !== '' ) {
				const suffix = bp ? `-${ bp }` : '';
				const negVal = Math.abs( parseInt( val, 10 ) );
				if ( Array.isArray( prefix ) ) {
					prefix.forEach( ( pre ) =>
						combinedTokens.push(
							`${ pre }${ suffix }-n${ negVal }`
						)
					);
				} else {
					combinedTokens.push(
						`${ prefix }${ suffix }-n${ negVal }`
					);
				}
			}
		} );
	} );

	return combinedTokens.join( ' ' );
};

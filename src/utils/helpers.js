// utils/helpers.js
import {
	PADDING_SIDE_TYPES,
	MARGIN_SIDE_TYPES,
	NEGATIVE_MARGIN_SIDE_TYPES,
} from './config/constants';

export function getDisplayValues( values, options, showValues ) {
	return values.map( ( value ) => {
		const option = options.find( ( opt ) => opt.value === value );
		return option ? ( showValues ? option.value : option.label ) : value;
	} );
}

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

export function generateAttributes() {
	const attributes = {};
	const breakpoints = [ 'Base', 'Sm', 'Md', 'Lg', 'Xl' ];
	const sides = [
		'All',
		'Horizontal',
		'Vertical',
		'Top',
		'Right',
		'Bottom',
		'Left',
	];

	// Generate padding, margin, negative-margin attributes
	sides.forEach( ( side ) => {
		breakpoints.forEach( ( bp ) => {
			attributes[ `padding${ side }${ bp }` ] = {
				type: 'string',
				default: '',
			};
			attributes[ `margin${ side }${ bp }` ] = {
				type: 'string',
				default: '',
			};
			attributes[ `negativeMargin${ side }${ bp }` ] = {
				type: 'string',
				default: '',
			};
		} );
	} );

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
			'widthXXl',
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

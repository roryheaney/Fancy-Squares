import {
	displayOptions,
	marginOptions,
	paddingOptions,
	positionOptions,
	zindexOptions,
	blendModeOptions,
	alignItemsOptions,
	selfAlignmentOptions,
	justifyContentOptions,
	orderOptions,
	gapOptions,
} from '../../../data/bootstrap-classes/classes.js';

export const ALLOWED_BLOCKS = [
	'core/heading',
	'core/paragraph',
	'core/list',
	'core/list-item',
	'core/buttons',
	'core/columns',
	'core/column',
	'core/group',
];

export const BREAKPOINT_DIMENSIONS = {
	'': 'All',
	sm: '≥576px',
	md: '≥768px',
	lg: '≥992px',
	xl: '≥1200px',
	xxl: '≥1400px',
};

export const BLOCK_CONFIG = {
	'fs-blocks/content-wrapper': {
		classOptions: [
			'displayOptions',
			'orderOptions',
			'selfAlignmentOptions',
			'positionOptions',
			'zindexOptions',
		],
	},
};

export const CLASS_OPTIONS_MAP = {
	display: {
		options: displayOptions,
		suggestions: getSuggestions( displayOptions, false ),
	},
	margin: {
		options: marginOptions,
		suggestions: getSuggestions( marginOptions, false ),
	},
	padding: {
		options: paddingOptions,
		suggestions: getSuggestions( paddingOptions, false ),
	},
	position: {
		options: positionOptions,
		suggestions: getSuggestions( positionOptions, false ),
	},
	zindex: {
		options: zindexOptions,
		suggestions: getSuggestions( zindexOptions, false ),
	},
	blendMode: {
		options: blendModeOptions,
		suggestions: getSuggestions( blendModeOptions, false ),
	},
	alignItems: {
		// Added alignItems for core/columns
		options: alignItemsOptions,
		suggestions: getSuggestions( alignItemsOptions, false ),
	},
	selfAlignment: {
		// Added selfAlignment for core/column
		options: selfAlignmentOptions,
		suggestions: getSuggestions( selfAlignmentOptions, false ),
	},
	justifyContent: {
		// Added justifyContent for core/columns
		options: justifyContentOptions,
		suggestions: getSuggestions( justifyContentOptions, false ),
	},
	order: {
		// Added order for core/column
		options: orderOptions,
		suggestions: getSuggestions( orderOptions, false ),
	},
	gapSpacing: {
		// Added gapSpacing for core/group
		options: gapOptions,
		suggestions: getSuggestions( gapOptions, false ),
	},
};

// Note: getSuggestions is used in CLASS_OPTIONS_MAP, so we need to define it here temporarily
function getSuggestions( options, showValues ) {
	return options.map( ( item ) => ( showValues ? item.value : item.label ) );
}

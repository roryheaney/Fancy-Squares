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
	bleedCoverOptions,
} from '../../../data/bootstrap-classes/classes.js';

export const BREAKPOINT_DIMENSIONS = {
	'': 'All',
	sm: '≥576px',
	md: '≥768px',
	lg: '≥992px',
	xl: '≥1200px',
	xxl: '≥1400px',
};

export const BLOCK_CONFIG = {
	'fs-blocks/cover-v2': {
		classOptions: [
			'displayOptions',
			'positionOptions',
			'zindexOptions',
			'bleedCoverOptions', // custom for cover-v2
		],
		hasWidthControls: false,
		dropdown: {
			attributeKey: 'uniqueBlockClass', // matches block.json
			label: 'Block Class', // label for the dropdown
			options: [
				{ label: '— none —', value: '' },
				{ label: 'Custom Class', value: 'custom' },
			],
		},
	},
	'fs-blocks/content-wrapper': {
		hasWidthControls: true, // <-- must be set to true for width panel
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
	bleedCover: {
		// Added bleedCover for core/group
		options: bleedCoverOptions,
		suggestions: getSuggestions( bleedCoverOptions, false ),
	},
};

// Note: getSuggestions is used in CLASS_OPTIONS_MAP, so we need to define it here temporarily
function getSuggestions( options, showValues ) {
	return options.map( ( item ) => ( showValues ? item.value : item.label ) );
}

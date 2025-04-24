// lib/block-controls/config/blockConfig.js

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
  } from '../../data/bootstrap-classes/classes.js';

  import {
	sidesAll,
	sidesHorizontal,
	sidesVertical,
	sidesTop,
	sidesRight,
	sidesBottom,
	sidesLeft,
  } from '@wordpress/icons';

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

  // shared control definitions for padding / margins
  const defaultPaddingControls = [
	{
	  side: 'all',
	  label: 'All Sides',
	  icon: sidesAll,
	  keys: {
		base: 'paddingAllBase',
		sm:   'paddingAllSm',
		md:   'paddingAllMd',
		lg:   'paddingAllLg',
		xl:   'paddingAllXl',
	  },
	},
	{
	  side: 'horizontal',
	  label: 'Horizontal',
	  icon: sidesHorizontal,
	  keys: {
		base: 'paddingHorizontalBase',
		sm:   'paddingHorizontalSm',
		md:   'paddingHorizontalMd',
		lg:   'paddingHorizontalLg',
		xl:   'paddingHorizontalXl',
	  },
	},
	{
	  side: 'vertical',
	  label: 'Vertical',
	  icon: sidesVertical,
	  keys: {
		base: 'paddingVerticalBase',
		sm:   'paddingVerticalSm',
		md:   'paddingVerticalMd',
		lg:   'paddingVerticalLg',
		xl:   'paddingVerticalXl',
	  },
	},
	{
	  side: 'top',
	  label: 'Top',
	  icon: sidesTop,
	  keys: {
		base: 'paddingTopBase',
		sm:   'paddingTopSm',
		md:   'paddingTopMd',
		lg:   'paddingTopLg',
		xl:   'paddingTopXl',
	  },
	},
	{
	  side: 'right',
	  label: 'Right',
	  icon: sidesRight,
	  keys: {
		base: 'paddingRightBase',
		sm:   'paddingRightSm',
		md:   'paddingRightMd',
		lg:   'paddingRightLg',
		xl:   'paddingRightXl',
	  },
	},
	{
	  side: 'bottom',
	  label: 'Bottom',
	  icon: sidesBottom,
	  keys: {
		base: 'paddingBottomBase',
		sm:   'paddingBottomSm',
		md:   'paddingBottomMd',
		lg:   'paddingBottomLg',
		xl:   'paddingBottomXl',
	  },
	},
	{
	  side: 'left',
	  label: 'Left',
	  icon: sidesLeft,
	  keys: {
		base: 'paddingLeftBase',
		sm:   'paddingLeftSm',
		md:   'paddingLeftMd',
		lg:   'paddingLeftLg',
		xl:   'paddingLeftXl',
	  },
	},
  ];

  const defaultPositiveMarginControls = defaultPaddingControls.map( ( { side, label, icon, keys } ) => ({
	side, label, icon,
	keys: {
	  base: `margin${ label.replace(/\s/, '') }Base`,
	  sm:   `margin${ label.replace(/\s/, '') }Sm`,
	  md:   `margin${ label.replace(/\s/, '') }Md`,
	  lg:   `margin${ label.replace(/\s/, '') }Lg`,
	  xl:   `margin${ label.replace(/\s/, '') }Xl`,
	},
  }) );

  const defaultNegativeMarginControls = defaultPaddingControls.map( ( { side, label, icon, keys } ) => ({
	side, label, icon,
	keys: {
	  base: `negativeMargin${ label.replace(/\s/, '') }Base`,
	  sm:   `negativeMargin${ label.replace(/\s/, '') }Sm`,
	  md:   `negativeMargin${ label.replace(/\s/, '') }Md`,
	  lg:   `negativeMargin${ label.replace(/\s/, '') }Lg`,
	  xl:   `negativeMargin${ label.replace(/\s/, '') }Xl`,
	},
  }) );

  export const BLOCK_CONFIG = {
	'core/heading': {
	  classOptions: [ 'display', 'position', 'zindex', 'blendMode' ],
	  dropdown: {
		attributeKey: 'headingDropdownValue',
		label:        'Heading Option',
		default:      'none',
		options:      [ { label: 'Select one', value: 'none' } ],
	  },
	  paddingControls:           defaultPaddingControls,
	  positiveMarginControls:    defaultPositiveMarginControls,
	  negativeMarginControls:    defaultNegativeMarginControls,
	  hasWidthControls:          false,
	},
	'core/paragraph': {
	  classOptions: [ 'display', 'position', 'zindex' ],
	  dropdown: {
		attributeKey: 'paragraphDropdownValue',
		label:        'Paragraph Option',
		default:      'none',
		options:      [ { label: 'Select one', value: 'none' } ],
	  },
	  paddingControls:           defaultPaddingControls,
	  positiveMarginControls:    defaultPositiveMarginControls,
	  negativeMarginControls:    defaultNegativeMarginControls,
	  hasWidthControls:          false,
	},
	'core/list': {
	  classOptions: [ 'display', 'position', 'zindex' ],
	  dropdown: {
		attributeKey: 'listDropdownValue',
		label:        'List Option',
		default:      'none',
		options:      [ { label: 'Select one', value: 'none' } ],
	  },
	  paddingControls:           defaultPaddingControls,
	  positiveMarginControls:    defaultPositiveMarginControls,
	  negativeMarginControls:    defaultNegativeMarginControls,
	  hasWidthControls:          false,
	},
	'core/list-item': {
	  classOptions: [ 'display', 'position', 'zindex' ],
	  dropdown: {
		attributeKey: 'listItemDropdownValue',
		label:        'List Item Option',
		default:      'none',
		options:      [ { label: 'Select one', value: 'none' } ],
	  },
	  paddingControls:           defaultPaddingControls,
	  positiveMarginControls:    defaultPositiveMarginControls,
	  negativeMarginControls:    defaultNegativeMarginControls,
	  hasWidthControls:          false,
	},
	'core/buttons': {
	  classOptions: [ 'display', 'margin', 'position', 'zindex' ],
	  dropdown: {
		attributeKey: 'buttonDropdownValue',
		label:        'Button Option',
		default:      'none',
		options:      [ { label: 'Select one', value: 'none' } ],
	  },
	  paddingControls:           defaultPaddingControls,
	  positiveMarginControls:    defaultPositiveMarginControls,
	  negativeMarginControls:    defaultNegativeMarginControls,
	  hasWidthControls:          false,
	},
	'core/columns': {
	  classOptions: [
		'display',
		'position',
		'zindex',
		'alignItems',
		'justifyContent',
	  ],
	  dropdown: {
		attributeKey: 'columnsLayout',
		label:        'Columns Layout',
		default:      '',
		options:      [
		  { label: 'Inherit from Columns', value: '' },
		  // … other layout presets …
		],
	  },
	  paddingControls:           defaultPaddingControls,
	  positiveMarginControls:    defaultPositiveMarginControls,
	  negativeMarginControls:    defaultNegativeMarginControls,
	  hasWidthControls:          false,
	},
	'core/column': {
	  classOptions: [
		'display',
		'position',
		'zindex',
		'selfAlignment',
		'order',
	  ],
	  dropdown: {
		attributeKey: 'columnLayoutOverride',
		label:        'Column Layout Override',
		default:      '',
		options:      [ { label: 'Inherit from Columns', value: '' } ],
	  },
	  paddingControls:           defaultPaddingControls,
	  positiveMarginControls:    defaultPositiveMarginControls,
	  negativeMarginControls:    defaultNegativeMarginControls,
	  hasWidthControls:          true,
	},
	'core/group': {
	  classOptions: [ 'display', 'position', 'zindex', 'gapSpacing' ],
	  paddingControls:           defaultPaddingControls,
	  positiveMarginControls:    defaultPositiveMarginControls,
	  negativeMarginControls:    defaultNegativeMarginControls,
	  hasWidthControls:          false,
	},
  };

  export const CLASS_OPTIONS_MAP = {
	display: {
	  options:    displayOptions,
	  suggestions: getSuggestions(displayOptions, false),
	},
	margin: {
	  options:    marginOptions,
	  suggestions: getSuggestions(marginOptions, false),
	},
	padding: {
	  options:    paddingOptions,
	  suggestions: getSuggestions(paddingOptions, false),
	},
	position: {
	  options:    positionOptions,
	  suggestions: getSuggestions(positionOptions, false),
	},
	zindex: {
	  options:    zindexOptions,
	  suggestions: getSuggestions(zindexOptions, false),
	},
	blendMode: {
	  options:    blendModeOptions,
	  suggestions: getSuggestions(blendModeOptions, false),
	},
	alignItems: {
	  options:    alignItemsOptions,
	  suggestions: getSuggestions(alignItemsOptions, false),
	},
	selfAlignment: {
	  options:    selfAlignmentOptions,
	  suggestions: getSuggestions(selfAlignmentOptions, false),
	},
	justifyContent: {
	  options:    justifyContentOptions,
	  suggestions: getSuggestions(justifyContentOptions, false),
	},
	order: {
	  options:    orderOptions,
	  suggestions: getSuggestions(orderOptions, false),
	},
	gapSpacing: {
	  options:    gapOptions,
	  suggestions: getSuggestions(gapOptions, false),
	},
  };

  // helper for CLASS_OPTIONS_MAP
  function getSuggestions(options, showValues) {
	return options.map((item) => (showValues ? item.value : item.label));
  }

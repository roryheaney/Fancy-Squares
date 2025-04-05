import {
	InspectorControls,
	InnerBlocks,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	FormTokenField,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';

// Import Bootstrap class options
import {
	columnOptions,
	marginOptions,
	displayOptions,
	orderOptions,
	selfAlignmentOptions,
	columnOffsetOptions,
} from '../../data/bootstrap-classes/classes.js';

import './editor.scss';

// Single-choice options for the dropdown
const singleChoiceOptions = [
	{ label: __( 'Default', 'fs-blocks' ), value: '' },
	{ label: __( 'Test', 'fs-blocks' ), value: 'test' },
	{ label: __( 'Fancy', 'fs-blocks' ), value: 'fancy' },
];

// Helper function to map class values to their labels for display
const getLabelsFromValues = ( values, options ) => {
	return values.map( ( value ) => {
		const option = options.find( ( opt ) => opt.value === value );
		return option ? option.label : value; // Fallback to value if no label found
	} );
};

// Helper function to map selected labels back to values
const getValuesFromLabels = ( labels, options ) => {
	return labels.map( ( label ) => {
		const option = options.find( ( opt ) => opt.label === label );
		return option ? option.value : label; // Fallback to label if no value found
	} );
};

// Combine all classes into a single array
const combineAllClasses = (
	singularSelectClass,
	columnArr,
	marginArr,
	displayArr,
	orderArr,
	alignArr,
	offsetArr
) => {
	const final = [];
	if ( singularSelectClass ) final.push( singularSelectClass );
	final.push(
		...columnArr,
		...marginArr,
		...displayArr,
		...orderArr,
		...alignArr,
		...offsetArr
	);
	return final;
};

export default function Edit( { attributes, setAttributes } ) {
	const {
		singularSelectClass = '',
		columnOptions: columnValues = [],
		marginOptions: marginValues = [],
		displayOptions: displayValues = [],
		orderOptions: orderValues = [],
		selfAlignmentOptions: alignItemsValues = [],
		columnOffsetOptions: columnOffsetValues = [],
		additionalClasses = [],
	} = attributes;

	// Reusable onChange handler for all FormTokenFields
	const handleTokenChange = ( fieldKey, options ) => ( newTokens ) => {
		const newValues = getValuesFromLabels( newTokens, options );
		setAttributes( { [ fieldKey ]: newValues } );
		const updatedClasses = combineAllClasses(
			singularSelectClass,
			fieldKey === 'columnOptions' ? newValues : columnValues,
			fieldKey === 'marginOptions' ? newValues : marginValues,
			fieldKey === 'displayOptions' ? newValues : displayValues,
			fieldKey === 'orderOptions' ? newValues : orderValues,
			fieldKey === 'selfAlignmentOptions' ? newValues : alignItemsValues,
			fieldKey === 'columnOffsetOptions' ? newValues : columnOffsetValues
		);
		setAttributes( { additionalClasses: updatedClasses } );
	};

	// Single-choice dropdown handler
	const onChangeSelect = ( newVal ) => {
		setAttributes( { singularSelectClass: newVal } );
		const updatedClasses = combineAllClasses(
			newVal,
			columnValues,
			marginValues,
			displayValues,
			orderValues,
			alignItemsValues,
			columnOffsetValues
		);
		setAttributes( { additionalClasses: updatedClasses } );
	};

	// Prepare class string for preview
	const previewClassString = [
		'wp-block-fancysquares-column-block',
		...additionalClasses,
	].join( ' ' );

	const blockProps = useBlockProps();

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody
					title={ __( 'Column Settings', 'fs-blocks' ) }
					initialOpen={ true }
				>
					<SelectControl
						label={ __( 'Singular Select Class', 'fs-blocks' ) }
						value={ singularSelectClass }
						options={ singleChoiceOptions }
						onChange={ onChangeSelect }
					/>

					<hr />

					<FormTokenField
						label={ __( 'Column Classes', 'fs-blocks' ) }
						value={ getLabelsFromValues(
							columnValues,
							columnOptions
						) }
						suggestions={ columnOptions.map( ( o ) => o.label ) }
						onChange={ handleTokenChange(
							'columnOptions',
							columnOptions
						) }
					/>

					<hr />

					<FormTokenField
						label={ __( 'Margin Classes', 'fs-blocks' ) }
						value={ getLabelsFromValues(
							marginValues,
							marginOptions
						) }
						suggestions={ marginOptions.map( ( o ) => o.label ) }
						onChange={ handleTokenChange(
							'marginOptions',
							marginOptions
						) }
					/>

					<hr />

					<FormTokenField
						label={ __( 'Display Classes', 'fs-blocks' ) }
						value={ getLabelsFromValues(
							displayValues,
							displayOptions
						) }
						suggestions={ displayOptions.map( ( o ) => o.label ) }
						onChange={ handleTokenChange(
							'displayOptions',
							displayOptions
						) }
					/>

					<hr />

					<FormTokenField
						label={ __( 'Order Classes', 'fs-blocks' ) }
						value={ getLabelsFromValues(
							orderValues,
							orderOptions
						) }
						suggestions={ orderOptions.map( ( o ) => o.label ) }
						onChange={ handleTokenChange(
							'orderOptions',
							orderOptions
						) }
					/>

					<hr />

					<FormTokenField
						label={ __( 'Self Align Item Classes', 'fs-blocks' ) }
						value={ getLabelsFromValues(
							alignItemsValues,
							selfAlignmentOptions
						) }
						suggestions={ selfAlignmentOptions.map(
							( o ) => o.label
						) }
						onChange={ handleTokenChange(
							'selfAlignmentOptions',
							selfAlignmentOptions
						) }
					/>

					<hr />

					<FormTokenField
						label={ __( 'Column Offset Classes', 'fs-blocks' ) }
						value={ getLabelsFromValues(
							columnOffsetValues,
							columnOffsetOptions
						) }
						suggestions={ columnOffsetOptions.map(
							( o ) => o.label
						) }
						onChange={ handleTokenChange(
							'columnOffsetOptions',
							columnOffsetOptions
						) }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps } className={ previewClassString }>
				<InnerBlocks
					template={ [
						[
							'core/heading',
							{ placeholder: 'Enter heading text...' },
						],
						[
							'core/paragraph',
							{ placeholder: 'Enter paragraph text...' },
						],
					] }
				/>
			</div>
		</Fragment>
	);
}

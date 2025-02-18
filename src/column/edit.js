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

const singleChoiceOptions = [
	{ label: __( 'Default', 'fs-blocks' ), value: '' },
	{ label: __( 'Test', 'fs-blocks' ), value: 'test' },
	{ label: __( 'Fancy', 'fs-blocks' ), value: 'fancy' },
];

// Import everything you need:
import {
	columnOptions,
	marginOptions,
	displayOptions,
	orderOptions,
	selfAlignmentOptions,
	columnOffsetOptions,
} from '../../data/bootstrap-classes/classes.js';

import './editor.scss';

// Convert each array of { label, value } to just [ 'col', 'col-auto', ... ] for FormTokenField suggestions.
const columnSuggestions = columnOptions.map( ( o ) => o.value );
const marginSuggestions = marginOptions.map( ( o ) => o.value );
const displaySuggestions = displayOptions.map( ( o ) => o.value );
const orderSuggestions = orderOptions.map( ( o ) => o.value );
const alignItemsSuggestions = selfAlignmentOptions.map( ( o ) => o.value );
const columnOffsetSuggestions = columnOffsetOptions.map( ( o ) => o.value );

// Merge everything into one final array
function combineAllClasses(
	singularSelectClass,
	columnArr,
	marginArr,
	displayArr,
	orderArr,
	alignArr,
	offsetArr
) {
	const final = [];
	if ( singularSelectClass ) {
		final.push( singularSelectClass );
	}
	final.push( ...columnArr );
	final.push( ...marginArr );
	final.push( ...displayArr );
	final.push( ...orderArr );
	final.push( ...alignArr );
	final.push( ...offsetArr );
	return final;
}

export default function Edit( { attributes, setAttributes } ) {
	const {
		singularSelectClass,
		columnOptions: columnValues,
		marginOptions: marginValues,
		displayOptions: displayValues,
		orderOptions: orderValues,
		selfAlignmentOptions: alignItemsValues,
		columnOffsetOptions: columnOffsetValues,
		additionalClasses,
	} = attributes;

	// Single-choice dropdown
	const onChangeSelect = ( newVal ) => {
		setAttributes( { singularSelectClass: newVal } );
		const updated = combineAllClasses(
			newVal,
			columnValues,
			marginValues,
			displayValues,
			orderValues,
			alignItemsValues,
			columnOffsetValues
		);
		setAttributes( { additionalClasses: updated } );
	};

	// Column multi-select
	const onChangeColumnOptions = ( newTokens ) => {
		setAttributes( { columnOptions: newTokens } );
		const updated = combineAllClasses(
			singularSelectClass,
			newTokens,
			marginValues,
			displayValues,
			orderValues,
			alignItemsValues,
			columnOffsetValues
		);
		setAttributes( { additionalClasses: updated } );
	};

	// Margin multi-select
	const onChangeMarginOptions = ( newTokens ) => {
		setAttributes( { marginOptions: newTokens } );
		const updated = combineAllClasses(
			singularSelectClass,
			columnValues,
			newTokens,
			displayValues,
			orderValues,
			alignItemsValues,
			columnOffsetValues
		);
		setAttributes( { additionalClasses: updated } );
	};

	// Display multi-select
	const onChangeDisplayOptions = ( newTokens ) => {
		setAttributes( { displayOptions: newTokens } );
		const updated = combineAllClasses(
			singularSelectClass,
			columnValues,
			marginValues,
			newTokens,
			orderValues,
			alignItemsValues,
			columnOffsetValues
		);
		setAttributes( { additionalClasses: updated } );
	};

	// Order multi-select
	const onChangeOrderOptions = ( newTokens ) => {
		setAttributes( { orderOptions: newTokens } );
		const updated = combineAllClasses(
			singularSelectClass,
			columnValues,
			marginValues,
			displayValues,
			newTokens,
			alignItemsValues,
			columnOffsetValues
		);
		setAttributes( { additionalClasses: updated } );
	};

	// Align Items multi-select
	const onChangeSelfAlignmentOptions = ( newTokens ) => {
		setAttributes( { selfAlignmentOptions: newTokens } );
		const updated = combineAllClasses(
			singularSelectClass,
			columnValues,
			marginValues,
			displayValues,
			orderValues,
			newTokens,
			columnOffsetValues
		);
		setAttributes( { additionalClasses: updated } );
	};

	// Column Offset multi-select
	const onChangeColumnOffsetOptions = ( newTokens ) => {
		setAttributes( { columnOffsetOptions: newTokens } );
		const updated = combineAllClasses(
			singularSelectClass,
			columnValues,
			marginValues,
			displayValues,
			orderValues,
			alignItemsValues,
			newTokens
		);
		setAttributes( { additionalClasses: updated } );
	};

	// Combine everything for the editor preview
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
						value={ columnValues }
						suggestions={ columnSuggestions }
						onChange={ onChangeColumnOptions }
					/>

					<hr />

					<FormTokenField
						label={ __( 'Margin Classes', 'fs-blocks' ) }
						value={ marginValues }
						suggestions={ marginSuggestions }
						onChange={ onChangeMarginOptions }
					/>

					<hr />

					<FormTokenField
						label={ __( 'Display Classes', 'fs-blocks' ) }
						value={ displayValues }
						suggestions={ displaySuggestions }
						onChange={ onChangeDisplayOptions }
					/>

					<hr />

					<FormTokenField
						label={ __( 'Order Classes', 'fs-blocks' ) }
						value={ orderValues }
						suggestions={ orderSuggestions }
						onChange={ onChangeOrderOptions }
					/>

					<hr />

					<FormTokenField
						label={ __( 'Self Align Item Classes', 'fs-blocks' ) }
						value={ alignItemsValues }
						suggestions={ alignItemsSuggestions }
						onChange={ onChangeSelfAlignmentOptions }
					/>

					<hr />

					<FormTokenField
						label={ __( 'Column Offset Classes', 'fs-blocks' ) }
						value={ columnOffsetValues }
						suggestions={ columnOffsetSuggestions }
						onChange={ onChangeColumnOffsetOptions }
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

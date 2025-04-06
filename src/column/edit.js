import {
	InspectorControls,
	InnerBlocks,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	FormTokenField,
	CheckboxControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { Fragment, useState } from '@wordpress/element';

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

// Helper function to map class values to their labels or values based on mode
const getDisplayValues = ( values, options, showValues ) => {
	return values.map( ( value ) => {
		const option = options.find( ( opt ) => opt.value === value );
		return option ? ( showValues ? option.value : option.label ) : value;
	} );
};

// Helper function to map selected labels or values back to values
const getValuesFromDisplay = ( displayValues, options, showValues ) => {
	return displayValues.map( ( display ) => {
		const option = options.find( ( opt ) =>
			showValues ? opt.value === display : opt.label === display
		);
		return option ? option.value : display;
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

	const [ showValues, setShowValues ] = useState( false ); // Local state for checkbox

	// Reusable onChange handler for all FormTokenFields
	const handleTokenChange = ( fieldKey, options ) => ( newTokens ) => {
		const newValues = getValuesFromDisplay(
			newTokens,
			options,
			showValues
		);
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
					<CheckboxControl
						label={ __( 'Show Values', 'fs-blocks' ) }
						checked={ showValues }
						onChange={ setShowValues }
						help={ __(
							'Display Bootstrap class names instead of labels.',
							'fs-blocks'
						) }
						style={ { marginBottom: '20px' } }
					/>

					<SelectControl
						label={ __( 'Singular Select Class', 'fs-blocks' ) }
						value={ singularSelectClass }
						options={ singleChoiceOptions }
						onChange={ onChangeSelect }
					/>

					<hr />

					<div style={ { marginBottom: '20px' } }>
						<FormTokenField
							label={ __( 'Column Classes', 'fs-blocks' ) }
							value={ getDisplayValues(
								columnValues,
								columnOptions,
								showValues
							) }
							suggestions={ columnOptions.map( ( o ) =>
								showValues ? o.value : o.label
							) }
							onChange={ handleTokenChange(
								'columnOptions',
								columnOptions
							) }
						/>
						<details style={ { marginTop: '5px' } }>
							<summary>
								{ __(
									'Available Column Classes',
									'fs-blocks'
								) }
							</summary>
							<ul
								style={ {
									fontSize: '12px',
									paddingLeft: '20px',
									margin: '5px 0',
								} }
							>
								{ columnOptions.map( ( item ) => (
									<li key={ item.value }>
										{ showValues ? item.value : item.label }
									</li>
								) ) }
							</ul>
						</details>
					</div>

					<div style={ { marginBottom: '20px' } }>
						<FormTokenField
							label={ __( 'Margin Classes', 'fs-blocks' ) }
							value={ getDisplayValues(
								marginValues,
								marginOptions,
								showValues
							) }
							suggestions={ marginOptions.map( ( o ) =>
								showValues ? o.value : o.label
							) }
							onChange={ handleTokenChange(
								'marginOptions',
								marginOptions
							) }
						/>
						<details style={ { marginTop: '5px' } }>
							<summary>
								{ __(
									'Available Margin Classes',
									'fs-blocks'
								) }
							</summary>
							<ul
								style={ {
									fontSize: '12px',
									paddingLeft: '20px',
									margin: '5px 0',
								} }
							>
								{ marginOptions.map( ( item ) => (
									<li key={ item.value }>
										{ showValues ? item.value : item.label }
									</li>
								) ) }
							</ul>
						</details>
					</div>

					<div style={ { marginBottom: '20px' } }>
						<FormTokenField
							label={ __( 'Display Classes', 'fs-blocks' ) }
							value={ getDisplayValues(
								displayValues,
								displayOptions,
								showValues
							) }
							suggestions={ displayOptions.map( ( o ) =>
								showValues ? o.value : o.label
							) }
							onChange={ handleTokenChange(
								'displayOptions',
								displayOptions
							) }
						/>
						<details style={ { marginTop: '5px' } }>
							<summary>
								{ __(
									'Available Display Classes',
									'fs-blocks'
								) }
							</summary>
							<ul
								style={ {
									fontSize: '12px',
									paddingLeft: '20px',
									margin: '5px 0',
								} }
							>
								{ displayOptions.map( ( item ) => (
									<li key={ item.value }>
										{ showValues ? item.value : item.label }
									</li>
								) ) }
							</ul>
						</details>
					</div>

					<div style={ { marginBottom: '20px' } }>
						<FormTokenField
							label={ __( 'Order Classes', 'fs-blocks' ) }
							value={ getDisplayValues(
								orderValues,
								orderOptions,
								showValues
							) }
							suggestions={ orderOptions.map( ( o ) =>
								showValues ? o.value : o.label
							) }
							onChange={ handleTokenChange(
								'orderOptions',
								orderOptions
							) }
						/>
						<details style={ { marginTop: '5px' } }>
							<summary>
								{ __( 'Available Order Classes', 'fs-blocks' ) }
							</summary>
							<ul
								style={ {
									fontSize: '12px',
									paddingLeft: '20px',
									margin: '5px 0',
								} }
							>
								{ orderOptions.map( ( item ) => (
									<li key={ item.value }>
										{ showValues ? item.value : item.label }
									</li>
								) ) }
							</ul>
						</details>
					</div>

					<div style={ { marginBottom: '20px' } }>
						<FormTokenField
							label={ __(
								'Self Align Item Classes',
								'fs-blocks'
							) }
							value={ getDisplayValues(
								alignItemsValues,
								selfAlignmentOptions,
								showValues
							) }
							suggestions={ selfAlignmentOptions.map( ( o ) =>
								showValues ? o.value : o.label
							) }
							onChange={ handleTokenChange(
								'selfAlignmentOptions',
								selfAlignmentOptions
							) }
						/>
						<details style={ { marginTop: '5px' } }>
							<summary>
								{ __(
									'Available Self Align Item Classes',
									'fs-blocks'
								) }
							</summary>
							<ul
								style={ {
									fontSize: '12px',
									paddingLeft: '20px',
									margin: '5px 0',
								} }
							>
								{ selfAlignmentOptions.map( ( item ) => (
									<li key={ item.value }>
										{ showValues ? item.value : item.label }
									</li>
								) ) }
							</ul>
						</details>
					</div>

					<div style={ { marginBottom: '20px' } }>
						<FormTokenField
							label={ __( 'Column Offset Classes', 'fs-blocks' ) }
							value={ getDisplayValues(
								columnOffsetValues,
								columnOffsetOptions,
								showValues
							) }
							suggestions={ columnOffsetOptions.map( ( o ) =>
								showValues ? o.value : o.label
							) }
							onChange={ handleTokenChange(
								'columnOffsetOptions',
								columnOffsetOptions
							) }
						/>
						<details style={ { marginTop: '5px' } }>
							<summary>
								{ __(
									'Available Column Offset Classes',
									'fs-blocks'
								) }
							</summary>
							<ul
								style={ {
									fontSize: '12px',
									paddingLeft: '20px',
									margin: '5px 0',
								} }
							>
								{ columnOffsetOptions.map( ( item ) => (
									<li key={ item.value }>
										{ showValues ? item.value : item.label }
									</li>
								) ) }
							</ul>
						</details>
					</div>
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

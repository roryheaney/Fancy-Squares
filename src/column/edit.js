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
import { Fragment, useEffect, useRef, useState } from '@wordpress/element';
import './editor.scss';

// Single-choice options for the dropdown
const singleChoiceOptions = [
	{ label: __( 'Default', 'fs-blocks' ), value: '' },
	{ label: __( 'Test', 'fs-blocks' ), value: 'test' },
	{ label: __( 'Fancy', 'fs-blocks' ), value: 'fancy' },
];

// Import class options from the shared file
import {
	columnOptions,
	marginOptions,
	displayOptions,
	orderOptions,
	selfAlignmentOptions,
	columnOffsetOptions,
} from '../../data/bootstrap-classes/classes.js';

// Helper function to map class values to their labels or values based on mode
const getDisplayValues = ( values, options, showValues ) => {
	const result = [];
	for ( const value of values ) {
		const option = options.find( ( opt ) => opt.value === value );
		if ( option ) {
			if ( showValues ) {
				result.push( option.value );
			} else {
				result.push( option.label );
			}
		} else {
			result.push( value ); // Fallback if no matching option
		}
	}
	return result;
};

// Helper function to map selected labels or values back to values
const getValuesFromDisplay = ( displayValues, options, showValues ) => {
	const result = [];
	for ( const display of displayValues ) {
		const option = options.find( ( opt ) => {
			if ( showValues ) {
				return opt.value === display;
			}
			return opt.label === display;
		} );
		if ( option ) {
			result.push( option.value );
		} else {
			result.push( display ); // Fallback if no match
		}
	}
	return result;
};

// Convert arrays of { label, value } to suggestion strings based on showValues
const getSuggestions = ( options, showValues ) => {
	const suggestions = [];
	for ( const item of options ) {
		if ( showValues ) {
			suggestions.push( item.value );
		} else {
			suggestions.push( item.label );
		}
	}
	return suggestions;
};

/* ------------------------------------------------------------------------ */
/*  Helper to merge arrays into one final array of classes
/* ------------------------------------------------------------------------ */
/*
 * Combines all class arrays into a single array, adding singularSelectClass if present.
 *
 * @param {string} singularSelectClass - Single-choice class
 * @param {string[]} columnArr - Column classes
 * @param {string[]} marginArr - Margin classes
 * @param {string[]} displayArr - Display classes
 * @param {string[]} orderArr - Order classes
 * @param {string[]} alignArr - Alignment classes
 * @param {string[]} offsetArr - Offset classes
 * @return {string[]} The unified array of class names
 */
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
	final.push(
		...columnArr,
		...marginArr,
		...displayArr,
		...orderArr,
		...alignArr,
		...offsetArr
	);
	return final;
}

export default function Edit( { attributes, setAttributes, clientId } ) {
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

	const [ showValues, setShowValues ] = useState( false );
	const blockRef = useRef();

	// Update InnerBlocks layout for focus fix
	useEffect( () => {
		if ( ! blockRef.current ) {
			return;
		}

		const layoutEl = blockRef.current.querySelector(
			'.block-editor-inner-blocks > .block-editor-block-list__layout'
		);
		const parentEl = blockRef.current.querySelector(
			'.block-editor-inner-blocks'
		);

		if ( layoutEl ) {
			const mergedEditorClasses = [
				'block-editor-block-list__layout',
				'wp-block-fancysquares-column-block',
				...additionalClasses,
			].join( ' ' );
			layoutEl.className = mergedEditorClasses;
			parentEl.className += ' wp-block-fancysquares-column-block-admin';
		}
	}, [ additionalClasses, clientId ] );

	// Single-choice dropdown handler
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

	// Multi-select handlers
	const onChangeColumnOptions = ( newTokens ) => {
		const newValues = getValuesFromDisplay(
			newTokens,
			columnOptions,
			showValues
		);
		setAttributes( { columnOptions: newValues } );
		const updated = combineAllClasses(
			singularSelectClass,
			newValues,
			marginValues,
			displayValues,
			orderValues,
			alignItemsValues,
			columnOffsetValues
		);
		setAttributes( { additionalClasses: updated } );
	};

	const onChangeMarginOptions = ( newTokens ) => {
		const newValues = getValuesFromDisplay(
			newTokens,
			marginOptions,
			showValues
		);
		setAttributes( { marginOptions: newValues } );
		const updated = combineAllClasses(
			singularSelectClass,
			columnValues,
			newValues,
			displayValues,
			orderValues,
			alignItemsValues,
			columnOffsetValues
		);
		setAttributes( { additionalClasses: updated } );
	};

	const onChangeDisplayOptions = ( newTokens ) => {
		const newValues = getValuesFromDisplay(
			newTokens,
			displayOptions,
			showValues
		);
		setAttributes( { displayOptions: newValues } );
		const updated = combineAllClasses(
			singularSelectClass,
			columnValues,
			marginValues,
			newValues,
			orderValues,
			alignItemsValues,
			columnOffsetValues
		);
		setAttributes( { additionalClasses: updated } );
	};

	const onChangeOrderOptions = ( newTokens ) => {
		const newValues = getValuesFromDisplay(
			newTokens,
			orderOptions,
			showValues
		);
		setAttributes( { orderOptions: newValues } );
		const updated = combineAllClasses(
			singularSelectClass,
			columnValues,
			marginValues,
			displayValues,
			newValues,
			alignItemsValues,
			columnOffsetValues
		);
		setAttributes( { additionalClasses: updated } );
	};

	const onChangeSelfAlignmentOptions = ( newTokens ) => {
		const newValues = getValuesFromDisplay(
			newTokens,
			selfAlignmentOptions,
			showValues
		);
		setAttributes( { selfAlignmentOptions: newValues } );
		const updated = combineAllClasses(
			singularSelectClass,
			columnValues,
			marginValues,
			displayValues,
			orderValues,
			newValues,
			columnOffsetValues
		);
		setAttributes( { additionalClasses: updated } );
	};

	const onChangeColumnOffsetOptions = ( newTokens ) => {
		const newValues = getValuesFromDisplay(
			newTokens,
			columnOffsetOptions,
			showValues
		);
		setAttributes( { columnOffsetOptions: newValues } );
		const updated = combineAllClasses(
			singularSelectClass,
			columnValues,
			marginValues,
			displayValues,
			orderValues,
			alignItemsValues,
			newValues
		);
		setAttributes( { additionalClasses: updated } );
	};

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
							'Display class names instead of labels.',
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
							suggestions={ getSuggestions(
								columnOptions,
								showValues
							) }
							onChange={ onChangeColumnOptions }
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
							suggestions={ getSuggestions(
								marginOptions,
								showValues
							) }
							onChange={ onChangeMarginOptions }
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
							suggestions={ getSuggestions(
								displayOptions,
								showValues
							) }
							onChange={ onChangeDisplayOptions }
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
							suggestions={ getSuggestions(
								orderOptions,
								showValues
							) }
							onChange={ onChangeOrderOptions }
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
							suggestions={ getSuggestions(
								selfAlignmentOptions,
								showValues
							) }
							onChange={ onChangeSelfAlignmentOptions }
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
							suggestions={ getSuggestions(
								columnOffsetOptions,
								showValues
							) }
							onChange={ onChangeColumnOffsetOptions }
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

			<div
				{ ...blockProps }
				className={ previewClassString }
				ref={ blockRef }
			>
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

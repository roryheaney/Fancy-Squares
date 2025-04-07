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

import {
	columnOptions,
	marginOptions,
	displayOptions,
	orderOptions,
	selfAlignmentOptions,
	columnOffsetOptions,
} from '../../data/bootstrap-classes/classes.js';

import './editor.scss';

const singleChoiceOptions = [
	{ label: __( 'Default', 'fs-blocks' ), value: '' },
	{ label: __( 'Test', 'fs-blocks' ), value: 'test' },
	{ label: __( 'Fancy', 'fs-blocks' ), value: 'fancy' },
];

const getDisplayValues = ( values, options, showValues ) => {
	return values.map( ( value ) => {
		const option = options.find( ( opt ) => opt.value === value );
		if ( option ) {
			if ( showValues ) {
				return option.value;
			}
			return option.label;
		}
		return value;
	} );
};

const getValuesFromDisplay = ( displayValues, options, showValues ) => {
	return displayValues.map( ( display ) => {
		const option = options.find( ( opt ) =>
			showValues ? opt.value === display : opt.label === display
		);
		if ( option ) {
			return option.value;
		}
		return display;
	} );
};
/* ------------------------------------------------------------------------ */
/*  Utility: Build final class array
/* ------------------------------------------------------------------------ */
/*
 * Merges everything into one final array for 'additionalClasses',
 * always including 'wp-block-fancysquares-content-wrapper-block' as a base.
 */
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
};
/* ------------------------------------------------------------------------ */
/*  Edit Component
/* ------------------------------------------------------------------------ */
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
	/* ----------------------------------------------------------------------
	   onChange handlers
	---------------------------------------------------------------------- */
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

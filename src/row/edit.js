import {
	InspectorControls,
	InnerBlocks,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	PanelBody,
	FormTokenField,
	CheckboxControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { Fragment, useEffect, useRef, useState } from '@wordpress/element';
import './editor.scss';

import {
	rowOptions,
	justifyContentOptions,
	alignItemsOptions,
	marginOptions,
	paddingOptions,
} from '../../data/bootstrap-classes/classes.js';

// Helper function to map class values to their labels or values based on mode
const getDisplayValues = ( values, options, showValues ) => {
	return values.map( ( value ) => {
		const option = options.find( ( opt ) => opt.value === value );
		if ( option ) {
			if ( showValues ) {
				return option.value;
			}
			return option.label;
		}
		return value; // Fallback if no matching option is found
	} );
};

// Helper function to map selected labels or values back to values
const getValuesFromDisplay = ( displayValues, options, showValues ) => {
	return displayValues.map( ( display ) => {
		const option = options.find( ( opt ) =>
			showValues ? opt.value === display : opt.label === display
		);
		if ( option ) {
			return option.value;
		}
		return display; // Fallback if no matching option is found
	} );
};

/*
 * Utility to combine all selected sets into one final array.
 */
function combineAllClasses(
	rowArr,
	justifyArr,
	alignArr,
	marginArr,
	paddingArr
) {
	return [
		...rowArr,
		...justifyArr,
		...alignArr,
		...marginArr,
		...paddingArr,
	];
}

const ALLOWED_BLOCKS = [ 'fs-blocks/column-block' ];

export default function Edit( { attributes, setAttributes, clientId } ) {
	const {
		rowOptions: rowValues = [],
		justifyContentOptions: justifyValues = [],
		alignItemsOptions: alignValues = [],
		marginOptions: marginValues = [],
		paddingOptions: paddingValues = [],
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
			fieldKey === 'rowOptions' ? newValues : rowValues,
			fieldKey === 'justifyContentOptions' ? newValues : justifyValues,
			fieldKey === 'alignItemsOptions' ? newValues : alignValues,
			fieldKey === 'marginOptions' ? newValues : marginValues,
			fieldKey === 'paddingOptions' ? newValues : paddingValues
		);
		setAttributes( { additionalClasses: updatedClasses } );
	};

	const previewClassString = [
		'wp-block-fancysquares-row-block',
		'row',
		...additionalClasses,
	].join( ' ' );

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
				'wp-block-fancysquares-row-block',
				'row',
				...additionalClasses,
			].join( ' ' );
			layoutEl.className = mergedEditorClasses;
			parentEl.className += ' wp-block-fancysquares-row-block-admin';
		}
	}, [ additionalClasses, clientId ] );

	const blockProps = useBlockProps();

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody
					title={ __( 'Row Settings', 'fs-blocks' ) }
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

					<div style={ { marginBottom: '20px' } }>
						<FormTokenField
							label={ __( 'Row Classes', 'fs-blocks' ) }
							value={ getDisplayValues(
								rowValues,
								rowOptions,
								showValues
							) }
							suggestions={ rowOptions.map( ( item ) =>
								showValues ? item.value : item.label
							) }
							onChange={ handleTokenChange(
								'rowOptions',
								rowOptions
							) }
						/>
						<details style={ { marginTop: '5px' } }>
							<summary>
								{ __( 'Available Row Classes', 'fs-blocks' ) }
							</summary>
							<ul
								style={ {
									fontSize: '12px',
									paddingLeft: '20px',
									margin: '5px 0',
								} }
							>
								{ rowOptions.map( ( item ) => (
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
								'Justify Content Classes',
								'fs-blocks'
							) }
							value={ getDisplayValues(
								justifyValues,
								justifyContentOptions,
								showValues
							) }
							suggestions={ justifyContentOptions.map(
								( item ) =>
									showValues ? item.value : item.label
							) }
							onChange={ handleTokenChange(
								'justifyContentOptions',
								justifyContentOptions
							) }
						/>
						<details style={ { marginTop: '5px' } }>
							<summary>
								{ __(
									'Available Justify Content Classes',
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
								{ justifyContentOptions.map( ( item ) => (
									<li key={ item.value }>
										{ showValues ? item.value : item.label }
									</li>
								) ) }
							</ul>
						</details>
					</div>

					<div style={ { marginBottom: '20px' } }>
						<FormTokenField
							label={ __( 'Align Items Classes', 'fs-blocks' ) }
							value={ getDisplayValues(
								alignValues,
								alignItemsOptions,
								showValues
							) }
							suggestions={ alignItemsOptions.map( ( item ) =>
								showValues ? item.value : item.label
							) }
							onChange={ handleTokenChange(
								'alignItemsOptions',
								alignItemsOptions
							) }
						/>
						<details style={ { marginTop: '5px' } }>
							<summary>
								{ __(
									'Available Align Items Classes',
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
								{ alignItemsOptions.map( ( item ) => (
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
							suggestions={ marginOptions.map( ( item ) =>
								showValues ? item.value : item.label
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
							label={ __( 'Padding Classes', 'fs-blocks' ) }
							value={ getDisplayValues(
								paddingValues,
								paddingOptions,
								showValues
							) }
							suggestions={ paddingOptions.map( ( item ) =>
								showValues ? item.value : item.label
							) }
							onChange={ handleTokenChange(
								'paddingOptions',
								paddingOptions
							) }
						/>
						<details style={ { marginTop: '5px' } }>
							<summary>
								{ __(
									'Available Padding Classes',
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
								{ paddingOptions.map( ( item ) => (
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
					allowedBlocks={ ALLOWED_BLOCKS }
					template={ [ [ 'fs-blocks/column-block' ] ] }
				/>
			</div>
		</Fragment>
	);
}

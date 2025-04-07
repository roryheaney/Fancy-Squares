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

	const [ showValues, setShowValues ] = useState( false );
	const blockRef = useRef();

	// Token field change handlers
	const onChangeRowOptions = ( newTokens ) => {
		const newValues = getValuesFromDisplay(
			newTokens,
			rowOptions,
			showValues
		);
		setAttributes( { rowOptions: newValues } );
		const merged = combineAllClasses(
			newValues,
			justifyValues,
			alignValues,
			marginValues,
			paddingValues
		);
		setAttributes( { additionalClasses: merged } );
	};

	const onChangeJustifyContentOptions = ( newTokens ) => {
		const newValues = getValuesFromDisplay(
			newTokens,
			justifyContentOptions,
			showValues
		);
		setAttributes( { justifyContentOptions: newValues } );
		const merged = combineAllClasses(
			rowValues,
			newValues,
			alignValues,
			marginValues,
			paddingValues
		);
		setAttributes( { additionalClasses: merged } );
	};

	const onChangeAlignItemsOptions = ( newTokens ) => {
		const newValues = getValuesFromDisplay(
			newTokens,
			alignItemsOptions,
			showValues
		);
		setAttributes( { alignItemsOptions: newValues } );
		const merged = combineAllClasses(
			rowValues,
			justifyValues,
			newValues,
			marginValues,
			paddingValues
		);
		setAttributes( { additionalClasses: merged } );
	};

	const onChangeMarginOptions = ( newTokens ) => {
		const newValues = getValuesFromDisplay(
			newTokens,
			marginOptions,
			showValues
		);
		setAttributes( { marginOptions: newValues } );
		const merged = combineAllClasses(
			rowValues,
			justifyValues,
			alignValues,
			newValues,
			paddingValues
		);
		setAttributes( { additionalClasses: merged } );
	};

	const onChangePaddingOptions = ( newTokens ) => {
		const newValues = getValuesFromDisplay(
			newTokens,
			paddingOptions,
			showValues
		);
		setAttributes( { paddingOptions: newValues } );
		const merged = combineAllClasses(
			rowValues,
			justifyValues,
			alignValues,
			marginValues,
			newValues
		);
		setAttributes( { additionalClasses: merged } );
	};

	// Preview class string
	const previewClassString = [
		'wp-block-fancysquares-row-block',
		'row',
		...additionalClasses,
	].join( ' ' );

	// Update InnerBlocks layout classes
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
							'Display class names instead of labels.',
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
							suggestions={ getSuggestions(
								rowOptions,
								showValues
							) }
							onChange={ onChangeRowOptions }
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
							suggestions={ getSuggestions(
								justifyContentOptions,
								showValues
							) }
							onChange={ onChangeJustifyContentOptions }
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
							suggestions={ getSuggestions(
								alignItemsOptions,
								showValues
							) }
							onChange={ onChangeAlignItemsOptions }
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
							label={ __( 'Padding Classes', 'fs-blocks' ) }
							value={ getDisplayValues(
								paddingValues,
								paddingOptions,
								showValues
							) }
							suggestions={ getSuggestions(
								paddingOptions,
								showValues
							) }
							onChange={ onChangePaddingOptions }
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

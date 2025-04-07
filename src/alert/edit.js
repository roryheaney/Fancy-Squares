import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	PanelBody,
	FormTokenField,
	CheckboxControl,
} from '@wordpress/components';
import { Fragment, useEffect, useRef, useState } from '@wordpress/element';
import './editor.scss';

// Import custom grid class options
import {
	alertOptions, // e.g., [{ label: 'Success Alert', value: 'alert-success' }, ...]
	displayOptions,
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
			} else {
				return opt.label === display;
			}
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
 * Combines all class arrays into a single array, ensuring the base 'alert' class is included.
 *
 * @param {string[]} alertArr - Alert-specific classes
 * @param {string[]} displayArr - Display classes
 * @param {string[]} marginArr - Margin classes
 * @param {string[]} paddingArr - Padding classes
 * @return {string[]} The unified array of class names
 */
function combineAllClasses( alertArr, displayArr, marginArr, paddingArr ) {
	return [ 'alert', ...alertArr, ...displayArr, ...marginArr, ...paddingArr ];
}

export default function Edit( { attributes, setAttributes, clientId } ) {
	const {
		alertOptions: alertVals = [],
		displayOptions: displayVals = [],
		marginOptions: marginVals = [],
		paddingOptions: paddingVals = [],
		additionalClasses = [],
		alertContent = '',
	} = attributes;

	const [ showValues, setShowValues ] = useState( false );
	const blockRef = useRef();

	// Ensure default classes on first render
	useEffect( () => {
		if ( additionalClasses.length === 0 ) {
			setAttributes( {
				additionalClasses: [ 'alert' ],
			} );
		}
	}, [ additionalClasses.length, setAttributes ] );

	// Update InnerBlocks layout (even though this block uses RichText, align with editor DOM)
	useEffect( () => {
		if ( ! blockRef.current ) {
			return;
		}

		const blockEl = blockRef.current;
		const mergedEditorClasses = [
			'wp-block-fancysquares-alert-block',
			...additionalClasses,
		].join( ' ' );
		blockEl.className = mergedEditorClasses;
	}, [ additionalClasses, clientId ] );

	// Handle changes for each token field
	const onChangeAlertOptions = ( newTokens ) => {
		const newValues = getValuesFromDisplay(
			newTokens,
			alertOptions,
			showValues
		);
		setAttributes( { alertOptions: newValues } );
		const merged = combineAllClasses(
			newValues,
			displayVals,
			marginVals,
			paddingVals
		);
		setAttributes( { additionalClasses: merged } );
	};

	const onChangeDisplayOptions = ( newTokens ) => {
		const newValues = getValuesFromDisplay(
			newTokens,
			displayOptions,
			showValues
		);
		setAttributes( { displayOptions: newValues } );
		const merged = combineAllClasses(
			alertVals,
			newValues,
			marginVals,
			paddingVals
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
			alertVals,
			displayVals,
			newValues,
			paddingVals
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
			alertVals,
			displayVals,
			marginVals,
			newValues
		);
		setAttributes( { additionalClasses: merged } );
	};

	const previewClassString = additionalClasses.join( ' ' );
	const blockProps = useBlockProps();

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody
					title={ __( 'Alert Settings', 'fs-blocks' ) }
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
							label={ __( 'Alert Classes', 'fs-blocks' ) }
							value={ getDisplayValues(
								alertVals,
								alertOptions,
								showValues
							) }
							suggestions={ getSuggestions(
								alertOptions,
								showValues
							) }
							onChange={ onChangeAlertOptions }
						/>
						<details style={ { marginTop: '5px' } }>
							<summary>
								{ __( 'Available Alert Classes', 'fs-blocks' ) }
							</summary>
							<ul
								style={ {
									fontSize: '12px',
									paddingLeft: '20px',
									margin: '5px 0',
								} }
							>
								{ alertOptions.map( ( item ) => (
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
								displayVals,
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
							label={ __( 'Margin Classes', 'fs-blocks' ) }
							value={ getDisplayValues(
								marginVals,
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
								paddingVals,
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
				<RichText
					tagName="p"
					value={ alertContent }
					onChange={ ( val ) =>
						setAttributes( { alertContent: val } )
					}
					placeholder={ __( 'Alert message here…', 'fs-blocks' ) }
				/>
			</div>
		</Fragment>
	);
}

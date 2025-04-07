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

// Import class options from the shared file
import {
	displayOptions,
	marginOptions,
	paddingOptions,
	positionOptions,
	zindexOptions,
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
/*  Utility: Build final class array
/* ------------------------------------------------------------------------ */
/**
 * Merges everything into one final array for 'additionalClasses',
 * always including 'wp-block-fancysquares-content-wrapper-block' as a base.
 *
 * @param {string} elementTag - 'div' or 'section'
 * @param {string[]} displayArr - Display classes
 * @param {string[]} marginArr - Margin classes
 * @param {string[]} paddingArr - Padding classes
 * @param {string[]} positionArr - Position classes
 * @param {string[]} zindexArr - Z-Index classes
 * @return {string[]} The unified array of class names
 */
function combineAllClasses(
	elementTag,
	displayArr,
	marginArr,
	paddingArr,
	positionArr,
	zindexArr
) {
	const final = [ 'wp-block-fancysquares-content-wrapper-block' ];
	final.push(
		...displayArr,
		...marginArr,
		...paddingArr,
		...positionArr,
		...zindexArr
	);
	return final;
}

/* ------------------------------------------------------------------------ */
/*  Edit Component
/* ------------------------------------------------------------------------ */
export default function Edit( { attributes, setAttributes, clientId } ) {
	const { elementTag = 'div', additionalClasses = [] } = attributes;
	const [ showValues, setShowValues ] = useState( false );
	const blockRef = useRef();

	// Set default classes on first render
	useEffect( () => {
		if ( additionalClasses.length === 0 ) {
			setAttributes( {
				additionalClasses: [
					'wp-block-fancysquares-content-wrapper-block',
				],
			} );
		}
	}, [ additionalClasses.length, setAttributes ] );

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
				'wp-block-fancysquares-content-wrapper-block',
				...additionalClasses,
			].join( ' ' );
			layoutEl.className = mergedEditorClasses;
			parentEl.className +=
				' wp-block-fancysquares-content-wrapper-block-admin';
		}
	}, [ additionalClasses, clientId ] );

	// Filter out base class to isolate user-chosen tokens
	const filtered = additionalClasses.filter(
		( cls ) => cls !== 'wp-block-fancysquares-content-wrapper-block'
	);

	// Identify user-chosen classes
	const intersect = ( arr, options ) =>
		arr.filter( ( c ) => options.some( ( opt ) => opt.value === c ) );

	const displayVals = intersect( filtered, displayOptions );
	const marginVals = intersect( filtered, marginOptions );
	const paddingVals = intersect( filtered, paddingOptions );
	const positionVals = intersect( filtered, positionOptions );
	const zindexVals = intersect( filtered, zindexOptions );

	/* ----------------------------------------------------------------------
	   onChange Handlers
	---------------------------------------------------------------------- */
	const onChangeElementTag = ( newTag ) => {
		setAttributes( { elementTag: newTag } );
		// Note: elementTag doesn’t affect classes, only render.php
	};

	const onChangeDisplay = ( newTokens ) => {
		const newValues = getValuesFromDisplay(
			newTokens,
			displayOptions,
			showValues
		);
		const updated = combineAllClasses(
			elementTag,
			newValues,
			marginVals,
			paddingVals,
			positionVals,
			zindexVals
		);
		setAttributes( { additionalClasses: updated } );
	};

	const onChangeMargin = ( newTokens ) => {
		const newValues = getValuesFromDisplay(
			newTokens,
			marginOptions,
			showValues
		);
		const updated = combineAllClasses(
			elementTag,
			displayVals,
			newValues,
			paddingVals,
			positionVals,
			zindexVals
		);
		setAttributes( { additionalClasses: updated } );
	};

	const onChangePadding = ( newTokens ) => {
		const newValues = getValuesFromDisplay(
			newTokens,
			paddingOptions,
			showValues
		);
		const updated = combineAllClasses(
			elementTag,
			displayVals,
			marginVals,
			newValues,
			positionVals,
			zindexVals
		);
		setAttributes( { additionalClasses: updated } );
	};

	const onChangePosition = ( newTokens ) => {
		const newValues = getValuesFromDisplay(
			newTokens,
			positionOptions,
			showValues
		);
		const updated = combineAllClasses(
			elementTag,
			displayVals,
			marginVals,
			paddingVals,
			newValues,
			zindexVals
		);
		setAttributes( { additionalClasses: updated } );
	};

	const onChangeZIndex = ( newTokens ) => {
		const newValues = getValuesFromDisplay(
			newTokens,
			zindexOptions,
			showValues
		);
		const updated = combineAllClasses(
			elementTag,
			displayVals,
			marginVals,
			paddingVals,
			positionVals,
			newValues
		);
		setAttributes( { additionalClasses: updated } );
	};

	/* ----------------------------------------------------------------------
	   BlockProps / Preview
	---------------------------------------------------------------------- */
	const previewClasses = additionalClasses.join( ' ' );
	const blockProps = useBlockProps();

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody
					title={ __( 'Wrapper Settings', 'fs-blocks' ) }
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
						label={ __( 'Element Tag', 'fs-blocks' ) }
						value={ elementTag }
						options={ [
							{ label: __( 'Div', 'fs-blocks' ), value: 'div' },
							{
								label: __( 'Section', 'fs-blocks' ),
								value: 'section',
							},
						] }
						onChange={ onChangeElementTag }
					/>
					<hr />

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
							onChange={ onChangeDisplay }
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
							onChange={ onChangeMargin }
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
							onChange={ onChangePadding }
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

					<div style={ { marginBottom: '20px' } }>
						<FormTokenField
							label={ __( 'Position Classes', 'fs-blocks' ) }
							value={ getDisplayValues(
								positionVals,
								positionOptions,
								showValues
							) }
							suggestions={ getSuggestions(
								positionOptions,
								showValues
							) }
							onChange={ onChangePosition }
						/>
						<details style={ { marginTop: '5px' } }>
							<summary>
								{ __(
									'Available Position Classes',
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
								{ positionOptions.map( ( item ) => (
									<li key={ item.value }>
										{ showValues ? item.value : item.label }
									</li>
								) ) }
							</ul>
						</details>
					</div>

					<div style={ { marginBottom: '20px' } }>
						<FormTokenField
							label={ __( 'Z-Index Classes', 'fs-blocks' ) }
							value={ getDisplayValues(
								zindexVals,
								zindexOptions,
								showValues
							) }
							suggestions={ getSuggestions(
								zindexOptions,
								showValues
							) }
							onChange={ onChangeZIndex }
						/>
						<details style={ { marginTop: '5px' } }>
							<summary>
								{ __(
									'Available Z-Index Classes',
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
								{ zindexOptions.map( ( item ) => (
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
				className={ previewClasses }
				ref={ blockRef }
			>
				<InnerBlocks template={ [ [ 'fs-blocks/container-block' ] ] } />
			</div>
		</Fragment>
	);
}

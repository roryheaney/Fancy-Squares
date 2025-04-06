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
import { Fragment, useEffect, useState } from '@wordpress/element';

import {
	displayOptions,
	marginOptions,
	paddingOptions,
	positionOptions,
	zindexOptions,
} from '../../data/bootstrap-classes/classes.js';

import './editor.scss';

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

/* ------------------------------------------------------------------------ */
/*  Utility: Build final class array
/* ------------------------------------------------------------------------ */
/*
 * Merges everything into one final array for 'additionalClasses',
 * always including 'wp-block-fancysquares-content-wrapper-block' as a base.
 */
function combineAllClasses(
	elementTag, // Not used in class generation but kept for consistency
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
export default function Edit( { attributes, setAttributes } ) {
	const { elementTag = 'div', additionalClasses = [] } = attributes;
	const [ showValues, setShowValues ] = useState( false ); // Local state for checkbox

	/**
	 * Set default classes if the block is new
	 */
	useEffect( () => {
		if ( additionalClasses.length === 0 ) {
			setAttributes( {
				additionalClasses: [
					'wp-block-fancysquares-content-wrapper-block',
				],
			} );
		}
	}, [ additionalClasses.length, setAttributes ] );

	// Filter out the base class to get user-chosen tokens
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
	   onChange handlers
	---------------------------------------------------------------------- */
	const handleTokenChange = ( options ) => ( newTokens ) => {
		const newValues = getValuesFromDisplay(
			newTokens,
			options,
			showValues
		);
		const updated = combineAllClasses(
			elementTag,
			options === displayOptions ? newValues : displayVals,
			options === marginOptions ? newValues : marginVals,
			options === paddingOptions ? newValues : paddingVals,
			options === positionOptions ? newValues : positionVals,
			options === zindexOptions ? newValues : zindexVals
		);
		setAttributes( { additionalClasses: updated } );
	};

	const onChangeElementTag = ( newTag ) => {
		setAttributes( { elementTag: newTag } );
		// No need to update classes, as elementTag only affects render.php
	};

	/* ----------------------------------------------------------------------
	   Build our final className and pass to useBlockProps
	---------------------------------------------------------------------- */
	const previewClasses = additionalClasses.join( ' ' );
	const blockProps = useBlockProps( { className: previewClasses } );

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
							'Display Bootstrap class names instead of labels.',
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
							suggestions={ displayOptions.map( ( o ) =>
								showValues ? o.value : o.label
							) }
							onChange={ handleTokenChange( displayOptions ) }
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
							suggestions={ marginOptions.map( ( o ) =>
								showValues ? o.value : o.label
							) }
							onChange={ handleTokenChange( marginOptions ) }
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
							suggestions={ paddingOptions.map( ( o ) =>
								showValues ? o.value : o.label
							) }
							onChange={ handleTokenChange( paddingOptions ) }
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
							suggestions={ positionOptions.map( ( o ) =>
								showValues ? o.value : o.label
							) }
							onChange={ handleTokenChange( positionOptions ) }
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
							suggestions={ zindexOptions.map( ( o ) =>
								showValues ? o.value : o.label
							) }
							onChange={ handleTokenChange( zindexOptions ) }
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

			<div { ...blockProps }>
				<InnerBlocks />
			</div>
		</Fragment>
	);
}

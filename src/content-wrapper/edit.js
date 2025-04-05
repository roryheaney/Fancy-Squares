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
import { Fragment, useEffect } from '@wordpress/element';

import {
	displayOptions,
	marginOptions,
	paddingOptions,
	positionOptions,
	zindexOptions,
} from '../../data/bootstrap-classes/classes.js';

import './editor.scss';

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
	const handleTokenChange = ( options, currentVals ) => ( newTokens ) => {
		const newValues = getValuesFromLabels( newTokens, options );
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

					<FormTokenField
						label={ __( 'Display Classes', 'fs-blocks' ) }
						value={ getLabelsFromValues(
							displayVals,
							displayOptions
						) }
						suggestions={ displayOptions.map( ( o ) => o.label ) }
						onChange={ handleTokenChange(
							displayOptions,
							displayVals
						) }
					/>
					<FormTokenField
						label={ __( 'Margin Classes', 'fs-blocks' ) }
						value={ getLabelsFromValues(
							marginVals,
							marginOptions
						) }
						suggestions={ marginOptions.map( ( o ) => o.label ) }
						onChange={ handleTokenChange(
							marginOptions,
							marginVals
						) }
					/>
					<FormTokenField
						label={ __( 'Padding Classes', 'fs-blocks' ) }
						value={ getLabelsFromValues(
							paddingVals,
							paddingOptions
						) }
						suggestions={ paddingOptions.map( ( o ) => o.label ) }
						onChange={ handleTokenChange(
							paddingOptions,
							paddingVals
						) }
					/>
					<FormTokenField
						label={ __( 'Position Classes', 'fs-blocks' ) }
						value={ getLabelsFromValues(
							positionVals,
							positionOptions
						) }
						suggestions={ positionOptions.map( ( o ) => o.label ) }
						onChange={ handleTokenChange(
							positionOptions,
							positionVals
						) }
					/>
					<FormTokenField
						label={ __( 'Z-Index Classes', 'fs-blocks' ) }
						value={ getLabelsFromValues(
							zindexVals,
							zindexOptions
						) }
						suggestions={ zindexOptions.map( ( o ) => o.label ) }
						onChange={ handleTokenChange(
							zindexOptions,
							zindexVals
						) }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<InnerBlocks template={ [ [ 'fs-blocks/container-block' ] ] } />
			</div>
		</Fragment>
	);
}

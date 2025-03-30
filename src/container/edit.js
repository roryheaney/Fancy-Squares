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
import './editor.scss';

import {
	displayOptions,
	marginOptions,
	paddingOptions,
	positionOptions,
	zindexOptions,
} from '../../data/bootstrap-classes/classes.js';

/* ------------------------------------------------------------------------ */
/*  Convert to plain string suggestions
/* ------------------------------------------------------------------------ */
const displaySuggestions = displayOptions.map( ( o ) => o.value );
const marginSuggestions = marginOptions.map( ( o ) => o.value );
const paddingSuggestions = paddingOptions.map( ( o ) => o.value );
const positionSuggestions = positionOptions.map( ( o ) => o.value );
const zindexSuggestions = zindexOptions.map( ( o ) => o.value );

/* ------------------------------------------------------------------------ */
/*  Utility: Build final class array
/* ------------------------------------------------------------------------ */
/*
 * Merges everything into one final array for 'additionalClasses',
 * always including 'wp-block-fancysquares-container-block' plus
 * 'container' or 'container-fluid'.
 *
 * @param {string} containerType  'default' or 'fluid'
 * @param {string[]} displayArr
 * @param {string[]} marginArr
 * @param {string[]} paddingArr
 * @param {string[]} positionArr
 * @param {string[]} zindexArr
 * @return {string[]} The unified array of class names
 */
function combineAllClasses(
	containerType,
	displayArr,
	marginArr,
	paddingArr,
	positionArr,
	zindexArr
) {
	// Start with our base block class.
	// We'll add container or container-fluid below.
	let final = [ 'wp-block-fancysquares-container-block' ];

	// Remove old references to all known suggestions
	const allSuggestions = [
		...displaySuggestions,
		...marginSuggestions,
		...paddingSuggestions,
		...positionSuggestions,
		...zindexSuggestions,
	];

	// Filter out any existing known classes (so we can re-apply fresh)
	final = final.filter( ( c ) => ! allSuggestions.includes( c ) );

	// Decide which container type to add
	if ( containerType === 'fluid' ) {
		final.push( 'container-fluid' );
	} else {
		final.push( 'container' );
	}

	// Now add any user-chosen classes
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
	const { additionalClasses } = attributes;

	/**
	 * If the block is brand new (additionalClasses is empty), set defaults.
	 */
	useEffect( () => {
		if ( additionalClasses.length === 0 ) {
			setAttributes( {
				additionalClasses: [
					'wp-block-fancysquares-container-block',
					'container',
				],
			} );
		}
	}, [ additionalClasses.length, setAttributes ] );

	// 1) Determine container type by seeing if 'container-fluid' is present
	//    or else 'container' is present
	let containerType = 'default'; // means 'container'
	if ( additionalClasses.includes( 'container-fluid' ) ) {
		containerType = 'fluid';
	}

	// 2) Filter out always-present classes so we can parse the user-chosen tokens
	const filtered = additionalClasses.filter(
		( cls ) =>
			cls !== 'wp-block-fancysquares-container-block' &&
			cls !== 'container' &&
			cls !== 'container-fluid'
	);

	// 3) Identify which are display, margin, padding, position, zindex
	const intersect = ( arr, suggestions ) =>
		arr.filter( ( c ) => suggestions.includes( c ) );

	const displayVals = intersect( filtered, displaySuggestions );
	const marginVals = intersect( filtered, marginSuggestions );
	const paddingVals = intersect( filtered, paddingSuggestions );
	const positionVals = intersect( filtered, positionSuggestions );
	const zindexVals = intersect( filtered, zindexSuggestions );

	/* ----------------------------------------------------------------------
	   onChange handlers
	---------------------------------------------------------------------- */
	const onChangeContainerType = ( newVal ) => {
		const updated = combineAllClasses(
			newVal,
			displayVals,
			marginVals,
			paddingVals,
			positionVals,
			zindexVals
		);
		setAttributes( { additionalClasses: updated } );
	};

	const onChangeDisplay = ( newTokens ) => {
		const updated = combineAllClasses(
			containerType,
			newTokens,
			marginVals,
			paddingVals,
			positionVals,
			zindexVals
		);
		setAttributes( { additionalClasses: updated } );
	};

	const onChangeMargin = ( newTokens ) => {
		const updated = combineAllClasses(
			containerType,
			displayVals,
			newTokens,
			paddingVals,
			positionVals,
			zindexVals
		);
		setAttributes( { additionalClasses: updated } );
	};

	const onChangePadding = ( newTokens ) => {
		const updated = combineAllClasses(
			containerType,
			displayVals,
			marginVals,
			newTokens,
			positionVals,
			zindexVals
		);
		setAttributes( { additionalClasses: updated } );
	};

	const onChangePosition = ( newTokens ) => {
		const updated = combineAllClasses(
			containerType,
			displayVals,
			marginVals,
			paddingVals,
			newTokens,
			zindexVals
		);
		setAttributes( { additionalClasses: updated } );
	};

	const onChangeZIndex = ( newTokens ) => {
		const updated = combineAllClasses(
			containerType,
			displayVals,
			marginVals,
			paddingVals,
			positionVals,
			newTokens
		);
		setAttributes( { additionalClasses: updated } );
	};

	/* ----------------------------------------------------------------------
	   BlockProps / Preview
	---------------------------------------------------------------------- */
	const blockProps = useBlockProps();
	const previewClasses = additionalClasses.join( ' ' );

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody
					title={ __( 'Container Settings', 'fs-blocks' ) }
					initialOpen={ true }
				>
					<SelectControl
						label={ __( 'Container Type', 'fs-blocks' ) }
						value={ containerType } // 'default' or 'fluid'
						options={ [
							{
								label: __( 'Default (container)', 'fs-blocks' ),
								value: 'default',
							},
							{
								label: __(
									'Fluid (container-fluid)',
									'fs-blocks'
								),
								value: 'fluid',
							},
						] }
						onChange={ onChangeContainerType }
					/>
					<hr />

					<FormTokenField
						label={ __( 'Display Classes', 'fs-blocks' ) }
						value={ displayVals }
						suggestions={ displaySuggestions }
						onChange={ onChangeDisplay }
					/>
					<FormTokenField
						label={ __( 'Margin Classes', 'fs-blocks' ) }
						value={ marginVals }
						suggestions={ marginSuggestions }
						onChange={ onChangeMargin }
					/>
					<FormTokenField
						label={ __( 'Padding Classes', 'fs-blocks' ) }
						value={ paddingVals }
						suggestions={ paddingSuggestions }
						onChange={ onChangePadding }
					/>
					<FormTokenField
						label={ __( 'Position Classes', 'fs-blocks' ) }
						value={ positionVals }
						suggestions={ positionSuggestions }
						onChange={ onChangePosition }
					/>
					<FormTokenField
						label={ __( 'Z-Index Classes', 'fs-blocks' ) }
						value={ zindexVals }
						suggestions={ zindexSuggestions }
						onChange={ onChangeZIndex }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps } className={ previewClasses }>
				<InnerBlocks
					allowedBlocks={ [
						'fs-blocks/row-block',
						'core/spacer',
						'core/separator',
						'core/group',
						'core/columns',
					] }
					template={ [ [ 'fs-blocks/row-block' ] ] }
				/>
			</div>
		</Fragment>
	);
}

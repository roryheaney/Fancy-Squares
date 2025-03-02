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

/* ------------------------------------------------------------------------ */
/*  Convert the objects to plain string suggestions
/* ------------------------------------------------------------------------ */
const displaySuggestions = displayOptions.map( ( o ) => o.value );
const marginSuggestions = marginOptions.map( ( o ) => o.value );
const paddingSuggestions = paddingOptions.map( ( o ) => o.value );
const positionSuggestions = positionOptions.map( ( o ) => o.value );
const zindexSuggestions = zindexOptions.map( ( o ) => o.value );

/* ------------------------------------------------------------------------ */
/*  Utility: Build final class array
/* ------------------------------------------------------------------------ */
/**
 * Merges everything into one final array for 'additionalClasses',
 * always including 'wp-block-fancysquares-content-wrapper-block' as a base.
 *
 * @param {string} elementTag  'div' or 'section'
 * @param {string[]} displayArr
 * @param {string[]} marginArr
 * @param {string[]} paddingArr
 * @param {string[]} positionArr
 * @param {string[]} zindexArr
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
	// Start with our base block class.
	let final = [ 'wp-block-fancysquares-content-wrapper-block' ];

	// Remove old references to all known suggestions
	const allSuggestions = [
		...displaySuggestions,
		...marginSuggestions,
		...paddingSuggestions,
		...positionSuggestions,
		...zindexSuggestions,
	];

	final = final.filter( ( c ) => ! allSuggestions.includes( c ) );

	// Add the user-chosen classes
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
	const { elementTag, additionalClasses } = attributes;

	/**
	 * If the block is brand new (additionalClasses is empty), set defaults.
	 * We'll always include our base class, but not forcibly add "container" or fluid.
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

	// 1) Filter out the base class for user-chosen tokens
	const filtered = additionalClasses.filter(
		( cls ) => cls !== 'wp-block-fancysquares-content-wrapper-block'
	);

	// 2) Identify which are display, margin, padding, position, zindex
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
	const onChangeElementTag = ( newTag ) => {
		// We only store elementTag in the attributes, but note that the classes
		// are not changed by the element tag. The elementTag is used in render.php.
		setAttributes( { elementTag: newTag } );
	};

	const onChangeDisplay = ( newTokens ) => {
		const updated = combineAllClasses(
			elementTag,
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
			elementTag,
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
			elementTag,
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
			elementTag,
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
			elementTag,
			displayVals,
			marginVals,
			paddingVals,
			positionVals,
			newTokens
		);
		setAttributes( { additionalClasses: updated } );
	};

	/* ----------------------------------------------------------------------
	   Build our final className and pass to useBlockProps
	---------------------------------------------------------------------- */
	const previewClasses = additionalClasses.join( ' ' );

	// useBlockProps() automatically:
	//  - applies alignment classes (e.g., .alignwide) if chosen
	//  - applies color classes/inline styles if color is chosen
	const blockProps = useBlockProps( {
		className: previewClasses,
	} );

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody
					title={ __( 'Wrapper Settings', 'fs-blocks' ) }
					initialOpen={ true }
				>
					<SelectControl
						label={ __( 'Element Tag', 'fs-blocks' ) }
						value={ elementTag } // 'div' or 'section'
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

			{ /* Our dynamic preview */ }
			<div { ...blockProps }>
				<InnerBlocks template={ [ [ 'fs-blocks/container-block' ] ] } />
			</div>
		</Fragment>
	);
}

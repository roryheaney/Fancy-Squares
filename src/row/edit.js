import {
	InspectorControls,
	InnerBlocks,
	useBlockProps,
} from '@wordpress/block-editor';
import { PanelBody, FormTokenField } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { Fragment, useEffect, useRef } from '@wordpress/element';
import './editor.scss';

import {
	rowOptions,
	justifyContentOptions,
	alignItemsOptions,
	marginOptions,
	paddingOptions,
} from '../../data/bootstrap-classes/classes.js';

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

	// Reusable onChange handler for all FormTokenFields
	const handleTokenChange = ( fieldKey, options ) => ( newTokens ) => {
		const newValues = getValuesFromLabels( newTokens, options );
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
					<div style={ { marginBottom: '20px' } }>
						<FormTokenField
							label={ __( 'Row Classes', 'fs-blocks' ) }
							value={ getLabelsFromValues(
								rowValues,
								rowOptions
							) }
							suggestions={ rowOptions.map(
								( item ) => item.label
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
									<li key={ item.value }>{ item.label }</li>
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
							value={ getLabelsFromValues(
								justifyValues,
								justifyContentOptions
							) }
							suggestions={ justifyContentOptions.map(
								( item ) => item.label
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
									<li key={ item.value }>{ item.label }</li>
								) ) }
							</ul>
						</details>
					</div>

					<div style={ { marginBottom: '20px' } }>
						<FormTokenField
							label={ __( 'Align Items Classes', 'fs-blocks' ) }
							value={ getLabelsFromValues(
								alignValues,
								alignItemsOptions
							) }
							suggestions={ alignItemsOptions.map(
								( item ) => item.label
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
									<li key={ item.value }>{ item.label }</li>
								) ) }
							</ul>
						</details>
					</div>

					<div style={ { marginBottom: '20px' } }>
						<FormTokenField
							label={ __( 'Margin Classes', 'fs-blocks' ) }
							value={ getLabelsFromValues(
								marginValues,
								marginOptions
							) }
							suggestions={ marginOptions.map(
								( item ) => item.label
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
									<li key={ item.value }>{ item.label }</li>
								) ) }
							</ul>
						</details>
					</div>

					<div style={ { marginBottom: '20px' } }>
						<FormTokenField
							label={ __( 'Padding Classes', 'fs-blocks' ) }
							value={ getLabelsFromValues(
								paddingValues,
								paddingOptions
							) }
							suggestions={ paddingOptions.map(
								( item ) => item.label
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
									<li key={ item.value }>{ item.label }</li>
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

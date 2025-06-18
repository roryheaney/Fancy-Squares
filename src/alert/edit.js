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
import { Fragment, useState } from '@wordpress/element';
import './editor.scss';

// Import your array definitions from some shared file
import {
	alertOptions, // e.g. [{label: 'Success Alert', value: 'alert-success'}, ...]
	displayOptions,
	marginOptions,
	paddingOptions,
} from '../../data/bootstrap-classes/classes.js';
import {
	getDisplayValues,
	getValuesFromDisplay,
	combineAllClasses,
} from '../utils/helpers.js';

export default function Edit( { attributes, setAttributes } ) {
	const {
		alertOptions: alertVals = [],
		displayOptions: displayVals = [],
		marginOptions: marginVals = [],
		paddingOptions: paddingVals = [],
		additionalClasses = [],
		alertContent = '',
	} = attributes;

	const [ showValues, setShowValues ] = useState( false ); // Local state for checkbox

	const blockProps = useBlockProps();

	// Handle changes for each token field
	const onChangeAlertOptions = ( newTokens ) => {
		const newValues = getValuesFromDisplay(
			newTokens,
			alertOptions,
			showValues
		);
		setAttributes( { alertOptions: newValues } );
		const merged = combineAllClasses(
			null,
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
			null,
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
			null,
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
			null,
			alertVals,
			displayVals,
			marginVals,
			newValues
		);
		setAttributes( { additionalClasses: merged } );
	};

	// For the editor preview, always include "alert" as a base class
	const previewClassString = [ 'alert', ...additionalClasses ].join( ' ' );

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
							'Display Bootstrap class names instead of labels.',
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
							suggestions={ alertOptions.map( ( o ) =>
								showValues ? o.value : o.label
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
							suggestions={ displayOptions.map( ( o ) =>
								showValues ? o.value : o.label
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
							suggestions={ marginOptions.map( ( o ) =>
								showValues ? o.value : o.label
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
							suggestions={ paddingOptions.map( ( o ) =>
								showValues ? o.value : o.label
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

			<div { ...blockProps } className={ previewClassString }>
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

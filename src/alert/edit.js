import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';
import { PanelBody, FormTokenField } from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import './editor.scss';

// Import your array definitions from some shared file
import {
	alertOptions, // e.g. [{label: 'alert-success', value:'alert-success'}, ...]
	displayOptions,
	marginOptions,
	paddingOptions,
} from '../../data/bootstrap-classes/classes.js';

// Convert each array of { label, value } to just strings
const alertSuggestions = alertOptions.map( ( item ) => item.value );
const displaySuggestions = displayOptions.map( ( item ) => item.value );
const marginSuggestions = marginOptions.map( ( item ) => item.value );
const paddingSuggestions = paddingOptions.map( ( item ) => item.value );

/* ------------------------------------------------------------------------ */
/*  Helper to merge arrays into one final array of classes
/* ------------------------------------------------------------------------ */
/**
 * 1) Ensuring base classes
 * 2) Removing any existing display/margin/alertArr classes
 * 3) Adding the new tokens from each set
 *
 * @param {string[]} alertArr
 * @param {string[]} displayArr
 * @param {string[]} marginArr
 * @param {string[]} paddingArr
 * @return {string[]} The unified array of class names
 */

function combineAllClasses( alertArr, displayArr, marginArr, paddingArr ) {
	return [ ...alertArr, ...displayArr, ...marginArr, ...paddingArr ];
}

export default function Edit( { attributes, setAttributes } ) {
	const {
		alertOptions: alertVals,
		displayOptions: displayVals,
		marginOptions: marginVals,
		paddingOptions: paddingVals,
		additionalClasses,
		alertContent,
	} = attributes;

	const blockProps = useBlockProps();

	// Handle changes for each token field
	const onChangeAlertOptions = ( newTokens ) => {
		setAttributes( { alertOptions: newTokens } );
		const merged = combineAllClasses(
			newTokens,
			displayVals,
			marginVals,
			paddingVals
		);
		setAttributes( { additionalClasses: merged } );
	};

	const onChangeDisplayOptions = ( newTokens ) => {
		setAttributes( { displayOptions: newTokens } );
		const merged = combineAllClasses(
			alertVals,
			newTokens,
			marginVals,
			paddingVals
		);
		setAttributes( { additionalClasses: merged } );
	};

	const onChangeMarginOptions = ( newTokens ) => {
		setAttributes( { marginOptions: newTokens } );
		const merged = combineAllClasses(
			alertVals,
			displayVals,
			newTokens,
			paddingVals
		);
		setAttributes( { additionalClasses: merged } );
	};

	const onChangePaddingOptions = ( newTokens ) => {
		setAttributes( { paddingOptions: newTokens } );
		const merged = combineAllClasses(
			alertVals,
			displayVals,
			marginVals,
			newTokens
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
					<FormTokenField
						label={ __( 'Alert Classes', 'fs-blocks' ) }
						value={ alertVals }
						suggestions={ alertSuggestions }
						onChange={ onChangeAlertOptions }
					/>
					<FormTokenField
						label={ __( 'Display Classes', 'fs-blocks' ) }
						value={ displayVals }
						suggestions={ displaySuggestions }
						onChange={ onChangeDisplayOptions }
					/>
					<FormTokenField
						label={ __( 'Margin Classes', 'fs-blocks' ) }
						value={ marginVals }
						suggestions={ marginSuggestions }
						onChange={ onChangeMarginOptions }
					/>
					<FormTokenField
						label={ __( 'Padding Classes', 'fs-blocks' ) }
						value={ paddingVals }
						suggestions={ paddingSuggestions }
						onChange={ onChangePaddingOptions }
					/>
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

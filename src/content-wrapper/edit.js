// edit.js
import {
	InspectorControls,
	InnerBlocks,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	CheckboxControl,
	FormTokenField,
} from '@wordpress/components';
import { __, sprintf } from '@wordpress/i18n';
import {
	Fragment,
	useRef,
	useMemo,
	useState,
	useEffect,
} from '@wordpress/element';
import {
	sidesAll,
	sidesHorizontal,
	sidesVertical,
	sidesTop,
	sidesRight,
	sidesBottom,
	sidesLeft,
} from '@wordpress/icons';

import metadata from './block.json';
import PaddingControl from '../utils/components/PaddingControl';
import PositiveMarginControl from '../utils/components/PositiveMarginControl';
import NegativeMarginControl from '../utils/components/NegativeMarginControl';
import { getDisplayValues, getValuesFromDisplay } from '../utils/classHelpers';
import { generateClassName } from '../utils/helpers';
import { BLOCK_CONFIG } from '../utils/config/blockConfig';
import {
	PADDING_SIDE_TYPES,
	MARGIN_SIDE_TYPES,
	NEGATIVE_MARGIN_SIDE_TYPES,
} from '../utils/config/constants';
import {
	displayOptions,
	positionOptions,
	zindexOptions,
	orderOptions,
	selfAlignmentOptions,
} from '../../data/bootstrap-classes/classes.js';
import './editor.scss';

const TOKEN_CONTROLS = [
	{
		key: 'displayOptions',
		label: __( 'Display Classes', 'fs-blocks' ),
		options: displayOptions,
	},
	{
		key: 'positionOptions',
		label: __( 'Position Classes', 'fs-blocks' ),
		options: positionOptions,
	},
	{
		key: 'zindexOptions',
		label: __( 'Z-Index Classes', 'fs-blocks' ),
		options: zindexOptions,
	},
	{
		key: 'orderOptions',
		label: __( 'Order Classes', 'fs-blocks' ),
		options: orderOptions,
	},
	{
		key: 'selfAlignmentOptions',
		label: __( 'Self Align Item Classes', 'fs-blocks' ),
		options: selfAlignmentOptions,
	},
];

const singleChoiceOptions = [
	{ label: __( 'Default', 'fs-blocks' ), value: '' },
	{ label: __( 'Test', 'fs-blocks' ), value: 'test' },
	{ label: __( 'Fancy', 'fs-blocks' ), value: 'fancy' },
];

// Icon mapping for controls
const ICON_MAP = {
	paddingAll: sidesAll,
	paddingHorizontal: sidesHorizontal,
	paddingVertical: sidesVertical,
	paddingTop: sidesTop,
	paddingRight: sidesRight,
	paddingBottom: sidesBottom,
	paddingLeft: sidesLeft,
	marginAll: sidesAll,
	marginHorizontal: sidesHorizontal,
	marginVertical: sidesVertical,
	marginTop: sidesTop,
	marginRight: sidesRight,
	marginBottom: sidesBottom,
	marginLeft: sidesLeft,
	negativeMarginAll: sidesAll,
	negativeMarginHorizontal: sidesHorizontal,
	negativeMarginVertical: sidesVertical,
	negativeMarginTop: sidesTop,
	negativeMarginRight: sidesRight,
	negativeMarginBottom: sidesBottom,
	negativeMarginLeft: sidesLeft,
};

export default function Edit( { attributes, setAttributes, clientId } ) {
	const blockRef = useRef();
	const [ showValues, setShowValues ] = useState( false );

	// Compute class list via generateClassName for editor preview
	const previewClasses = useMemo( () => {
		return generateClassName(
			attributes,
			metadata.name,
			BLOCK_CONFIG
		).split( ' ' );
	}, [ attributes ] );

	// Sync additionalClasses attribute for front-end render
	useEffect( () => {
		const current = attributes.additionalClasses || [];
		if ( previewClasses.join( '|' ) !== current.join( '|' ) ) {
			setAttributes( { additionalClasses: previewClasses } );
		}
	}, [ previewClasses ] );

	const handleTokenChange = ( key, options ) => ( tokens ) => {
		const vals = getValuesFromDisplay( tokens, options, showValues );
		setAttributes( { [ key ]: vals } );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Content Wrapper Settings', 'fs-blocks' ) }
					initialOpen={ false }
				>
					<SelectControl
						label={ __( 'Singular Select Class', 'fs-blocks' ) }
						value={ attributes.singularSelectClass }
						options={ singleChoiceOptions }
						onChange={ ( val ) =>
							setAttributes( { singularSelectClass: val } )
						}
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Default Controls', 'fs-blocks' ) }
					initialOpen={ false }
				>
					<CheckboxControl
						label={ __( 'Show Values', 'fs-blocks' ) }
						checked={ showValues }
						onChange={ setShowValues }
						help={ __( 'Display raw class names.', 'fs-blocks' ) }
						style={ { marginBottom: '20px' } }
					/>
					{ TOKEN_CONTROLS.map( ( { key, label, options } ) => (
						<div key={ key } style={ { marginBottom: '20px' } }>
							<FormTokenField
								label={ label }
								value={ getDisplayValues(
									attributes[ key ] || [],
									options,
									showValues
								) }
								suggestions={ options.map( ( o ) =>
									showValues ? o.value : o.label
								) }
								onChange={ handleTokenChange( key, options ) }
								help={ sprintf(
									/* translators: %s: control label */
									__( 'Available %s', 'fs-blocks' ),
									label
								) }
							/>
							<details style={ { marginTop: '5px' } }>
								<summary>
									{ sprintf(
										/* translators: %s: control label */
										__( 'Available %s', 'fs-blocks' ),
										label
									) }
								</summary>
								<ul
									style={ {
										fontSize: '12px',
										paddingLeft: '20px',
										margin: '5px 0',
									} }
								>
									{ options.map( ( item ) => (
										<li key={ item.value }>
											{ showValues
												? item.value
												: item.label }
										</li>
									) ) }
								</ul>
							</details>
						</div>
					) ) }
				</PanelBody>

				<PanelBody
					title={ __( 'Padding Settings', 'fs-blocks' ) }
					initialOpen={ false }
				>
					{ PADDING_SIDE_TYPES.map( ( { key } ) => {
						const human = key.replace( /([A-Z])/g, ' $1' ).trim();
						return (
							<PaddingControl
								key={ key }
								icon={ ICON_MAP[ key ] }
								label={ human }
								baseValue={ attributes[ `${ key }Base` ] }
								smValue={ attributes[ `${ key }Sm` ] }
								mdValue={ attributes[ `${ key }Md` ] }
								lgValue={ attributes[ `${ key }Lg` ] }
								xlValue={ attributes[ `${ key }Xl` ] }
								onChangeBase={ ( v ) =>
									setAttributes( { [ `${ key }Base` ]: v } )
								}
								onChangeSm={ ( v ) =>
									setAttributes( { [ `${ key }Sm` ]: v } )
								}
								onChangeMd={ ( v ) =>
									setAttributes( { [ `${ key }Md` ]: v } )
								}
								onChangeLg={ ( v ) =>
									setAttributes( { [ `${ key }Lg` ]: v } )
								}
								onChangeXl={ ( v ) =>
									setAttributes( { [ `${ key }Xl` ]: v } )
								}
							/>
						);
					} ) }
				</PanelBody>

				<PanelBody
					title={ __( 'Margin Settings', 'fs-blocks' ) }
					initialOpen={ false }
				>
					{ MARGIN_SIDE_TYPES.map( ( { key } ) => {
						const human = key.replace( /([A-Z])/g, ' $1' ).trim();
						return (
							<PositiveMarginControl
								key={ key }
								icon={ ICON_MAP[ key ] }
								label={ human }
								baseValue={ attributes[ `${ key }Base` ] }
								smValue={ attributes[ `${ key }Sm` ] }
								mdValue={ attributes[ `${ key }Md` ] }
								lgValue={ attributes[ `${ key }Lg` ] }
								xlValue={ attributes[ `${ key }Xl` ] }
								onChangeBase={ ( v ) =>
									setAttributes( { [ `${ key }Base` ]: v } )
								}
								onChangeSm={ ( v ) =>
									setAttributes( { [ `${ key }Sm` ]: v } )
								}
								onChangeMd={ ( v ) =>
									setAttributes( { [ `${ key }Md` ]: v } )
								}
								onChangeLg={ ( v ) =>
									setAttributes( { [ `${ key }Lg` ]: v } )
								}
								onChangeXl={ ( v ) =>
									setAttributes( { [ `${ key }Xl` ]: v } )
								}
							/>
						);
					} ) }
				</PanelBody>

				<PanelBody
					title={ __( 'Negative Margin Settings', 'fs-blocks' ) }
					initialOpen={ false }
				>
					{ NEGATIVE_MARGIN_SIDE_TYPES.map( ( { key } ) => {
						const human = key.replace( /([A-Z])/g, ' $1' ).trim();
						return (
							<NegativeMarginControl
								key={ key }
								icon={ ICON_MAP[ key ] }
								label={ human }
								baseValue={ attributes[ `${ key }Base` ] }
								smValue={ attributes[ `${ key }Sm` ] }
								mdValue={ attributes[ `${ key }Md` ] }
								lgValue={ attributes[ `${ key }Lg` ] }
								xlValue={ attributes[ `${ key }Xl` ] }
								onChangeBase={ ( v ) =>
									setAttributes( { [ `${ key }Base` ]: v } )
								}
								onChangeSm={ ( v ) =>
									setAttributes( { [ `${ key }Sm` ]: v } )
								}
								onChangeMd={ ( v ) =>
									setAttributes( { [ `${ key }Md` ]: v } )
								}
								onChangeLg={ ( v ) =>
									setAttributes( { [ `${ key }Lg` ]: v } )
								}
								onChangeXl={ ( v ) =>
									setAttributes( { [ `${ key }Xl` ]: v } )
								}
							/>
						);
					} ) }
				</PanelBody>
			</InspectorControls>

			<div
				{ ...useBlockProps() }
				ref={ blockRef }
				className={ previewClasses.join( ' ' ) }
			>
				<InnerBlocks
					template={ [
						[
							'core/heading',
							{ placeholder: 'Enter heading text...' },
						],
						[
							'core/paragraph',
							{ placeholder: 'Enter paragraph text...' },
						],
					] }
				/>
			</div>
		</>
	);
}

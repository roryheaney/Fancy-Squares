/**
 * Shared plumbing for every block.
 * Returns:
 *   – <Inspector /> component     (all generic panels)
 *   – previewClasses (string[])   (computed by generateClassName)
 *
 * Call:
 *   const { Inspector, previewClasses } = useBlockControls(
 *       name, attributes, setAttributes,
 *       { hasWidthControls, dropdown, showPadding, showMargin, showNegMargin }
 *   );
 */
import {
	PanelBody,
	CheckboxControl,
	FormTokenField,
	SelectControl,
	Button,
} from '@wordpress/components';
import { useState, useMemo, useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import {
	sidesAll,
	sidesHorizontal,
	sidesVertical,
	sidesTop,
	sidesRight,
	sidesBottom,
	sidesLeft,
} from '@wordpress/icons';

import {
	PADDING_SIDE_TYPES,
	MARGIN_SIDE_TYPES,
	NEGATIVE_MARGIN_SIDE_TYPES,
} from './config/constants';
import {
	BLOCK_CONFIG,
	BREAKPOINT_DIMENSIONS,
	CLASS_OPTIONS_MAP,
} from './config/blockConfig';
import {
	getDisplayValues,
	getValuesFromDisplay,
	getSuggestions,
	generateClassName,
} from './helpers';

import WidthControl from './components/WidthControl';
import PaddingControl from './components/PaddingControl';
import PositiveMarginControl from './components/PositiveMarginControl';
import NegativeMarginControl from './components/NegativeMarginControl';

import desktopImg from './icons/desktop.png';
import laptopImg from './icons/laptop.png';
import tabletImg from './icons/tablet.png';
import mobileImg from './icons/mobile.png';

/* -------------------------------------------------- */
/*  Icon mapping for range controls
/* -------------------------------------------------- */
const ICON = {
	paddingAll: sidesAll,
	marginAll: sidesAll,
	negativeMarginAll: sidesAll,
	paddingHorizontal: sidesHorizontal,
	marginHorizontal: sidesHorizontal,
	negativeMarginHorizontal: sidesHorizontal,
	paddingVertical: sidesVertical,
	marginVertical: sidesVertical,
	negativeMarginVertical: sidesVertical,
	paddingTop: sidesTop,
	marginTop: sidesTop,
	negativeMarginTop: sidesTop,
	paddingRight: sidesRight,
	marginRight: sidesRight,
	negativeMarginRight: sidesRight,
	paddingBottom: sidesBottom,
	marginBottom: sidesBottom,
	negativeMarginBottom: sidesBottom,
	paddingLeft: sidesLeft,
	marginLeft: sidesLeft,
	negativeMarginLeft: sidesLeft,
};

export function useBlockControls(
	name,
	attributes,
	setAttributes,
	clientId,
	{
		hasWidthControls = false,
		dropdown = null,
		showPadding = true,
		showMargin = true,
		showNegMargin = true,
	} = {}
) {
	/* ---------- live preview ---------- */
	const previewClasses = useMemo(
		() => generateClassName( attributes, name, BLOCK_CONFIG ).split( ' ' ),
		[ attributes, name ]
	);

	/* keep additionalClasses in sync */
	useEffect( () => {
		if (
			( attributes.additionalClasses || [] ).join( '|' ) !==
			previewClasses.join( '|' )
		) {
			setAttributes( { additionalClasses: previewClasses } );
		}
	}, [ previewClasses ] );

	/* ==========  PANELS ========== */

	/* token-field panel */
	const [ showValues, setShowValues ] = useState( false );
	const tokenPanel = (
		<PanelBody title="Class Controls" initialOpen={ false } key="token">
			<CheckboxControl
				label="Show raw class names"
				checked={ showValues }
				onChange={ setShowValues }
				style={ { marginBottom: '20px' } }
			/>
			{ ( BLOCK_CONFIG[ name ]?.classOptions || [] ).map( ( key ) => {
				const mapKey = key.replace( /Options$/, '' );
				const optsData = CLASS_OPTIONS_MAP[ mapKey ];
				if ( ! optsData ) return null;
				const opts = optsData.options;
				const val = attributes[ key ] || [];
				const nice = mapKey
					.replace( /([A-Z])/g, ' $1' )
					.replace( /^./, ( s ) => s.toUpperCase() );
				return (
					<div key={ key } style={ { marginBottom: '20px' } }>
						<FormTokenField
							label={ `${ nice } Classes` }
							value={ getDisplayValues( val, opts, showValues ) }
							suggestions={ getSuggestions( opts, showValues ) }
							onChange={ ( tokens ) =>
								setAttributes( {
									[ key ]: getValuesFromDisplay(
										tokens,
										opts,
										showValues
									),
								} )
							}
						/>
						{ /* ▼ description list of all available values -------------- */ }
						<details style={ { marginTop: '5px' } }>
							<summary>{ `Available ${ nice } Classes` }</summary>
							<ul
								style={ {
									fontSize: '12px',
									paddingLeft: '20px',
									margin: '5px 0',
								} }
							>
								{ opts.map( ( o ) => (
									<li key={ o.value }>
										{ showValues ? o.value : o.label }
									</li>
								) ) }
							</ul>
						</details>
					</div>
				);
			} ) }
		</PanelBody>
	);

	/* width panel (optional) */
	const widthPanel =
		hasWidthControls &&
		( () => {
			const { parent, parentAtts } = useSelect(
				( select ) => ( {
					parent: select( 'core/block-editor' ).getBlockParents(
						clientId
					),
					parentAtts: select(
						'core/block-editor'
					).getBlockAttributes(
						select( 'core/block-editor' ).getBlockParents(
							clientId
						)[ 0 ]
					),
				} ),
				[ clientId ]
			);
			const { updateBlockAttributes } =
				useDispatch( 'core/block-editor' );
			const isBoot =
				parentAtts?.className?.includes( 'is-style-bootstrap' );

			return (
				<PanelBody
					title="Width Settings"
					initialOpen={ false }
					key="width"
				>
					{ ! isBoot && (
						<>
							<p className="greyd-inspector-help">
								Set Columns style to “Bootstrap” for width
								controls to work.
							</p>
							<Button
								variant="secondary"
								isSmall
								onClick={ () =>
									updateBlockAttributes( parent[ 0 ], {
										...parentAtts,
										className:
											(
												parentAtts.className || ''
											).replace(
												'is-style-default',
												''
											) + ' is-style-bootstrap',
									} )
								}
							>
								Set parent to “Bootstrap”
							</Button>
						</>
					) }
					{ [ '', 'sm', 'md', 'lg', 'xl', 'xxl' ].map( ( bp ) => {
						const label = {
							'': 'Base',
							sm: 'Mobile',
							md: 'Tablet',
							lg: 'Laptop',
							xl: 'Desktop',
							xxl: 'XXL',
						}[ bp ];
						const img = {
							'': mobileImg,
							sm: mobileImg,
							md: tabletImg,
							lg: laptopImg,
							xl: desktopImg,
							xxl: desktopImg,
						}[ bp ];

						/* --- fix here --------------------------------------------------- */
						const camel = bp
							? bp.charAt( 0 ).toUpperCase() + bp.slice( 1 )
							: 'Base';
						const attr = `width${ camel }`;
						/* ---------------------------------------------------------------- */

						return (
							<WidthControl
								key={ attr }
								label={ label }
								subLabel={ BREAKPOINT_DIMENSIONS[ bp ] }
								image={ img }
								breakpoint={ bp }
								value={ attributes[ attr ] }
								onChange={ ( v ) =>
									setAttributes( { [ attr ]: v } )
								}
								options={ [
									{
										label: bp ? 'Inherit' : '100%',
										value: '',
									},
									{ label: 'Automatically', value: 'auto' },
								] }
							/>
						);
					} ) }
				</PanelBody>
			);
		} )();

	/* range panels */
	const makeRangePanel = ( title, list, Cmp, key ) => (
		<PanelBody title={ title } initialOpen={ false } key={ key }>
			{ list.map( ( { key } ) => {
				const label = key.replace( /([A-Z])/g, ' $1' ).trim();
				return (
					<Cmp
						key={ key }
						icon={ ICON[ key ] }
						label={ label }
						baseValue={ attributes[ `${ key }Base` ] }
						smValue={ attributes[ `${ key }Sm` ] }
						mdValue={ attributes[ `${ key }Md` ] }
						lgValue={ attributes[ `${ key }Lg` ] }
						xlValue={ attributes[ `${ key }Xl` ] }
						xxlValue={ attributes[ `${ key }Xxl` ] }
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
						onChangeXxl={ ( v ) =>
							setAttributes( { [ `${ key }Xxl` ]: v } )
						}
					/>
				);
			} ) }
		</PanelBody>
	);

	const dropdownPanel = dropdown && (
		<PanelBody
			title={ dropdown.label }
			initialOpen={ false }
			key="dropdown"
		>
			<SelectControl
				label={ dropdown.label }
				value={ attributes[ dropdown.attributeKey ] }
				options={ dropdown.options }
				onChange={ ( v ) =>
					setAttributes( { [ dropdown.attributeKey ]: v } )
				}
			/>
		</PanelBody>
	);

	/* Collect all panels into a stable array (keys keep them mounted) */
	const inspectorPanels = [
		tokenPanel,
		dropdownPanel,
		widthPanel,
		showPadding &&
			makeRangePanel(
				'Padding',
				PADDING_SIDE_TYPES,
				PaddingControl,
				'pad'
			),
		showMargin &&
			makeRangePanel(
				'Margin',
				MARGIN_SIDE_TYPES,
				PositiveMarginControl,
				'mar'
			),
		showNegMargin &&
			makeRangePanel(
				'Negative Margin',
				NEGATIVE_MARGIN_SIDE_TYPES,
				NegativeMarginControl,
				'neg'
			),
	].filter( Boolean );

	return { inspectorPanels, previewClasses };
}

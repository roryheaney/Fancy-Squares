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
	TabPanel,
	Icon,
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
		paddingControls = null,
		marginControls = null,
		negMarginControls = null,
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
				if ( ! optsData ) {
					return null;
				}
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
						// Build the attribute key for this breakpoint.
						// "" becomes widthBase, "sm" becomes widthSm, and so on.
						const camel = bp
							? bp.charAt( 0 ).toUpperCase() + bp.slice( 1 )
							: 'Base';
						const attr = `width${ camel }`;

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
	const makeRangePanel = ( title, list, Cmp, key, controls ) => {
		const filtered = controls
			? list.filter( ( item ) => controls.includes( item.key ) )
			: list;
		if ( ! filtered.length ) {
			return null;
		}

		const tabs = filtered.map( ( { key } ) => ( {
			name: key,
			title: <Icon icon={ ICON[ key ] } />,
		} ) );

		return (
			<PanelBody title={ title } initialOpen={ false } key={ key }>
				<TabPanel className="fs-inspector-tab-panel" tabs={ tabs }>
					{ ( tab ) => {
						const current = tab.name;
						const label = current
							.replace( /([A-Z])/g, ' $1' )
							.trim();
						return (
							<Cmp
								key={ current }
								icon={ ICON[ current ] }
								label={ label }
								baseValue={ attributes[ `${ current }Base` ] }
								smValue={ attributes[ `${ current }Sm` ] }
								mdValue={ attributes[ `${ current }Md` ] }
								lgValue={ attributes[ `${ current }Lg` ] }
								xlValue={ attributes[ `${ current }Xl` ] }
								xxlValue={ attributes[ `${ current }Xxl` ] }
								onChangeBase={ ( v ) =>
									setAttributes( {
										[ `${ current }Base` ]: v,
									} )
								}
								onChangeSm={ ( v ) =>
									setAttributes( { [ `${ current }Sm` ]: v } )
								}
								onChangeMd={ ( v ) =>
									setAttributes( { [ `${ current }Md` ]: v } )
								}
								onChangeLg={ ( v ) =>
									setAttributes( { [ `${ current }Lg` ]: v } )
								}
								onChangeXl={ ( v ) =>
									setAttributes( { [ `${ current }Xl` ]: v } )
								}
								onChangeXxl={ ( v ) =>
									setAttributes( {
										[ `${ current }Xxl` ]: v,
									} )
								}
							/>
						);
					} }
				</TabPanel>
			</PanelBody>
		);
	};

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
				'pad',
				paddingControls
			),
		showMargin &&
			makeRangePanel(
				'Margin',
				MARGIN_SIDE_TYPES,
				PositiveMarginControl,
				'mar',
				marginControls
			),
		showNegMargin &&
			makeRangePanel(
				'Negative Margin',
				NEGATIVE_MARGIN_SIDE_TYPES,
				NegativeMarginControl,
				'neg',
				negMarginControls
			),
	].filter( Boolean );

	return { inspectorPanels, previewClasses };
}

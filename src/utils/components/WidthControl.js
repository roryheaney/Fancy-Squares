// components/WidthControl.js
import { RangeControl, Button } from '@wordpress/components';
import { useState } from '@wordpress/element';

const WidthControl = ( {
	label,
	subLabel,
	image,
	breakpoint,
	value, // can be '', 'auto', 'wp-block-column--column-md-4', or undefined
	onChange,
	options = [],
} ) => {
	/* ------------------------------------------------------------------ */
	/*  Helpers
	/* ------------------------------------------------------------------ */
	const getNumericValue = ( v = '' ) => {
		if ( v === '' || v === 'auto' ) return 0;
		return (
			parseInt(
				v.replace( /wp-block-column--column-(?:[a-z]{0,3}-)?/, '' ),
				10
			) || 0
		);
	};

	const getLabelClassName = ( txt ) =>
		txt.toLowerCase().replace( /\s+/g, '-' );

	/* ------------------------------------------------------------------ */
	/*  Local state
	/* ------------------------------------------------------------------ */
	const [ sliderValue, setSliderValue ] = useState(
		getNumericValue( value )
	);

	/* ------------------------------------------------------------------ */
	/*  Events
	/* ------------------------------------------------------------------ */
	const handleChange = ( newVal ) => {
		setSliderValue( newVal );

		if ( newVal === 0 ) {
			const autoOpt = options.find( ( o ) => o.value === 'auto' );
			onChange( autoOpt ? 'auto' : '' );
		} else {
			const prefix = breakpoint
				? `wp-block-column--column-${ breakpoint }`
				: 'wp-block-column--column';
			onChange( `${ prefix }-${ newVal }` );
		}
	};

	/* ------------------------------------------------------------------ */
	/*  Slider marks
	/* ------------------------------------------------------------------ */
	const marks = [
		{
			value: 0,
			label: options.find( ( o ) => o.value === '' )?.label || 'Inherit',
		},
		...Array.from( { length: 12 }, ( _, i ) => ( {
			value: i + 1,
			label: String( i + 1 ),
		} ) ),
	];

	/* ------------------------------------------------------------------ */
	/*  Render
	/* ------------------------------------------------------------------ */
	return (
		<div
			className={ `custom-column-widths__group custom-column-widths__group--width-controls custom-column-widths__group--${ getLabelClassName(
				label
			) }` }
		>
			{ /* header ---------------------------------------------------- */ }
			<div className="custom-column-widths__header">
				<div
					className="custom-column-widths__icon"
					style={ { backgroundImage: `url(${ image })` } }
				/>
				<span className="custom-column-widths__label">
					{ label }{ ' ' }
					{ subLabel && (
						<span className="custom-column-widths__sub-label">
							- { subLabel }
						</span>
					) }
				</span>
				<span className="custom-column-widths__value">
					{ value === 'auto'
						? 'Auto'
						: value === '' || typeof value === 'undefined'
						? 'Inherit'
						: `${ getNumericValue( value ) } columns` }
				</span>

				{ /* quick-select buttons ----------------------------------- */ }
				<div className="custom-column-widths__buttons">
					{ options.map( ( o ) => (
						<Button
							key={ o.value }
							onClick={ () => {
								setSliderValue( getNumericValue( o.value ) );
								onChange( o.value );
							} }
							className={ `custom-column-widths__option${
								value === o.value ? ' is-active' : ''
							}` }
							variant="secondary"
						>
							{ o.label }
						</Button>
					) ) }
				</div>
			</div>

			{ /* slider ---------------------------------------------------- */ }
			<RangeControl
				__next40pxDefaultSize
				__nextHasNoMarginBottom
				label={ label }
				value={ sliderValue }
				onChange={ handleChange }
				min={ 0 }
				max={ 12 }
				step={ 1 }
				marks={ marks }
				showTooltip={ false }
				withInputField={ false }
			/>
		</div>
	);
};

export default WidthControl;

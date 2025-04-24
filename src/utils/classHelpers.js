/**
 * @typedef {{ label: string; value: string }} Option
 */

/**
 * Convert stored values into labels or raw values for FormTokenField display.
 *
 * @param {string[]} values     Array of stored values.
 * @param {Option[]} options    List of available options.
 * @param {boolean} showValues  If true, we display raw class names; otherwise labels.
 * @returns {string[]}          Display items for the TokenField.
 */
export function getDisplayValues( values, options, showValues ) {
	return values.map( ( value ) => {
	  const option = options.find( ( opt ) => opt.value === value );
	  if ( option ) {
		return showValues ? option.value : option.label;
	  }
	  return value;
	} );
  }

  /**
   * Convert display items back into the stored class values.
   *
   * @param {string[]} displayValues Array of displayed items.
   * @param {Option[]} options       List of available options.
   * @param {boolean} showValues     Whether we matched by raw value or by label.
   * @returns {string[]}             Stored class names.
   */
  export function getValuesFromDisplay( displayValues, options, showValues ) {
	return displayValues.map( ( display ) => {
	  const option = options.find( ( opt ) =>
		showValues ? opt.value === display : opt.label === display
	  );
	  if ( option ) {
		return option.value;
	  }
	  return display;
	} );
  }

/**
 * Merge any number of class-arrays (plus an optional single-value) into one flat list.
 *
 * @param {string} singularSelectClass
 * @param {...string[]} classArrays  Zero or more arrays of classes
 * @returns {string[]}
 */
export function combineAllClasses( singularSelectClass, ...classArrays ) {
	const final = [];
	if ( singularSelectClass ) {
	  final.push( singularSelectClass );
	}
	classArrays.forEach( arr => {
	  if ( Array.isArray( arr ) ) {
		final.push( ...arr );
	  }
	} );
	return final;
  }

import { InspectorControls, InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, SelectControl, FormTokenField, CheckboxControl } from '@wordpress/components';
import { __, sprintf } from '@wordpress/i18n';
import { Fragment, useEffect, useRef, useState } from '@wordpress/element';

import metadata from './block.json';
import {
  marginOptions,
  displayOptions,
  orderOptions,
  selfAlignmentOptions,
} from '../../data/bootstrap-classes/classes.js';

import {
  getDisplayValues,
  getValuesFromDisplay,
  combineAllClasses,
} from '../utils/classHelpers';

import './editor.scss';

// Single-select dropdown options
const singleChoiceOptions = [
  { label: __( 'Default', 'fs-blocks' ), value: '' },
  { label: __( 'Test',    'fs-blocks' ), value: 'test'  },
  { label: __( 'Fancy',   'fs-blocks' ), value: 'fancy' },
];

// Define which attributes should have token controls and their labels
const TOKEN_CONTROLS = [
  {
    key: 'marginOptions',
    label: __( 'Margin Classes', 'fs-blocks' ),
    options: marginOptions,
  },
  {
    key: 'displayOptions',
    label: __( 'Display Classes', 'fs-blocks' ),
    options: displayOptions,
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

export default function Edit({ attributes, setAttributes, clientId }) {
  const {
    singularSelectClass = '',
    additionalClasses   = [],
    marginOptions:       marginValues      = [],
    displayOptions:      displayValues     = [],
    orderOptions:        orderValues       = [],
    selfAlignmentOptions: alignItemsValues  = [],
  } = attributes;

  const [ showValues, setShowValues ] = useState(false);
  const blockRef = useRef();

  // Mirror front-end classes in the editor
  useEffect(() => {
    if (!blockRef.current) return;
    const layoutEl = blockRef.current.querySelector(
      '.block-editor-inner-blocks > .block-editor-block-list__layout'
    );
    const parentEl = blockRef.current.querySelector(
      '.block-editor-inner-blocks'
    );
    if (layoutEl) {
      layoutEl.className = [
        'block-editor-block-list__layout',
        'wp-block-fancysquares-column-block',
        ...additionalClasses,
      ].join(' ');
      parentEl.className += ' wp-block-fancysquares-column-block-admin';
    }
  }, [additionalClasses, clientId]);

  // Factory to handle token field changes for any control
  const handleTokenChange = (fieldKey, options) => (newTokens) => {
    const newValues = getValuesFromDisplay(newTokens, options, showValues);
    setAttributes({ [fieldKey]: newValues });

    const updatedClasses = combineAllClasses(
      singularSelectClass,
      fieldKey === 'marginOptions'        ? newValues : marginValues,
      fieldKey === 'displayOptions'       ? newValues : displayValues,
      fieldKey === 'orderOptions'         ? newValues : orderValues,
      fieldKey === 'selfAlignmentOptions' ? newValues : alignItemsValues
    );
    setAttributes({ additionalClasses: updatedClasses });
  };

  // Handle the single-select dropdown change
  const onChangeSelect = (newVal) => {
    setAttributes({ singularSelectClass: newVal });
    const updatedClasses = combineAllClasses(
      newVal,
      marginValues,
      displayValues,
      orderValues,
      alignItemsValues
    );
    setAttributes({ additionalClasses: updatedClasses });
  };

  const previewClassString = [
    'wp-block-fancysquares-column-block',
    ...additionalClasses,
  ].join(' ');

  const blockProps = useBlockProps();

  return (
    <Fragment>
      <InspectorControls>
        <PanelBody
          title={__( 'Content Wrapper Settings', 'fs-blocks')}
          initialOpen={false}
        >
          <CheckboxControl
            label={__( 'Show Values', 'fs-blocks')}
            checked={showValues}
            onChange={setShowValues}
            help={__( 'Display Bootstrap class names instead of labels.', 'fs-blocks')}
            style={{ marginBottom: '20px' }}
          />

          <SelectControl
            label={__( 'Singular Select Class', 'fs-blocks')}
            value={singularSelectClass}
            options={singleChoiceOptions}
            onChange={onChangeSelect}
          />

          <hr />

          {TOKEN_CONTROLS.map(({ key, label, options }) => {
            const current = attributes[key] || [];
            return (
              <div style={{ marginBottom: '20px' }} key={key}>
                <FormTokenField
                  label={label}
                  value={getDisplayValues(current, options, showValues)}
                  suggestions={options.map((o) =>
                    showValues ? o.value : o.label
                  )}
                  onChange={handleTokenChange(key, options)}
                />
                <details style={{ marginTop: '5px' }}>
                  <summary>
                    {sprintf(
                      /* translators: %s: control label */
                      __('Available %s', 'fs-blocks'),
                      label
                    )}
                  </summary>
                  <ul style={{
                    fontSize: '12px',
                    paddingLeft: '20px',
                    margin: '5px 0',
                  }}>
                    {options.map((item) => (
                      <li key={item.value}>
                        {showValues ? item.value : item.label}
                      </li>
                    ))}
                  </ul>
                </details>
              </div>
            );
          })}
        </PanelBody>
      </InspectorControls>

      <div
        {...blockProps}
        className={previewClassString}
        ref={blockRef}
      >
        <InnerBlocks
          template={[
            [
              'core/heading',
              { placeholder: 'Enter heading text...' },
            ],
            [
              'core/paragraph',
              { placeholder: 'Enter paragraph text...' },
            ],
          ]}
        />
      </div>
    </Fragment>
  );
}

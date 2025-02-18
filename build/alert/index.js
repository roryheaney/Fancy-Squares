(()=>{"use strict";var l,e={385:()=>{const l=window.wp.blocks,e=JSON.parse('{"UU":"fs-blocks/alert"}'),a=window.wp.i18n,b=window.wp.blockEditor,m=window.wp.components,u=window.wp.element,n=window.ReactJSXRuntime,v=[{label:"alert-primary",value:"alert-primary"},{label:"alert-secondary",value:"alert-secondary"},{label:"alert-success",value:"alert-success"},{label:"alert-danger",value:"alert-danger"},{label:"alert-warning",value:"alert-warning"},{label:"alert-info",value:"alert-info"},{label:"alert-light",value:"alert-light"},{label:"alert-dark",value:"alert-dark"}].map((l=>l.value)),x=[{label:"d-none",value:"d-none"},{label:"d-block",value:"d-block"},{label:"d-inline",value:"d-inline"},{label:"d-inline-block",value:"d-inline-block"},{label:"d-flex",value:"d-flex"},{label:"d-inline-flex",value:"d-inline-flex"},{label:"d-table",value:"d-table"},{label:"d-table-row",value:"d-table-row"},{label:"d-table-cell",value:"d-table-cell"},{label:"d-grid",value:"d-grid"},{label:"d-inline-grid",value:"d-inline-grid"},{label:"d-sm-none",value:"d-sm-none"},{label:"d-sm-block",value:"d-sm-block"},{label:"d-sm-inline",value:"d-sm-inline"},{label:"d-sm-inline-block",value:"d-sm-inline-block"},{label:"d-sm-flex",value:"d-sm-flex"},{label:"d-sm-inline-flex",value:"d-sm-inline-flex"},{label:"d-sm-table",value:"d-sm-table"},{label:"d-sm-table-row",value:"d-sm-table-row"},{label:"d-sm-table-cell",value:"d-sm-table-cell"},{label:"d-sm-grid",value:"d-sm-grid"},{label:"d-sm-inline-grid",value:"d-sm-inline-grid"},{label:"d-md-none",value:"d-md-none"},{label:"d-md-block",value:"d-md-block"},{label:"d-md-inline",value:"d-md-inline"},{label:"d-md-inline-block",value:"d-md-inline-block"},{label:"d-md-flex",value:"d-md-flex"},{label:"d-md-inline-flex",value:"d-md-inline-flex"},{label:"d-md-table",value:"d-md-table"},{label:"d-md-table-row",value:"d-md-table-row"},{label:"d-md-table-cell",value:"d-md-table-cell"},{label:"d-md-grid",value:"d-md-grid"},{label:"d-md-inline-grid",value:"d-md-inline-grid"},{label:"d-lg-none",value:"d-lg-none"},{label:"d-lg-block",value:"d-lg-block"},{label:"d-lg-inline",value:"d-lg-inline"},{label:"d-lg-inline-block",value:"d-lg-inline-block"},{label:"d-lg-flex",value:"d-lg-flex"},{label:"d-lg-inline-flex",value:"d-lg-inline-flex"},{label:"d-lg-table",value:"d-lg-table"},{label:"d-lg-table-row",value:"d-lg-table-row"},{label:"d-lg-table-cell",value:"d-lg-table-cell"},{label:"d-lg-grid",value:"d-lg-grid"},{label:"d-lg-inline-grid",value:"d-lg-inline-grid"},{label:"d-xl-none",value:"d-xl-none"},{label:"d-xl-block",value:"d-xl-block"},{label:"d-xl-inline",value:"d-xl-inline"},{label:"d-xl-inline-block",value:"d-xl-inline-block"},{label:"d-xl-flex",value:"d-xl-flex"},{label:"d-xl-inline-flex",value:"d-xl-inline-flex"},{label:"d-xl-table",value:"d-xl-table"},{label:"d-xl-table-row",value:"d-xl-table-row"},{label:"d-xl-table-cell",value:"d-xl-table-cell"},{label:"d-xl-grid",value:"d-xl-grid"},{label:"d-xl-inline-grid",value:"d-xl-inline-grid"},{label:"d-xxl-none",value:"d-xxl-none"},{label:"d-xxl-block",value:"d-xxl-block"},{label:"d-xxl-inline",value:"d-xxl-inline"},{label:"d-xxl-inline-block",value:"d-xxl-inline-block"},{label:"d-xxl-flex",value:"d-xxl-flex"},{label:"d-xxl-inline-flex",value:"d-xxl-inline-flex"},{label:"d-xxl-table",value:"d-xxl-table"},{label:"d-xxl-table-row",value:"d-xxl-table-row"},{label:"d-xxl-table-cell",value:"d-xxl-table-cell"},{label:"d-xxl-grid",value:"d-xxl-grid"},{label:"d-xxl-inline-grid",value:"d-xxl-inline-grid"}].map((l=>l.value)),p=[{label:"ms-auto",value:"ms-auto"},{label:"me-auto",value:"me-auto"},{label:"me-sm-auto",value:"me-sm-auto"},{label:"me-md-auto",value:"me-md-auto"},{label:"ms-md-auto",value:"ms-md-auto"},{label:"me-lg-auto",value:"me-lg-auto"},{label:"ms-lg-auto",value:"ms-lg-auto"},{label:"me-xl-auto",value:"me-xl-auto"},{label:"ms-xl-auto",value:"ms-xl-auto"},{label:"me-xxl-auto",value:"me-xxl-auto"},{label:"ms-xxl-auto",value:"ms-xxl-auto"},{label:"m-0",value:"m-0"},{label:"m-1",value:"m-1"},{label:"m-2",value:"m-2"},{label:"m-3",value:"m-3"},{label:"m-4",value:"m-4"},{label:"m-5",value:"m-5"},{label:"m-6",value:"m-6"},{label:"m-7",value:"m-7"},{label:"m-8",value:"m-8"},{label:"m-9",value:"m-9"},{label:"m-10",value:"m-10"},{label:"mb-0",value:"mb-0"},{label:"mb-1",value:"mb-1"},{label:"mb-2",value:"mb-2"},{label:"mb-3",value:"mb-3"},{label:"mb-4",value:"mb-4"},{label:"mb-5",value:"mb-5"},{label:"mb-6",value:"mb-6"},{label:"mb-7",value:"mb-7"},{label:"mb-8",value:"mb-8"},{label:"mb-9",value:"mb-9"},{label:"mb-10",value:"mb-10"},{label:"mt-0",value:"mt-0"},{label:"mt-1",value:"mt-1"},{label:"mt-2",value:"mt-2"},{label:"mt-3",value:"mt-3"},{label:"mt-4",value:"mt-4"},{label:"mt-5",value:"mt-5"},{label:"mt-6",value:"mt-6"},{label:"mt-7",value:"mt-7"},{label:"mt-8",value:"mt-8"},{label:"mt-9",value:"mt-9"},{label:"mt-10",value:"mt-10"},{label:"ms-n0",value:"ms-n0"},{label:"ms-n1",value:"ms-n1"},{label:"ms-n2",value:"ms-n2"},{label:"ms-n3",value:"ms-n3"},{label:"ms-n4",value:"ms-n4"},{label:"ms-n5",value:"ms-n5"},{label:"ms-n6",value:"ms-n6"},{label:"ms-n7",value:"ms-n7"},{label:"ms-n8",value:"ms-n8"},{label:"ms-n9",value:"ms-n9"},{label:"ms-n10",value:"ms-n10"},{label:"me-n0",value:"me-n0"},{label:"me-n1",value:"me-n1"},{label:"me-n2",value:"me-n2"},{label:"me-n3",value:"me-n3"},{label:"me-n4",value:"me-n4"},{label:"me-n5",value:"me-n5"},{label:"me-n6",value:"me-n6"},{label:"me-n7",value:"me-n7"},{label:"me-n8",value:"me-n8"},{label:"me-n9",value:"me-n9"},{label:"me-n10",value:"me-n10"},{label:"ms-md-n0",value:"ms-md-n0"},{label:"ms-md-n1",value:"ms-md-n1"},{label:"ms-md-n2",value:"ms-md-n2"},{label:"ms-md-n3",value:"ms-md-n3"},{label:"ms-md-n4",value:"ms-md-n4"},{label:"ms-md-n5",value:"ms-md-n5"},{label:"ms-md-n6",value:"ms-md-n6"},{label:"ms-md-n7",value:"ms-md-n7"},{label:"ms-md-n8",value:"ms-md-n8"},{label:"ms-md-n9",value:"ms-md-n9"},{label:"ms-md-n10",value:"ms-md-n10"},{label:"ms-lg-n0",value:"ms-lg-n0"},{label:"ms-lg-n1",value:"ms-lg-n1"},{label:"ms-lg-n2",value:"ms-lg-n2"},{label:"ms-lg-n3",value:"ms-lg-n3"},{label:"ms-lg-n4",value:"ms-lg-n4"},{label:"ms-lg-n5",value:"ms-lg-n5"},{label:"ms-lg-n6",value:"ms-lg-n6"},{label:"ms-lg-n7",value:"ms-lg-n7"},{label:"ms-lg-n8",value:"ms-lg-n8"},{label:"ms-lg-n9",value:"ms-lg-n9"},{label:"ms-lg-n10",value:"ms-lg-n10"},{label:"ms-xl-n0",value:"ms-xl-n0"},{label:"ms-xl-n1",value:"ms-xl-n1"},{label:"ms-xl-n2",value:"ms-xl-n2"},{label:"ms-xl-n3",value:"ms-xl-n3"},{label:"ms-xl-n4",value:"ms-xl-n4"},{label:"ms-xl-n5",value:"ms-xl-n5"},{label:"ms-xl-n6",value:"ms-xl-n6"},{label:"ms-xl-n7",value:"ms-xl-n7"},{label:"ms-xl-n8",value:"ms-xl-n8"},{label:"ms-xl-n9",value:"ms-xl-n9"},{label:"ms-xl-n10",value:"ms-xl-n10"},{label:"ms-xxl-n0",value:"ms-xxl-n0"},{label:"ms-xxl-n1",value:"ms-xxl-n1"},{label:"ms-xxl-n2",value:"ms-xxl-n2"},{label:"ms-xxl-n3",value:"ms-xxl-n3"},{label:"ms-xxl-n4",value:"ms-xxl-n4"},{label:"ms-xxl-n5",value:"ms-xxl-n5"},{label:"ms-xxl-n6",value:"ms-xxl-n6"},{label:"ms-xxl-n7",value:"ms-xxl-n7"},{label:"ms-xxl-n8",value:"ms-xxl-n8"},{label:"ms-xxl-n9",value:"ms-xxl-n9"},{label:"ms-xxl-n10",value:"ms-xxl-n10"},{label:"me-n0",value:"me-n0"},{label:"me-n1",value:"me-n1"},{label:"me-n2",value:"me-n2"},{label:"me-n3",value:"me-n3"},{label:"me-n4",value:"me-n4"},{label:"me-n5",value:"me-n5"},{label:"me-n6",value:"me-n6"},{label:"me-n7",value:"me-n7"},{label:"me-n8",value:"me-n8"},{label:"me-n9",value:"me-n9"},{label:"me-n10",value:"me-n10"},{label:"me-md-n0",value:"me-md-n0"},{label:"me-md-n1",value:"me-md-n1"},{label:"me-md-n2",value:"me-md-n2"},{label:"me-md-n3",value:"me-md-n3"},{label:"me-md-n4",value:"me-md-n4"},{label:"me-md-n5",value:"me-md-n5"},{label:"me-md-n6",value:"me-md-n6"},{label:"me-md-n7",value:"me-md-n7"},{label:"me-md-n8",value:"me-md-n8"},{label:"me-md-n9",value:"me-md-n9"},{label:"me-md-n10",value:"me-md-n10"},{label:"me-lg-n0",value:"me-lg-n0"},{label:"me-lg-n1",value:"me-lg-n1"},{label:"me-lg-n2",value:"me-lg-n2"},{label:"me-lg-n3",value:"me-lg-n3"},{label:"me-lg-n4",value:"me-lg-n4"},{label:"me-lg-n5",value:"me-lg-n5"},{label:"me-lg-n6",value:"me-lg-n6"},{label:"me-lg-n7",value:"me-lg-n7"},{label:"me-lg-n8",value:"me-lg-n8"},{label:"me-lg-n9",value:"me-lg-n9"},{label:"me-lg-n10",value:"me-lg-n10"},{label:"me-xl-n0",value:"me-xl-n0"},{label:"me-xl-n1",value:"me-xl-n1"},{label:"me-xl-n2",value:"me-xl-n2"},{label:"me-xl-n3",value:"me-xl-n3"},{label:"me-xl-n4",value:"me-xl-n4"},{label:"me-xl-n5",value:"me-xl-n5"},{label:"me-xl-n6",value:"me-xl-n6"},{label:"me-xl-n7",value:"me-xl-n7"},{label:"me-xl-n8",value:"me-xl-n8"},{label:"me-xl-n9",value:"me-xl-n9"},{label:"me-xl-n10",value:"me-xl-n10"},{label:"me-xxl-n0",value:"me-xxl-n0"},{label:"me-xxl-n1",value:"me-xxl-n1"},{label:"me-xxl-n2",value:"me-xxl-n2"},{label:"me-xxl-n3",value:"me-xxl-n3"},{label:"me-xxl-n4",value:"me-xxl-n4"},{label:"me-xxl-n5",value:"me-xxl-n5"},{label:"me-xxl-n6",value:"me-xxl-n6"},{label:"me-xxl-n7",value:"me-xxl-n7"},{label:"me-xxl-n8",value:"me-xxl-n8"},{label:"me-xxl-n9",value:"me-xxl-n9"},{label:"me-xxl-n10",value:"me-xxl-n10"}].map((l=>l.value)),d=[{label:"p-0",value:"p-0"},{label:"p-1",value:"p-1"},{label:"p-2",value:"p-2"},{label:"p-3",value:"p-3"},{label:"p-4",value:"p-4"},{label:"p-5",value:"p-5"},{label:"p-6",value:"p-6"},{label:"p-7",value:"p-7"},{label:"p-8",value:"p-8"},{label:"p-9",value:"p-9"},{label:"p-10",value:"p-10"},{label:"p-sm-0",value:"p-sm-0"},{label:"p-sm-1",value:"p-sm-1"},{label:"p-sm-2",value:"p-sm-2"},{label:"p-sm-3",value:"p-sm-3"},{label:"p-sm-4",value:"p-sm-4"},{label:"p-sm-5",value:"p-sm-5"},{label:"p-sm-6",value:"p-sm-6"},{label:"p-sm-7",value:"p-sm-7"},{label:"p-sm-8",value:"p-sm-8"},{label:"p-sm-9",value:"p-sm-9"},{label:"p-sm-10",value:"p-sm-10"},{label:"p-md-0",value:"p-md-0"},{label:"p-md-1",value:"p-md-1"},{label:"p-md-2",value:"p-md-2"},{label:"p-md-3",value:"p-md-3"},{label:"p-md-4",value:"p-md-4"},{label:"p-md-5",value:"p-md-5"},{label:"p-md-6",value:"p-md-6"},{label:"p-md-7",value:"p-md-7"},{label:"p-md-8",value:"p-md-8"},{label:"p-md-9",value:"p-md-9"},{label:"p-md-10",value:"p-md-10"},{label:"p-lg-0",value:"p-lg-0"},{label:"p-lg-1",value:"p-lg-1"},{label:"p-lg-2",value:"p-lg-2"},{label:"p-lg-3",value:"p-lg-3"},{label:"p-lg-4",value:"p-lg-4"},{label:"p-lg-5",value:"p-lg-5"},{label:"p-lg-6",value:"p-lg-6"},{label:"p-lg-7",value:"p-lg-7"},{label:"p-lg-8",value:"p-lg-8"},{label:"p-lg-9",value:"p-lg-9"},{label:"p-lg-10",value:"p-lg-10"},{label:"p-xl-0",value:"p-xl-0"},{label:"p-xl-1",value:"p-xl-1"},{label:"p-xl-2",value:"p-xl-2"},{label:"p-xl-3",value:"p-xl-3"},{label:"p-xl-4",value:"p-xl-4"},{label:"p-xl-5",value:"p-xl-5"},{label:"p-xl-6",value:"p-xl-6"},{label:"p-xl-7",value:"p-xl-7"},{label:"p-xl-8",value:"p-xl-8"},{label:"p-xl-9",value:"p-xl-9"},{label:"p-xl-10",value:"p-xl-10"},{label:"p-xxl-0",value:"p-xxl-0"},{label:"p-xxl-1",value:"p-xxl-1"},{label:"p-xxl-2",value:"p-xxl-2"},{label:"p-xxl-3",value:"p-xxl-3"},{label:"p-xxl-4",value:"p-xxl-4"},{label:"p-xxl-5",value:"p-xxl-5"},{label:"p-xxl-6",value:"p-xxl-6"},{label:"p-xxl-7",value:"p-xxl-7"},{label:"p-xxl-8",value:"p-xxl-8"},{label:"p-xxl-9",value:"p-xxl-9"},{label:"p-xxl-10",value:"p-xxl-10"},{label:"pt-0",value:"pt-0"},{label:"pt-1",value:"pt-1"},{label:"pt-2",value:"pt-2"},{label:"pt-3",value:"pt-3"},{label:"pt-4",value:"pt-4"},{label:"pt-5",value:"pt-5"},{label:"pt-6",value:"pt-6"},{label:"pt-7",value:"pt-7"},{label:"pt-8",value:"pt-8"},{label:"pt-9",value:"pt-9"},{label:"pt-10",value:"pt-10"},{label:"pt-sm-0",value:"pt-sm-0"},{label:"pt-sm-1",value:"pt-sm-1"},{label:"pt-sm-2",value:"pt-sm-2"},{label:"pt-sm-3",value:"pt-sm-3"},{label:"pt-sm-4",value:"pt-sm-4"},{label:"pt-sm-5",value:"pt-sm-5"},{label:"pt-sm-6",value:"pt-sm-6"},{label:"pt-sm-7",value:"pt-sm-7"},{label:"pt-sm-8",value:"pt-sm-8"},{label:"pt-sm-9",value:"pt-sm-9"},{label:"pt-sm-10",value:"pt-sm-10"},{label:"pt-md-0",value:"pt-md-0"},{label:"pt-md-1",value:"pt-md-1"},{label:"pt-md-2",value:"pt-md-2"},{label:"pt-md-3",value:"pt-md-3"},{label:"pt-md-4",value:"pt-md-4"},{label:"pt-md-5",value:"pt-md-5"},{label:"pt-md-6",value:"pt-md-6"},{label:"pt-md-7",value:"pt-md-7"},{label:"pt-md-8",value:"pt-md-8"},{label:"pt-md-9",value:"pt-md-9"},{label:"pt-md-10",value:"pt-md-10"},{label:"pt-lg-0",value:"pt-lg-0"},{label:"pt-lg-1",value:"pt-lg-1"},{label:"pt-lg-2",value:"pt-lg-2"},{label:"pt-lg-3",value:"pt-lg-3"},{label:"pt-lg-4",value:"pt-lg-4"},{label:"pt-lg-5",value:"pt-lg-5"},{label:"pt-lg-6",value:"pt-lg-6"},{label:"pt-lg-7",value:"pt-lg-7"},{label:"pt-lg-8",value:"pt-lg-8"},{label:"pt-lg-9",value:"pt-lg-9"},{label:"pt-lg-10",value:"pt-lg-10"},{label:"pt-xl-0",value:"pt-xl-0"},{label:"pt-xl-1",value:"pt-xl-1"},{label:"pt-xl-2",value:"pt-xl-2"},{label:"pt-xl-3",value:"pt-xl-3"},{label:"pt-xl-4",value:"pt-xl-4"},{label:"pt-xl-5",value:"pt-xl-5"},{label:"pt-xl-6",value:"pt-xl-6"},{label:"pt-xl-7",value:"pt-xl-7"},{label:"pt-xl-8",value:"pt-xl-8"},{label:"pt-xl-9",value:"pt-xl-9"},{label:"pt-xl-10",value:"pt-xl-10"},{label:"pt-xxl-0",value:"pt-xxl-0"},{label:"pt-xxl-1",value:"pt-xxl-1"},{label:"pt-xxl-2",value:"pt-xxl-2"},{label:"pt-xxl-3",value:"pt-xxl-3"},{label:"pt-xxl-4",value:"pt-xxl-4"},{label:"pt-xxl-5",value:"pt-xxl-5"},{label:"pt-xxl-6",value:"pt-xxl-6"},{label:"pt-xxl-7",value:"pt-xxl-7"},{label:"pt-xxl-8",value:"pt-xxl-8"},{label:"pt-xxl-9",value:"pt-xxl-9"},{label:"pt-xxl-10",value:"pt-xxl-10"},{label:"pb-0",value:"pb-0"},{label:"pb-1",value:"pb-1"},{label:"pb-2",value:"pb-2"},{label:"pb-3",value:"pb-3"},{label:"pb-4",value:"pb-4"},{label:"pb-5",value:"pb-5"},{label:"pb-6",value:"pb-6"},{label:"pb-7",value:"pb-7"},{label:"pb-8",value:"pb-8"},{label:"pb-9",value:"pb-9"},{label:"pb-10",value:"pb-10"},{label:"pb-sm-0",value:"pb-sm-0"},{label:"pb-sm-1",value:"pb-sm-1"},{label:"pb-sm-2",value:"pb-sm-2"},{label:"pb-sm-3",value:"pb-sm-3"},{label:"pb-sm-4",value:"pb-sm-4"},{label:"pb-sm-5",value:"pb-sm-5"},{label:"pb-sm-6",value:"pb-sm-6"},{label:"pb-sm-7",value:"pb-sm-7"},{label:"pb-sm-8",value:"pb-sm-8"},{label:"pb-sm-9",value:"pb-sm-9"},{label:"pb-sm-10",value:"pb-sm-10"},{label:"pb-md-0",value:"pb-md-0"},{label:"pb-md-1",value:"pb-md-1"},{label:"pb-md-2",value:"pb-md-2"},{label:"pb-md-3",value:"pb-md-3"},{label:"pb-md-4",value:"pb-md-4"},{label:"pb-md-5",value:"pb-md-5"},{label:"pb-md-6",value:"pb-md-6"},{label:"pb-md-7",value:"pb-md-7"},{label:"pb-md-8",value:"pb-md-8"},{label:"pb-md-9",value:"pb-md-9"},{label:"pb-md-10",value:"pb-md-10"},{label:"pb-lg-0",value:"pb-lg-0"},{label:"pb-lg-1",value:"pb-lg-1"},{label:"pb-lg-2",value:"pb-lg-2"},{label:"pb-lg-3",value:"pb-lg-3"},{label:"pb-lg-4",value:"pb-lg-4"},{label:"pb-lg-5",value:"pb-lg-5"},{label:"pb-lg-6",value:"pb-lg-6"},{label:"pb-lg-7",value:"pb-lg-7"},{label:"pb-lg-8",value:"pb-lg-8"},{label:"pb-lg-9",value:"pb-lg-9"},{label:"pb-lg-10",value:"pb-lg-10"},{label:"pb-xl-0",value:"pb-xl-0"},{label:"pb-xl-1",value:"pb-xl-1"},{label:"pb-xl-2",value:"pb-xl-2"},{label:"pb-xl-3",value:"pb-xl-3"},{label:"pb-xl-4",value:"pb-xl-4"},{label:"pb-xl-5",value:"pb-xl-5"},{label:"pb-xl-6",value:"pb-xl-6"},{label:"pb-xl-7",value:"pb-xl-7"},{label:"pb-xl-8",value:"pb-xl-8"},{label:"pb-xl-9",value:"pb-xl-9"},{label:"pb-xl-10",value:"pb-xl-10"},{label:"pb-xxl-0",value:"pb-xxl-0"},{label:"pb-xxl-1",value:"pb-xxl-1"},{label:"pb-xxl-2",value:"pb-xxl-2"},{label:"pb-xxl-3",value:"pb-xxl-3"},{label:"pb-xxl-4",value:"pb-xxl-4"},{label:"pb-xxl-5",value:"pb-xxl-5"},{label:"pb-xxl-6",value:"pb-xxl-6"},{label:"pb-xxl-7",value:"pb-xxl-7"},{label:"pb-xxl-8",value:"pb-xxl-8"},{label:"pb-xxl-9",value:"pb-xxl-9"},{label:"pb-xxl-10",value:"pb-xxl-10"}].map((l=>l.value));function s(l,e,a,b){return[...l,...e,...a,...b]}(0,l.registerBlockType)(e.UU,{edit:function({attributes:l,setAttributes:e}){const{alertOptions:t,displayOptions:i,marginOptions:g,paddingOptions:o,additionalClasses:r,alertContent:c}=l,f=(0,b.useBlockProps)(),k=["alert",...r].join(" ");return(0,n.jsxs)(u.Fragment,{children:[(0,n.jsx)(b.InspectorControls,{children:(0,n.jsxs)(m.PanelBody,{title:(0,a.__)("Alert Settings","fs-blocks"),initialOpen:!0,children:[(0,n.jsx)(m.FormTokenField,{label:(0,a.__)("Alert Classes","fs-blocks"),value:t,suggestions:v,onChange:l=>{e({alertOptions:l});const a=s(l,i,g,o);e({additionalClasses:a})}}),(0,n.jsx)(m.FormTokenField,{label:(0,a.__)("Display Classes","fs-blocks"),value:i,suggestions:x,onChange:l=>{e({displayOptions:l});const a=s(t,l,g,o);e({additionalClasses:a})}}),(0,n.jsx)(m.FormTokenField,{label:(0,a.__)("Margin Classes","fs-blocks"),value:g,suggestions:p,onChange:l=>{e({marginOptions:l});const a=s(t,i,l,o);e({additionalClasses:a})}}),(0,n.jsx)(m.FormTokenField,{label:(0,a.__)("Padding Classes","fs-blocks"),value:o,suggestions:d,onChange:l=>{e({paddingOptions:l});const a=s(t,i,g,l);e({additionalClasses:a})}})]})}),(0,n.jsx)("div",{...f,className:k,children:(0,n.jsx)(b.RichText,{tagName:"p",value:c,onChange:l=>e({alertContent:l}),placeholder:(0,a.__)("Alert message here...","fs-blocks")})})]})},save:()=>null})}},a={};function b(l){var m=a[l];if(void 0!==m)return m.exports;var u=a[l]={exports:{}};return e[l](u,u.exports,b),u.exports}b.m=e,l=[],b.O=(e,a,m,u)=>{if(!a){var n=1/0;for(d=0;d<l.length;d++){for(var[a,m,u]=l[d],v=!0,x=0;x<a.length;x++)(!1&u||n>=u)&&Object.keys(b.O).every((l=>b.O[l](a[x])))?a.splice(x--,1):(v=!1,u<n&&(n=u));if(v){l.splice(d--,1);var p=m();void 0!==p&&(e=p)}}return e}u=u||0;for(var d=l.length;d>0&&l[d-1][2]>u;d--)l[d]=l[d-1];l[d]=[a,m,u]},b.o=(l,e)=>Object.prototype.hasOwnProperty.call(l,e),(()=>{var l={866:0,270:0};b.O.j=e=>0===l[e];var e=(e,a)=>{var m,u,[n,v,x]=a,p=0;if(n.some((e=>0!==l[e]))){for(m in v)b.o(v,m)&&(b.m[m]=v[m]);if(x)var d=x(b)}for(e&&e(a);p<n.length;p++)u=n[p],b.o(l,u)&&l[u]&&l[u][0](),l[u]=0;return b.O(d)},a=globalThis.webpackChunkfs_blocks=globalThis.webpackChunkfs_blocks||[];a.forEach(e.bind(null,0)),a.push=e.bind(null,a.push.bind(a))})();var m=b.O(void 0,[270],(()=>b(385)));m=b.O(m)})();
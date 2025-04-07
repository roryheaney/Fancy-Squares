(()=>{"use strict";var e,l={239:()=>{const e=window.wp.blocks,l=window.wp.blockEditor,a=window.wp.components,n=window.wp.i18n,t=window.wp.element,i=[{label:"Start Margin Auto",value:"ms-auto"},{label:"End Margin Auto",value:"me-auto"},{label:"Small Screen End Margin Auto",value:"me-sm-auto"},{label:"Medium Screen End Margin Auto",value:"me-md-auto"},{label:"Medium Screen Start Margin Auto",value:"ms-md-auto"},{label:"Large Screen End Margin Auto",value:"me-lg-auto"},{label:"Large Screen Start Margin Auto",value:"ms-lg-auto"},{label:"Extra Large End Margin Auto",value:"me-xl-auto"},{label:"Extra Large Start Margin Auto",value:"ms-xl-auto"},{label:"XXL End Margin Auto",value:"me-xxl-auto"},{label:"XXL Start Margin Auto",value:"ms-xxl-auto"},{label:"No Margin",value:"m-0"},{label:"Margin 1",value:"m-1"},{label:"Margin 2",value:"m-2"},{label:"Margin 3",value:"m-3"},{label:"Margin 4",value:"m-4"},{label:"Margin 5",value:"m-5"},{label:"Margin 6",value:"m-6"},{label:"Margin 7",value:"m-7"},{label:"Margin 8",value:"m-8"},{label:"Margin 9",value:"m-9"},{label:"Margin 10",value:"m-10"},{label:"Bottom Margin 0",value:"mb-0"},{label:"Bottom Margin 1",value:"mb-1"},{label:"Bottom Margin 2",value:"mb-2"},{label:"Bottom Margin 3",value:"mb-3"},{label:"Bottom Margin 4",value:"mb-4"},{label:"Bottom Margin 5",value:"mb-5"},{label:"Bottom Margin 6",value:"mb-6"},{label:"Bottom Margin 7",value:"mb-7"},{label:"Bottom Margin 8",value:"mb-8"},{label:"Bottom Margin 9",value:"mb-9"},{label:"Bottom Margin 10",value:"mb-10"},{label:"Top Margin 0",value:"mt-0"},{label:"Top Margin 1",value:"mt-1"},{label:"Top Margin 2",value:"mt-2"},{label:"Top Margin 3",value:"mt-3"},{label:"Top Margin 4",value:"mt-4"},{label:"Top Margin 5",value:"mt-5"},{label:"Top Margin 6",value:"mt-6"},{label:"Top Margin 7",value:"mt-7"},{label:"Top Margin 8",value:"mt-8"},{label:"Top Margin 9",value:"mt-9"},{label:"Top Margin 10",value:"mt-10"},{label:"Negative Start Margin 0",value:"ms-n0"},{label:"Negative Start Margin 1",value:"ms-n1"},{label:"Negative Start Margin 2",value:"ms-n2"},{label:"Negative Start Margin 3",value:"ms-n3"},{label:"Negative Start Margin 4",value:"ms-n4"},{label:"Negative Start Margin 5",value:"ms-n5"},{label:"Negative Start Margin 6",value:"ms-n6"},{label:"Negative Start Margin 7",value:"ms-n7"},{label:"Negative Start Margin 8",value:"ms-n8"},{label:"Negative Start Margin 9",value:"ms-n9"},{label:"Negative Start Margin 10",value:"ms-n10"},{label:"Negative End Margin 0",value:"me-n0"},{label:"Negative End Margin 1",value:"me-n1"},{label:"Negative End Margin 2",value:"me-n2"},{label:"Negative End Margin 3",value:"me-n3"},{label:"Negative End Margin 4",value:"me-n4"},{label:"Negative End Margin 5",value:"me-n5"},{label:"Negative End Margin 6",value:"me-n6"},{label:"Negative End Margin 7",value:"me-n7"},{label:"Negative End Margin 8",value:"me-n8"},{label:"Negative End Margin 9",value:"me-n9"},{label:"Negative End Margin 10",value:"me-n10"},{label:"Medium Negative Start Margin 0",value:"ms-md-n0"},{label:"Medium Negative Start Margin 1",value:"ms-md-n1"},{label:"Medium Negative Start Margin 2",value:"ms-md-n2"},{label:"Medium Negative Start Margin 3",value:"ms-md-n3"},{label:"Medium Negative Start Margin 4",value:"ms-md-n4"},{label:"Medium Negative Start Margin 5",value:"ms-md-n5"},{label:"Medium Negative Start Margin 6",value:"ms-md-n6"},{label:"Medium Negative Start Margin 7",value:"ms-md-n7"},{label:"Medium Negative Start Margin 8",value:"ms-md-n8"},{label:"Medium Negative Start Margin 9",value:"ms-md-n9"},{label:"Medium Negative Start Margin 10",value:"ms-md-n10"},{label:"Large Negative Start Margin 0",value:"ms-lg-n0"},{label:"Large Negative Start Margin 1",value:"ms-lg-n1"},{label:"Large Negative Start Margin 2",value:"ms-lg-n2"},{label:"Large Negative Start Margin 3",value:"ms-lg-n3"},{label:"Large Negative Start Margin 4",value:"ms-lg-n4"},{label:"Large Negative Start Margin 5",value:"ms-lg-n5"},{label:"Large Negative Start Margin 6",value:"ms-lg-n6"},{label:"Large Negative Start Margin 7",value:"ms-lg-n7"},{label:"Large Negative Start Margin 8",value:"ms-lg-n8"},{label:"Large Negative Start Margin 9",value:"ms-lg-n9"},{label:"Large Negative Start Margin 10",value:"ms-lg-n10"},{label:"Extra Large Negative Start Margin 0",value:"ms-xl-n0"},{label:"Extra Large Negative Start Margin 1",value:"ms-xl-n1"},{label:"Extra Large Negative Start Margin 2",value:"ms-xl-n2"},{label:"Extra Large Negative Start Margin 3",value:"ms-xl-n3"},{label:"Extra Large Negative Start Margin 4",value:"ms-xl-n4"},{label:"Extra Large Negative Start Margin 5",value:"ms-xl-n5"},{label:"Extra Large Negative Start Margin 6",value:"ms-xl-n6"},{label:"Extra Large Negative Start Margin 7",value:"ms-xl-n7"},{label:"Extra Large Negative Start Margin 8",value:"ms-xl-n8"},{label:"Extra Large Negative Start Margin 9",value:"ms-xl-n9"},{label:"Extra Large Negative Start Margin 10",value:"ms-xl-n10"},{label:"XXL Negative Start Margin 0",value:"ms-xxl-n0"},{label:"XXL Negative Start Margin 1",value:"ms-xxl-n1"},{label:"XXL Negative Start Margin 2",value:"ms-xxl-n2"},{label:"XXL Negative Start Margin 3",value:"ms-xxl-n3"},{label:"XXL Negative Start Margin 4",value:"ms-xxl-n4"},{label:"XXL Negative Start Margin 5",value:"ms-xxl-n5"},{label:"XXL Negative Start Margin 6",value:"ms-xxl-n6"},{label:"XXL Negative Start Margin 7",value:"ms-xxl-n7"},{label:"XXL Negative Start Margin 8",value:"ms-xxl-n8"},{label:"XXL Negative Start Margin 9",value:"ms-xxl-n9"},{label:"XXL Negative Start Margin 10",value:"ms-xxl-n10"},{label:"Medium Negative End Margin 0",value:"me-md-n0"},{label:"Medium Negative End Margin 1",value:"me-md-n1"},{label:"Medium Negative End Margin 2",value:"me-md-n2"},{label:"Medium Negative End Margin 3",value:"me-md-n3"},{label:"Medium Negative End Margin 4",value:"me-md-n4"},{label:"Medium Negative End Margin 5",value:"me-md-n5"},{label:"Medium Negative End Margin 6",value:"me-md-n6"},{label:"Medium Negative End Margin 7",value:"me-md-n7"},{label:"Medium Negative End Margin 8",value:"me-md-n8"},{label:"Medium Negative End Margin 9",value:"me-md-n9"},{label:"Medium Negative End Margin 10",value:"me-md-n10"},{label:"Large Negative End Margin 0",value:"me-lg-n0"},{label:"Large Negative End Margin 1",value:"me-lg-n1"},{label:"Large Negative End Margin 2",value:"me-lg-n2"},{label:"Large Negative End Margin 3",value:"me-lg-n3"},{label:"Large Negative End Margin 4",value:"me-lg-n4"},{label:"Large Negative End Margin 5",value:"me-lg-n5"},{label:"Large Negative End Margin 6",value:"me-lg-n6"},{label:"Large Negative End Margin 7",value:"me-lg-n7"},{label:"Large Negative End Margin 8",value:"me-lg-n8"},{label:"Large Negative End Margin 9",value:"me-lg-n9"},{label:"Large Negative End Margin 10",value:"me-lg-n10"},{label:"Extra Large Negative End Margin 0",value:"me-xl-n0"},{label:"Extra Large Negative End Margin 1",value:"me-xl-n1"},{label:"Extra Large Negative End Margin 2",value:"me-xl-n2"},{label:"Extra Large Negative End Margin 3",value:"me-xl-n3"},{label:"Extra Large Negative End Margin 4",value:"me-xl-n4"},{label:"Extra Large Negative End Margin 5",value:"me-xl-n5"},{label:"Extra Large Negative End Margin 6",value:"me-xl-n6"},{label:"Extra Large Negative End Margin 7",value:"me-xl-n7"},{label:"Extra Large Negative End Margin 8",value:"me-xl-n8"},{label:"Extra Large Negative End Margin 9",value:"me-xl-n9"},{label:"Extra Large Negative End Margin 10",value:"me-xl-n10"},{label:"XXL Negative End Margin 0",value:"me-xxl-n0"},{label:"XXL Negative End Margin 1",value:"me-xxl-n1"},{label:"XXL Negative End Margin 2",value:"me-xxl-n2"},{label:"XXL Negative End Margin 3",value:"me-xxl-n3"},{label:"XXL Negative End Margin 4",value:"me-xxl-n4"},{label:"XXL Negative End Margin 5",value:"me-xxl-n5"},{label:"XXL Negative End Margin 6",value:"me-xxl-n6"},{label:"XXL Negative End Margin 7",value:"me-xxl-n7"},{label:"XXL Negative End Margin 8",value:"me-xxl-n8"},{label:"XXL Negative End Margin 9",value:"me-xxl-n9"},{label:"XXL Negative End Margin 10",value:"me-xxl-n10"}],r=[{label:"No Padding",value:"p-0"},{label:"Padding 1",value:"p-1"},{label:"Padding 2",value:"p-2"},{label:"Padding 3",value:"p-3"},{label:"Padding 4",value:"p-4"},{label:"Padding 5",value:"p-5"},{label:"Padding 6",value:"p-6"},{label:"Padding 7",value:"p-7"},{label:"Padding 8",value:"p-8"},{label:"Padding 9",value:"p-9"},{label:"Padding 10",value:"p-10"},{label:"Small Screen No Padding",value:"p-sm-0"},{label:"Small Screen Padding 1",value:"p-sm-1"},{label:"Small Screen Padding 2",value:"p-sm-2"},{label:"Small Screen Padding 3",value:"p-sm-3"},{label:"Small Screen Padding 4",value:"p-sm-4"},{label:"Small Screen Padding 5",value:"p-sm-5"},{label:"Small Screen Padding 6",value:"p-sm-6"},{label:"Small Screen Padding 7",value:"p-sm-7"},{label:"Small Screen Padding 8",value:"p-sm-8"},{label:"Small Screen Padding 9",value:"p-sm-9"},{label:"Small Screen Padding 10",value:"p-sm-10"},{label:"Medium Screen No Padding",value:"p-md-0"},{label:"Medium Screen Padding 1",value:"p-md-1"},{label:"Medium Screen Padding 2",value:"p-md-2"},{label:"Medium Screen Padding 3",value:"p-md-3"},{label:"Medium Screen Padding 4",value:"p-md-4"},{label:"Medium Screen Padding 5",value:"p-md-5"},{label:"Medium Screen Padding 6",value:"p-md-6"},{label:"Medium Screen Padding 7",value:"p-md-7"},{label:"Medium Screen Padding 8",value:"p-md-8"},{label:"Medium Screen Padding 9",value:"p-md-9"},{label:"Medium Screen Padding 10",value:"p-md-10"},{label:"Large Screen No Padding",value:"p-lg-0"},{label:"Large Screen Padding 1",value:"p-lg-1"},{label:"Large Screen Padding 2",value:"p-lg-2"},{label:"Large Screen Padding 3",value:"p-lg-3"},{label:"Large Screen Padding 4",value:"p-lg-4"},{label:"Large Screen Padding 5",value:"p-lg-5"},{label:"Large Screen Padding 6",value:"p-lg-6"},{label:"Large Screen Padding 7",value:"p-lg-7"},{label:"Large Screen Padding 8",value:"p-lg-8"},{label:"Large Screen Padding 9",value:"p-lg-9"},{label:"Large Screen Padding 10",value:"p-lg-10"},{label:"Extra Large No Padding",value:"p-xl-0"},{label:"Extra Large Padding 1",value:"p-xl-1"},{label:"Extra Large Padding 2",value:"p-xl-2"},{label:"Extra Large Padding 3",value:"p-xl-3"},{label:"Extra Large Padding 4",value:"p-xl-4"},{label:"Extra Large Padding 5",value:"p-xl-5"},{label:"Extra Large Padding 6",value:"p-xl-6"},{label:"Extra Large Padding 7",value:"p-xl-7"},{label:"Extra Large Padding 8",value:"p-xl-8"},{label:"Extra Large Padding 9",value:"p-xl-9"},{label:"Extra Large Padding 10",value:"p-xl-10"},{label:"XXL No Padding",value:"p-xxl-0"},{label:"XXL Padding 1",value:"p-xxl-1"},{label:"XXL Padding 2",value:"p-xxl-2"},{label:"XXL Padding 3",value:"p-xxl-3"},{label:"XXL Padding 4",value:"p-xxl-4"},{label:"XXL Padding 5",value:"p-xxl-5"},{label:"XXL Padding 6",value:"p-xxl-6"},{label:"XXL Padding 7",value:"p-xxl-7"},{label:"XXL Padding 8",value:"p-xxl-8"},{label:"XXL Padding 9",value:"p-xxl-9"},{label:"XXL Padding 10",value:"p-xxl-10"},{label:"Top Padding 0",value:"pt-0"},{label:"Top Padding 1",value:"pt-1"},{label:"Top Padding 2",value:"pt-2"},{label:"Top Padding 3",value:"pt-3"},{label:"Top Padding 4",value:"pt-4"},{label:"Top Padding 5",value:"pt-5"},{label:"Top Padding 6",value:"pt-6"},{label:"Top Padding 7",value:"pt-7"},{label:"Top Padding 8",value:"pt-8"},{label:"Top Padding 9",value:"pt-9"},{label:"Top Padding 10",value:"pt-10"},{label:"Small Screen Top Padding 0",value:"pt-sm-0"},{label:"Small Screen Top Padding 1",value:"pt-sm-1"},{label:"Small Screen Top Padding 2",value:"pt-sm-2"},{label:"Small Screen Top Padding 3",value:"pt-sm-3"},{label:"Small Screen Top Padding 4",value:"pt-sm-4"},{label:"Small Screen Top Padding 5",value:"pt-sm-5"},{label:"Small Screen Top Padding 6",value:"pt-sm-6"},{label:"Small Screen Top Padding 7",value:"pt-sm-7"},{label:"Small Screen Top Padding 8",value:"pt-sm-8"},{label:"Small Screen Top Padding 9",value:"pt-sm-9"},{label:"Small Screen Top Padding 10",value:"pt-sm-10"},{label:"Medium Screen Top Padding 0",value:"pt-md-0"},{label:"Medium Screen Top Padding 1",value:"pt-md-1"},{label:"Medium Screen Top Padding 2",value:"pt-md-2"},{label:"Medium Screen Top Padding 3",value:"pt-md-3"},{label:"Medium Screen Top Padding 4",value:"pt-md-4"},{label:"Medium Screen Top Padding 5",value:"pt-md-5"},{label:"Medium Screen Top Padding 6",value:"pt-md-6"},{label:"Medium Screen Top Padding 7",value:"pt-md-7"},{label:"Medium Screen Top Padding 8",value:"pt-md-8"},{label:"Medium Screen Top Padding 9",value:"pt-md-9"},{label:"Medium Screen Top Padding 10",value:"pt-md-10"},{label:"Large Screen Top Padding 0",value:"pt-lg-0"},{label:"Large Screen Top Padding 1",value:"pt-lg-1"},{label:"Large Screen Top Padding 2",value:"pt-lg-2"},{label:"Large Screen Top Padding 3",value:"pt-lg-3"},{label:"Large Screen Top Padding 4",value:"pt-lg-4"},{label:"Large Screen Top Padding 5",value:"pt-lg-5"},{label:"Large Screen Top Padding 6",value:"pt-lg-6"},{label:"Large Screen Top Padding 7",value:"pt-lg-7"},{label:"Large Screen Top Padding 8",value:"pt-lg-8"},{label:"Large Screen Top Padding 9",value:"pt-lg-9"},{label:"Large Screen Top Padding 10",value:"pt-lg-10"},{label:"Extra Large Top Padding 0",value:"pt-xl-0"},{label:"Extra Large Top Padding 1",value:"pt-xl-1"},{label:"Extra Large Top Padding 2",value:"pt-xl-2"},{label:"Extra Large Top Padding 3",value:"pt-xl-3"},{label:"Extra Large Top Padding 4",value:"pt-xl-4"},{label:"Extra Large Top Padding 5",value:"pt-xl-5"},{label:"Extra Large Top Padding 6",value:"pt-xl-6"},{label:"Extra Large Top Padding 7",value:"pt-xl-7"},{label:"Extra Large Top Padding 8",value:"pt-xl-8"},{label:"Extra Large Top Padding 9",value:"pt-xl-9"},{label:"Extra Large Top Padding 10",value:"pt-xl-10"},{label:"XXL Top Padding 0",value:"pt-xxl-0"},{label:"XXL Top Padding 1",value:"pt-xxl-1"},{label:"XXL Top Padding 2",value:"pt-xxl-2"},{label:"XXL Top Padding 3",value:"pt-xxl-3"},{label:"XXL Top Padding 4",value:"pt-xxl-4"},{label:"XXL Top Padding 5",value:"pt-xxl-5"},{label:"XXL Top Padding 6",value:"pt-xxl-6"},{label:"XXL Top Padding 7",value:"pt-xxl-7"},{label:"XXL Top Padding 8",value:"pt-xxl-8"},{label:"XXL Top Padding 9",value:"pt-xxl-9"},{label:"XXL Top Padding 10",value:"pt-xxl-10"},{label:"Bottom Padding 0",value:"pb-0"},{label:"Bottom Padding 1",value:"pb-1"},{label:"Bottom Padding 2",value:"pb-2"},{label:"Bottom Padding 3",value:"pb-3"},{label:"Bottom Padding 4",value:"pb-4"},{label:"Bottom Padding 5",value:"pb-5"},{label:"Bottom Padding 6",value:"pb-6"},{label:"Bottom Padding 7",value:"pb-7"},{label:"Bottom Padding 8",value:"pb-8"},{label:"Bottom Padding 9",value:"pb-9"},{label:"Bottom Padding 10",value:"pb-10"},{label:"Small Screen Bottom Padding 0",value:"pb-sm-0"},{label:"Small Screen Bottom Padding 1",value:"pb-sm-1"},{label:"Small Screen Bottom Padding 2",value:"pb-sm-2"},{label:"Small Screen Bottom Padding 3",value:"pb-sm-3"},{label:"Small Screen Bottom Padding 4",value:"pb-sm-4"},{label:"Small Screen Bottom Padding 5",value:"pb-sm-5"},{label:"Small Screen Bottom Padding 6",value:"pb-sm-6"},{label:"Small Screen Bottom Padding 7",value:"pb-sm-7"},{label:"Small Screen Bottom Padding 8",value:"pb-sm-8"},{label:"Small Screen Bottom Padding 9",value:"pb-sm-9"},{label:"Small Screen Bottom Padding 10",value:"pb-sm-10"},{label:"Medium Screen Bottom Padding 0",value:"pb-md-0"},{label:"Medium Screen Bottom Padding 1",value:"pb-md-1"},{label:"Medium Screen Bottom Padding 2",value:"pb-md-2"},{label:"Medium Screen Bottom Padding 3",value:"pb-md-3"},{label:"Medium Screen Bottom Padding 4",value:"pb-md-4"},{label:"Medium Screen Bottom Padding 5",value:"pb-md-5"},{label:"Medium Screen Bottom Padding 6",value:"pb-md-6"},{label:"Medium Screen Bottom Padding 7",value:"pb-md-7"},{label:"Medium Screen Bottom Padding 8",value:"pb-md-8"},{label:"Medium Screen Bottom Padding 9",value:"pb-md-9"},{label:"Medium Screen Bottom Padding 10",value:"pb-md-10"},{label:"Large Screen Bottom Padding 0",value:"pb-lg-0"},{label:"Large Screen Bottom Padding 1",value:"pb-lg-1"},{label:"Large Screen Bottom Padding 2",value:"pb-lg-2"},{label:"Large Screen Bottom Padding 3",value:"pb-lg-3"},{label:"Large Screen Bottom Padding 4",value:"pb-lg-4"},{label:"Large Screen Bottom Padding 5",value:"pb-lg-5"},{label:"Large Screen Bottom Padding 6",value:"pb-lg-6"},{label:"Large Screen Bottom Padding 7",value:"pb-lg-7"},{label:"Large Screen Bottom Padding 8",value:"pb-lg-8"},{label:"Large Screen Bottom Padding 9",value:"pb-lg-9"},{label:"Large Screen Bottom Padding 10",value:"pb-lg-10"},{label:"Extra Large Bottom Padding 0",value:"pb-xl-0"},{label:"Extra Large Bottom Padding 1",value:"pb-xl-1"},{label:"Extra Large Bottom Padding 2",value:"pb-xl-2"},{label:"Extra Large Bottom Padding 3",value:"pb-xl-3"},{label:"Extra Large Bottom Padding 4",value:"pb-xl-4"},{label:"Extra Large Bottom Padding 5",value:"pb-xl-5"},{label:"Extra Large Bottom Padding 6",value:"pb-xl-6"},{label:"Extra Large Bottom Padding 7",value:"pb-xl-7"},{label:"Extra Large Bottom Padding 8",value:"pb-xl-8"},{label:"Extra Large Bottom Padding 9",value:"pb-xl-9"},{label:"Extra Large Bottom Padding 10",value:"pb-xl-10"},{label:"XXL Bottom Padding 0",value:"pb-xxl-0"},{label:"XXL Bottom Padding 1",value:"pb-xxl-1"},{label:"XXL Bottom Padding 2",value:"pb-xxl-2"},{label:"XXL Bottom Padding 3",value:"pb-xxl-3"},{label:"XXL Bottom Padding 4",value:"pb-xxl-4"},{label:"XXL Bottom Padding 5",value:"pb-xxl-5"},{label:"XXL Bottom Padding 6",value:"pb-xxl-6"},{label:"XXL Bottom Padding 7",value:"pb-xxl-7"},{label:"XXL Bottom Padding 8",value:"pb-xxl-8"},{label:"XXL Bottom Padding 9",value:"pb-xxl-9"},{label:"XXL Bottom Padding 10",value:"pb-xxl-10"}],g=[{label:"1 Column per Row",value:"row-cols-1"},{label:"2 Columns per Row",value:"row-cols-2"},{label:"3 Columns per Row",value:"row-cols-3"},{label:"4 Columns per Row",value:"row-cols-4"},{label:"5 Columns per Row",value:"row-cols-5"},{label:"6 Columns per Row",value:"row-cols-6"},{label:"Medium Screen 2 Columns",value:"row-cols-md-2"},{label:"Large Screen 2 Columns",value:"row-cols-lg-2"},{label:"Extra Large 2 Columns",value:"row-cols-xl-2"},{label:"XXL 2 Columns",value:"row-cols-xxl-2"},{label:"Medium Screen 3 Columns",value:"row-cols-md-3"},{label:"Large Screen 3 Columns",value:"row-cols-lg-3"},{label:"Extra Large 3 Columns",value:"row-cols-xl-3"},{label:"XXL 3 Columns",value:"row-cols-xxl-3"},{label:"Medium Screen 4 Columns",value:"row-cols-md-4"},{label:"Large Screen 4 Columns",value:"row-cols-lg-4"},{label:"Extra Large 4 Columns",value:"row-cols-xl-4"},{label:"XXL 4 Columns",value:"row-cols-xxl-4"},{label:"Medium Screen 5 Columns",value:"row-cols-md-5"},{label:"Large Screen 5 Columns",value:"row-cols-lg-5"},{label:"Extra Large 5 Columns",value:"row-cols-xl-5"},{label:"XXL 5 Columns",value:"row-cols-xxl-5"},{label:"Medium Screen 6 Columns",value:"row-cols-md-6"},{label:"Large Screen 6 Columns",value:"row-cols-lg-6"},{label:"Extra Large 6 Columns",value:"row-cols-xl-6"},{label:"XXL 6 Columns",value:"row-cols-xxl-6"}],d=[{label:"Justify Start",value:"justify-content-start"},{label:"Medium Screen Justify Start",value:"justify-content-md-start"},{label:"Large Screen Justify Start",value:"justify-content-lg-start"},{label:"Extra Large Justify Start",value:"justify-content-xl-start"},{label:"XXL Justify Start",value:"justify-content-xxl-start"},{label:"Justify End",value:"justify-content-end"},{label:"Medium Screen Justify End",value:"justify-content-md-end"},{label:"Large Screen Justify End",value:"justify-content-lg-end"},{label:"Extra Large Justify End",value:"justify-content-xl-end"},{label:"XXL Justify End",value:"justify-content-xxl-end"},{label:"Justify Center",value:"justify-content-center"},{label:"Medium Screen Justify Center",value:"justify-content-md-center"},{label:"Large Screen Justify Center",value:"justify-content-lg-center"},{label:"Extra Large Justify Center",value:"justify-content-xl-center"},{label:"XXL Justify Center",value:"justify-content-xxl-center"},{label:"Justify Between",value:"justify-content-between"},{label:"Medium Screen Justify Between",value:"justify-content-md-between"},{label:"Large Screen Justify Between",value:"justify-content-lg-between"},{label:"Extra Large Justify Between",value:"justify-content-xl-between"},{label:"XXL Justify Between",value:"justify-content-xxl-between"}],u=[{label:"Align Items Start",value:"align-items-start"},{label:"Medium Screen Align Start",value:"align-items-md-start"},{label:"Large Screen Align Start",value:"align-items-lg-start"},{label:"Extra Large Align Start",value:"align-items-xl-start"},{label:"XXL Align Start",value:"align-items-xxl-start"},{label:"Align Items Center",value:"align-items-center"},{label:"Medium Screen Align Center",value:"align-items-md-center"},{label:"Large Screen Align Center",value:"align-items-lg-center"},{label:"Extra Large Align Center",value:"align-items-xl-center"},{label:"XXL Align Center",value:"align-items-xxl-center"},{label:"Align Items End",value:"align-items-end"},{label:"Medium Screen Align End",value:"align-items-md-end"},{label:"Large Screen Align End",value:"align-items-lg-end"},{label:"Extra Large Align End",value:"align-items-xl-end"},{label:"XXL Align End",value:"align-items-xxl-end"},{label:"Align Items Baseline",value:"align-items-baseline"},{label:"Medium Screen Align Baseline",value:"align-items-md-baseline"},{label:"Large Screen Align Baseline",value:"align-items-lg-baseline"},{label:"Extra Large Align Baseline",value:"align-items-xl-baseline"},{label:"XXL Align Baseline",value:"align-items-xxl-baseline"},{label:"Align Items Stretch",value:"align-items-stretch"},{label:"Medium Screen Align Stretch",value:"align-items-md-stretch"},{label:"Large Screen Align Stretch",value:"align-items-lg-stretch"},{label:"Extra Large Align Stretch",value:"align-items-xl-stretch"},{label:"XXL Align Stretch",value:"align-items-xxl-stretch"}],v=window.ReactJSXRuntime,b=(e,l,a)=>e.map((e=>{const n=l.find((l=>l.value===e));return n?a?n.value:n.label:e})),m=["fs-blocks/column-block"],o=JSON.parse('{"UU":"fs-blocks/row-block"}');(0,e.registerBlockType)(o.UU,{edit:function({attributes:e,setAttributes:o,clientId:s}){const{rowOptions:p=[],justifyContentOptions:x=[],alignItemsOptions:c=[],marginOptions:S=[],paddingOptions:M=[],additionalClasses:L=[]}=e,[P,E]=(0,t.useState)(!1),X=(e,l)=>a=>{const n=((e,l,a)=>e.map((e=>{const n=l.find((l=>a?l.value===e:l.label===e));return n?n.value:e})))(a,l,P);o({[e]:n});const t=(i="rowOptions"===e?n:p,r="justifyContentOptions"===e?n:x,g="alignItemsOptions"===e?n:c,d="marginOptions"===e?n:S,u="paddingOptions"===e?n:M,[...i,...r,...g,...d,...u]);var i,r,g,d,u;o({additionalClasses:t})},N=["wp-block-fancysquares-row-block","row",...L].join(" "),B=(0,t.useRef)();(0,t.useEffect)((()=>{if(!B.current)return;const e=B.current.querySelector(".block-editor-inner-blocks > .block-editor-block-list__layout"),l=B.current.querySelector(".block-editor-inner-blocks");if(e){const a=["block-editor-block-list__layout","wp-block-fancysquares-row-block","row",...L].join(" ");e.className=a,l.className+=" wp-block-fancysquares-row-block-admin"}}),[L,s]);const f=(0,l.useBlockProps)();return(0,v.jsxs)(t.Fragment,{children:[(0,v.jsx)(l.InspectorControls,{children:(0,v.jsxs)(a.PanelBody,{title:(0,n.__)("Row Settings","fs-blocks"),initialOpen:!0,children:[(0,v.jsx)(a.CheckboxControl,{label:(0,n.__)("Show Values","fs-blocks"),checked:P,onChange:E,help:(0,n.__)("Display Bootstrap class names instead of labels.","fs-blocks"),style:{marginBottom:"20px"}}),(0,v.jsxs)("div",{style:{marginBottom:"20px"},children:[(0,v.jsx)(a.FormTokenField,{label:(0,n.__)("Row Classes","fs-blocks"),value:b(p,g,P),suggestions:g.map((e=>P?e.value:e.label)),onChange:X("rowOptions",g)}),(0,v.jsxs)("details",{style:{marginTop:"5px"},children:[(0,v.jsx)("summary",{children:(0,n.__)("Available Row Classes","fs-blocks")}),(0,v.jsx)("ul",{style:{fontSize:"12px",paddingLeft:"20px",margin:"5px 0"},children:g.map((e=>(0,v.jsx)("li",{children:P?e.value:e.label},e.value)))})]})]}),(0,v.jsxs)("div",{style:{marginBottom:"20px"},children:[(0,v.jsx)(a.FormTokenField,{label:(0,n.__)("Justify Content Classes","fs-blocks"),value:b(x,d,P),suggestions:d.map((e=>P?e.value:e.label)),onChange:X("justifyContentOptions",d)}),(0,v.jsxs)("details",{style:{marginTop:"5px"},children:[(0,v.jsx)("summary",{children:(0,n.__)("Available Justify Content Classes","fs-blocks")}),(0,v.jsx)("ul",{style:{fontSize:"12px",paddingLeft:"20px",margin:"5px 0"},children:d.map((e=>(0,v.jsx)("li",{children:P?e.value:e.label},e.value)))})]})]}),(0,v.jsxs)("div",{style:{marginBottom:"20px"},children:[(0,v.jsx)(a.FormTokenField,{label:(0,n.__)("Align Items Classes","fs-blocks"),value:b(c,u,P),suggestions:u.map((e=>P?e.value:e.label)),onChange:X("alignItemsOptions",u)}),(0,v.jsxs)("details",{style:{marginTop:"5px"},children:[(0,v.jsx)("summary",{children:(0,n.__)("Available Align Items Classes","fs-blocks")}),(0,v.jsx)("ul",{style:{fontSize:"12px",paddingLeft:"20px",margin:"5px 0"},children:u.map((e=>(0,v.jsx)("li",{children:P?e.value:e.label},e.value)))})]})]}),(0,v.jsxs)("div",{style:{marginBottom:"20px"},children:[(0,v.jsx)(a.FormTokenField,{label:(0,n.__)("Margin Classes","fs-blocks"),value:b(S,i,P),suggestions:i.map((e=>P?e.value:e.label)),onChange:X("marginOptions",i)}),(0,v.jsxs)("details",{style:{marginTop:"5px"},children:[(0,v.jsx)("summary",{children:(0,n.__)("Available Margin Classes","fs-blocks")}),(0,v.jsx)("ul",{style:{fontSize:"12px",paddingLeft:"20px",margin:"5px 0"},children:i.map((e=>(0,v.jsx)("li",{children:P?e.value:e.label},e.value)))})]})]}),(0,v.jsxs)("div",{style:{marginBottom:"20px"},children:[(0,v.jsx)(a.FormTokenField,{label:(0,n.__)("Padding Classes","fs-blocks"),value:b(M,r,P),suggestions:r.map((e=>P?e.value:e.label)),onChange:X("paddingOptions",r)}),(0,v.jsxs)("details",{style:{marginTop:"5px"},children:[(0,v.jsx)("summary",{children:(0,n.__)("Available Padding Classes","fs-blocks")}),(0,v.jsx)("ul",{style:{fontSize:"12px",paddingLeft:"20px",margin:"5px 0"},children:r.map((e=>(0,v.jsx)("li",{children:P?e.value:e.label},e.value)))})]})]})]})}),(0,v.jsx)("div",{...f,className:N,ref:B,children:(0,v.jsx)(l.InnerBlocks,{allowedBlocks:m,template:[["fs-blocks/column-block"]]})})]})},save:()=>(0,v.jsx)(l.InnerBlocks.Content,{})})}},a={};function n(e){var t=a[e];if(void 0!==t)return t.exports;var i=a[e]={exports:{}};return l[e](i,i.exports,n),i.exports}n.m=l,e=[],n.O=(l,a,t,i)=>{if(!a){var r=1/0;for(v=0;v<e.length;v++){for(var[a,t,i]=e[v],g=!0,d=0;d<a.length;d++)(!1&i||r>=i)&&Object.keys(n.O).every((e=>n.O[e](a[d])))?a.splice(d--,1):(g=!1,i<r&&(r=i));if(g){e.splice(v--,1);var u=t();void 0!==u&&(l=u)}}return l}i=i||0;for(var v=e.length;v>0&&e[v-1][2]>i;v--)e[v]=e[v-1];e[v]=[a,t,i]},n.o=(e,l)=>Object.prototype.hasOwnProperty.call(e,l),(()=>{var e={344:0,272:0};n.O.j=l=>0===e[l];var l=(l,a)=>{var t,i,[r,g,d]=a,u=0;if(r.some((l=>0!==e[l]))){for(t in g)n.o(g,t)&&(n.m[t]=g[t]);if(d)var v=d(n)}for(l&&l(a);u<r.length;u++)i=r[u],n.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return n.O(v)},a=globalThis.webpackChunkfs_blocks=globalThis.webpackChunkfs_blocks||[];a.forEach(l.bind(null,0)),a.push=l.bind(null,a.push.bind(a))})();var t=n.O(void 0,[272],(()=>n(239)));t=n.O(t)})();
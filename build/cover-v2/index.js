(()=>{"use strict";var l,e={159:()=>{const l=window.wp.blocks,e=window.wp.blockEditor,a=JSON.parse('{"UU":"fs-blocks/cover-v2"}'),n=window.wp.components,i=window.wp.i18n,d=window.wp.element,t=[{label:"Extend Cover Left",value:"cover-negative-margin-left"},{label:"Extend Cover Right",value:"cover-negative-margin-right"}],r=[{label:"Hide",value:"d-none"},{label:"Block Display",value:"d-block"},{label:"Inline Display",value:"d-inline"},{label:"Inline Block",value:"d-inline-block"},{label:"Flex Display",value:"d-flex"},{label:"Inline Flex",value:"d-inline-flex"},{label:"Table Display",value:"d-table"},{label:"Table Row",value:"d-table-row"},{label:"Table Cell",value:"d-table-cell"},{label:"Grid Display",value:"d-grid"},{label:"Inline Grid",value:"d-inline-grid"},{label:"Hide on Small",value:"d-sm-none"},{label:"Block on Small",value:"d-sm-block"},{label:"Inline on Small",value:"d-sm-inline"},{label:"Inline Block on Small",value:"d-sm-inline-block"},{label:"Flex on Small",value:"d-sm-flex"},{label:"Inline Flex on Small",value:"d-sm-inline-flex"},{label:"Table on Small",value:"d-sm-table"},{label:"Table Row on Small",value:"d-sm-table-row"},{label:"Table Cell on Small",value:"d-sm-table-cell"},{label:"Grid on Small",value:"d-sm-grid"},{label:"Inline Grid on Small",value:"d-sm-inline-grid"},{label:"Hide on Medium",value:"d-md-none"},{label:"Block on Medium",value:"d-md-block"},{label:"Inline on Medium",value:"d-md-inline"},{label:"Inline Block on Medium",value:"d-md-inline-block"},{label:"Flex on Medium",value:"d-md-flex"},{label:"Inline Flex on Medium",value:"d-md-inline-flex"},{label:"Table on Medium",value:"d-md-table"},{label:"Table Row on Medium",value:"d-md-table-row"},{label:"Table Cell on Medium",value:"d-md-table-cell"},{label:"Grid on Medium",value:"d-md-grid"},{label:"Inline Grid on Medium",value:"d-md-inline-grid"},{label:"Hide on Large",value:"d-lg-none"},{label:"Block on Large",value:"d-lg-block"},{label:"Inline on Large",value:"d-lg-inline"},{label:"Inline Block on Large",value:"d-lg-inline-block"},{label:"Flex on Large",value:"d-lg-flex"},{label:"Inline Flex on Large",value:"d-lg-inline-flex"},{label:"Table on Large",value:"d-lg-table"},{label:"Table Row on Large",value:"d-lg-table-row"},{label:"Table Cell on Large",value:"d-lg-table-cell"},{label:"Grid on Large",value:"d-lg-grid"},{label:"Inline Grid on Large",value:"d-lg-inline-grid"},{label:"Hide on Extra Large",value:"d-xl-none"},{label:"Block on Extra Large",value:"d-xl-block"},{label:"Inline on Extra Large",value:"d-xl-inline"},{label:"Inline Block on Extra Large",value:"d-xl-inline-block"},{label:"Flex on Extra Large",value:"d-xl-flex"},{label:"Inline Flex on Extra Large",value:"d-xl-inline-flex"},{label:"Table on Extra Large",value:"d-xl-table"},{label:"Table Row on Extra Large",value:"d-xl-table-row"},{label:"Table Cell on Extra Large",value:"d-xl-table-cell"},{label:"Grid on Extra Large",value:"d-xl-grid"},{label:"Inline Grid on Extra Large",value:"d-xl-inline-grid"},{label:"Hide on XXL",value:"d-xxl-none"},{label:"Block on XXL",value:"d-xxl-block"},{label:"Inline on XXL",value:"d-xxl-inline"},{label:"Inline Block on XXL",value:"d-xxl-inline-block"},{label:"Flex on XXL",value:"d-xxl-flex"},{label:"Inline Flex on XXL",value:"d-xxl-inline-flex"},{label:"Table on XXL",value:"d-xxl-table"},{label:"Table Row on XXL",value:"d-xxl-table-row"},{label:"Table Cell on XXL",value:"d-xxl-table-cell"},{label:"Grid on XXL",value:"d-xxl-grid"},{label:"Inline Grid on XXL",value:"d-xxl-inline-grid"}],g=[{label:"Start Margin Auto",value:"ms-auto"},{label:"End Margin Auto",value:"me-auto"},{label:"Small Screen End Margin Auto",value:"me-sm-auto"},{label:"Medium Screen End Margin Auto",value:"me-md-auto"},{label:"Medium Screen Start Margin Auto",value:"ms-md-auto"},{label:"Large Screen End Margin Auto",value:"me-lg-auto"},{label:"Large Screen Start Margin Auto",value:"ms-lg-auto"},{label:"Extra Large End Margin Auto",value:"me-xl-auto"},{label:"Extra Large Start Margin Auto",value:"ms-xl-auto"},{label:"XXL End Margin Auto",value:"me-xxl-auto"},{label:"XXL Start Margin Auto",value:"ms-xxl-auto"},{label:"No Margin",value:"m-0"},{label:"Margin 1",value:"m-1"},{label:"Margin 2",value:"m-2"},{label:"Margin 3",value:"m-3"},{label:"Margin 4",value:"m-4"},{label:"Margin 5",value:"m-5"},{label:"Margin 6",value:"m-6"},{label:"Margin 7",value:"m-7"},{label:"Margin 8",value:"m-8"},{label:"Margin 9",value:"m-9"},{label:"Margin 10",value:"m-10"},{label:"Bottom Margin 0",value:"mb-0"},{label:"Bottom Margin 1",value:"mb-1"},{label:"Bottom Margin 2",value:"mb-2"},{label:"Bottom Margin 3",value:"mb-3"},{label:"Bottom Margin 4",value:"mb-4"},{label:"Bottom Margin 5",value:"mb-5"},{label:"Bottom Margin 6",value:"mb-6"},{label:"Bottom Margin 7",value:"mb-7"},{label:"Bottom Margin 8",value:"mb-8"},{label:"Bottom Margin 9",value:"mb-9"},{label:"Bottom Margin 10",value:"mb-10"},{label:"Top Margin 0",value:"mt-0"},{label:"Top Margin 1",value:"mt-1"},{label:"Top Margin 2",value:"mt-2"},{label:"Top Margin 3",value:"mt-3"},{label:"Top Margin 4",value:"mt-4"},{label:"Top Margin 5",value:"mt-5"},{label:"Top Margin 6",value:"mt-6"},{label:"Top Margin 7",value:"mt-7"},{label:"Top Margin 8",value:"mt-8"},{label:"Top Margin 9",value:"mt-9"},{label:"Top Margin 10",value:"mt-10"},{label:"Negative Start Margin 0",value:"ms-n0"},{label:"Negative Start Margin 1",value:"ms-n1"},{label:"Negative Start Margin 2",value:"ms-n2"},{label:"Negative Start Margin 3",value:"ms-n3"},{label:"Negative Start Margin 4",value:"ms-n4"},{label:"Negative Start Margin 5",value:"ms-n5"},{label:"Negative Start Margin 6",value:"ms-n6"},{label:"Negative Start Margin 7",value:"ms-n7"},{label:"Negative Start Margin 8",value:"ms-n8"},{label:"Negative Start Margin 9",value:"ms-n9"},{label:"Negative Start Margin 10",value:"ms-n10"},{label:"Negative End Margin 0",value:"me-n0"},{label:"Negative End Margin 1",value:"me-n1"},{label:"Negative End Margin 2",value:"me-n2"},{label:"Negative End Margin 3",value:"me-n3"},{label:"Negative End Margin 4",value:"me-n4"},{label:"Negative End Margin 5",value:"me-n5"},{label:"Negative End Margin 6",value:"me-n6"},{label:"Negative End Margin 7",value:"me-n7"},{label:"Negative End Margin 8",value:"me-n8"},{label:"Negative End Margin 9",value:"me-n9"},{label:"Negative End Margin 10",value:"me-n10"},{label:"Medium Negative Start Margin 0",value:"ms-md-n0"},{label:"Medium Negative Start Margin 1",value:"ms-md-n1"},{label:"Medium Negative Start Margin 2",value:"ms-md-n2"},{label:"Medium Negative Start Margin 3",value:"ms-md-n3"},{label:"Medium Negative Start Margin 4",value:"ms-md-n4"},{label:"Medium Negative Start Margin 5",value:"ms-md-n5"},{label:"Medium Negative Start Margin 6",value:"ms-md-n6"},{label:"Medium Negative Start Margin 7",value:"ms-md-n7"},{label:"Medium Negative Start Margin 8",value:"ms-md-n8"},{label:"Medium Negative Start Margin 9",value:"ms-md-n9"},{label:"Medium Negative Start Margin 10",value:"ms-md-n10"},{label:"Large Negative Start Margin 0",value:"ms-lg-n0"},{label:"Large Negative Start Margin 1",value:"ms-lg-n1"},{label:"Large Negative Start Margin 2",value:"ms-lg-n2"},{label:"Large Negative Start Margin 3",value:"ms-lg-n3"},{label:"Large Negative Start Margin 4",value:"ms-lg-n4"},{label:"Large Negative Start Margin 5",value:"ms-lg-n5"},{label:"Large Negative Start Margin 6",value:"ms-lg-n6"},{label:"Large Negative Start Margin 7",value:"ms-lg-n7"},{label:"Large Negative Start Margin 8",value:"ms-lg-n8"},{label:"Large Negative Start Margin 9",value:"ms-lg-n9"},{label:"Large Negative Start Margin 10",value:"ms-lg-n10"},{label:"Extra Large Negative Start Margin 0",value:"ms-xl-n0"},{label:"Extra Large Negative Start Margin 1",value:"ms-xl-n1"},{label:"Extra Large Negative Start Margin 2",value:"ms-xl-n2"},{label:"Extra Large Negative Start Margin 3",value:"ms-xl-n3"},{label:"Extra Large Negative Start Margin 4",value:"ms-xl-n4"},{label:"Extra Large Negative Start Margin 5",value:"ms-xl-n5"},{label:"Extra Large Negative Start Margin 6",value:"ms-xl-n6"},{label:"Extra Large Negative Start Margin 7",value:"ms-xl-n7"},{label:"Extra Large Negative Start Margin 8",value:"ms-xl-n8"},{label:"Extra Large Negative Start Margin 9",value:"ms-xl-n9"},{label:"Extra Large Negative Start Margin 10",value:"ms-xl-n10"},{label:"XXL Negative Start Margin 0",value:"ms-xxl-n0"},{label:"XXL Negative Start Margin 1",value:"ms-xxl-n1"},{label:"XXL Negative Start Margin 2",value:"ms-xxl-n2"},{label:"XXL Negative Start Margin 3",value:"ms-xxl-n3"},{label:"XXL Negative Start Margin 4",value:"ms-xxl-n4"},{label:"XXL Negative Start Margin 5",value:"ms-xxl-n5"},{label:"XXL Negative Start Margin 6",value:"ms-xxl-n6"},{label:"XXL Negative Start Margin 7",value:"ms-xxl-n7"},{label:"XXL Negative Start Margin 8",value:"ms-xxl-n8"},{label:"XXL Negative Start Margin 9",value:"ms-xxl-n9"},{label:"XXL Negative Start Margin 10",value:"ms-xxl-n10"},{label:"Medium Negative End Margin 0",value:"me-md-n0"},{label:"Medium Negative End Margin 1",value:"me-md-n1"},{label:"Medium Negative End Margin 2",value:"me-md-n2"},{label:"Medium Negative End Margin 3",value:"me-md-n3"},{label:"Medium Negative End Margin 4",value:"me-md-n4"},{label:"Medium Negative End Margin 5",value:"me-md-n5"},{label:"Medium Negative End Margin 6",value:"me-md-n6"},{label:"Medium Negative End Margin 7",value:"me-md-n7"},{label:"Medium Negative End Margin 8",value:"me-md-n8"},{label:"Medium Negative End Margin 9",value:"me-md-n9"},{label:"Medium Negative End Margin 10",value:"me-md-n10"},{label:"Large Negative End Margin 0",value:"me-lg-n0"},{label:"Large Negative End Margin 1",value:"me-lg-n1"},{label:"Large Negative End Margin 2",value:"me-lg-n2"},{label:"Large Negative End Margin 3",value:"me-lg-n3"},{label:"Large Negative End Margin 4",value:"me-lg-n4"},{label:"Large Negative End Margin 5",value:"me-lg-n5"},{label:"Large Negative End Margin 6",value:"me-lg-n6"},{label:"Large Negative End Margin 7",value:"me-lg-n7"},{label:"Large Negative End Margin 8",value:"me-lg-n8"},{label:"Large Negative End Margin 9",value:"me-lg-n9"},{label:"Large Negative End Margin 10",value:"me-lg-n10"},{label:"Extra Large Negative End Margin 0",value:"me-xl-n0"},{label:"Extra Large Negative End Margin 1",value:"me-xl-n1"},{label:"Extra Large Negative End Margin 2",value:"me-xl-n2"},{label:"Extra Large Negative End Margin 3",value:"me-xl-n3"},{label:"Extra Large Negative End Margin 4",value:"me-xl-n4"},{label:"Extra Large Negative End Margin 5",value:"me-xl-n5"},{label:"Extra Large Negative End Margin 6",value:"me-xl-n6"},{label:"Extra Large Negative End Margin 7",value:"me-xl-n7"},{label:"Extra Large Negative End Margin 8",value:"me-xl-n8"},{label:"Extra Large Negative End Margin 9",value:"me-xl-n9"},{label:"Extra Large Negative End Margin 10",value:"me-xl-n10"},{label:"XXL Negative End Margin 0",value:"me-xxl-n0"},{label:"XXL Negative End Margin 1",value:"me-xxl-n1"},{label:"XXL Negative End Margin 2",value:"me-xxl-n2"},{label:"XXL Negative End Margin 3",value:"me-xxl-n3"},{label:"XXL Negative End Margin 4",value:"me-xxl-n4"},{label:"XXL Negative End Margin 5",value:"me-xxl-n5"},{label:"XXL Negative End Margin 6",value:"me-xxl-n6"},{label:"XXL Negative End Margin 7",value:"me-xxl-n7"},{label:"XXL Negative End Margin 8",value:"me-xxl-n8"},{label:"XXL Negative End Margin 9",value:"me-xxl-n9"},{label:"XXL Negative End Margin 10",value:"me-xxl-n10"}],o=[{label:"No Padding",value:"p-0"},{label:"Padding 1",value:"p-1"},{label:"Padding 2",value:"p-2"},{label:"Padding 3",value:"p-3"},{label:"Padding 4",value:"p-4"},{label:"Padding 5",value:"p-5"},{label:"Padding 6",value:"p-6"},{label:"Padding 7",value:"p-7"},{label:"Padding 8",value:"p-8"},{label:"Padding 9",value:"p-9"},{label:"Padding 10",value:"p-10"},{label:"Small Screen No Padding",value:"p-sm-0"},{label:"Small Screen Padding 1",value:"p-sm-1"},{label:"Small Screen Padding 2",value:"p-sm-2"},{label:"Small Screen Padding 3",value:"p-sm-3"},{label:"Small Screen Padding 4",value:"p-sm-4"},{label:"Small Screen Padding 5",value:"p-sm-5"},{label:"Small Screen Padding 6",value:"p-sm-6"},{label:"Small Screen Padding 7",value:"p-sm-7"},{label:"Small Screen Padding 8",value:"p-sm-8"},{label:"Small Screen Padding 9",value:"p-sm-9"},{label:"Small Screen Padding 10",value:"p-sm-10"},{label:"Medium Screen No Padding",value:"p-md-0"},{label:"Medium Screen Padding 1",value:"p-md-1"},{label:"Medium Screen Padding 2",value:"p-md-2"},{label:"Medium Screen Padding 3",value:"p-md-3"},{label:"Medium Screen Padding 4",value:"p-md-4"},{label:"Medium Screen Padding 5",value:"p-md-5"},{label:"Medium Screen Padding 6",value:"p-md-6"},{label:"Medium Screen Padding 7",value:"p-md-7"},{label:"Medium Screen Padding 8",value:"p-md-8"},{label:"Medium Screen Padding 9",value:"p-md-9"},{label:"Medium Screen Padding 10",value:"p-md-10"},{label:"Large Screen No Padding",value:"p-lg-0"},{label:"Large Screen Padding 1",value:"p-lg-1"},{label:"Large Screen Padding 2",value:"p-lg-2"},{label:"Large Screen Padding 3",value:"p-lg-3"},{label:"Large Screen Padding 4",value:"p-lg-4"},{label:"Large Screen Padding 5",value:"p-lg-5"},{label:"Large Screen Padding 6",value:"p-lg-6"},{label:"Large Screen Padding 7",value:"p-lg-7"},{label:"Large Screen Padding 8",value:"p-lg-8"},{label:"Large Screen Padding 9",value:"p-lg-9"},{label:"Large Screen Padding 10",value:"p-lg-10"},{label:"Extra Large No Padding",value:"p-xl-0"},{label:"Extra Large Padding 1",value:"p-xl-1"},{label:"Extra Large Padding 2",value:"p-xl-2"},{label:"Extra Large Padding 3",value:"p-xl-3"},{label:"Extra Large Padding 4",value:"p-xl-4"},{label:"Extra Large Padding 5",value:"p-xl-5"},{label:"Extra Large Padding 6",value:"p-xl-6"},{label:"Extra Large Padding 7",value:"p-xl-7"},{label:"Extra Large Padding 8",value:"p-xl-8"},{label:"Extra Large Padding 9",value:"p-xl-9"},{label:"Extra Large Padding 10",value:"p-xl-10"},{label:"XXL No Padding",value:"p-xxl-0"},{label:"XXL Padding 1",value:"p-xxl-1"},{label:"XXL Padding 2",value:"p-xxl-2"},{label:"XXL Padding 3",value:"p-xxl-3"},{label:"XXL Padding 4",value:"p-xxl-4"},{label:"XXL Padding 5",value:"p-xxl-5"},{label:"XXL Padding 6",value:"p-xxl-6"},{label:"XXL Padding 7",value:"p-xxl-7"},{label:"XXL Padding 8",value:"p-xxl-8"},{label:"XXL Padding 9",value:"p-xxl-9"},{label:"XXL Padding 10",value:"p-xxl-10"},{label:"Top Padding 0",value:"pt-0"},{label:"Top Padding 1",value:"pt-1"},{label:"Top Padding 2",value:"pt-2"},{label:"Top Padding 3",value:"pt-3"},{label:"Top Padding 4",value:"pt-4"},{label:"Top Padding 5",value:"pt-5"},{label:"Top Padding 6",value:"pt-6"},{label:"Top Padding 7",value:"pt-7"},{label:"Top Padding 8",value:"pt-8"},{label:"Top Padding 9",value:"pt-9"},{label:"Top Padding 10",value:"pt-10"},{label:"Small Screen Top Padding 0",value:"pt-sm-0"},{label:"Small Screen Top Padding 1",value:"pt-sm-1"},{label:"Small Screen Top Padding 2",value:"pt-sm-2"},{label:"Small Screen Top Padding 3",value:"pt-sm-3"},{label:"Small Screen Top Padding 4",value:"pt-sm-4"},{label:"Small Screen Top Padding 5",value:"pt-sm-5"},{label:"Small Screen Top Padding 6",value:"pt-sm-6"},{label:"Small Screen Top Padding 7",value:"pt-sm-7"},{label:"Small Screen Top Padding 8",value:"pt-sm-8"},{label:"Small Screen Top Padding 9",value:"pt-sm-9"},{label:"Small Screen Top Padding 10",value:"pt-sm-10"},{label:"Medium Screen Top Padding 0",value:"pt-md-0"},{label:"Medium Screen Top Padding 1",value:"pt-md-1"},{label:"Medium Screen Top Padding 2",value:"pt-md-2"},{label:"Medium Screen Top Padding 3",value:"pt-md-3"},{label:"Medium Screen Top Padding 4",value:"pt-md-4"},{label:"Medium Screen Top Padding 5",value:"pt-md-5"},{label:"Medium Screen Top Padding 6",value:"pt-md-6"},{label:"Medium Screen Top Padding 7",value:"pt-md-7"},{label:"Medium Screen Top Padding 8",value:"pt-md-8"},{label:"Medium Screen Top Padding 9",value:"pt-md-9"},{label:"Medium Screen Top Padding 10",value:"pt-md-10"},{label:"Large Screen Top Padding 0",value:"pt-lg-0"},{label:"Large Screen Top Padding 1",value:"pt-lg-1"},{label:"Large Screen Top Padding 2",value:"pt-lg-2"},{label:"Large Screen Top Padding 3",value:"pt-lg-3"},{label:"Large Screen Top Padding 4",value:"pt-lg-4"},{label:"Large Screen Top Padding 5",value:"pt-lg-5"},{label:"Large Screen Top Padding 6",value:"pt-lg-6"},{label:"Large Screen Top Padding 7",value:"pt-lg-7"},{label:"Large Screen Top Padding 8",value:"pt-lg-8"},{label:"Large Screen Top Padding 9",value:"pt-lg-9"},{label:"Large Screen Top Padding 10",value:"pt-lg-10"},{label:"Extra Large Top Padding 0",value:"pt-xl-0"},{label:"Extra Large Top Padding 1",value:"pt-xl-1"},{label:"Extra Large Top Padding 2",value:"pt-xl-2"},{label:"Extra Large Top Padding 3",value:"pt-xl-3"},{label:"Extra Large Top Padding 4",value:"pt-xl-4"},{label:"Extra Large Top Padding 5",value:"pt-xl-5"},{label:"Extra Large Top Padding 6",value:"pt-xl-6"},{label:"Extra Large Top Padding 7",value:"pt-xl-7"},{label:"Extra Large Top Padding 8",value:"pt-xl-8"},{label:"Extra Large Top Padding 9",value:"pt-xl-9"},{label:"Extra Large Top Padding 10",value:"pt-xl-10"},{label:"XXL Top Padding 0",value:"pt-xxl-0"},{label:"XXL Top Padding 1",value:"pt-xxl-1"},{label:"XXL Top Padding 2",value:"pt-xxl-2"},{label:"XXL Top Padding 3",value:"pt-xxl-3"},{label:"XXL Top Padding 4",value:"pt-xxl-4"},{label:"XXL Top Padding 5",value:"pt-xxl-5"},{label:"XXL Top Padding 6",value:"pt-xxl-6"},{label:"XXL Top Padding 7",value:"pt-xxl-7"},{label:"XXL Top Padding 8",value:"pt-xxl-8"},{label:"XXL Top Padding 9",value:"pt-xxl-9"},{label:"XXL Top Padding 10",value:"pt-xxl-10"},{label:"Bottom Padding 0",value:"pb-0"},{label:"Bottom Padding 1",value:"pb-1"},{label:"Bottom Padding 2",value:"pb-2"},{label:"Bottom Padding 3",value:"pb-3"},{label:"Bottom Padding 4",value:"pb-4"},{label:"Bottom Padding 5",value:"pb-5"},{label:"Bottom Padding 6",value:"pb-6"},{label:"Bottom Padding 7",value:"pb-7"},{label:"Bottom Padding 8",value:"pb-8"},{label:"Bottom Padding 9",value:"pb-9"},{label:"Bottom Padding 10",value:"pb-10"},{label:"Small Screen Bottom Padding 0",value:"pb-sm-0"},{label:"Small Screen Bottom Padding 1",value:"pb-sm-1"},{label:"Small Screen Bottom Padding 2",value:"pb-sm-2"},{label:"Small Screen Bottom Padding 3",value:"pb-sm-3"},{label:"Small Screen Bottom Padding 4",value:"pb-sm-4"},{label:"Small Screen Bottom Padding 5",value:"pb-sm-5"},{label:"Small Screen Bottom Padding 6",value:"pb-sm-6"},{label:"Small Screen Bottom Padding 7",value:"pb-sm-7"},{label:"Small Screen Bottom Padding 8",value:"pb-sm-8"},{label:"Small Screen Bottom Padding 9",value:"pb-sm-9"},{label:"Small Screen Bottom Padding 10",value:"pb-sm-10"},{label:"Medium Screen Bottom Padding 0",value:"pb-md-0"},{label:"Medium Screen Bottom Padding 1",value:"pb-md-1"},{label:"Medium Screen Bottom Padding 2",value:"pb-md-2"},{label:"Medium Screen Bottom Padding 3",value:"pb-md-3"},{label:"Medium Screen Bottom Padding 4",value:"pb-md-4"},{label:"Medium Screen Bottom Padding 5",value:"pb-md-5"},{label:"Medium Screen Bottom Padding 6",value:"pb-md-6"},{label:"Medium Screen Bottom Padding 7",value:"pb-md-7"},{label:"Medium Screen Bottom Padding 8",value:"pb-md-8"},{label:"Medium Screen Bottom Padding 9",value:"pb-md-9"},{label:"Medium Screen Bottom Padding 10",value:"pb-md-10"},{label:"Large Screen Bottom Padding 0",value:"pb-lg-0"},{label:"Large Screen Bottom Padding 1",value:"pb-lg-1"},{label:"Large Screen Bottom Padding 2",value:"pb-lg-2"},{label:"Large Screen Bottom Padding 3",value:"pb-lg-3"},{label:"Large Screen Bottom Padding 4",value:"pb-lg-4"},{label:"Large Screen Bottom Padding 5",value:"pb-lg-5"},{label:"Large Screen Bottom Padding 6",value:"pb-lg-6"},{label:"Large Screen Bottom Padding 7",value:"pb-lg-7"},{label:"Large Screen Bottom Padding 8",value:"pb-lg-8"},{label:"Large Screen Bottom Padding 9",value:"pb-lg-9"},{label:"Large Screen Bottom Padding 10",value:"pb-lg-10"},{label:"Extra Large Bottom Padding 0",value:"pb-xl-0"},{label:"Extra Large Bottom Padding 1",value:"pb-xl-1"},{label:"Extra Large Bottom Padding 2",value:"pb-xl-2"},{label:"Extra Large Bottom Padding 3",value:"pb-xl-3"},{label:"Extra Large Bottom Padding 4",value:"pb-xl-4"},{label:"Extra Large Bottom Padding 5",value:"pb-xl-5"},{label:"Extra Large Bottom Padding 6",value:"pb-xl-6"},{label:"Extra Large Bottom Padding 7",value:"pb-xl-7"},{label:"Extra Large Bottom Padding 8",value:"pb-xl-8"},{label:"Extra Large Bottom Padding 9",value:"pb-xl-9"},{label:"Extra Large Bottom Padding 10",value:"pb-xl-10"},{label:"XXL Bottom Padding 0",value:"pb-xxl-0"},{label:"XXL Bottom Padding 1",value:"pb-xxl-1"},{label:"XXL Bottom Padding 2",value:"pb-xxl-2"},{label:"XXL Bottom Padding 3",value:"pb-xxl-3"},{label:"XXL Bottom Padding 4",value:"pb-xxl-4"},{label:"XXL Bottom Padding 5",value:"pb-xxl-5"},{label:"XXL Bottom Padding 6",value:"pb-xxl-6"},{label:"XXL Bottom Padding 7",value:"pb-xxl-7"},{label:"XXL Bottom Padding 8",value:"pb-xxl-8"},{label:"XXL Bottom Padding 9",value:"pb-xxl-9"},{label:"XXL Bottom Padding 10",value:"pb-xxl-10"}],b=[{label:"Static Position",value:"position-static"},{label:"Relative Position",value:"position-relative"},{label:"Absolute Position",value:"position-absolute"},{label:"Fixed Position",value:"position-fixed"},{label:"Sticky Position",value:"position-sticky"},{label:"Top 0%",value:"top-0"},{label:"Top 50%",value:"top-50"},{label:"Top 100%",value:"top-100"},{label:"Bottom 0%",value:"bottom-0"},{label:"Bottom 50%",value:"bottom-50"},{label:"Bottom 100%",value:"bottom-100"},{label:"Start 0%",value:"start-0"},{label:"Start 50%",value:"start-50"},{label:"Start 100%",value:"start-100"},{label:"End 0%",value:"end-0"},{label:"End 50%",value:"end-50"},{label:"End 100%",value:"end-100"},{label:"Translate Middle X",value:"translate-middle-x"},{label:"Translate Middle Y",value:"translate-middle-y"}],u=[{label:"Z-Index 0",value:"z-0"},{label:"Z-Index 1",value:"z-1"},{label:"Z-Index 2",value:"z-2"},{label:"Z-Index 3",value:"z-3"},{label:"Z-Index -1",value:"z-n1"}],v=window.ReactJSXRuntime,m=(l,e,a)=>{const n=[];for(const i of l){const l=e.find((l=>l.value===i));l?a?n.push(l.value):n.push(l.label):n.push(i)}return n},s=(l,e,a)=>{const n=[];for(const i of l){const l=e.find((l=>a?l.value===i:l.label===i));l?n.push(l.value):n.push(i)}return n},p=(l,e)=>{const a=[];for(const n of l)e?a.push(n.value):a.push(n.label);return a};function x(l){const e=[...l],a=["wp-block-cover","wp-block-fancysquares-cover-block"];for(const l of a)e.includes(l)||e.unshift(l);return e}function c(l,e,a,n,i,d){const t=x([]);return t.push(...l,...e,...a,...n,...i,...d),t}(0,l.registerBlockType)(a.UU,{edit:function({attributes:l,setAttributes:a,clientId:M}){const{url:S="",isVideo:L=!1,lazyLoadVideo:P=!1,dimRatio:X=50,contentPosition:E="center center",fullHeight:N=!1,additionalClasses:T=[]}=l,[k,B]=(0,d.useState)(!1),h=(0,d.useRef)();(0,d.useEffect)((()=>{if(0===T.length)a({additionalClasses:["wp-block-cover","wp-block-fancysquares-cover-block"]});else{const l=x(T);l.join(" ")!==T.join(" ")&&a({additionalClasses:l})}}),[T,a]);const f=T.filter((l=>!["wp-block-cover","wp-block-fancysquares-cover-block"].includes(l))),y=(l,e)=>l.filter((l=>e.some((e=>e.value===l)))),j=y(f,r),C=y(f,g),_=y(f,o),w=y(f,b),I=y(f,u),F=y(f,t),A=l=>{a({contentPosition:l})},z=[...T];if(E){const l=E.toLowerCase().replace(/[^\w\s-]+/g,"").trim().replace(/\s+/g,"-");z.push(`is-position-${l}`),"center center"!==E&&z.push("has-custom-content-position")}const R=(0,e.useBlockProps)({className:z.join(" "),style:N?{minHeight:"100vh"}:{}}),O=["wp-block-cover__background"];100!==X&&O.push("has-background-dim"),l.gradient&&O.push(`has-${l.gradient}-gradient-background`),l.backgroundColor&&O.push(`has-${l.backgroundColor}-background-color`);const G={opacity:X/100};l.style&&l.style.color&&l.style.color.gradient&&(G.backgroundImage=l.style.color.gradient),l.background&&(G.background=l.background),l.style&&l.style.color&&l.style.color.background&&(G.backgroundColor=l.style.color.background);let D=null;return S&&(D=L?(0,v.jsx)("video",{className:"wp-block-cover__video-background",src:S,autoPlay:!0,loop:!0,muted:!0,playsInline:!0}):(0,v.jsx)("img",{className:"wp-block-cover__image-background",src:S,alt:"",loading:"lazy"})),(0,v.jsxs)(d.Fragment,{children:[(0,v.jsx)(e.BlockControls,{group:"block",children:(0,v.jsx)(n.ToolbarGroup,{children:(0,v.jsx)(n.Dropdown,{className:"cover-block-position-dropdown",contentClassName:"cover-block-position-dropdown__content",position:"bottom left",renderToggle:({isOpen:l,onToggle:e})=>(0,v.jsx)(n.Button,{label:(0,i.__)("Position Content","fs-blocks"),icon:"marker",isPressed:l,onClick:e}),renderContent:()=>(0,v.jsx)(n.AlignmentMatrixControl,{value:E,onChange:A})})})}),(0,v.jsxs)(e.InspectorControls,{children:[(0,v.jsxs)(n.PanelBody,{title:(0,i.__)("Cover Settings","fs-blocks"),initialOpen:!0,children:[(0,v.jsxs)(e.MediaUploadCheck,{children:[(0,v.jsx)(e.MediaUpload,{allowedTypes:["image","video"],onSelect:l=>{l&&l.url?a({url:l.url,isVideo:"video"===l.type}):a({url:"",isVideo:!1,lazyLoadVideo:!1})},render:({open:l})=>(0,v.jsx)(n.Button,{variant:"primary",onClick:l,children:S?(0,i.__)("Replace Media","fs-blocks"):(0,i.__)("Select Media","fs-blocks")})}),S&&(0,v.jsx)(n.Button,{variant:"secondary",onClick:()=>{a({url:"",isVideo:!1,lazyLoadVideo:!1})},style:{marginTop:"8px"},children:(0,i.__)("Remove Media","fs-blocks")})]}),L&&(0,v.jsx)(n.ToggleControl,{label:(0,i.__)("Lazy Load Video","fs-blocks"),checked:P,onChange:l=>a({lazyLoadVideo:l})}),(0,v.jsx)(n.RangeControl,{label:(0,i.__)("Dim Ratio","fs-blocks"),value:X,onChange:l=>a({dimRatio:l}),min:0,max:100}),(0,v.jsx)(n.ToggleControl,{label:(0,i.__)("Toggle Full Height","fs-blocks"),checked:N,onChange:l=>a({fullHeight:l})})]}),(0,v.jsxs)(n.PanelBody,{title:(0,i.__)("Advanced Classes","fs-blocks"),initialOpen:!0,children:[(0,v.jsx)(n.CheckboxControl,{label:(0,i.__)("Show Values","fs-blocks"),checked:k,onChange:B,help:(0,i.__)("Display class names instead of labels.","fs-blocks"),style:{marginBottom:"20px"}}),(0,v.jsxs)("div",{style:{marginBottom:"20px"},children:[(0,v.jsx)(n.FormTokenField,{label:(0,i.__)("Display Classes","fs-blocks"),value:m(j,r,k),suggestions:p(r,k),onChange:l=>{const e=c(s(l,r,k),C,_,w,I,F);a({additionalClasses:e})}}),(0,v.jsxs)("details",{style:{marginTop:"5px"},children:[(0,v.jsx)("summary",{children:(0,i.__)("Available Display Classes","fs-blocks")}),(0,v.jsx)("ul",{style:{fontSize:"12px",paddingLeft:"20px",margin:"5px 0"},children:r.map((l=>(0,v.jsx)("li",{children:k?l.value:l.label},l.value)))})]})]}),(0,v.jsxs)("div",{style:{marginBottom:"20px"},children:[(0,v.jsx)(n.FormTokenField,{label:(0,i.__)("Margin Classes","fs-blocks"),value:m(C,g,k),suggestions:p(g,k),onChange:l=>{const e=s(l,g,k),n=c(j,e,_,w,I,F);a({additionalClasses:n})}}),(0,v.jsxs)("details",{style:{marginTop:"5px"},children:[(0,v.jsx)("summary",{children:(0,i.__)("Available Margin Classes","fs-blocks")}),(0,v.jsx)("ul",{style:{fontSize:"12px",paddingLeft:"20px",margin:"5px 0"},children:g.map((l=>(0,v.jsx)("li",{children:k?l.value:l.label},l.value)))})]})]}),(0,v.jsxs)("div",{style:{marginBottom:"20px"},children:[(0,v.jsx)(n.FormTokenField,{label:(0,i.__)("Padding Classes","fs-blocks"),value:m(_,o,k),suggestions:p(o,k),onChange:l=>{const e=s(l,o,k),n=c(j,C,e,w,I,F);a({additionalClasses:n})}}),(0,v.jsxs)("details",{style:{marginTop:"5px"},children:[(0,v.jsx)("summary",{children:(0,i.__)("Available Padding Classes","fs-blocks")}),(0,v.jsx)("ul",{style:{fontSize:"12px",paddingLeft:"20px",margin:"5px 0"},children:o.map((l=>(0,v.jsx)("li",{children:k?l.value:l.label},l.value)))})]})]}),(0,v.jsxs)("div",{style:{marginBottom:"20px"},children:[(0,v.jsx)(n.FormTokenField,{label:(0,i.__)("Position Classes","fs-blocks"),value:m(w,b,k),suggestions:p(b,k),onChange:l=>{const e=s(l,b,k),n=c(j,C,_,e,I,F);a({additionalClasses:n})}}),(0,v.jsxs)("details",{style:{marginTop:"5px"},children:[(0,v.jsx)("summary",{children:(0,i.__)("Available Position Classes","fs-blocks")}),(0,v.jsx)("ul",{style:{fontSize:"12px",paddingLeft:"20px",margin:"5px 0"},children:b.map((l=>(0,v.jsx)("li",{children:k?l.value:l.label},l.value)))})]})]}),(0,v.jsxs)("div",{style:{marginBottom:"20px"},children:[(0,v.jsx)(n.FormTokenField,{label:(0,i.__)("Z-Index Classes","fs-blocks"),value:m(I,u,k),suggestions:p(u,k),onChange:l=>{const e=s(l,u,k),n=c(j,C,_,w,e,F);a({additionalClasses:n})}}),(0,v.jsxs)("details",{style:{marginTop:"5px"},children:[(0,v.jsx)("summary",{children:(0,i.__)("Available Z-Index Classes","fs-blocks")}),(0,v.jsx)("ul",{style:{fontSize:"12px",paddingLeft:"20px",margin:"5px 0"},children:u.map((l=>(0,v.jsx)("li",{children:k?l.value:l.label},l.value)))})]})]}),(0,v.jsxs)("div",{style:{marginBottom:"20px"},children:[(0,v.jsx)(n.FormTokenField,{label:(0,i.__)("Bleed Cover Classes","fs-blocks"),value:m(F,t,k),suggestions:p(t,k),onChange:l=>{const e=s(l,t,k),n=c(j,C,_,w,I,e);a({additionalClasses:n})}}),(0,v.jsxs)("details",{style:{marginTop:"5px"},children:[(0,v.jsx)("summary",{children:(0,i.__)("Available Bleed Cover Classes","fs-blocks")}),(0,v.jsx)("ul",{style:{fontSize:"12px",paddingLeft:"20px",margin:"5px 0"},children:t.map((l=>(0,v.jsx)("li",{children:k?l.value:l.label},l.value)))})]})]})]})]}),(0,v.jsxs)("div",{...R,ref:h,children:[(0,v.jsx)("div",{className:O.join(" "),"aria-hidden":"true",style:G}),(0,v.jsx)("div",{className:"wp-block-cover__img-video-wrapper",children:D}),(0,v.jsx)("div",{className:"wp-block-cover__inner-container",children:(0,v.jsx)(e.InnerBlocks,{})})]})]})},save:()=>(0,v.jsx)(e.InnerBlocks.Content,{})})}},a={};function n(l){var i=a[l];if(void 0!==i)return i.exports;var d=a[l]={exports:{}};return e[l](d,d.exports,n),d.exports}n.m=e,l=[],n.O=(e,a,i,d)=>{if(!a){var t=1/0;for(b=0;b<l.length;b++){for(var[a,i,d]=l[b],r=!0,g=0;g<a.length;g++)(!1&d||t>=d)&&Object.keys(n.O).every((l=>n.O[l](a[g])))?a.splice(g--,1):(r=!1,d<t&&(t=d));if(r){l.splice(b--,1);var o=i();void 0!==o&&(e=o)}}return e}d=d||0;for(var b=l.length;b>0&&l[b-1][2]>d;b--)l[b]=l[b-1];l[b]=[a,i,d]},n.o=(l,e)=>Object.prototype.hasOwnProperty.call(l,e),(()=>{var l={984:0,472:0};n.O.j=e=>0===l[e];var e=(e,a)=>{var i,d,[t,r,g]=a,o=0;if(t.some((e=>0!==l[e]))){for(i in r)n.o(r,i)&&(n.m[i]=r[i]);if(g)var b=g(n)}for(e&&e(a);o<t.length;o++)d=t[o],n.o(l,d)&&l[d]&&l[d][0](),l[d]=0;return n.O(b)},a=globalThis.webpackChunkfs_blocks=globalThis.webpackChunkfs_blocks||[];a.forEach(e.bind(null,0)),a.push=e.bind(null,a.push.bind(a))})();var i=n.O(void 0,[472],(()=>n(159)));i=n.O(i)})();